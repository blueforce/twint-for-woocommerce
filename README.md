# TWINT for WooCommerce

[![Version](https://img.shields.io/github/v/release/blueforce/twint-for-woocommerce?label=Version)](https://github.com/blueforce/twint-for-woocommerce/releases)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-blue.svg)](LICENSE)
![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-21759b.svg)
![WooCommerce](https://img.shields.io/badge/WooCommerce-7.0%2B-96588a.svg)
![PHP](https://img.shields.io/badge/PHP-7.4%2B-777bb4.svg)

Ein kostenloses, natives WooCommerce-Bezahl-Gateway für **TWINT** – **ohne API, ohne Vertrag mit TWINT und ohne Payment Service Provider**. Entwickelt und bereitgestellt von [Blueforce Digital Solutions](https://blueforce.ch).

> ⚠️ **Wichtig zur Einordnung:** TWINT stellt seine Zahlungs-API **nicht öffentlich** zur Verfügung. Eine echte, automatische TWINT-Integration ist nur über einen TWINT-Acquiring-Vertrag (mit Zertifikat) oder über einen Payment Service Provider (Datatrans, Saferpay, Payrexx, Worldline …) möglich und muss von TWINT zertifiziert werden.
>
> Dieses Plugin geht bewusst einen anderen Weg: Es nutzt das **manuelle TWINT-Verfahren** (Geld senden / anfordern per Handynummer). Damit funktioniert es **für alle sofort** – ideal für kleine Shops, Vereine und Einzelunternehmen, die TWINT ohne laufende Gebühren anbieten wollen.
>
> 👉 **Ausführliche Begründung:** [Warum dieses Plugin so gebaut ist](docs/WARUM-DIESES-PLUGIN.md) – warum es keine volle Integration ist und welche Designentscheidungen daraus folgen.

## Funktionsweise

Das Plugin fügt im Checkout eine TWINT-Bezahlmethode hinzu. Du wählst einen von zwei Abläufen:

### Ablauf «Kunde sendet»
- Dem Kunden werden deine **TWINT-Handynummer** und – optional – dein **TWINT-QR-Code** angezeigt.
- Der Kunde sendet den Betrag mit der **Bestellnummer als Mitteilung**.
- Die Bestellung steht auf **«In Wartestellung»**.
- Du prüfst den Zahlungseingang in der TWINT-App und setzt die Bestellung von Hand auf **«In Bearbeitung»**.

### Ablauf «Ich fordere an»
- Der Kunde gibt im Checkout seine **TWINT-Handynummer** an (Pflichtfeld).
- Die Nummer erscheint in der Bestellung im Backend.
- Du **forderst den Betrag** in deiner TWINT-App von dieser Nummer an.
- Nach Zahlungseingang setzt du die Bestellung auf **«In Bearbeitung»**.

In beiden Fällen findet **kein automatischer API-Call** statt – der Zahlungseingang wird von Hand bestätigt.

## Features

- ✅ Zwei Abläufe (Kunde sendet / Shop fordert an), pro Shop wählbar
- ✅ Klassischer **und** Block-Checkout (Cart/Checkout-Blocks, Store-API)
- ✅ Optionaler TWINT-QR-Code auf Danke-Seite und in der E-Mail
- ✅ Anweisungen auf der Danke-Seite, in der Bestell-E-Mail und im Backend
- ✅ Vollständig übersetzbar (Text-Domain `twint-for-woocommerce`, deutsche Strings)
- ✅ Kompatibel mit **HPOS** (High-Performance Order Storage)
- ✅ Keine externen Abhängigkeiten, kein Build-Step, keine Tracking-Aufrufe

## Installation

1. Den Plugin-Ordner als ZIP packen bzw. das [Release-ZIP](https://github.com/blueforce/twint-for-woocommerce/releases) herunterladen.
2. In WordPress unter **Plugins → Installieren → Plugin hochladen** einspielen und aktivieren.
3. Unter **WooCommerce → Einstellungen → Zahlungen → TWINT** aktivieren und konfigurieren.

**Voraussetzungen:** WordPress 6.0+, WooCommerce 7.0+, PHP 7.4+.

## Konfiguration

| Einstellung | Beschreibung |
| --- | --- |
| **Ablauf** | «Kunde sendet» oder «Ich fordere an» |
| **Deine TWINT-Handynummer** | Nummer, an die der Kunde sendet (Ablauf «Kunde sendet») |
| **Name des Kontoinhabers** | Optional, zur Kontrolle für den Kunden |
| **TWINT-QR-Bild (URL)** | Optional: lade in der TWINT-App unter «Geld empfangen» deinen QR-Code, speichere ihn in der Mediathek und trage die Bild-URL ein |
| **Zusätzliche Hinweise** | Freitext für Danke-Seite und E-Mail |

## Mitwirken

Issues und Pull Requests sind willkommen. Bitte halte dich an den bestehenden Code-Stil (WordPress Coding Standards).

## Lizenz

[GPL-2.0-or-later](LICENSE) © [Blueforce Digital Solutions](https://blueforce.ch)

## Disclaimer

Dieses Plugin ist ein unabhängiges Community-Projekt und steht **in keiner Verbindung zur TWINT AG**. «TWINT» ist eine eingetragene Marke der TWINT AG und wird hier ausschliesslich zur Beschreibung der Kompatibilität verwendet.

## Support

Fragen oder Anliegen: [info@blueforce.ch](mailto:info@blueforce.ch) · [blueforce.ch](https://blueforce.ch)
