export function buildPartnerEmail(
  id: number,
  firstname: string,
  lastname: string,
  date_of_birth: string,
  street: string,
  postalCode: string,
  city: string,
  pflegegrad: number,
  contact_person_phone: string,
  contact_person_email: string,
  insurance_number: string,
  order_number_md: string,
  services: number[],
): string {
  const servicesText = services?.length > 0 ? services.join(", ") : "keine";

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Neuer Leistungsberechtigter</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 700px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }
    .header {
      background-color: #005F5A;
      color: #ffffff;
      padding: 20px;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
    .content {
      padding: 20px;
      color: #333333;
      line-height: 1.5;
    }
    .footer {
      background-color: #f4f4f4;
      padding: 15px;
      text-align: center;
      font-size: 12px;
      color: #777777;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      Neuer Leistungsberechtigter
    </div>
    <div class="content">
      <p>Es wurde ein neuer Leistungsberechtigter erfasst, der Ihre Unterstützung benötigt:</p>

      <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse; font-size:14px; font-family:Arial, Helvetica, sans-serif;">
        <tr style="background:#f9fafb;">
          <td style="font-weight:bold; width:40%;">Interne ID</td>
          <td>${id}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Name</td>
          <td>${firstname} ${lastname}</td>
        </tr>
        <tr style="background:#f9fafb;">
          <td style="font-weight:bold;">Geburtsdatum</td>
          <td>${date_of_birth}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Adresse</td>
          <td>${street}, ${postalCode} ${city}</td>
        </tr>
        <tr style="background:#f9fafb;">
          <td style="font-weight:bold;">Pflegegrad</td>
          <td>${pflegegrad}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Telefon</td>
          <td>${contact_person_phone}</td>
        </tr>
        <tr style="background:#f9fafb;">
          <td style="font-weight:bold;">E-Mail</td>
          <td>${contact_person_email}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Versicherungsnummer</td>
          <td>${insurance_number || "–"}</td>
        </tr>
        <tr style="background:#f9fafb;">
          <td style="font-weight:bold;">Auftragsnummer MD</td>
          <td>${order_number_md || "–"}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Leistungselemente</td>
          <td>${servicesText}</td>
        </tr>
      </table>

      <div style="text-align:center; margin:30px 0; font-family:Arial, Helvetica, sans-serif;">
        <a href="https://pflegeleicht.online" style="background:#005F5A; color:#ffffff; padding:12px 20px; text-decoration:none; border-radius:6px; font-size:14px; display:inline-block; font-family:Arial, Helvetica, sans-serif;">
          Kontakt aufnehmen
        </a>
      </div>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td style="background:#005F5A; padding:25px; text-align:left; color:#ffffff;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:14px; vertical-align:middle;">
                  <p style="margin:0; font-weight:bold;">pflegeleicht.online</p>
                  <p style="margin:5px 0 0; font-size:12px; opacity:0.85;">Digitale Unterstützung in der Pflege</p>
                </td>
                <td align="right" style="vertical-align:middle;">
                  <img src="https://pflegeleicht.online/assets/image-DX5TyiqF.png" alt="pflegeleicht-online" width="140" style="display:block; margin:0 10px;">
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <p style="font-family:Arial, 'Times New Roman', serif; font-style:italic; font-size:14px; margin-top:20px;">
        Diese Nachricht wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail.
      </p>
    </div>
    <div class="footer">
      © 2026 pflegeleicht.online – Alle Rechte vorbehalten
    </div>
  </div>
</body>
</html>`;
}

export function buildSubmitterEmail(
  firstname: string,
  lastname: string,
  pflegegrad: number,
  services: number[],
): string {
  const servicesText = services?.length > 0 ? services.join(", ") : "keine";

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Neuer Antrag</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 700px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }
    .header {
      background-color: #005F5A;
      color: #ffffff;
      padding: 20px;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
    .content {
      padding: 20px;
      color: #333333;
      line-height: 1.5;
    }
    .footer {
      background-color: #f4f4f4;
      padding: 15px;
      text-align: center;
      font-size: 12px;
      color: #777777;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      Ihr Antrag wurde erfolgreich eingereicht
    </div>
    <div class="content">
      <p>Ihr Antrag wurde erfolgreich bei pflegeleicht.online eingereicht und wird nun bearbeitet.</p>
      <p>Es wurde ein neuer Antrag erfasst, in dem Hilfebedarf formuliert wird:</p>

      <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse; font-size:14px; font-family:Arial, Helvetica, sans-serif;">
        <tr>
          <td style="font-weight:bold; width:40%;">Name</td>
          <td>${firstname} ${lastname}</td>
        </tr>
        <tr style="background:#f9fafb;">
          <td style="font-weight:bold;">Pflegegrad</td>
          <td>${pflegegrad}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Leistungselemente</td>
          <td>${servicesText}</td>
        </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
        <tr>
          <td style="background-color:#005F5A; padding:10px; text-align:center;">
            <span style="color:#ffffff; font-size:16px; font-weight:bold;">
              Es wird sich jemand bei Ihnen innerhalb 48h melden
            </span>
          </td>
        </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td style="background:#005F5A; padding:25px; text-align:left; color:#ffffff;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:14px; vertical-align:middle;">
                  <p style="margin:0; font-weight:bold;">pflegeleicht.online</p>
                  <p style="margin:5px 0 0; font-size:12px; opacity:0.85;">Digitale Unterstützung in der Pflege</p>
                </td>
                <td align="right" style="vertical-align:middle;">
                  <img src="https://pflegeleicht.online/assets/image-DX5TyiqF.png" alt="pflegeleicht-online" width="140" style="display:block; margin:10px 10px;">
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <p style="font-family:Arial, 'Times New Roman', serif; font-style:italic; font-size:14px; margin-top:20px;">
        Diese Nachricht wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail.
      </p>
    </div>
    <div class="footer">
      © 2026 pflegeleicht.online – Alle Rechte vorbehalten
    </div>
  </div>
</body>
</html>`;
}

export function buildPlatformEmail(
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
  const servicesText = services?.length > 0 ? services.join(", ") : "keine";

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Neuer Antrag eingegangen</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 700px; margin: 30px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
    .header { background-color: #005F5A; color: #ffffff; padding: 20px; text-align: center; font-size: 20px; font-weight: bold; }
    .content { padding: 20px; color: #333333; line-height: 1.5; }
    .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777777; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Neuer Antrag eingegangen</div>
    <div class="content">
      <p>Ein neuer Leistungsberechtigter wurde angelegt:</p>
      <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse; font-size:14px; font-family:Arial, Helvetica, sans-serif;">
        <tr style="background:#f9fafb;">
          <td style="font-weight:bold; width:40%;">Interne ID</td>
          <td>${id}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Name</td>
          <td>${firstname} ${lastname}</td>
        </tr>
        <tr style="background:#f9fafb;">
          <td style="font-weight:bold;">Geburtsdatum</td>
          <td>${date_of_birth}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Adresse</td>
          <td>${street}, ${postalCode} ${city}</td>
        </tr>
        <tr style="background:#f9fafb;">
          <td style="font-weight:bold;">Pflegegrad</td>
          <td>${pflegegrad}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Telefon</td>
          <td>${contact_person_phone}</td>
        </tr>
        <tr style="background:#f9fafb;">
          <td style="font-weight:bold;">E-Mail</td>
          <td>${contact_person_email}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Leistungselemente</td>
          <td>${servicesText}</td>
        </tr>
      </table>
      <p style="font-family:Arial, 'Times New Roman', serif; font-style:italic; font-size:14px; margin-top:20px;">
        Diese Nachricht wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail.
      </p>
    </div>
    <div class="footer">© 2026 pflegeleicht.online – Alle Rechte vorbehalten</div>
  </div>
</body>
</html>`;
}
