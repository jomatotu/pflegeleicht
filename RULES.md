# Project Rules

Diese Regeln gelten projektweit und dienen als gemeinsame Basis für Cursor und JetBrains.

## Sprache

- Die Projektdokumentation wird auf Deutsch gepflegt.
- In der Dokumentation Umlaute als ä, ö und ü schreiben, nicht ausgeschrieben als ae, oe oder ue; scharfes S als ß, wo die Rechtschreibung es verlangt.
- Die Entwicklungssprache (Code, Bezeichner, Commit-Texte in Code-Kontexten) ist Englisch.
- Fachliche Bezeichner im Code dürfen bei Bedarf auch Deutsch sein.

## Code Quality

- Schreibe klaren, lesbaren Code mit sprechenden Bezeichnern.
- Halte Funktionen und Klassen klein und fokussiert.
- Vermeide ungenutzten Code und toten Ballast.
- Bevorzuge einfache Lösungen statt unnötiger Komplexität.

## Struktur und Wartbarkeit

- Nutze bestehende Projektmuster konsequent weiter.
- Trenne Verantwortlichkeiten sauber (keine vermischte Business- und UI-Logik).
- Füge nur dann Kommentare hinzu, wenn die Absicht nicht direkt aus dem Code erkennbar ist.

## Sicherheit und Zuverlässigkeit

- Hinterlege keine Secrets, Tokens oder Passwörter im Repository.
- Behandle Fehler explizit und mit hilfreichen Meldungen.
- Achte auf saubere Validierung von Eingaben.

## Tests und Verifikation

- Ergänze oder aktualisiere Tests bei Verhaltensänderungen.
- Führe relevante Tests/Linting lokal aus, bevor größere Änderungen abgeschlossen werden.
- Halte Änderungen klein, nachvollziehbar und review-freundlich.

## Git und Zusammenarbeit

- Erstelle präzise Commit-Messages, die das "Warum" beschreiben.
- Vermeide große Misch-Commits mit mehreren unabhängigen Themen.
- Dokumentiere wichtige Architektur- oder Verhaltensänderungen kurz in der passenden Doku.
