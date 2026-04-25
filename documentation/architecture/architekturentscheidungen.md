# Architekturentscheidungen

Dieses Dokument haelt wichtige Architekturentscheidungen fuer `pflegeleicht.online` fest.

## Ziel und Nutzung

- Dokumentiert Entscheidungen mit Kontext, Begruendung und Folgen.
- Schafft Nachvollziehbarkeit fuer technische und fachliche Abwaegungen.
- Dient als Ausgangspunkt fuer spaetere ADRs (Architecture Decision Records).

## Entscheidungslog

### ADR-001: Trennung von externer und interner API

- **Status:** akzeptiert
- **Datum:** 2026-04-25
- **Kontext:** Externe Nutzer:innen und interne Rollen haben unterschiedliche Anforderungen an Datenumfang, Berechtigungen und Prozesse.
- **Entscheidung:** Das System nutzt zwei getrennte Schnittstellen (`external-API` und `internal-API`) mit klarer Verantwortungsabgrenzung.
- **Folgen:** Bessere Sicherheits- und Zugriffskontrolle, aber zusaetzlicher Wartungsaufwand fuer zwei API-Pfade.

### ADR-002: Fachlogik als zentraler Kern

- **Status:** akzeptiert
- **Datum:** 2026-04-25
- **Kontext:** Mehrere Frontends und Module greifen auf dieselben fachlichen Regeln fuer Leistungen zu.
- **Entscheidung:** Die `Leistungsverwaltung` bildet den zentralen fachlichen Kern und wird von den APIs und internen Modulen genutzt.
- **Folgen:** Konsistente Fachlogik und weniger Duplikate; zusaetzliche Sorgfalt bei Aenderungen im Kernmodul erforderlich.

### ADR-003: Entkopplung von Benachrichtigungen

- **Status:** akzeptiert
- **Datum:** 2026-04-25
- **Kontext:** Benachrichtigungslogik soll getrennt von der Leistungsverarbeitung bleiben.
- **Entscheidung:** Die Leistungsverwaltung triggert ein eigenes `Benachrichtigungsmodul`, das den externen E-Mail-Dienst anspricht.
- **Folgen:** Bessere Erweiterbarkeit (z. B. weitere Kanaele spaeter), jedoch mehr Integrationsschnittstellen.

### ADR-004: Supabase als Backend- und Datenbanktechnologiewahl

- **Status:** akzeptiert
- **Datum:** 2026-04-25
- **Kontext:** Fuer Backend-Funktionen und Persistenz wird eine integrierte Plattform benoetigt, die schnell einsetzbar ist und Standard-Workflows fuer Datenzugriff unterstuetzt.
- **Begruendung:** Die Wahl unterstuetzt eine einfache und schnelle Umsetzung im Rahmen des MVP.
- **Entscheidung:** `Supabase` wird als zentrale Backend-Technologie fuer Datenzugriff und Datenhaltung eingesetzt.
- **Folgen:** Damit ist ein relationales Datenbankmodell (RDBMS) als verbindliche Grundlage gesetzt; Datenmodellierung, Queries und Migrationen orientieren sich an relationalen Prinzipien.

### ADR-005: API-Standard mit OpenAPI, REST und JSON

- **Status:** akzeptiert
- **Datum:** 2026-04-25
- **Kontext:** Externe und interne Schnittstellen muessen konsistent beschrieben, implementiert und zwischen Frontend und Backend klar abgestimmt werden.
- **Entscheidung:** APIs werden auf Basis von `OpenAPI` spezifiziert und als `REST`-Schnittstellen mit `JSON` als Austauschformat umgesetzt.
- **Folgen:** Einheitliche API-Vertraege und bessere Tool-Unterstuetzung (Dokumentation, Validierung, Client-Generierung); zusaetzliche Pflege der OpenAPI-Spezifikation erforderlich.

## Offene Entscheidungen

- Konkrete Migrationsstrategie innerhalb des relationalen Modells (Versionierung, Rollback, Deployment-Ablauf).
- Fehler- und Retry-Strategie fuer externe Kommunikationspfade (E-Mail, Datenbank).
- Monitoring- und Audit-Anforderungen fuer interne administrative Prozesse.
