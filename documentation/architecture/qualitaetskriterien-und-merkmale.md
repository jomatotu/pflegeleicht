# Qualitaetsmerkmale und Qualitaetsziele

Dieses Dokument fasst die wesentlichen **Qualitaetsmerkmale** (nach ISO/IEC 25010) und zugehoerige **Qualitaetsziele** fuer `pflegeleicht.online` zusammen. Es ergaenzt die Architektursichten um bewertbare Ziele fuer MVP und Weiterentwicklung.

Hinweis: Laufzeitablaeufe sind in [laufzeitsicht.md](laufzeitsicht.md), Bausteine in [bausteinsicht.md](bausteinsicht.md) beschrieben.

## Top 3 Qualitaetsmerkmale

Die folgende Tabelle fasst die fuer das MVP **hoch priorisierten** ISO/IEC-25010-Merkmale zusammen und begruendet die Prioritaet im Kontext Entlastungsbetrag und sensibler Gesundheitsdaten.

| Qualitaetsmerkmal (ISO/IEC 25010) | Kurzbeschreibung | Relevanz fuer pflegeleicht.online |
| --- | --- | --- |
| Funktionale Eignung | Vollstaendigkeit und Korrektheit der fachlichen Ablaeufe | **Hoch:** Antrag, Abtretung, Abrechnung und Erstattung muessen fachlich korrekt und nachvollziehbar sein. |
| Benutzbarkeit (Gebrauchstauglichkeit) | Einfachheit, Lernbarkeit, Barrierearmut | **Hoch:** Wenige, verstaendliche Schritte (siehe Leitplanken in [laufzeitsicht.md](laufzeitsicht.md)). |
| Sicherheit | Vertraulichkeit, Integritaet, Nachweisbarkeit | **Hoch:** Pflegegrad-Nachweise und personenbezogene Daten; Rollen- und API-Trennung (siehe ADR-001). |

## Qualitaetsziele

Qualitaetsziele konkretisieren die Merkmale in **pruefbare** Anforderungen.

| Qualitaetsmerkmal | Qualitaetskriterium | Pruefhinweis / Indikator |
| --- | --- | --- |
| Funktionale Eignung | End-to-End-Flow Entlastungsbetrag ist ohne manuelle Workarounds fuer definierte Standardfaelle abschliessbar. | Testfaelle aus fachlichem Happy Path; Statusuebergaenge konsistent. |
| Funktionale Eignung | Fachregeln der `Leistungsverwaltung` sind fuer externe und interne Aufrufer identisch wirkend (keine widerspruechlichen Zustaende). | Regressionstests API/Modul; Abgleich mit OpenAPI-Vertrag. |
| Benutzbarkeit | Kernfluss laesst sich mit klar benannten Schritten und Hilfetexten ohne Fachjargon zum Entlastungsbetrag absolvieren. | UX-Review / Nutzertests; Abbruchquoten beobachten. |
| Sicherheit | Zugriff auf interne Funktionen nur ueber `internal-API` und passende Rollen; keine sensitiven Daten in externen Endpunkten ohne Not. | Autorisierungstests; Threat Modeling fuer Upload und Speicherung. |
| Sicherheit | Gesundheits- und Identitaetsnahe Daten werden transport- und speicherseitig nach Projektstandard geschuetzt. | Checkliste Verschluesselung, Zugriffskontrolle, Datenminimierung. |

## Stakeholder und Schwerpunkte

| Stakeholder-Gruppe | Primaere Qualitaetsmerkmale | Kurzbegruendung |
| --- | --- | --- |
| Nutzer:innen | Benutzbarkeit, funktionale Eignung, Sicherheit | Vertrauen und einfacher Abschluss ohne Buero-Kenntnis. |
| Dienstleistungsagentur | Funktionale Eignung, Sicherheit | Nachvollziehbare Anbindung ueber Benachrichtigungen und klarer Informationsfluss. |
| CustomerCare / Admin | Sicherheit, funktionale Eignung | Effiziente Bearbeitung mit minimiertem Datenrisiko. |
| Betrieb / Entwicklung | Funktionale Eignung, Sicherheit | Nachvollziehbare Fehler und belastbare Ablaeufe. |

## Leitplanken fuer Priorisierung

- Kernqualitaet hat Vorrang vor Feature-Umfang: lieber schmaler MVP mit belastbaren Kernfachablaeufen und Sicherheit als mehr Oberflaechen bei unscharfen End-to-End-Garantien.
- Messgroessen (Schwellwerte, Dashboards, Alarme) werden mit wachsender Nutzung und Betrieb ausgebaut und an den Zielen ausgerichtet.
- Aenderungen an ADRs (siehe [architekturentscheidungen.md](architekturentscheidungen.md)) sollen diese Tabelle bei Bedarf mitaktualisieren, damit Qualitaet und Architektur zusammenbleiben.
