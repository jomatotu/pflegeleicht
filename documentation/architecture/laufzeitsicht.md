# Laufzeitsicht

Diese Laufzeitsicht beschreibt, wie `pflegeleicht.online` den Entlastungsbetrag fuer Nutzer:innen mit Pflegegrad im MVP-Ende-zu-Ende automatisiert.

## Vereinfachtes BPMN Diagramm für die erst Beantragung (MVP End-to-End)


```mermaid
flowchart TB

    subgraph lane["Beantragung"]
        direction TB
        subgraph sublane_one["Nutzer:in"]
            direction LR
            step_u0[Beantragung starten]
            step_u2[Upload Pflegegutachten und Abtretung erklären]
            step_u3[Auswahl der Leistungelemente]
            step_u4[Daten überprüfen und absenden]
            step_u0 --> step_u2 --> step_u3 --> step_u4
        end
        subgraph sublane_two["System"]
            direction LR
            step_s1[Antrag ablegen]
            step_s2[Agentur per Email kontaktieren]
            step_s4[Prozess Ende]
            step_s1 --> step_s2 --> step_s4
        end
        step_u4 --> step_s1
    end
```


## Fachliche Leitplanken

- Das System reduziert Komplexitaet fuer Nutzer:innen auf wenige, leicht verstaendliche Klicks.
- Der Abtretungs- bzw. Handlungsauftrag ist notwendige Voraussetzung fuer die Automatisierung in ihrem Namen.
- Die Plattform verdient an der Differenz zwischen Kassenerstattung und Anbieterkosten; fuer Nutzer:innen bleibt der Prozess kostenfrei.
- Die Laufzeitarchitektur bleibt erweiterbar fuer spaetere Leistungen (z. B. Pflegehilfsmittel, Verhinderungspflege), ohne den MVP-Flow zu verkomplizieren.

