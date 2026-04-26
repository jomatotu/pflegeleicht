# pflegeleicht

> Pflege einfach gemacht. Vom Anspruch zur Nutzung – per Knopfdruck.

---

## Fachlicher Überblick

### Das Problem

Millionen Menschen in Deutschland haben Anspruch auf Pflegeleistungen – Entlastungsbetrag (131 €/Monat), Pflegehilfsmittel und mehr –, nutzen diese aber nicht. Der Grund: Der Weg von der Bewilligung zur tatsächlichen Nutzung ist zu komplex, zu bürokratisch und zu wenig bekannt.

### Die Lösung

Eine Plattform, die den gesamten Prozess vom Anspruch bis zur Nutzung automatisiert. Der Nutzer lädt einmalig seinen Pflegebescheid hoch, sieht sofort welche Leistungen ihm zustehen, wählt per Klick die gewünschten Dienste aus – und muss sich um nichts weiter kümmern. Anbietervermittlung, Terminierung und Abrechnung mit der Pflegekasse laufen vollständig im Hintergrund.

**Kernprinzip:** Der Nutzer muss das System nicht verstehen – das System handelt für ihn.

### MVP-Fokus

Der aktuelle MVP konzentriert sich auf den **Entlastungsbetrag** (§ 45b SGB XI):
- 131 €/Monat für Versicherte mit Pflegegrad 2–5
- Stark untergenutzt und hochstandardisierbar
- Der Nutzer aktiviert diesen Betrag durch das Hochladen seines Pflegebescheids und die Auswahl passender Leistungen

### Geschäftsmodell

Der Nutzer zahlt nichts. Die Plattform verdient an der Marge zwischen der Kassenerstattung und den Anbieterkosten. Alle Beteiligten profitieren:
- **Nutzer**: kein bürokratischer Aufwand
- **Anbieter**: kostenlose Kundenakquise
- **Plattform**: Automatisierungsmarge

### Nutzer-Flow (5 Schritte)

| Schritt | Seite | Beschreibung |
|---------|-------|--------------|
| 1 | Upload | Pflegebescheid (Foto/Scan) hochladen |
| 2 | Ergebnis | Erkannten Pflegegrad bestätigen und Abtretungserklärung unterzeichnen |
| 3 | Leistungen | Gewünschte Dienste per Klick auswählen (Budget-Anzeige in Echtzeit) |
| 4 | Bestätigung | Persönliche Daten prüfen und Antrag absenden |
| 5 | Fertig | Bestätigung – das Team meldet sich binnen 48 Stunden |

---

## Technische Dokumentation

### Architektur-Übersicht

```
Browser (React SPA)
  │
  ├── OCR (Tesseract.js, clientseitig)         ← Bescheid wird lokal ausgelesen
  ├── extract-info (Supabase Edge Function)    ← LLM extrahiert strukturierte Daten
  └── process-antrag (Supabase Edge Function)  ← Speichert Antrag, versendet E-Mails
        │
        ├── Supabase PostgreSQL                ← Stammdaten, Leistungskatalog
        ├── Supabase Storage (bucket: bescheide)
        └── Resend                             ← E-Mail-Versand
```

### Tech-Stack

| Bereich | Technologie |
|---------|-------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| OCR | Tesseract.js (Deutsch) – clientseitig |
| Backend | Supabase (PostgreSQL, Storage, Edge Functions mit Deno) |
| LLM | OpenRouter (`openai/gpt-4o-mini`) |
| E-Mail | Resend |
| Hosting | Supabase Cloud, Netlify (Frontend) |

### Projektstruktur

```
pflegeleicht/
├── frontend/                    # React SPA
│   └── src/
│       ├── app/
│       │   ├── pages/           # UploadPage, ResultPage, ServicesPage, ConfirmationPage, ReadyPage
│       │   ├── components/      # Header, Footer, ConfirmationScreen, ServiceSelectionSimple
│       │   └── data/services.ts # Leistungskatalog-Abfragen
│       └── lib/
│           ├── supabaseClient.ts
│           └── tesseractWorker.ts
├── supabase/
│   ├── functions/
│   │   ├── process-antrag/      # Antrag-Verarbeitung & E-Mail-Versand
│   │   └── extract-info/        # LLM-basierte Datenextraktion
│   ├── migrations/              # Datenbankschema-Migrationen
│   └── seed.sql                 # Initialdaten (Leistungskatalog)
├── documentation/
│   └── architecture/            # Arc42-Architekturdokumentation
├── RULES.md                     # Projektweite Entwicklungsregeln
└── README.md
```

### Datenbankschema (Überblick)

| Tabelle | Beschreibung |
|---------|--------------|
| `Leistung` | Pflegegrad-abhängige Budgets (z. B. 131 €/Monat für PG 2) |
| `Leistungsberechtigter` | Antragsteller mit persönlichen Daten und Pflegegrad |
| `Leistungselement` | Dienstleistungskatalog (Haushaltshilfe, Alltagsbegleiter etc.) |
| `Leistungsberechtiger_Leistungselemente` | Zuordnung: welcher Nutzer hat welche Leistungen gewählt |

Storage Bucket `bescheide` (privat): gespeicherte Pflegebescheide als PDF/Bild.

---

## Entwicklungsumgebung starten

### Voraussetzungen

- [Node.js](https://nodejs.org/) und npm
- Docker (wird von Supabase lokal benötigt)

### Setup

```bash
# 1. Root-Abhängigkeiten installieren (einmalig)
npm install

# 2. Supabase-Backend starten
npx supabase start
```

Das Backend läuft danach auf:
- **API**: http://127.0.0.1:54321
- **Supabase Studio**: http://127.0.0.1:54323
- **Datenbank**: Port 54322

```bash
# 3. Frontend starten (neues Terminal)
cd frontend
npm install   # einmalig
npm run dev
```

Frontend erreichbar unter: http://localhost:5173

### Umgebungsvariablen

**Frontend** (`frontend/.env`):
```env
VITE_SUPABASE_URL=https://jpuqjrfeumqschfwmlom.supabase.co
VITE_SUPABASE_ANON_KEY=<aus dem Dashboard>
```

**Edge Functions** (`supabase/functions/.env` – nie ins Repository!):
```env
RESEND_API_KEY=<von resend.com>
OPENROUTER_API_KEY=<von openrouter.ai>
OPENROUTER_MODEL=openai/gpt-4o-mini
PLATFORM_EMAIL=team@pflegeleicht.online
PARTNER_EMAIL=<partneragentur@example.com>
```

Vorlagen: `frontend/.env.example` und `supabase/functions/.env.example`

---

## Deployment (Supabase Cloud)

### Einmalig: Projekt verknüpfen

```bash
npx supabase login
npx supabase link --project-ref qppymetdhgcpwaelxsqv
```

Die Project-ID findet sich im Dashboard unter **Project Settings → General**.

### Datenbankschema deployen

```bash
npx supabase db push
```

Spielt alle Migrationen aus `supabase/migrations/` auf die Remote-Datenbank.

### Edge Functions deployen

```bash
npx supabase functions deploy process-antrag
npx supabase functions deploy extract-info
```

### Secrets im Dashboard eintragen

**Project Settings → Edge Functions → Secrets:**

| Secret | Beschreibung |
|--------|--------------|
| `RESEND_API_KEY` | API-Key von [resend.com](https://resend.com) |
| `OPENROUTER_API_KEY` | API-Key von [openrouter.ai](https://openrouter.ai) |
| `OPENROUTER_MODEL` | Modell-ID (z. B. `openai/gpt-4o-mini`) |
| `PLATFORM_EMAIL` | Empfänger-E-Mail des Plattformbetreibers |
| `PARTNER_EMAIL` | Empfänger-E-Mail der Partneragentur |

### Nach dem Deploy

- **Auth → URL Configuration**: `site_url` auf die Produktions-URL setzen

---

## Edge Functions – API-Referenz

### `process-antrag`

Nimmt einen Pflegebescheid entgegen, speichert die Antragsdaten und versendet 3 E-Mails (Kontaktperson, Plattformbetreiber, Partneragentur).

**Endpoint:** `POST https://jpuqjrfeumqschfwmlom.supabase.co/functions/v1/process-antrag`  
**Content-Type:** `multipart/form-data`

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `file` | File | Pflegebescheid als PDF oder Bild |
| `data` | String (JSON) | Antragsdaten (siehe unten) |

**`data`-Felder:**

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `firstname` | string | Vorname |
| `lastname` | string | Nachname |
| `street` | string | Straße und Hausnummer |
| `city` | string | Wohnort |
| `postalCode` | string | Postleitzahl |
| `date_of_birth` | string | Geburtsdatum (`"YYYY-MM-DD"`) |
| `pflegegrad` | number | Pflegegrad (1–5) |
| `contact_person_phone` | string | Telefonnummer der Kontaktperson |
| `contact_person_email` | string | E-Mail der Kontaktperson |
| `services` | number[] | IDs der gewählten Leistungselemente |

**Ablauf:**
1. Validierung der Eingabe
2. Datei-Upload in Storage-Bucket `bescheide`
3. Eintrag in `Leistungsberechtigter`
4. Verknüpfung in `Leistungsberechtiger_Leistungselemente`
5. E-Mail-Versand via Resend

**Beispiel:**
```bash
curl -X POST https://jpuqjrfeumqschfwmlom.supabase.co/functions/v1/process-antrag \
  -F "file=@bescheid.pdf" \
  -F 'data={"firstname":"Max","lastname":"Mustermann","street":"Musterstraße 1","city":"Kassel","postalCode":"34117","date_of_birth":"1950-03-15","pflegegrad":2,"contact_person_phone":"+49 123 456789","contact_person_email":"max@example.com","services":[1,2]}'
```

---

### `extract-info`

Extrahiert strukturierte Patientendaten aus einem Freitext (OCR-Ergebnis) via LLM.

**Endpoint:** `POST https://jpuqjrfeumqschfwmlom.supabase.co/functions/v1/extract-info`  
**Content-Type:** `application/json`

**Request:**

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `text` | string | Freitext aus OCR-Erkennung |

**Response:**

| Feld | Typ | Fallback |
|------|-----|----------|
| `firstname` | string | `""` |
| `lastname` | string | `""` |
| `street` | string | `""` |
| `city` | string | `""` |
| `postalCode` | string | `""` |
| `date_of_birth` | string | `""` |
| `pflegegrad` | number | `2` |
| `contact_person_phone` | string | `""` |
| `contact_person_email` | string | `""` |
| `insurance_number` | string | `""` |
| `order_number_md` | string | `""` |

**Beispiel:**
```bash
curl -X POST https://jpuqjrfeumqschfwmlom.supabase.co/functions/v1/extract-info \
  -H "Content-Type: application/json" \
  -H "apikey: <VITE_SUPABASE_ANON_KEY>" \
  -H "Authorization: Bearer <VITE_SUPABASE_ANON_KEY>" \
  -d '{"text": "Max Mustermann, geboren am 15.03.1950, wohnhaft Musterstraße 1, 34117 Kassel. Pflegegrad 2."}'
```

---

## Weiterführende Dokumentation

- [Architektur-Dokumentation (Arc42)](documentation/architecture/README.md)
- [Projektregeln](RULES.md)

---

## Troubleshooting

### Docker-Socket-Fehler mit Rancher Desktop

```bash
export DOCKER_HOST=unix:///Users/$USER/.rd/docker.sock
npx supabase start
```

Dauerhaft in `~/.zshrc` eintragen:
```bash
echo 'export DOCKER_HOST=unix:///Users/$USER/.rd/docker.sock' >> ~/.zshrc
source ~/.zshrc
```