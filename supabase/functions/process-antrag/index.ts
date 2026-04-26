import { createClient } from "jsr:@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const PLATFORM_EMAIL = Deno.env.get("PLATFORM_EMAIL") ?? "platform@pflegeleicht.online";
const PARTNER_EMAIL = Deno.env.get("PARTNER_EMAIL") ?? "test-partner@pflegeleicht.online";
const STORAGE_BUCKET = "bescheide";

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

interface AntragPayload {
  firstname: string;
  lastname: string;
  street: string;
  city: string;
  postalCode: string;
  date_of_birth: string;
  pflegegrad: number;
  contact_person_phone: string;
  contact_person_email: string;
  insurance_number?: string;
  order_number_md?: string;
  services: number[];
}

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

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("multipart/form-data")) {
    return new Response(
      JSON.stringify({ error: "Content-Type must be multipart/form-data" }),
      { status: 400, headers: { ...cors, "Content-Type": "application/json" } },
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid form data" }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  // Parse JSON payload
  const jsonRaw = formData.get("data");
  if (!jsonRaw || typeof jsonRaw !== "string") {
    return new Response(
      JSON.stringify({ error: "Missing 'data' field with JSON payload" }),
      { status: 400, headers: { ...cors, "Content-Type": "application/json" } },
    );
  }

  let payload: AntragPayload;
  try {
    payload = JSON.parse(jsonRaw);
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON in 'data' field" }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const {
    firstname,
    lastname,
    street,
    city,
    postalCode,
    date_of_birth,
    pflegegrad,
    contact_person_phone,
    contact_person_email,
    insurance_number,
    order_number_md,
    services,
  } = payload;

  log(`Antrag für ${firstname} ${lastname}, pflegegrad=${pflegegrad}`);

  if (
    !firstname ||
    !lastname ||
    !street ||
    !city ||
    !postalCode ||
    !date_of_birth ||
    pflegegrad == null ||
    !contact_person_phone ||
    !contact_person_email
  ) {
    return new Response(
      JSON.stringify({
        error:
          "Missing required fields: firstname, lastname, street, city, postalCode, date_of_birth, pflegegrad, contact_person_phone, contact_person_email",
      }),
      { status: 400, headers: { ...cors, "Content-Type": "application/json" } },
    );
  }

  // Parse uploaded file
  const uploadedFile = formData.get("file");
  if (!uploadedFile || !(uploadedFile instanceof File)) {
    return new Response(JSON.stringify({ error: "Missing 'file' field" }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  // 1. Datei in Storage speichern (Dateityp beibehalten)
  const fileBytes = await uploadedFile.arrayBuffer();
  const mimeType = uploadedFile.type || "application/octet-stream";
  const originalName = uploadedFile.name ?? "";
  const ext = originalName.includes(".") ? originalName.split(".").pop() : mimeType.split("/")[1];
  const fileName = `${Date.now()}_${lastname}_${firstname}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, fileBytes, {
      contentType: mimeType,
      upsert: false,
    });

  if (uploadError) {
    log(`Datei-Upload fehlgeschlagen: ${uploadError.message}`);
    return new Response(
      JSON.stringify({ error: `Datei-Upload fehlgeschlagen: ${uploadError.message}` }),
      { status: 500, headers: { ...cors, "Content-Type": "application/json" } },
    );
  }

  log(`Datei gespeichert: ${fileName}`);

  // 2. Leistungsberechtigter in Datenbank speichern
  const { data: inserted, error: insertError } = await supabase
    .from("Leistungsberechtigter")
    .insert({
      firstname,
      lastname,
      street,
      city,
      postal_code: postalCode,
      date_of_birth,
      pflegegrad,
      contact_person_phone,
      contact_person_email,
      insurance_number,
      order_number_md,
    })
    .select("id")
    .single();

  if (insertError || !inserted) {
    log(`DB-Insert fehlgeschlagen: ${insertError?.message} — starte Rollback`);
    await supabase.storage.from(STORAGE_BUCKET).remove([fileName]);

    return new Response(
      JSON.stringify({ error: `Datenbankfehler: ${insertError?.message}` }),
      { status: 500, headers: { ...cors, "Content-Type": "application/json" } },
    );
  }

  log(`Leistungsberechtigter angelegt: id=${inserted.id}`);

  // 3. Leistungselemente verknüpfen
  if (services && services.length > 0) {
    const serviceRows = services.map((leistungselement_id) => ({
      leistungsberechtigter_id: inserted.id,
      leistungselement_id,
    }));

    const { error: servicesError } = await supabase
      .from("Leistungsberechtiger_Leistungselemente")
      .insert(serviceRows);

    if (servicesError) {
      log(`Leistungselemente-Insert fehlgeschlagen: ${servicesError.message}`);
    } else {
      log(`${services.length} Leistungselement(e) verknüpft`);
    }
  }

  // 4. 3 E-Mails versenden
  const emailResults = await Promise.allSettled([
    sendEmail({
      to: contact_person_email,
      subject: "Ihr Antrag wurde erfolgreich eingereicht",
      html: buildSubmitterEmail(firstname, lastname, pflegegrad, street, city, postalCode),
    }),
    sendEmail({
      to: PLATFORM_EMAIL,
      subject: `Neuer Antrag eingegangen: ${firstname} ${lastname}`,
      html: buildPlatformEmail(
        firstname,
        lastname,
        pflegegrad,
        street,
        city,
        postalCode,
        date_of_birth,
        contact_person_phone,
        contact_person_email,
        inserted.id,
        services,
      ),
    }),
    sendEmail({
      to: PARTNER_EMAIL,
      subject: `Neuer Leistungsberechtigter: ${firstname} ${lastname}`,
      html: buildPartnerEmail(
        firstname,
        lastname,
        pflegegrad,
        street,
        city,
        postalCode,
        date_of_birth,
        contact_person_phone,
        inserted.id,
        services,
      ),
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
      file: fileName,
      email_errors: emailErrors.length > 0 ? emailErrors : undefined,
    }),
    { status: 201, headers: { ...cors, "Content-Type": "application/json" } },
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
      from: "noreply@pflegeleicht.online",
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
  pflegegrad: number,
  street: string,
  city: string,
  postalCode: string,
): string {
  return `
    <h2>Ihr Antrag wurde erfolgreich eingereicht</h2>
    <p>Sehr geehrte/r ${firstname} ${lastname},</p>
    <p>Ihr Antrag wurde erfolgreich bei pflegeleicht.online eingereicht und wird nun bearbeitet.</p>
    <ul>
      <li><strong>Pflegegrad:</strong> ${pflegegrad}</li>
      <li><strong>Adresse:</strong> ${street}, ${postalCode} ${city}</li>
    </ul>
    <p>Wir melden uns in Kürze bei Ihnen.</p>
    <p>Mit freundlichen Grüßen,<br>Ihr pflegeleicht-Team</p>
  `;
}

function buildPlatformEmail(
  firstname: string,
  lastname: string,
  pflegegrad: number,
  street: string,
  city: string,
  postalCode: string,
  date_of_birth: string,
  contact_person_phone: string,
  contact_person_email: string,
  id: number,
  services: number[],
): string {
  return `
    <h2>Neuer Antrag eingegangen</h2>
    <p>Ein neuer Leistungsberechtigter wurde angelegt:</p>
    <ul>
      <li><strong>ID:</strong> ${id}</li>
      <li><strong>Name:</strong> ${firstname} ${lastname}</li>
      <li><strong>Geburtsdatum:</strong> ${date_of_birth}</li>
      <li><strong>Adresse:</strong> ${street}, ${postalCode} ${city}</li>
      <li><strong>Pflegegrad:</strong> ${pflegegrad}</li>
      <li><strong>Telefon:</strong> ${contact_person_phone}</li>
      <li><strong>E-Mail:</strong> ${contact_person_email}</li>
      <li><strong>Leistungselemente:</strong> ${services?.length > 0 ? services.join(", ") : "keine"}</li>
    </ul>
  `;
}

function buildPartnerEmail(
  firstname: string,
  lastname: string,
  pflegegrad: number,
  street: string,
  city: string,
  postalCode: string,
  date_of_birth: string,
  contact_person_phone: string,
  id: number,
  services: number[],
): string {
  return `
    <h2>Neuer Leistungsberechtigter</h2>
    <p>Es gibt einen neuen Leistungsberechtigten, der Ihre Unterstützung benötigt:</p>
    <ul>
      <li><strong>Interne ID:</strong> ${id}</li>
      <li><strong>Name:</strong> ${firstname} ${lastname}</li>
      <li><strong>Geburtsdatum:</strong> ${date_of_birth}</li>
      <li><strong>Adresse:</strong> ${street}, ${postalCode} ${city}</li>
      <li><strong>Pflegegrad:</strong> ${pflegegrad}</li>
      <li><strong>Telefon:</strong> ${contact_person_phone}</li>
      <li><strong>Leistungselemente:</strong> ${services?.length > 0 ? services.join(", ") : "keine"}</li>
    </ul>
    <p>Bitte nehmen Sie Kontakt auf.</p>
  `;
}