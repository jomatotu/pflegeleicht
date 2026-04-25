# Bausteinsicht

Diese Bausteinsicht leitet sich aus dem bestehenden Kontextdiagramm von `pflegeleicht.online` ab und zerlegt das System in zentrale interne Bausteine.

## Baustein-Überblick

```mermaid
flowchart TB
    subgraph system["pflegeleicht.online"]
        subgraph layer1["Web-Frontend"]
            web-extern["external-frontend"]
            web-intern["internal-frontend"]
        end

        subgraph layer2["API-Schicht"]
            service-extern["external-API"]
            service-intern["internal-API"]
        end

        subgraph layer3["Fachmodul-Schicht"]
            leistung["Leistungsverwaltung"]
            admin["Admin-Modul"]
            customercare["CustomerCare-Modul"]
        end

        subgraph layer4["Anbindungs-Schicht"]
            notify["Benachrichtigungsmodul"]
            repo["Persistenzschicht"]
        end
    end

    email["E-Mail-Dienst"]
    db["Datenbank"]

    web-extern --> service-extern
    web-intern --> service-intern
    service-extern --> leistung
    service-intern --> admin
    service-intern --> customercare
    customercare --> leistung
    admin --> leistung
    leistung --> notify
    leistung --> repo
    notify --> email
    repo --> db
```



## Bausteine

- `External-Frontend`: Einstiegspunkt für externe Nutzer:innen und Übergabe von Anfragen an die `external-API`.
- `Internal-Frontend`: Arbeitsoberfläche für interne Rollen und Übergabe von Anfragen an die `internal-API`.
- `external-API`: Schnittstelle für externe Frontend-Anfragen und Weiterleitung an die `Leistungsverwaltung`.
- `internal-API`: Schnittstelle für interne Frontend-Anfragen und Orchestrierung in `Leistungsverwaltung`, `Admin-Modul` und `CustomerCare-Modul`.
- `Leistungsverwaltung`: Zentrale Fachlogik zur Verarbeitung von Leistungen und zur Ansteuerung von Benachrichtigung und Persistenz.
- `CustomerCare-Modul`: Unterstützt CustomerService-Prozesse und Kundenanliegen.
- `Admin-Modul`: Stellt administrative Funktionen und Systempflege bereit.
- `Benachrichtigungsmodul`: Erzeugt und versendet E-Mails über den externen E-Mail-Dienst.
- `Persistenzschicht`: Kapselt Lese-/Schreibzugriffe auf die Datenbank.

## Schichten

- Oberste Schicht (`internal-frontend`, `external-frontend`): UI für interne und externe Nutzergruppen.
- API-Schicht (`external-API`, `internal-API`): Entkopplung der Frontends von der Fachlogik.
- Fachmodul-Schicht (`Leistungsverwaltung`, `Admin-Modul`, `CustomerCare-Modul`): Fachliche Verarbeitung und interne Orchestrierung.
- External-Service-Anbindungs-Schicht (`Benachrichtigungsmodul`, `Persistenzschicht`): Anbindung externer Dienste und technische Kapselung von Infrastrukturzugriffen (E-Mail, Datenbank).

## Abgrenzung

- Externe Systeme (`E-Mail-Dienst`, `Datenbank`) bleiben außerhalb der Systemgrenze.

