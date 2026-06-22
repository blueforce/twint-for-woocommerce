# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden hier dokumentiert.
Das Format orientiert sich an [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
die Versionierung an [Semantic Versioning](https://semver.org/lang/de/)
(`MAJOR.MINOR.MAINTENANCE` – siehe [CONTRIBUTING.md](CONTRIBUTING.md)).

## [Unreleased]

_Noch keine unveröffentlichten Änderungen._

## [1.2.0] – 2026-06-22

### Hinzugefügt
- **«Zahlung erhalten»-Button** in der Bestellansicht: Setzt eine TWINT-Bestellung
  per Klick auf bezahlt (`payment_complete`) und hinterlegt eine Notiz – ohne
  manuellen Statuswechsel. Reiner Form-POST mit Nonce und Berechtigungs-Check.
- **Französische (fr_CH) und italienische (it_CH) Übersetzung** für die
  Westschweiz und das Tessin – inklusive Block-Checkout (JS).
- **Kopier-Button für die Bestellnummer** auf der Danke-Seite (Ablauf «Kunde
  sendet»): Der Kunde übernimmt die TWINT-Mitteilung mit einem Klick – weniger
  Tippfehler bei der Referenz.

### Geändert
- TWINT wird im Checkout nur noch angezeigt, wenn die Shop-Währung **CHF** ist
  (verhindert Fehlbestellungen in Fremdwährung). Über den Filter
  `bf_twint_is_available` bei Bedarf übersteuerbar.

### Behoben
- Fehlenden Block-Checkout-String («Wir senden dir eine TWINT-Zahlungsanforderung
  an diese Nummer.») in `.pot` und Übersetzungen ergänzt.

## [1.1.2] – 2026-06-21

### Sicherheit
- Zusätzlicher Berechtigungs-Check (`current_user_can( 'manage_woocommerce' )`) beim
  Laden der Admin-Skripte (Defense-in-Depth, OWASP A01).

## [1.1.1] – 2026-06-21

### Hinzugefügt
- **TWINT-Logo als Plugin-Icon** in der Update- und Plugin-Ansicht (PNG 128/256 + SVG),
  da GitHub-Hosting kein Icon mitliefert.

### Behoben
- Englische Übersetzungen (`en_GB`/`en_US`) für die neuen Admin-Texte rund um die
  QR-Bild-Auswahl ergänzt; `.pot` aktualisiert.

## [1.1.0] – 2026-06-21

### Hinzugefügt
- **TWINT-QR-Bild aus der Mediathek wählen:** Das Feld hat jetzt einen Button «Bild
  auswählen», der den WordPress-Media-Uploader öffnet, plus Vorschau und «Entfernen».
  Die URL muss nicht mehr von Hand eingetragen werden.

## [1.0.2] – 2026-06-21

### Geändert
- Block-Checkout: TWINT-Logo neben dem Methodennamen (wie im klassischen Checkout).
- Block-Checkout: Pflichtfeld-Markierung («*») am Label «TWINT-Handynummer» im Ablauf «request».

## [1.0.1] – 2026-06-21

### Hinzugefügt
- **Automatische Updates** direkt im WordPress-Backend (1-Klick) über die GitHub-Releases,
  via eingebettetem [Plugin Update Checker](https://github.com/YahnisElsts/plugin-update-checker).
- `build.sh` + `.gitattributes`: erzeugt ein sauberes, installierbares Release-ZIP
  (`twint-for-woocommerce.zip`) mit korrektem Ordnernamen.

### Geändert
- README: Abschnitte «Installation» und «Automatische Updates» ergänzt.

## [1.0.0] – 2026-06-21

### Hinzugefügt
- TWINT-Bezahl-Gateway für WooCommerce (manuelles Verfahren, ohne API/Vertrag).
- Ablauf «Kunde sendet»: Anzeige von TWINT-Handynummer, Kontoinhaber und optionalem QR-Code.
- Ablauf «Ich fordere an»: Pflichtfeld für die TWINT-Handynummer des Kunden.
- Unterstützung für klassischen Checkout und Block-Checkout (Store-API).
- Anweisungen auf Danke-Seite, in der Bestell-E-Mail und im Backend.
- HPOS-Kompatibilität.
- Vollständige Übersetzbarkeit (Text-Domain `twint-for-woocommerce`) inkl. mitgelieferter
  Übersetzungen für **de_DE**, **en_GB** und **en_US** (`.po`/`.mo`) sowie JS-Übersetzungen
  (`.json`) für den Block-Checkout.
