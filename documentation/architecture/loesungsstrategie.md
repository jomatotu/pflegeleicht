# Lösungsstrategie (arc42 Abschnitt 4)

Dieses Kapitel fasst die **übergeordnete Strategie** zusammen: welche Prinzipien fachliche Komplexität reduzieren, wie die Technik diese Ziele stützt und welche **Kompromisse** im MVP bewusst eingegangen werden. Detailierte Randbedingungen stehen in [architektureinschraenkungen.md](architektureinschraenkungen.md), konkrete Entscheidungen in [architekturentscheidungen.md](architekturentscheidungen.md); Ziele und MVP-Ausrichtung sind im [README](README.md#zielbild-mvp) beschrieben.

## Fachliche Strategie

- **Komplexität nach außen abbauen:** Nutzer:innen sollen den Entlastungsbetrag und zugehörige Schritte ohne tiefes Verständnis von Kasse, Agentur oder Abrechnungslogik beantragen können. Der Leitgedanke entspricht den fachlichen Leitplanken in [laufzeitsicht.md](laufzeitsicht.md): wenige, verständliche Interaktionen, klare Rollen des Systems (Antrag anlegen, Dienstleister informieren, Prozess abschließen).
- **Ein klarer MVP-Umfang:** Zuerst eine **standardisierbare Leistung** (Entlastungsbetrag) end-to-end abbilden. Erweiterungen (weitere Leistungen, zusätzliche Prozesse) sollen die bestehende Architektur nicht verkomplizieren, sondern später über denselben fachlichen Kern und getrennte Schnittstellen angebunden werden.
- **Verlässliche Nachvollziehbarkeit:** Fachliche Abläufe sollen für interne Rollen und Audits nachvollziehbar bleiben (Status, Speicherung von Nachweisen, Benachrichtigungen). Das schließt an die Qualitätsziele in [qualitaetskriterien-und-merkmale.md](qualitaetskriterien-und-merkmale.md) an.

## Technische Kernprinzipien

### Zentraler Fachkern mit klarer API-Schicht

- Die **Leistungsverwaltung** bildet den zentralen Ort für fachliche Regeln und Zustände; externe und interne Zugriffe laufen über definierte APIs und sollen **dieselben fachlichen Wirkungen** erzeugen (siehe ADR-002 und Qualitätsziele).
- **Zwei API-Oberflächen** (`external-API` und `internal-API`) trennen Verträge, Berechtigungen und Datenumfang für externe Nutzer:innen versus interne Rollen (ADR-001). Das ist bewusst mehr Implementierungsaufwand, verbessert aber Sicherheit und Anpassbarkeit der Oberflächen.

### Plattformwahl: integriertes Backend für schnelle Lieferfähigkeit

- **Supabase** bündelt relationale Datenhaltung (PostgreSQL), API-Zugang, Speicher für Dateien und serverseitige Logik (Edge Functions) in einer zusammenhängenden Betriebsumgebung (ADR-004). Dadurch entsteht **Liefergeschwindigkeit** für den MVP, allerdings mit **Anbieterkopplung** — eine spätere Migration wäre möglich, aber mit Aufwand; sie ist kein MVP-Ziel.
- Schwergewichtige Schritte (Validierung, Budgetprüfung, PDF in privatem Storage, persistenter Datensatz, **mehrstufiger E-Mail-Versand**) werden als **kohärente serverseitige Einheit** umgesetzt — im Projekt als Edge Function `process-antrag` — statt die gleiche Orchestrierung verteilt im Client zu duplizieren. Das unterstützt Integrität, Geheimnisse serverseitig und konsistente Fehlerbehandlung.

### Schnittstellen und Entkopplung

- Öffentliche und interne Schnittstellen folgen dem vereinbarten **API-Standard** (OpenAPI, REST, JSON, ADR-005), um Verträge zwischen Frontend und Backend stabil und prüfbar zu machen.
- **Benachrichtigungen** sind vom Kern der Leistungsverarbeitung getrennt (ADR-003): die Leistungsverwaltung löst das Benachrichtigungsmodul aus; Kanälerweiterungen (z. B. weitere Medien) sollen primär dort ansetzen, ohne die Fachregeln zu vermischen.

### Frontend

- **Single-Page-Anwendung** (React, Vite) mit **strikter Trennung** von UI und fachlicher Logik: Geschäftsregeln gehören nicht in die Präsentationsschicht, sondern in Backend bzw. gemeinsam vereinbarte API-Verträge (siehe [RULES.md](../../RULES.md)).
- Barrierefreiheit und sensible Daten sind von Anfang an **planungsrelevant** (siehe Randbedingungen); konkrete Konformitätsnachweise sind Sache von UX, Compliance und Test, die Architektur soll aber keine bewussten Barrieren einführen.

## Sicherheit und Daten als Querschnitt (Kurz)

Strategisch gilt: **Minimierung**, **Zweckbindung** und **Trennung extern/intern** vor breiter Datenexposition. Technische Umsetzung (Autorisierung, Row-Level Security, Speicherorte, Verschlüsselung) wird in der Umsetzung und in [architektureinschraenkungen.md](architektureinschraenkungen.md) verankert; Details können in [querschnittliche-konzepte.md](querschnittliche-konzepte.md) ausgebaut werden, sobald das Kapitel gefüllt ist.

## Bewusste Kompromisse und Grenzen des MVP

| Thema | Strategische Entscheidung |
|--------|---------------------------|
| Produktivität | Der MVP ist **nicht** als vollständig compliance- und betriebsreifer Produktionsbetrieb ausgelegt; es dürfen **keine** echten Gesundheitsdaten verarbeitet werden (Randbedingungen). |
| Plattform | **Starke Nutzung von Supabase-Features** beschleunigt die Entwicklung; Portabilität ist zweitrangig. |
| APIs | **Zwei API-Pfade** erhöhen Wartung und Dokumentationspflicht; der Nutzen (Sicherheit, klare Verträge) wird höher bewertet. |
| Betrieb | Themen wie **Migration/Rollback**, **Retry/Circuit-Breaker** für externe Aufrufe und **Monitoring/Audit** sind bewusst **noch offen** und in [architekturentscheidungen.md](architekturentscheidungen.md) dokumentiert — die Strategie ist „erst klare fachliche Endpunkte, dann harte Betriebsregeln“, ohne den MVP unnötig zu blockieren. |

## Zusammenspiel mit anderen arc42-Abschnitten

| Abschnitt | Bezug zur Lösungsstrategie |
|-----------|----------------------------|
| 3 Kontext | Wer mit dem System spricht; externe Dienste (E-Mail, DB) bleiben außerhalb der Systemgrenze. |
| 5 Bausteinsicht | Umsetzung der Schichten und Module (Frontends, APIs, Leistungsverwaltung, Benachrichtigung, Persistenz). |
| 6 Laufzeitsicht | Konkreter Beantragungsablauf im MVP. |
| 7 Verteilungssicht | Wo SPA, Supabase und Dienste zur Laufzeit liegen. |
| 10 Qualität | Messbare Ziele zu Eignung, Bedienbarkeit und Sicherheit. |

## Verweise

- [architekturentscheidungen.md](architekturentscheidungen.md) — ADR-001 bis ADR-005
- [architektureinschraenkungen.md](architektureinschraenkungen.md)
- [bausteinsicht.md](bausteinsicht.md)
- [verteilungssicht.md](verteilungssicht.md)
- [qualitaetskriterien-und-merkmale.md](qualitaetskriterien-und-merkmale.md)
