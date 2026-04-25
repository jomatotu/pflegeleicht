# Kontextdiagramm

Dieses Diagramm zeigt den Systemkontext von **pflegeleicht** auf hoher Ebene.

```mermaid
flowchart LR
    user["Nutzer:in"]
    admin["Administrator:in"]
    system["pflegeleicht\n(Hackathon-Anwendung)"]
    mail["E-Mail-Dienst"]
    db["Datenbank"]

    user -->|"nutzt Funktionen"| system
    admin -->|"verwaltet Inhalte"| system
    system -->|"versendet Benachrichtigungen"| mail
    system -->|"liest/schreibt Daten"| db
```

## Annahmen

- `pflegeleicht` ist das zentrale Softwaresystem.
- Nutzer:innen interagieren direkt mit dem System.
- Das System nutzt einen externen E-Mail-Dienst und eine Datenbank.
