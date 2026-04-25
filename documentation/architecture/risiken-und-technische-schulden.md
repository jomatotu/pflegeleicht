# Risiken und technische Schulden (arc42 Abschnitt 11)

Dieses Kapitel bündelt **bekannte Risiken**, **offene technische Punkte** und **bewusst eingegangene technische Schulden** für `pflegeleicht.online`. Es ergänzt [qualitaetskriterien-und-merkmale.md](qualitaetskriterien-und-merkmale.md) (Was soll gut sein?) und [loesungsstrategie.md](loesungsstrategie.md#bewusste-kompromisse-und-grenzen-des-mvp) (Welche Kompromisse sind akzeptiert?).

**Skala:** *W* = Wahrscheinlichkeit, *A* = Auswirkung bei Eintritt — jeweils **niedrig**, **mittel** oder **hoch** (qualitativ, nicht statistisch). Die Bewertung ist MVP-nah und soll bei größerem Umfang oder produktiver Ausrichtung neu abgestimmt werden.

## Risiken

| ID | Risiko | W | A | Kurzbeschreibung | Gegenmaßnahmen / Monitoring |
| --- | --- | --- | --- | --- | --- |
| R-01 | Verwechslung MVP vs. produktiver Betrieb | mittel | hoch | Der MVP ist nicht als produktions- und compliance-reifer Betrieb ausgelegt; echte Gesundheitsdaten sind unzulässig ([architektureinschraenkungen.md](architektureinschraenkungen.md)). Missverständnisse können zu rechtswidriger Verarbeitung oder falschen Sicherheitsannahmen führen. | Klare Kennzeichnung in Umgebung, Onboarding und Deploy-Pipelines; getrennte Konfiguration/Secrets; regelmäßiger Abgleich mit Compliance. |
| R-02 | Fachliche oder regulatorische Fehlinterpretation (SGB XI, Art. 9 DSGVO) | mittel | hoch | Falsche Modellierung von Nachweisen, Fristen, Rollen oder Datenkategorien kann zu nicht nachweisbaren oder unzulässigen Verarbeitungen führen. | Fach- und Datenschutzreview vor produktionsrelevanten Releases; Traceability von Status und Zugriffen ausbauen (siehe offene ADR-Themen). |
| R-03 | Integrität sensibler Daten (Upload, Speicher, API) | mittel | hoch | Pflegegrad-Nachweise und personenbezogene Daten erfordern strikte Trennung extern/intern und minimierte Exposition ([ADR-001](architekturentscheidungen.md), Qualitätsziele in Abschnitt 10). | Threat Modeling für Upload und Speicher; Tests der Autorisierung; keine sensitiven Felder auf `external-API` ohne explizite Notwendigkeit. |
| R-04 | Inkonsistenz zwischen `external-API` und `internal-API` | mittel | mittel | Zwei Pfade erhöhen das Risiko abweichender Validierung oder unterschiedlicher fachlicher Wirkung trotz gemeinsamem Kern ([ADR-001](architekturentscheidungen.md), [ADR-002](architekturentscheidungen.md)). | Fachlogik zentral in der Leistungsverwaltung halten; gemeinsame Tests/Regression gegen OpenAPI; bei Abweichungen ADR oder Qualitätsziele aktualisieren. |
| R-05 | Ausfall oder Degradation von Supabase bzw. Anbieterschnittstellen | niedrig–mittel | mittel | Starke Nutzung der Plattform beschleunigt den MVP, birgt aber Abhängigkeit und weniger Portabilität ([loesungsstrategie.md](loesungsstrategie.md)). | Defensive Timeouts und klare Fehlerantworten ([architektureinschraenkungen.md](architektureinschraenkungen.md)); später: definierte Retry-/Circuit-Breaker-Regeln (offene ADR-Punkte). |
| R-06 | Benachrichtigungen (E-Mail) fehlgeschlagen oder verspätet | mittel | mittel | Nutzer:innen oder Dienstleister erhalten falsches Prozessbild; fachlicher Zustand und Kommunikation laufen auseinander ([ADR-003](architekturentscheidungen.md)). | Idempotenz und Nachvollziehbarkeit der Auslösung; Wiederholungs-/Dead-Letter-Strategie festlegen; Monitoring auf Versandfehler. |
| R-07 | Offene Betriebsthemen (Migrationen, Monitoring, Audit) | hoch | mittel | Noch nicht festgelegte Migrations-, Retry- und Audit-Anforderungen ([architekturentscheidungen.md](architekturentscheidungen.md)) können bei wachsender Last oder Prüfungen zu Überraschungen führen. | ADRs schließen, bevor produktiver Betrieb anvisiert wird; Mindeststandards für Logs und Alarme definieren. |
| R-08 | Drift zwischen OpenAPI-Spezifikation und Implementierung | mittel | mittel | Vertrag und Code weichen auseinander; Clients und Tests prüfen das Falsche ([ADR-005](architekturentscheidungen.md)). | Spezifikation im CI gegen Implementierung prüfen; Änderungen API-first oder mit angepasster Spec mergen. |

## Technische Schulden

Technische Schulden sind hier **bewusst dokumentierte** Abweichungen vom „Idealzustand“ mit grober Einordnung und geplanter oder empfohlener Nacharbeit. Sie hängen teilweise direkt mit den Risiken oben zusammen.

| ID | Schulde / Thema | Begründung (MVP) | Abbau / nächste Schritte |
| --- | --- | --- | --- |
| TD-01 | Querschnittliche Konzepte (Logging, Fehlercodes, Konfiguration) noch nicht in einem Kapitel verdichtet | Fokus auf fachliche Endpunkte und Liefergeschwindigkeit; [querschnittliche-konzepte.md](querschnittliche-konzepte.md) ist bewusst Stub. | Kapitel 8 ausarbeiten; Verweise aus Randbedingungen und Code-Konventionen (`RULES.md`) konsolidieren. |
| TD-02 | Migration, Rollback und Deployment des relationalen Schemas | Noch keine verbindliche Strategie ([architekturentscheidungen.md](architekturentscheidungen.md)). | Versionierte Migrationen, Rollback-Playbook, Abstimmung mit Betrieb vor produktivem Schema. |
| TD-03 | Retry, Circuit Breaker und Grenzen für externe Aufrufe (DB, E-Mail) | Bewusst offen, um den MVP nicht zu blockieren. | ADR mit konkreten Regeln (Timeouts, Wiederholungen, Idempotenz-Keys); Last- und Chaos-Tests nach Bedarf. |
| TD-04 | Monitoring und Audit für administrative Prozesse | Anforderungen noch nicht fixiert. | Mindestkatalog (wer darf was, welche Ereignisse protokollieren); Anbindung an Betriebs-Tools. |
| TD-05 | Doppelte API-Oberflächen (`external` / `internal`) | Akzeptierter Kompromiss für Sicherheit und Verträge ([loesungsstrategie.md](loesungsstrategie.md)). | Gemeinsame Validierungs-/Mapping-Schichten oder generierte Anteile prüfen, Duplikat reduzieren ohne Trennung aufzuweichen. |
| TD-06 | Anbieterkopplung Supabase | Bewusste Wahl für Geschwindigkeit ([ADR-004](architekturentscheidungen.md)). | Abstraktion nur dort, wo Wechsel realistisch ist; Datenexport und dokumentierte Abhängigkeiten pflegen. |

## Pflege dieses Kapitels

- Bei **Architektur- oder Compliance-Änderungen** Risiken und Schulden prüfen; bei neuen ADRs Verweise und ggf. Bewertungen anpassen.
- Vor **Übergang zu produktivem Betrieb** die Einträge mit niedriger Auswirkung im MVP erneut bewerten (viele können sich auf **hoch** verschieben).
- Verknüpfungen: [architekturentscheidungen.md](architekturentscheidungen.md), [architektureinschraenkungen.md](architektureinschraenkungen.md), [qualitaetskriterien-und-merkmale.md](qualitaetskriterien-und-merkmale.md).
