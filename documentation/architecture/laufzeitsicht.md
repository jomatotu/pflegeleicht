# Laufzeitsicht

Diese Laufzeitsicht beschreibt, wie `pflegeleicht.online` den Entlastungsbetrag fuer Nutzer:innen mit Pflegegrad im MVP-Ende-zu-Ende automatisiert.

## Zielbild MVP

- Fokus auf einer standardisierbaren Leistung: `Entlastungsbetrag` (131 EUR pro Monat).
- Nutzer:innen laden einmalig den Pflegegrad-Nachweis hoch, waehlen eine Leistung und muessen den restlichen Prozess nicht selbst verstehen oder steuern.
- Die Plattform uebernimmt im Hintergrund Vermittlung, Terminierung, Abrechnung und Erstattungsprozess.

## Vereinfachtes BPMN Diagramm für die erst Beantragung (MVP End-to-End)


```mermaid
flowchart TB

    subgraph lane["Beantragung"]
        direction TB
        subgraph sublane_one["Nutzer:in"]
            direction LR
            step_u0[User: Beantragung starten]
            step_u2[User: Upload Pflegegutachten]
            step_u4[Daten überprüfen und Abtretung erklären]
            step_u6[Daten absenden]
            step_u0 --> step_u2 --> step_u4 --> step_u6
        end
        subgraph sublane_two["System"]
            direction LR
            step_s1[Antrag ablegen]
            step_s2[Agentur per (Email) kontaktieren]
            step_s3[Email archivieren]
            step_s4[Prozess Ende]
            step_s1 --> step_s2 --> step_s3 --> step_s4
        end
        step_u6 --> step_s1
    end
```


## Zentrale Laufzeit-Zustaende

Der Fachfall durchlaeuft fuer den MVP mindestens folgende Zustaende:

1. `onboarding_started`: Nutzerprozess begonnen.
2. `proof_uploaded`: Nachweis und Einwilligung eingereicht.
3. `proof_verified`: Pflegegrad geprueft, Daten extrahiert.
4. `service_selected`: Leistung ausgewaehlt.
5. `profile_confirmed`: Stammdaten final bestaetigt.
6. `provider_assigned`: Anbieter angefragt/zugeordnet.
7. `service_completed`: Leistung erbracht.
8. `reimbursement_submitted`: Antrag an Kasse gestellt.
9. `reimbursement_received`: Erstattung eingegangen.

## Fachliche Leitplanken

- Das System reduziert Komplexitaet fuer Nutzer:innen auf wenige, leicht verstaendliche Klicks.
- Der Abtretungs- bzw. Handlungsauftrag ist notwendige Voraussetzung fuer die Automatisierung in ihrem Namen.
- Die Plattform verdient an der Differenz zwischen Kassenerstattung und Anbieterkosten; fuer Nutzer:innen bleibt der Prozess kostenfrei.
- Die Laufzeitarchitektur bleibt erweiterbar fuer spaetere Leistungen (z. B. Pflegehilfsmittel, Verhinderungspflege), ohne den MVP-Flow zu verkomplizieren.

