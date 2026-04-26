# Architektur

Dieser Ordner fasst die Architektur von **pflegeleicht.online** zusammen: wer mit dem System interagiert, aus welchen Bausteinen es besteht, wie Anfragen zur Laufzeit ablaufen, welche Entscheidungen dabei getroffen wurden und welche verbindlichen Einschränkungen gelten.

Zur **Entlastung bei der Datenerfassung** wird Freitext (typischerweise aus **OCR** im Browser) serverseitig per **LLM** in strukturierte Felder überführt; im MVP erfolgt der Modellzugriff über die externe API **OpenRouter** ([Verteilungssicht](verteilungssicht.md)). Geplant ist später ein **lokales LLM**, um DSGVO-Themen (Auftragsverarbeitung, Datenübermittlung, Kontrolle über die Verarbeitung) besser adressieren zu können — siehe [Architekturentscheidungen](architekturentscheidungen.md) (ADR-006, ADR-007).

Das **Web-Frontend** (React/Vite-Build) wird im produktiven Betrieb über **[Netlify](https://www.netlify.com)** ausgeliefert — Hosting der statischen Assets inklusive **globalem CDN** für kurze Ladezeiten; Details in der [Verteilungssicht](verteilungssicht.md).

Der Inhalt dieser Datei entspricht **arc42 Abschnitt 1 — Einleitung und Ziele** (Auflistung in dieser Datei). Die Struktur folgt **arc42**; die nachfolgende Liste verweist auf alle zwölf Abschnitte (eigene Datei oder Inhalt in dieser Datei).

## Zielbild MVP

**MVP** (*Minimum Viable Product*, deutsch sinngemäß minimales tragfähiges Produkt) bezeichnet hier die abgegrenzte erste Ausbaustufe; weiterführende Einordnung im [Glossar](glossar.md).

- Fokus auf einer standardisierbaren Leistung: `Entlastungsbetrag` (131 EUR pro Monat).
- Nutzer:innen laden einmalig den Pflegegrad-Nachweis hoch, wählen eine Leistung und müssen den restlichen Prozess nicht selbst verstehen oder steuern; unterstützt **OCR plus LLM-Extraktion** (Edge Function `extract-info`, OpenRouter) die Übernahme von Stammdaten aus dem erkannten Text — mit verbindlicher Prüfung durch die Nutzer:in vor Absenden.
- Die Plattform übernimmt im Hintergrund Vermittlung, Abrechnung und Erstattungsprozess.

## Dokumente (Reihenfolge nach arc42)

- **1 Einleitung und Ziele** — siehe [Zielbild MVP](#zielbild-mvp) oben (in dieser Datei)
- **2 Randbedingungen** — [Architektureinschränkungen](architektureinschraenkungen.md)
- **3 Kontext und Abgrenzung** — [Kontextdiagramm](kontext-diagramm.md)
- **4 Lösungsstrategie** — [Lösungsstrategie](loesungsstrategie.md)
- **5 Bausteinsicht** — [Bausteinsicht](bausteinsicht.md)
- **6 Laufzeitsicht** — [Laufzeitsicht](laufzeitsicht.md)
- **7 Verteilungssicht** — [Verteilungssicht](verteilungssicht.md)
- **8 Querschnittliche Konzepte** — [Querschnittliche Konzepte](querschnittliche-konzepte.md)
- **9 Architekturentscheidungen** — [Architekturentscheidungen](architekturentscheidungen.md)
- **10 Qualitätsanforderungen** — [Qualitätskriterien und Merkmale](qualitaetskriterien-und-merkmale.md)
- **11 Risiken und technische Schulden** — [Risiken und technische Schulden](risiken-und-technische-schulden.md)
- **12 Glossar** — [Glossar](glossar.md)
