# Bausteinsicht

Diese Bausteinsicht leitet sich aus dem bestehenden Kontextdiagramm von `pflegeleicht.online` ab und zerlegt das System in zentrale interne Bausteine.

## Baustein-Ueberblick

```mermaid
flowchart TB
    subgraph system["pflegeleicht.online"]
        web-extern["External-Frontend"]
        web-intern["Internal-Frontend"]
        service-extern["external-API"]
        service-intern["internal-API"]
        leistung["Leistungsverwaltung"]
        admin["Admin-Modul"]
        customercare["CustomerCare-Modul"]
        notify["Benachrichtigungsmodul"]
        repo["Persistenzschicht"]
    end

    email["E-Mail-Dienst"]
    db["Datenbank"]

    web-extern --> service-extern
    web-intern --> service-intern
    service-extern --> leistung
    service-intern --> leistung
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

- `External-Frontend`: Einstiegspunkt fuer externe Nutzer:innen und Uebergabe von Anfragen an die `external-API`.
- `Internal-Frontend`: Arbeitsoberflaeche fuer interne Rollen und Uebergabe von Anfragen an die `internal-API`.
- `external-API`: Schnittstelle fuer externe Frontend-Anfragen und Weiterleitung an die `Leistungsverwaltung`.
- `internal-API`: Schnittstelle fuer interne Frontend-Anfragen und Orchestrierung in `Leistungsverwaltung`, `Admin-Modul` und `CustomerCare-Modul`.
- `Leistungsverwaltung`: Zentrale Fachlogik zur Verarbeitung von Leistungen und zur Ansteuerung von Benachrichtigung und Persistenz.
- `CustomerCare-Modul`: Unterstuetzt CustomerService-Prozesse und Kundenanliegen.
- `Admin-Modul`: Stellt administrative Funktionen und Systempflege bereit.
- `Benachrichtigungsmodul`: Erzeugt und versendet E-Mails ueber den externen E-Mail-Dienst.
- `Persistenzschicht`: Kapselt Lese-/Schreibzugriffe auf die Datenbank.

## Abgrenzung

- Externe Systeme (`E-Mail-Dienst`, `Datenbank`) bleiben ausserhalb der Systemgrenze.
- Die genaue technische Implementierung der Module ist noch offen und kann in einer Laufzeitsicht vertieft werden.

