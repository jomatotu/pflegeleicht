# Kontextdiagramm

Dieses Diagramm zeigt den Systemkontext von **pflegeleicht.online** auf hoher Ebene.

Hinweis: Eine genauere, in Bausteine zerlegte Beschreibung des Systems findet sich in [Bausteinsicht](bausteinsicht.md).

```mermaid
flowchart LR
    user["Nutzer:in"]
    pflegeleicht["CustomerService"]
    dienstleistungsagentur["Dienstleistungsagentur"]
    admin["Administrator:in"]
    system["pflegeleicht.online"]
    mail["E-Mail-Dienst"]
    db["Datenbank"]
    
    user -->|"bestellt Leistungen"| system
    pflegeleicht -->|"kümmert sich um Nutzendenanfragen"| system
    dienstleistungsagentur -->| "erhält Benachrichtigungen" | system
    admin -->|"administriert"| system
    system -->|"versendet Benachrichtigungen"| mail
    system -->|"liest/schreibt Daten"| db
```



## Annahmen

- `pflegeleicht.online` ist das zentrale Softwaresystem.
- Nutzer:innen interagieren direkt mit dem System.
- Das System nutzt einen externen E-Mail-Dienst und eine Datenbank.
- Der `CustomerService` bearbeitet Nutzendenanfragen über `pflegeleicht.online`.
- Dienstleistungsagenturen erhalten bei relevanten Ereignissen eine Benachrichtigung durch `pflegeleicht.online`.

