const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY") ?? "";
const OPENROUTER_MODEL = "openai/gpt-4o-mini";

const ALLOWED_ORIGINS = [
  "https://pflegeleicht.online",
  "https://www.pflegeleicht.online",
  "http://localhost:5173",
];

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
  };
}

const SYSTEM_PROMPT =  "I will act as a text extractor with the following rules:\n\n" +
    "I extract only values that are explicitly and unambiguously present in the provided text.\n" +
    "If a value is uncertain, implied, or ambiguous:\n" +
    "\n" +
    "For strings → return \"\"\n" +
    "For numbers → return 0\n" +
    "\n" +
    "\n" +
    "I will not infer or guess missing information.\n" +
    "Output will be strictly based on the input text.\n" +
    "\n" +
    "\n" +
    "Please provide:\n" +
    "\n" +
    "The JSON example / target schema (the structure and field names to be filled)\n" +
    "The source text from which the values should be extracted\n" +
    "\n" +
    "Sample: \n" +
    "======\n" +
    "{\"firstname\":\"Max\",\"lastname\":\"Mustermann\",\"street\":\"Musterstraße 1\",\"city\":\"Kassel\",\"postalCode\":\"34117\",\"date_of_birth\":\"1950-03-15\",\"pflegegrad\":2,\"contact_person_phone\":\"+49 123 456789\",\"contact_person_email\":\"max.mustermann@example.com\",\"insurance_number\":\"787123456789\",\"order_number_md\":\"X234234234\"}\n" +
    "======"

Deno.serve(async (req: Request) => {
  const requestId = crypto.randomUUID().slice(0, 8);
  const log = (msg: string) => console.log(`[${requestId}] ${msg}`);

  log(`${req.method} ${req.url}`);

  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  let body: { text?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const { text } = body;

  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return new Response(JSON.stringify({ error: "Field 'text' is required" }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  if (!OPENROUTER_API_KEY) {
    log("OPENROUTER_API_KEY is not set");
    return new Response(JSON.stringify({ error: "LLM service not configured" }), {
      status: 500,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  log(`Input text length: ${text.length} chars`);
  log(`Input text preview: ${text.slice(0, 200).replace(/\n/g, " ")}…`);
  log(`Calling OpenRouter with model ${OPENROUTER_MODEL}`);

  const t0 = Date.now();
  const llmResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: text },
      ],
    }),
  });

  log(`OpenRouter responded in ${Date.now() - t0}ms — status ${llmResponse.status}`);

  if (!llmResponse.ok) {
    const errorText = await llmResponse.text();
    log(`OpenRouter error body: ${errorText}`);
    return new Response(JSON.stringify({ error: "LLM request failed", details: errorText }), {
      status: 502,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const llmData = await llmResponse.json();
  const raw = llmData.choices?.[0]?.message?.content ?? "";
  const result = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  const usage = llmData.usage;

  log(`OpenRouter call successful`);
  log(`Tokens — prompt: ${usage?.prompt_tokens}, completion: ${usage?.completion_tokens}, total: ${usage?.total_tokens}`);
  log(`LLM result: ${result}`);

  let finalResult = result;
  try {
    const parsed = JSON.parse(result);
    if (!parsed.pflegegrad) {
      parsed.pflegegrad = 2;
    }
    finalResult = JSON.stringify(parsed);
  } catch {
    log("Could not parse LLM result as JSON, returning raw result");
  }

  return new Response(JSON.stringify({ result: finalResult }), {
    status: 200,
    headers: { ...cors, "Content-Type": "application/json" },
  });
});
