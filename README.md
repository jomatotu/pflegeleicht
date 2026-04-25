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

### Kurzübersicht

```bash
# Einmalig im Root-Verzeichnis
npm install
npx supabase start

# Frontend (in einem neuen Terminal)
cd frontend && npm install && npm run dev
```

