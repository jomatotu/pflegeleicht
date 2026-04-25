# Project Rules

Diese Regeln gelten projektweit und dienen als gemeinsame Basis fuer Cursor und JetBrains.

## Sprache

- Die Projektdokumentation wird auf Deutsch gepflegt.
- Die Entwicklungssprache (Code, Bezeichner, Commit-Texte in Code-Kontexten) ist Englisch.
- Fachliche Bezeichner im Code duerfen bei Bedarf auch Deutsch sein.

## Code Quality

- Schreibe klaren, lesbaren Code mit sprechenden Bezeichnern.
- Halte Funktionen und Klassen klein und fokussiert.
- Vermeide ungenutzten Code und toten Ballast.
- Bevorzuge einfache Loesungen statt unnötiger Komplexitaet.

## Struktur und Wartbarkeit

- Nutze bestehende Projektmuster konsequent weiter.
- Trenne Verantwortlichkeiten sauber (keine vermischte Business- und UI-Logik).
- Fuege nur dann Kommentare hinzu, wenn die Absicht nicht direkt aus dem Code erkennbar ist.

## Sicherheit und Zuverlaessigkeit

- Hinterlege keine Secrets, Tokens oder Passwoerter im Repository.
- Behandle Fehler explizit und mit hilfreichen Meldungen.
- Achte auf saubere Validierung von Eingaben.

## Tests und Verifikation

- Ergaenze oder aktualisiere Tests bei Verhaltensaenderungen.
- Fuehre relevante Tests/Linting lokal aus, bevor groessere Aenderungen abgeschlossen werden.
- Halte Aenderungen klein, nachvollziehbar und review-freundlich.

## Git und Zusammenarbeit

- Erstelle praezise Commit-Messages, die das "Warum" beschreiben.
- Vermeide grosse Misch-Commits mit mehreren unabhaengigen Themen.
- Dokumentiere wichtige Architektur- oder Verhaltensaenderungen kurz in der passenden Doku.
