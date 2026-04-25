# Glossar (arc42 Abschnitt 12)

Zentrale **Fach-** und **Systembegriffe** von `pflegeleicht.online`. Kurzdefinitionen dienen der einheitlichen Sprache in der Architekturdokumentation; rechtsverbindliche Auslegungen (z. B. Sozialrecht, Datenschutz) liegen bei Fach- und Compliance-Verantwortlichen.

---

## Fachliche Begriffe

| Begriff | Erklärung |
| --- | --- |
| **Abrechnung / Erstattung** | Im MVP-Zielbild übernimmt die Plattform im Hintergrund mit Kasse und Anbietern verbundene Schritte; im Glossar als Oberbegriff für den ökonomischen Abschluss des Entlastungsbetrags ([README](README.md#zielbild-mvp)). |
| **Abtretung** | Erklärung der Nutzer:in, mit der die weitere Abwicklung (z. B. Kontaktaufnahme mit Dienstleistungsagentur, Abrechnung) im Namen der Nutzer:in automatisiert werden darf; Voraussetzung für den automatisierten Flow ([laufzeitsicht.md](laufzeitsicht.md)). |
| **Antrag** | Fachlicher Vorgang der Beantragung einer Leistung über die Plattform; wird persistent abgelegt und löst nachgelagerte Systemschritte aus ([laufzeitsicht.md](laufzeitsicht.md)). |
| **CustomerService** | Personen oder Organisationseinheit, die sich im Kontextdiagramm um **Nutzer:innen-Anfragen** kümmern und mit dem System arbeiten ([kontext-diagramm.md](kontext-diagramm.md)). |
| **Dienstleistungsagentur** | Externe Leistungserbringende (z. B. ambulante Dienste), die über das System informiert und in den Prozess eingebunden werden (Benachrichtigung, Koordination); in Kontext- und Laufzeitdiagrammen so bezeichnet ([kontext-diagramm.md](kontext-diagramm.md), [laufzeitsicht.md](laufzeitsicht.md)). |
| **Entlastungsbetrag** | Gesetzlich gerahmte, im MVP fokussierte **monatliche Pauschale** (im Zielbild 131 EUR), über die Nutzer:innen mit Pflegegrad Leistungen beziehen können, ohne den gesamten Kassen- und Abrechnungsprozess selbst steuern zu müssen ([README](README.md#zielbild-mvp)). |
| **Handlungsauftrag** | Synonym oder nahe Verwandtes zur **Abtretung** im Sinne der Leitplanken: rechtliche/organisatorische Einwilligung zur Vertretung im Prozess ([laufzeitsicht.md](laufzeitsicht.md)). |
| **Leistung / Leistungselement** | Konkret wählbare oder abrechenbare Einheit im Rahmen des Entlastungsbetrags; die **Leistungsverwaltung** bildet die fachlichen Regeln und Zustände dazu softwareseitig ab ([bausteinsicht.md](bausteinsicht.md)). |
| **Nutzer:in** | Pflegebedürftige Person oder deren Angehörige im Sinne des externen Endkunden-Flows; interagiert mit dem **external-Frontend** ([kontext-diagramm.md](kontext-diagramm.md)). |
| **Pflegegrad-Nachweis** | Nachweis über den anerkannten Pflegegrad (z. B. Bescheid, Gutachten); im UI-Text auch „Pflegegutachten“; wird im MVP hochgeladen und sicher verwaltet ([README](README.md#zielbild-mvp), [verteilungssicht.md](verteilungssicht.md)). |

---

## System- und Architekturbegriffe

| Begriff | Erklärung |
| --- | --- |
| **Admin-Modul** | Softwarebaustein hinter der **internal-API** für administrative Funktionen und Systempflege ([bausteinsicht.md](bausteinsicht.md)). |
| **Administrator:in** | Rolle im Kontext, die das System administriert (interne Oberfläche) ([kontext-diagramm.md](kontext-diagramm.md)). |
| **ADR** | *Architecture Decision Record* — dokumentierte Architekturentscheidung; im Projekt in [architekturentscheidungen.md](architekturentscheidungen.md) geführt. |
| **arc42** | Template für Architekturdokumentation; die Abschnitte 1–12 sind in diesem Ordner aufgeteilt bzw. im [README](README.md) verlinkt. |
| **Benachrichtigungsmodul** | Baustein, der E-Mails über den externen **E-Mail-Dienst** (z. B. Resend) auslöst; von der Leistungsverwaltung getriggert, fachlich entkoppelt ([bausteinsicht.md](bausteinsicht.md), [architekturentscheidungen.md](architekturentscheidungen.md)). |
| **CustomerCare-Modul** | Fachlicher Baustein für **CustomerService**-Prozesse; spricht über die internal-API mit der Leistungsverwaltung ([bausteinsicht.md](bausteinsicht.md)). |
| **Edge Function** | Serverseitige Funktion in der **Supabase**-Laufzeit; im Projekt u. a. **`process-antrag`** für Orchestrierung (Validierung, Speicher, E-Mail) ([verteilungssicht.md](verteilungssicht.md), [loesungsstrategie.md](loesungsstrategie.md)). |
| **external-API** / **internal-API** | Zwei getrennte HTTP-Schnittstellen: erste für externe Nutzer:innen-Frontends, zweite für interne Rollen; unterschiedliche Verträge und Berechtigungen ([architekturentscheidungen.md](architekturentscheidungen.md)). |
| **external-Frontend** / **internal-Frontend** | Zwei Web-Oberflächen (React-SPA): Einstieg für **Nutzer:innen** bzw. für **interne Rollen** ([bausteinsicht.md](bausteinsicht.md)). |
| **JSON** | Austauschformat der REST-APIs ([architekturentscheidungen.md](architekturentscheidungen.md)). |
| **Leistungsverwaltung** | Zentraler fachlicher Kern: Regeln, Status und Anbindung von Benachrichtigung und Persistenz ([bausteinsicht.md](bausteinsicht.md), [architekturentscheidungen.md](architekturentscheidungen.md)). |
| **MVP** | *Minimum Viable Product* — abgegrenzte erste Ausbaustufe; in den Randbedingungen **nicht** als vollständig produktions- und compliance-reifer Betrieb ausgelegt ([architektureinschraenkungen.md](architektureinschraenkungen.md)). |
| **OpenAPI** | Maschinenlesbare API-Beschreibung; Vertrag zwischen Frontend und Backend ([architekturentscheidungen.md](architekturentscheidungen.md)). |
| **Persistenzschicht** | Kapselung der Zugriffe auf die **Datenbank** (Lesen/Schreiben) ([bausteinsicht.md](bausteinsicht.md)). |
| **PostgREST** | Von Supabase genutztes API-Gateway über relationale Tabellen (REST/RPC) ([verteilungssicht.md](verteilungssicht.md)). |
| **process-antrag** | Name der Edge Function, die den serverseitigen Antrags-Flow bündelt ([verteilungssicht.md](verteilungssicht.md)). |
| **Resend** | Externer E-Mail-Dienst (HTTPS-API) für ausgehende Benachrichtigungen ([verteilungssicht.md](verteilungssicht.md)). |
| **REST** | Architekturstil der HTTP-APIs ([architekturentscheidungen.md](architekturentscheidungen.md)). |
| **SPA** | *Single Page Application* — das Web-Frontend als eine Seite mit clientseitiger Navigation (React, Vite) ([loesungsstrategie.md](loesungsstrategie.md), [verteilungssicht.md](verteilungssicht.md)). |
| **Storage (Bucket `bescheide`)** | Objektspeicher in Supabase für PDF-Uploads der Nachweise ([verteilungssicht.md](verteilungssicht.md)). |
| **Supabase** | Gewählte Backend-Plattform (PostgreSQL, API, Storage, Edge Functions, optional Auth) ([architekturentscheidungen.md](architekturentscheidungen.md), [verteilungssicht.md](verteilungssicht.md)). |
| **Vite** | Build-Tool und Dev-Server für das Web-Frontend ([verteilungssicht.md](verteilungssicht.md)). |

---

## Abgrenzung verwandter Begriffe

- **CustomerService** (Rolle / Organisation) bezeichnet die menschliche Unterstützung von Nutzer:innen; das **CustomerCare-Modul** ist der zugehörige Softwarebaustein hinter der internal-API.
- **Dienstleistungsagentur** bezeichnet in der Architekturdokumentation externe Leistungserbringende; die rechtliche Rolle im Einzelfall ist fachlich zu klären.
- **external-API** und **internal-API** sind beides REST/JSON-Oberflächen, unterscheiden sich aber in **Zielgruppe**, **Autorisierung** und **Datenumfang** — nicht nur unterschiedliche URLs.

## Verweise

- Randbedingungen und regulatorischer Kontext (u. a. DSGVO, SGB XI): [architektureinschraenkungen.md](architektureinschraenkungen.md)
- Qualitätsbegriffe (ISO/IEC 25010): [qualitaetskriterien-und-merkmale.md](qualitaetskriterien-und-merkmale.md)
