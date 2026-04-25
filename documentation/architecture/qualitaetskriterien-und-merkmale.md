# Qualitätsmerkmale und Qualitätsziele

Dieses Dokument fasst die wesentlichen **Qualitätsmerkmale** (nach ISO/IEC 25010) und zugehörige **Qualitätsziele** für `pflegeleicht.online` zusammen. Es ergänzt die Architektursichten um bewertbare Ziele für MVP und Weiterentwicklung.

Hinweis: Laufzeitabläufe sind in [Laufzeitsicht](laufzeitsicht.md), Bausteine in [Bausteinsicht](bausteinsicht.md) beschrieben.

## Top 3 Qualitätsmerkmale

Die folgende Tabelle fasst die für das MVP **hoch priorisierten** ISO/IEC-25010-Merkmale zusammen und begründet die Priorität im Kontext Entlastungsbetrag und sensibler Gesundheitsdaten.

| Qualitätsmerkmal (ISO/IEC 25010) | Kurzbeschreibung | Relevanz für pflegeleicht.online |
| --- | --- | --- |
| Funktionale Eignung | Vollständigkeit und Korrektheit der fachlichen Abläufe | **Hoch:** Antrag, Abtretung, Abrechnung und Erstattung müssen fachlich korrekt und nachvollziehbar sein. |
| Benutzbarkeit (Gebrauchstauglichkeit) | Einfachheit, Lernbarkeit, Barrierearmut | **Hoch:** Wenige, verständliche Schritte (siehe Leitplanken in [Laufzeitsicht](laufzeitsicht.md)). |
| Sicherheit | Vertraulichkeit, Integrität, Nachweisbarkeit | **Hoch:** Pflegegrad-Nachweise und personenbezogene Daten; Rollen- und API-Trennung (siehe ADR-001). |

## Qualitätsziele

Qualitätsziele konkretisieren die Merkmale in **prüfbare** Anforderungen.

| Qualitätsmerkmal | Qualitätskriterium | Prüfhinweis / Indikator |
| --- | --- | --- |
| Funktionale Eignung | End-to-End-Flow Entlastungsbetrag ist ohne manuelle Workarounds für definierte Standardfälle abschließbar. | Testfälle aus fachlichem Happy Path; Statusübergänge konsistent. |
| Funktionale Eignung | Fachregeln der `Leistungsverwaltung` sind für externe und interne Aufrufer identisch wirkend (keine widersprüchlichen Zustände). | Regressionstests API/Modul; Abgleich mit OpenAPI-Vertrag. |
| Benutzbarkeit | Kernfluss lässt sich mit klar benannten Schritten und Hilfetexten ohne Fachjargon zum Entlastungsbetrag absolvieren. | UX-Review / Nutzertests; Abbruchquoten beobachten. |
| Sicherheit | Zugriff auf interne Funktionen nur über `internal-API` und passende Rollen; keine sensitiven Daten in externen Endpunkten ohne Not. | Autorisierungstests; Threat Modeling für Upload und Speicherung. |
| Sicherheit | Gesundheits- und identitätsnahe Daten werden transport- und speicherseitig nach Projektstandard geschützt. | Checkliste Verschlüsselung, Zugriffskontrolle, Datenminimierung. |

## Stakeholder und Schwerpunkte

| Stakeholder-Gruppe | Primäre Qualitätsmerkmale | Kurzbegründung |
| --- | --- | --- |
| Nutzer:innen | Benutzbarkeit, funktionale Eignung, Sicherheit | Vertrauen und einfacher Abschluss ohne Büro-Kenntnis. |
| Dienstleistungsagentur | Funktionale Eignung, Sicherheit | Nachvollziehbare Anbindung über Benachrichtigungen und klarer Informationsfluss. |
| CustomerCare / Admin | Sicherheit, funktionale Eignung | Effiziente Bearbeitung mit minimiertem Datenrisiko. |
| Betrieb / Entwicklung | Funktionale Eignung, Sicherheit | Nachvollziehbare Fehler und belastbare Abläufe. |

## Leitplanken für Priorisierung

- Kernqualität hat Vorrang vor Feature-Umfang: lieber schmaler MVP mit belastbaren Kernfachabläufen und Sicherheit als mehr Oberflächen bei unscharfen End-to-End-Garantien.
- Messgrößen (Schwellwerte, Dashboards, Alarme) werden mit wachsender Nutzung und Betrieb ausgebaut und an den Zielen ausgerichtet.
- Änderungen an ADRs (siehe [Architekturentscheidungen](architekturentscheidungen.md)) sollen diese Tabelle bei Bedarf mitaktualisieren, damit Qualität und Architektur zusammenbleiben.
