import { createClient } from "jsr:@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const PLATFORM_EMAIL = Deno.env.get("PLATFORM_EMAIL") ?? "platform@pflegeleicht.de";
const PARTNER_EMAIL = Deno.env.get("PARTNER_EMAIL") ?? "test-partner@pflegeleicht.de";
const STORAGE_BUCKET = "bescheide";

interface AntragPayload {
  firstname: string;
  lastname: string;
  pflegegrad: number;
  leistung_id: number;
  // todo: array von leistungen!
  // todo: add more fields:
  //  phone, address, Krankenkassenversicherungsnummer, Aufragsnummer MD (optional), pflegegrad_since
  submitter_email: string;
}

Deno.serve(async (req: Request) => {
  const requestId = crypto.randomUUID().slice(0, 8);
  const log = (msg: string) => console.log(`[${requestId}] ${msg}`);

  log(`${req.method} ${req.url}`);

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("multipart/form-data")) {
    return new Response(
      JSON.stringify({ error: "Content-Type must be multipart/form-data" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid form data" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Parse JSON payload
  const jsonRaw = formData.get("data");
  if (!jsonRaw || typeof jsonRaw !== "string") {
    return new Response(
      JSON.stringify({ error: "Missing 'data' field with JSON payload" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  let payload: AntragPayload;
  try {
    payload = JSON.parse(jsonRaw);
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON in 'data' field" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { firstname, lastname, pflegegrad, leistung_id, submitter_email } = payload;

  log(`Antrag für ${firstname} ${lastname}, pflegegrad=${pflegegrad}, leistung_id=${leistung_id}`);

  if (!firstname || !lastname || pflegegrad == null || !leistung_id || !submitter_email) {
    return new Response(
      JSON.stringify({
        error: "Missing required fields: firstname, lastname, pflegegrad, leistung_id, submitter_email",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // Parse PDF file
  const pdfFile = formData.get("pdf");
  if (!pdfFile || !(pdfFile instanceof File)) {
    return new Response(JSON.stringify({ error: "Missing 'pdf' file" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  // 1. Budget-Berechtigungsprüfung: Leistung muss existieren und pflegegrad muss passen
  const { data: leistung, error: leistungError } = await supabase
    .from("Leistung")
    .select("id, name, budget")
    .eq("id", leistung_id)
    .single();

  if (leistungError || !leistung) {
    log(`Budgetprüfung fehlgeschlagen: leistung_id=${leistung_id} nicht gefunden`);
    return new Response(
      JSON.stringify({ error: "Budgetberechtigung nicht gefunden: Leistung existiert nicht" }),
      { status: 422, headers: { "Content-Type": "application/json" } },
    );
  }

  if (!leistung.budget || leistung.budget <= 0) {
    log(`Budgetprüfung fehlgeschlagen: "${leistung.name}" hat kein gültiges Budget`);
    return new Response(
      JSON.stringify({ error: "Budgetberechtigung abgelehnt: Leistung hat kein gültiges Budget" }),
      { status: 422, headers: { "Content-Type": "application/json" } },
    );
  }

  log(`Budgetprüfung OK: "${leistung.name}" budget=${leistung.budget}`);

  // 2. PDF in Storage speichern
  const pdfBytes = await pdfFile.arrayBuffer();
  const fileName = `${Date.now()}_${lastname}_${firstname}.pdf`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, pdfBytes, {
      contentType: "application/pdf",
      upsert: false,
    });

  if (uploadError) {
    log(`PDF-Upload fehlgeschlagen: ${uploadError.message}`);
    return new Response(
      JSON.stringify({ error: `PDF-Upload fehlgeschlagen: ${uploadError.message}` }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  log(`PDF gespeichert: ${fileName}`);

  // 3. Leistungsberechtigter in Datenbank speichern
  const { data: inserted, error: insertError } = await supabase
    .from("Leistungsberechtigter")
    .insert({
      firstname,
      lastname,
      pflegegrad,
      leistung_id,
    })
    .select("id")
    .single();

  if (insertError || !inserted) {
    log(`DB-Insert fehlgeschlagen: ${insertError?.message} — starte Rollback`);
    await supabase.storage.from(STORAGE_BUCKET).remove([fileName]);

    return new Response(
      JSON.stringify({ error: `Datenbankfehler: ${insertError?.message}` }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  log(`Leistungsberechtigter angelegt: id=${inserted.id}`);

  // 4. 3 E-Mails versenden
  const emailResults = await Promise.allSettled([
    sendEmail({
      to: submitter_email,
      subject: "Ihr Antrag wurde erfolgreich eingereicht",
      html: buildSubmitterEmail(firstname, lastname, leistung.name, pflegegrad),
    }),
    sendEmail({
      to: PLATFORM_EMAIL,
      subject: `Neuer Antrag eingegangen: ${firstname} ${lastname}`,
      html: buildPlatformEmail(firstname, lastname, pflegegrad, leistung.name, inserted.id),
    }),
    sendEmail({
      to: PARTNER_EMAIL,
      subject: `Neuer Leistungsberechtigter: ${firstname} ${lastname}`,
      html: buildPartnerEmail(firstname, lastname, pflegegrad, leistung.name, inserted.id),
    }),
  ]);

  const emailErrors = emailResults
    .filter((r) => r.status === "rejected")
    .map((r) => (r as PromiseRejectedResult).reason);

  if (emailErrors.length > 0) {
    console.error(`[${requestId}] ${emailErrors.length}/3 E-Mails fehlgeschlagen:`, emailErrors);
  } else {
    log("3/3 E-Mails erfolgreich versendet");
  }

  log(`Antrag abgeschlossen: leistungsberechtigter_id=${inserted.id}`);

  return new Response(
    JSON.stringify({
      success: true,
      leistungsberechtigter_id: inserted.id,
      pdf_file: fileName,
      email_errors: emailErrors.length > 0 ? emailErrors : undefined,
    }),
    { status: 201, headers: { "Content-Type": "application/json" } },
  );
});

async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "noreply@pflegeleicht.de",
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend API error (${res.status}): ${body}`);
  }
}

function buildSubmitterEmail(
  firstname: string,
  lastname: string,
  leistungName: string,
  pflegegrad: number,
): string {
  return `
    <h2>Ihr Antrag wurde erfolgreich eingereicht</h2>
    <p>Sehr geehrte/r ${firstname} ${lastname},</p>
    <p>Ihr Antrag wurde erfolgreich bei pflegeleicht.de eingereicht und wird nun bearbeitet.</p>
    <ul>
      <li><strong>Pflegegrad:</strong> ${pflegegrad}</li>
      <li><strong>Beantragte Leistung:</strong> ${leistungName}</li>
    </ul>
    <p>Wir melden uns in Kürze bei Ihnen.</p>
    <p>Mit freundlichen Grüßen,<br>Ihr pflegeleicht-Team</p>
  `;
}

function buildPlatformEmail(
  firstname: string,
  lastname: string,
  pflegegrad: number,
  leistungName: string,
  id: number,
): string {
  return `
    <h2>Neuer Antrag eingegangen</h2>
    <p>Ein neuer Leistungsberechtigter wurde angelegt:</p>
    <ul>
      <li><strong>ID:</strong> ${id}</li>
      <li><strong>Name:</strong> ${firstname} ${lastname}</li>
      <li><strong>Pflegegrad:</strong> ${pflegegrad}</li>
      <li><strong>Leistung:</strong> ${leistungName}</li>
    </ul>
  `;
}

function buildPartnerEmail(
  firstname: string,
  lastname: string,
  pflegegrad: number,
  leistungName: string,
  id: number,
): string {
  return `
    <h2>Neuer Leistungsberechtigter</h2>
    <p>Es gibt einen neuen Leistungsberechtigten, der Ihre Unterstützung benötigt:</p>
    <ul>
      <li><strong>Interne ID:</strong> ${id}</li>
      <li><strong>Name:</strong> ${firstname} ${lastname}</li>
      <li><strong>Pflegegrad:</strong> ${pflegegrad}</li>
      <li><strong>Leistung:</strong> ${leistungName}</li>
    </ul>
    <p>Bitte nehmen Sie Kontakt auf.</p>
  `;
}