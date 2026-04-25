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

### 4. Nach dem Deploy: Einstellungen im Dashboard anpassen

- **Auth → URL Configuration**: `site_url` auf die Produktions-URL setzen
- **Project Settings → Edge Functions**: Secrets wie `OPENAI_API_KEY` eintragen

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

