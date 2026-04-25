# pflegeleicht
Hackathon Projekt Kassel 

Hinweis: Bitte beachte die projektweiten Regeln in [RULES.md](RULES.md).

## Architektur-Dokumentation

- [Architecture](documentation/architecture/README.md)

## Entwicklungsumgebung starten

### Voraussetzungen

- [Node.js](https://nodejs.org/) und npm installiert
- Docker läuft (wird von Supabase lokal benötigt)

### 1. Abhängigkeiten installieren (nur beim ersten Mal)

```bash
npm install
```

### 2. Supabase Backend starten

```bash
npx supabase start
```

Das Backend läuft danach auf folgenden Ports:
- **API**: http://127.0.0.1:54321
- **Supabase Studio**: http://127.0.0.1:54323
- **Datenbank**: Port 54322

### 3. Frontend starten

```bash
cd frontend
npm install   # nur beim ersten Mal nötig
npm run dev
```

Das Frontend ist anschließend unter http://localhost:5173 erreichbar.

## Supabase auf den gehosteten Service deployen

### Voraussetzungen

- Supabase-Konto auf [supabase.com](https://supabase.com)
- Zugriff auf pflegeleichtonline Projekt im Supabase-Dashboard (Project-ID: qppymetdhgcpwaelxsqv)

### 1. Login

```bash
npx supabase login
```

Öffnet den Browser zur Authentifizierung.

### 2. Lokales Projekt mit Remote verknüpfen

```bash
npx supabase link --project-ref qppymetdhgcpwaelxsqv
```

Die Project-ID steht im Dashboard unter **Project Settings → General**.

### 3. Datenbankschema deployen

```bash
npx supabase db push
```

Spielt alle lokalen Migrations aus `supabase/migrations/` auf die Remote-Datenbank auf.

### 4. Edge Functions deployen

```bash
npx supabase functions deploy process-antrag
```

### 5. Secrets im Dashboard eintragen

**Project Settings → Edge Functions → Secrets:**

| Secret | Beschreibung |
|--------|--------------|
| `RESEND_API_KEY` | API-Key von [resend.com](https://resend.com) für E-Mail-Versand |
| `PLATFORM_EMAIL` | Empfänger-E-Mail des Plattformbetreibers |
| `PARTNER_EMAIL` | Empfänger-E-Mail der Partneragentur |

Vorlage: `supabase/functions/.env.example`

### 6. Nach dem Deploy: Einstellungen im Dashboard anpassen

- **Auth → URL Configuration**: `site_url` auf die Produktions-URL setzen

---

## Edge Function: `process-antrag`

Nimmt einen Pflegebescheid (PDF) entgegen, speichert die Daten und versendet 3 E-Mails.

**Endpoint:** `POST https://jpuqjrfeumqschfwmlom.supabase.co/functions/v1/process-antrag`  
**Content-Type:** `multipart/form-data`

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `pdf` | File | Pflegebescheid als PDF |
| `data` | String (JSON) | `firstname`, `lastname`, `street`, `city`, `postalCode`, `date_of_birth`, `pflegegrad`, `contact_person_phone`, `contact_person_email`, `services` |

**`data`-Felder im Detail:**

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `firstname` | string | Vorname der leistungsberechtigten Person |
| `lastname` | string | Nachname der leistungsberechtigten Person |
| `street` | string | Straße und Hausnummer |
| `city` | string | Wohnort |
| `postalCode` | string | Postleitzahl |
| `date_of_birth` | string | Geburtsdatum (z. B. `"1950-03-15"`) |
| `pflegegrad` | number | Pflegegrad (1–5) |
| `contact_person_phone` | string | Telefonnummer der Kontaktperson |
| `contact_person_email` | string | E-Mail der Kontaktperson (erhält Bestätigungs-E-Mail) |
| `services` | number[] | IDs der gewünschten Leistungselemente (optional) |

**Ablauf:**
1. Validierung der Eingabe
2. PDF-Upload in den privaten Storage-Bucket `bescheide`
3. Eintrag in Tabelle `Leistungsberechtigter`
4. Verknüpfung der Leistungselemente in `Leistungsberechtiger_Leistungselemente`
5. E-Mail-Versand an: Kontaktperson, Plattformbetreiber, Partneragentur

**curl-Beispiel:**
    
```bash
curl -X POST https://jpuqjrfeumqschfwmlom.supabase.co/functions/v1/process-antrag \
  -F "pdf=@test_formular.pdf" \
  -F 'data={"firstname":"Max","lastname":"Mustermann","street":"Musterstraße 1","city":"Kassel","postalCode":"34117","date_of_birth":"1950-03-15","pflegegrad":2,"contact_person_phone":"+49 123 456789","contact_person_email":"max.mustermann@example.com","services":[1,2]}'
```

---

## Troubleshooting

### Supabase: Docker-Socket-Fehler (Rancher Desktop)

Fehlermeldung: `failed to start docker container ... mkdir /Users/.../.rd/docker.sock: operation not supported`

```bash
export DOCKER_HOST=unix:///Users/nils/.rd/docker.sock
npx supabase start
```

Damit das dauerhaft gilt:
```bash
echo 'export DOCKER_HOST=unix:///Users/nils/.rd/docker.sock' >> ~/.zshrc
source ~/.zshrc
```

---

### Kurzübersicht

```bash
# Einmalig im Root-Verzeichnis
npm install
npx supabase start

# Frontend (in einem neuen Terminal)
cd frontend && npm install && npm run dev
```

