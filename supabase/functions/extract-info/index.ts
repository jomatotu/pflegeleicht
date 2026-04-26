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
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

const SYSTEM_PROMPT =  "Du bist ein Textextraktor: Wir müssen aus dem übermittelten Text Werte extrahieren. \n\nEs sind nur sichere Werte einzutragen, bei unsicheren Werten soll für Strings \"\" geliefert werden und für Zahlen die 0.\n\nDas JSON ist das Beispiel: {\"firstname\":\"Max\",\"lastname\":\"Mustermann\",\"street\":\"Musterstraße 1\",\"city\":\"Kassel\",\"postalCode\":\"34117\",\"date_of_birth\":\"1950-03-15\",\"pflegegrad\":2,\"contact_person_phone\":\"+49 123 456789\",\"contact_person_email\":\"max.mustermann@example.com\",\"insurance_number\":\"787123456789\",\"order_number_md\":\"X234234234\"}\n\n"

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

  return new Response(JSON.stringify({ result }), {
    status: 200,
    headers: { ...cors, "Content-Type": "application/json" },
  });
});
