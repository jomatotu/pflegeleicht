# Architekturentscheidungen

Dieses Dokument hält wichtige Architekturentscheidungen für `pflegeleicht.online` fest.

## Ziel und Nutzung

- Dokumentiert Entscheidungen mit Kontext, Begründung und Folgen.
- Schafft Nachvollziehbarkeit für technische und fachliche Abwägungen.
- Dient als Ausgangspunkt für spätere ADRs (Architecture Decision Records).

## Entscheidungslog

### ADR-001: Trennung von externer und interner API

- **Status:** akzeptiert
- **Datum:** 2026-04-25
- **Kontext:** Externe Nutzer:innen und interne Rollen haben unterschiedliche Anforderungen an Datenumfang, Berechtigungen und Prozesse.
- **Entscheidung:** Das System nutzt zwei getrennte Schnittstellen (`external-API` und `internal-API`) mit klarer Verantwortungsabgrenzung.
- **Folgen:** Bessere Sicherheits- und Zugriffskontrolle, aber zusätzlicher Wartungsaufwand für zwei API-Pfade.

### ADR-002: Fachlogik als zentraler Kern

- **Status:** akzeptiert
- **Datum:** 2026-04-25
- **Kontext:** Mehrere Frontends und Module greifen auf dieselben fachlichen Regeln für Leistungen zu.
- **Entscheidung:** Die `Leistungsverwaltung` bildet den zentralen fachlichen Kern und wird von den APIs und internen Modulen genutzt.
- **Folgen:** Konsistente Fachlogik und weniger Duplikate; zusätzliche Sorgfalt bei Änderungen im Kernmodul erforderlich.

### ADR-003: Entkopplung von Benachrichtigungen

- **Status:** akzeptiert
- **Datum:** 2026-04-25
- **Kontext:** Benachrichtigungslogik soll getrennt von der Leistungsverarbeitung bleiben.
- **Entscheidung:** Die Leistungsverwaltung triggert ein eigenes `Benachrichtigungsmodul`, das den externen E-Mail-Dienst anspricht.
- **Folgen:** Bessere Erweiterbarkeit (z. B. weitere Kanäle später), jedoch mehr Integrationsschnittstellen.

### ADR-004: Supabase als Backend- und Datenbanktechnologiewahl

- **Status:** akzeptiert
- **Datum:** 2026-04-25
- **Kontext:** Für Backend-Funktionen und Persistenz wird eine integrierte Plattform benötigt, die schnell einsetzbar ist und Standard-Workflows für Datenzugriff unterstützt.
- **Begründung:** Die Wahl unterstützt eine einfache und schnelle Umsetzung im Rahmen des MVP.
- **Entscheidung:** `Supabase` wird als zentrale Backend-Technologie für Datenzugriff und Datenhaltung eingesetzt.
- **Folgen:** Damit ist ein relationales Datenbankmodell (RDBMS) als verbindliche Grundlage gesetzt; Datenmodellierung, Queries und Migrationen orientieren sich an relationalen Prinzipien.

### ADR-005: API-Standard mit OpenAPI, REST und JSON

- **Status:** akzeptiert
- **Datum:** 2026-04-25
- **Kontext:** Externe und interne Schnittstellen müssen konsistent beschrieben, implementiert und zwischen Frontend und Backend klar abgestimmt werden.
- **Entscheidung:** APIs werden auf Basis von `OpenAPI` spezifiziert und als `REST`-Schnittstellen mit `JSON` als Austauschformat umgesetzt.
- **Folgen:** Einheitliche API-Verträge und bessere Tool-Unterstützung (Dokumentation, Validierung, Client-Generierung); zusätzliche Pflege der OpenAPI-Spezifikation erforderlich.

## Offene Entscheidungen

- Konkrete Migrationsstrategie innerhalb des relationalen Modells (Versionierung, Rollback, Deployment-Ablauf).
- Fehler- und Retry-Strategie für externe Kommunikationspfade (E-Mail, Datenbank).
- Monitoring- und Audit-Anforderungen für interne administrative Prozesse.
