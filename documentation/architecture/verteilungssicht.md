# Verteilungssicht (arc42 Abschnitt 7)

Diese Verteilungssicht beschreibt, **wo** die Bausteine von `pflegeleicht.online` zur Laufzeit liegen und wie sie in den Umgebungen **lokal** (Entwicklung) und **gehostet** (Supabase-Cloud, MVP) miteinander verbunden sind. Sie ergänzt [Bausteinsicht](bausteinsicht.md) und [Kontextdiagramm](kontext-diagramm.md).

## Zielumgebungen

| Umgebung | Zweck | Kurzbeschreibung |
|----------|--------|------------------|
| **Lokal** | Entwicklung und Demos auf dem Rechner | Docker-basierter Supabase-Stack (`npx supabase start`), Vite-Dev-Server für das Web-Frontend |
| **Gehostet (MVP)** | gemeinsames Backend / APIs in der Cloud | Ein Projekt bei [Supabase](https://supabase.com): verwaltete PostgreSQL-Datenbank, REST/RPC-API, Storage, Edge Functions |

Das **Web-Frontend** wird lokal mit Vite unter `http://localhost:5173` gestartet; ein konkretes Produktions-Hosting (CDN, Domain, CI/CD) ist im Repository **nicht** festgeschrieben. Für den produktiven Betrieb wäre üblich: statische Auslieferung des Vite-Builds (`npm run build` im Ordner `frontend/`) plus Konfiguration der Supabase-Projekt-URL und des öffentlichen Anon-Keys in der Client-Umgebung.

## Verteilungsdiagramm (logisch)

```mermaid
flowchart TB
    subgraph clients["Clients"]
        browser["Browser\n(Web-Frontend)"]
        ocr["OCR (optional)\nim Browser\n(nur external-Frontend)"]
    end

    browser -.->|"lädt Bibliothek,\nverarbeitet Datei lokal"| ocr

    subgraph optional_host["Frontend-Auslieferung (MVP nicht festgelegt)"]
        static["Statische Assets\n(z. B. CDN / Webhosting)"]
    end

    subgraph supabase_cloud["Supabase-Projekt (Cloud)"]
        api["PostgREST / API-Gateway"]
        fn["Edge Function\n(process-antrag)"]
        fn_extract["Edge Function\n(extract-info)"]
        storage["Object Storage\n(Bucket bescheide)"]
        pg[("PostgreSQL")]
        auth["Auth-Dienst\n(falls genutzt)"]
    end

    subgraph external["Externe Dienste"]
        resend["Resend\n(E-Mail-API)"]
        openrouter["OpenRouter\n(LLM-API)"]
    end

    browser -->|"HTTPS\nREST, Storage, Functions"| api
    browser -->|"HTTPS\nmultipart/form-data"| fn
    browser -->|"HTTPS\nJSON (text)"| fn_extract
    browser -.->|"optional: gleiche Origin wie SPA"| static
    static -.-> browser
    api --> pg
    fn --> pg
    fn --> storage
    fn -->|"HTTPS\nREST"| resend
    fn_extract -->|"HTTPS\nREST"| openrouter
    auth -.->|"falls im Flow"| browser
```

In der **lokalen** Variante entspricht der Block „Supabase-Projekt“ dem per Docker gestarteten Stack (andere Hostnamen und Ports, siehe unten); die Rolle der Komponenten bleibt gleich.

## Knoten und Artefakte

- **Web-Frontend:** React-SPA (Vite), Bausteine `external-frontend` / `internal-frontend` aus der Bausteinsicht; spricht per HTTPS mit dem Supabase-Projekt (API, Storage, Edge Functions).
- **Clientseitige OCR:** Texterkennung für Nachweisdokumente läuft als Teil des **external-frontend** im **Browser** (typischerweise JavaScript/WebAssembly); es entsteht **kein zusätzlicher Zugriffspfad** über Supabase allein für OCR — die Bibliothek wird mit der SPA ausgeliefert und arbeitet auf der Datei des Nutzers/der Nutzerin lokal, bis der reguläre Upload- bzw. Antragsweg (z. B. Edge Function) folgt (Begründung: ADR-006). Der erkannte Text kann optional an **`extract-info`** gesendet werden (**LLM** über **OpenRouter**, ADR-007).
- **Supabase API:** öffentlich erreichbar unter `https://<project-ref>.supabase.co` (exakter Host aus Dashboard bzw. nach `npx supabase link`, siehe [README.md](../../README.md)).
- **Edge Function `process-antrag`:** läuft in der Supabase-Functions-Laufzeit; Endpunkt `POST .../functions/v1/process-antrag`; Zugriff auf Datenbank, privaten Storage-Bucket und E-Mail-Versand.
- **Edge Function `extract-info`:** Endpunkt `POST .../functions/v1/extract-info`; nimmt Freitext entgegen und ruft **OpenRouter** zur **LLM-Extraktion** auf; kein Speichern des Antrags (reine Hilfsfunktion). Secret im Dashboard: `OPENROUTER_API_KEY`; Modellwahl siehe Implementierung und [README.md](../../README.md).
- **PostgreSQL:** verwaltete Instanz im Supabase-Projekt; Schema über Migrationen unter `supabase/migrations/`.
- **Storage:** Bucket `bescheide` für PDF-Uploads (siehe README / Migrationen).
- **E-Mail:** ausgehender Versand über **Resend** (HTTPS-API; Secret im Dashboard: `RESEND_API_KEY`).
- **OpenRouter:** externe **LLM-API** (`https://openrouter.ai/api/v1/chat/completions`); im MVP für strukturierte Extraktion aus Freitext. **Hinweis DSGVO:** je nach Modell und Anbieterketten können personenbezogene Inhalte außerhalb der vollen Kontrolle des Betreibers verarbeitet werden — für produktive Nutzung sind Verträge, Transparenz und ggf. **lokales LLM** abzustimmen (ADR-007, [Architektureinschraenkungen](architektureinschraenkungen.md)).

Geheimnisse und umgebungsspezifische Werte liegen **nicht** im Repository; sie werden lokal (`.env` / CLI) bzw. im Supabase-Dashboard gepflegt.

## Lokale Verteilung (Entwicklung)

| Baustein | Typische URL / Port | Hinweis |
|----------|---------------------|---------|
| Web-Frontend (Vite) | `http://localhost:5173` | `cd frontend && npm run dev` |
| Supabase API | `http://127.0.0.1:54321` | aus `supabase/config.toml` |
| PostgreSQL | Port `54322` (localhost) | nur aus dem Entwicklernetzwerk / Docker |
| Supabase Studio | `http://127.0.0.1:54323` | Admin-Oberfläche für lokales Projekt |

## Gehostete Verteilung (MVP)

- **Datenbank und API:** `npx supabase db push` spielt Migrationen auf die Remote-Datenbank des verknüpften Projekts (Project-Ref im Dashboard bzw. `supabase link`, siehe README).
- **Edge Functions:** `npx supabase functions deploy process-antrag` bzw. `npx supabase functions deploy extract-info` deployen die Functions in dieselbe Supabase-Region wie das Projekt.
- **Nach dem Deploy:** u. a. Auth-`site_url` und Edge-Function-Secrets im Dashboard setzen (siehe README).

## Netzwerk- und Zugriffspfade

- **OCR im Browser:** Solange die gewählte OCR-Bibliothek **ohne** Aufruf externer Cloud-Dienste auskommt, geht für die Texterkennung **kein** zusätzlicher HTTPS-Pfad über die in diesem Dokument beschriebenen Kanäle hinaus; weicht die konkrete Bibliothek davon ab (z. B. SaaS-OCR), ist das gesondert zu betreiben und im [Architekturentscheidungslog](architekturentscheidungen.md) zu dokumentieren. **LLM-Extraktion:** Sobald `extract-info` genutzt wird, besteht zusätzlich der Pfad **Edge Function → OpenRouter** (HTTPS); bei Wechsel auf **lokales LLM** entfällt der Aufruf nach außen zugunsten intern kontrollierter Endpunkte (ADR-007).
- **Browser → Supabase:** TLS (HTTPS); Authentifizierung gegenüber der API typischerweise mit dem öffentlichen `anon`-Key des Projekts (nur im Client konfigurieren, was öffentlich sein darf).
- **Edge Function → Datenbank / Storage:** innerhalb der Supabase-Plattform; keine direkte Exposition der Datenbank ans öffentliche Internet für Client-Zugriffe außerhalb des Supabase-Gateways.
- **Edge Function → Resend:** ausgehende HTTPS-Verbindung zur Resend-API (`https://api.resend.com`); Empfänger und Absender laut Umgebungsvariablen/Secrets.
- **Edge Function `extract-info` → OpenRouter:** ausgehende HTTPS-Verbindung zur OpenRouter-API; Request enthält System-/User-Messages mit dem zu extrahierenden Text; Antwort wird serverseitig geparst und als JSON an den Client zurückgegeben.

## Abgrenzung und Annahmen

- **Infrastruktur jenseits von Supabase** (DNS, CDN, WAF, Monitoring) ist für das MVP nicht im Code beschrieben und kann bei produktivem Betrieb ergänzt werden.
- Die Zuordnung **welches Frontend** (extern/intern) auf welcher URL liegt, ist eine Deployment- und Routing-Entscheidung; technisch können es eine oder mehrere SPA-Builds sein.

## Verweise

- Entwicklung und Deploy-Schritte: [README.md](../../README.md)
- Bausteine und Schichten: [Bausteinsicht](bausteinsicht.md)
- Clientseitige OCR und LLM-Extraktion: [Architekturentscheidungen](architekturentscheidungen.md) (ADR-006, ADR-007), [Laufzeitsicht](laufzeitsicht.md)
- Randbedingungen (u. a. Datenregion, MVP): [Architektureinschränkungen](architektureinschraenkungen.md)
