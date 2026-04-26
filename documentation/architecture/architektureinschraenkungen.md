# Architektureinschränkungen

Dieses Dokument fasst verbindliche Grenzen und Rahmenbedingungen für `pflegeleicht.online` zusammen. Sie ergeben sich aus dem MVP-Zielbild, aus getroffenen Architekturentscheidungen und aus typischen Anforderungen an ein System mit personenbezogenen und gesundheitsnahen Daten. Abweichungen bedürfen einer bewussten Entscheidung und sollten in [Architekturentscheidungen](architekturentscheidungen.md) nachvollziehbar festgehalten werden.

## Fachlicher und produktiver Rahmen (MVP)

- **Leistungsfokus:** Der MVP priorisiert eine standardisierbare Leistung (Entlastungsbetrag) und einen klar gefassten Nutzungsablauf. Erweiterungen auf weitere Leistungen oder Prozesse sind nicht implizit vorgesehen, solange sie hier nicht explizit aufgenommen werden.
- **Nicht produktiv:** Der MVP dient ausschließlich der Präsentation und der fachlichen Validierung der Funktionen, nicht dem produktiven Betrieb; er erfüllt daher nicht die Anforderungen eines produktivtauglichen, compliance-konformen Betriebs. Echte Gesundheits- oder Pflegedaten Betroffener dürfen in dieser Umgebung nicht verarbeitet werden (weder Eingabe, Übermittlung noch Speicherung). Zulässig und vorgesehen sind ausschließlich anonymisierte oder eindeutig fiktive Beispieldaten.


## Sicherheit und Datenschutz

- **Keine Secrets im Quelltext oder in öffentlicher Dokumentation:** Zugangsdaten, Schlüssel und Tokens gehören in sichere Konfiguration oder Geheimnisverwaltung der Umgebung, nicht in Repositories oder Client-Bundles.
- **Minimierung und Zweckbindung:** Zugriff auf personenbezogene Daten ist auf Rollen, Prozesse und Datenfelder zu beschränken, die für den jeweiligen Zweck erforderlich sind (insbesondere bei internen vs. externen Oberflächen).
- **Nachvollziehbarkeit:** Sicherheits- und datenschutzrelevante Änderungen (Autorisierung, Speicherdauer, Schnittstellen zu Dritten) sollen nachvollziehbar dokumentiert oder als Architekturentscheidung geführt werden, sobald konkrete Anforderungen feststehen.

## Compliance

- **DSGVO und Gesundheitsdaten:** Die Verarbeitung unterliegt der Datenschutz-Grundverordnung (DSGVO). Es handelt sich um besondere Kategorien personenbezogener Daten im Sinne von Art. 9 DSGVO, insbesondere um Gesundheitsdaten; daraus folgen verschärfte Anforderungen an Rechtsgrundlagen, Zweckbindung, technische und organisatorische Maßnahmen sowie Betroffenenrechte, die Architektur und Betrieb widerspruchsfrei unterstützen müssen.
- **SGB XI (Soziale Pflegeversicherung):** Die für den Leistungs- und Pflegekontext maßgeblichen Vorgaben des **Elften Buches Sozialgesetzbuch (SGB XI)** sind einzuhalten; davon ausgehende fachliche Regeln (z. B. zu Leistungen, Nachweisen, Melde- und Dokumentationspflichten, soweit anwendbar) sind vor Implementierung mit Fach- und Compliance abzustimmen.
- **Umsetzbarkeit regulatorischer Vorgaben:** Architektur, Datenflüsse und Schnittstellen müssen so gestaltet sein, dass festgelegte Rechtsgrundlagen, Zweckbindung, Betroffenenrechte und dokumentationspflichtige Prozesse (z. B. Verzeichnis von Verarbeitungstätigkeiten, Auftragsverarbeitung) technisch abbildbar bleiben. Konkrete Rechtsbewertungen und Texte liegen bei Datenschutz- und Fachverantwortlichen; die Technik liefert die dafür nötigen Schaltstellen und Nachweise nach Maßgabe dieser Vorgaben.
- **Auftragsverarbeitung und Unterauftragsnehmer:** Jede neue oder geänderte Einbindung von Diensten mit Zugriff auf personenbezogene oder besonders schützenswerte Daten (z. B. Hosting — im Projekt u. a. **Netlify** für das statische Frontend samt CDN —, E-Mail, Analytik) ist nur mit vertraglicher und organisatorischer Abdeckung zulässig; die Architektur vermeidet „Schatten-Integrationen“ ohne abgestimmte Datenverarbeitung. **LLM-Extraktion über OpenRouter:** Sobald **Freitext mit personenbezogenen Inhalten** an gebündelte Modellanbieter gesendet wird, sind **Rechtsgrundlage**, **Weisungsrecht**, **TOM** und die Kette der **Unterauftragsnehmer** (inkl. ggf. Modell-Hosting in Drittländern) explizit zu klären; der MVP nutzt OpenRouter bewusst als **Entwicklungsbeschleuniger** — für produktive Verarbeitung besonders schützenswerter Daten ist ein **lokales LLM** oder gleichwertig kontrollierbare Verarbeitung vorgesehen (ADR-007, [Verteilungssicht](verteilungssicht.md)).
- **Region und Datenübermittlung:** Speicherorte und Übermittlungen personenbezogener Daten richten sich nach den vom Unternehmen festgelegten Vorgaben (z. B. Verbleib in der EU/EG oder zulässige Übermittlungsinstrumente). Technische Konfiguration (Regionen, Verschlüsselung, Zugriffspfade) muss diese Vorgaben widerspruchsfrei unterstützen.
- **Gesundheits- und pflegenahe Inhalte:** Wo Gesundheits- oder Pflegebezug in Daten oder Prozessen liegt, sind Vorgaben zu Sensibilität, Zugriffskontrolle und Nachweisbarkeit strikter zu behandeln als bei rein administrativen Systemen; fachliche Klassifikation von Datenarten und Aufbewahrungsfristen ist vor Implementierung mit Compliance abzustimmen.
- **Nachweis und Prüfbarkeit:** Wo gesetzlich oder vertraglich gefordert, müssen Abläufe (Einwilligungen, Zugriffe, Löschungen, Meldewege) nachvollziehbar abbildbar sein; dafür vorgesehene Protokoll- und Exportmechanismen dürfen nicht durch Ad-hoc-Umgehung der fachlichen Schichten unterlaufen werden.
- **Barrierefreiheit:** Nutzeroberflächen und digitale Angebote sind so zu planen, dass einschlägige Barrierefreiheitsvorgaben technisch umsetzbar und nachweisbar bleiben. Je nach Träger, Zielgruppe und Markteintritt können insbesondere die **Barrierefreie-Informationstechnik-Verordnung (BITV 2.0)** als Umsetzung der **EU-Richtlinie 2016/2102** (Barrierefreiheit der Websites und mobilen Anwendungen öffentlicher Stellen), **§ 12a des Behindertengleichstellungsgesetzes (BGG)** sowie das **Barrierefreiheitsstärkungsgesetz (BFSG)** als nationale Umsetzung der Verordnung **(EU) 2019/882** (Europäischer Barrierefreiheitsakt, **EAA**) für bestimmte Produkte und Dienstleistungen einschlägig sein. Konformitätsziele (z. B. **WCAG 2.x**, **EN 301 549**) und Prüf-/Erklärungswege sind mit Fach- und Compliance abzustimmen; Architektur und Frontend vermeiden bewusst Entscheidungen, die assistive Technologien oder etablierte Bedien- und Wahrnehmungshilfen ausschließen.

## Betrieb und Qualität

- **Fehlerbehandlung:** Externe Abhängigkeiten (Datenbank, E-Mail) erfordern definierte Fehler- und Wiederholungsstrategien; bis diese festgelegt sind, sind defensive Timeouts, klare Fehlerantworten und keine stillen Teilzustände zu bevorzugen.
- **Beobachtbarkeit:** Für den produktiven Betrieb sind grundlegende Protokollierung und nachvollziehbare Betriebskonventionen vorgesehen; konkrete Monitoring- und Audit-Anforderungen sind noch offen und können zusätzliche Einschränkungen nach sich ziehen.

## Bewusst offen

Die folgenden Punkte sind in [Architekturentscheidungen](architekturentscheidungen.md) als offen geführt und werden hier nicht vorweggenommen, können aber künftig verbindliche Einschränkungen ergänzen:

- Migrations- und Deployment-Strategie für das relationale Schema.
- Detaillierte Retry- und Circuit-Breaker-Regeln für externe Aufrufe.
- Monitoring- und Audit-Anforderungen für administrative Abläufe.
