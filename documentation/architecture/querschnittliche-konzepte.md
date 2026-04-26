# Querschnittliche Konzepte (arc42 Abschnitt 8)

> **Stub:** Dieses Kapitel ist angelegt und soll übergreifende Themen bündeln, die mehrere Bausteine betreffen (z. B. Sicherheit, Logging, Fehlerbehandlung, Konfiguration, Persistenzkonventionen).

> **MVP:** Im Rahmen des Minimum Viable Product (MVP) sind diese querschnittlichen Konzepte bewusst noch nicht ausgearbeitet; die nachfolgende Gliederung beschreibt die geplante Erweiterung nach dem MVP.

## Inhalt (geplant)

- Querschnittliche Regeln und ihre Verankerung im Code bzw. in Betrieb/Dokumentation
- Verweis auf Detailaussagen in Randbedingungen und Architekturentscheidungen, wo bereits vorhanden
- **KI / LLM:** Trennung Hilfsfunktion (`extract-info`) und fachlicher Persistenz (`process-antrag`); Anbindung **OpenRouter** vs. **lokales LLM** (ADR-007); Logging ohne unnötige Speicherung von Roh-Prompts in produktiven Umgebungen — bei Ausarbeitung dieses Kapitels mit Datenschutz und Betrieb abstimmen
