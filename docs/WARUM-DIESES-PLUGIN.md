# Warum dieses Plugin so gebaut ist

Dieses Dokument erklärt die wichtigste Designentscheidung hinter *TWINT for WooCommerce*: **Warum es bewusst keine «volle», automatische TWINT-Integration ist – und warum genau das die richtige Wahl für ein kostenloses, öffentliches Plugin ist.**

Wenn du nur wissen willst, wie das Plugin funktioniert, lies die [README](../README.md). Wenn du verstehen willst, *warum* es so funktioniert, bist du hier richtig.

---

## Die kurze Antwort

> TWINT stellt seine Zahlungs-API **nicht öffentlich** zur Verfügung. Eine automatische Integration ist nur mit einem TWINT-Acquiring-Vertrag (plus Zertifikat) oder über einen Payment Service Provider möglich – und jede Integration muss von TWINT **zertifiziert** werden.

Ein Plugin, das *für alle* sofort und ohne laufende Kosten funktionieren soll, kann diese Hürde gar nicht nehmen. Also lösen wir das Problem anders: über das **manuelle TWINT-Verfahren** (Geld senden / anfordern per Handynummer). Das ist kein Workaround aus Bequemlichkeit, sondern die einzige Variante, die das Versprechen «für alle, kostenlos, ohne Vertrag» tatsächlich einhält.

---

## Was «volle Integration» bedeuten würde

Eine echte, automatische Integration sähe so aus:

1. Kunde wählt im Checkout TWINT.
2. Der Shop kommuniziert direkt mit dem TWINT-System (API-Call).
3. Der Kunde bestätigt die Zahlung in der TWINT-App.
4. Der Shop erhält automatisch eine Rückmeldung und setzt die Bestellung **ohne menschliches Zutun** auf «bezahlt».

Genau dieser Ablauf ist für ein frei verteilbares Plugin **nicht umsetzbar**. Hier ist der Grund.

---

## Warum die volle Integration nicht (frei) geht

TWINT sagt es selbst unmissverständlich:

> «The TWINT API is not publicly accessible and is **not made available on request**. TWINT can only be integrated via a payment service provider or a plug-in. Prior to going live, the integration must be **certified by TWINT**.»

Daraus ergeben sich drei harte Sperren:

| Sperre | Konsequenz |
| --- | --- |
| **API nicht öffentlich** | Es gibt keine offenen Endpunkte, gegen die ein Plugin generisch programmieren könnte. |
| **Vertrag + Zertifikat nötig** | Für die direkte Anbindung braucht jeder Shop einen TWINT-Acquiring-Vertrag und ein eigenes `.p12`-Zertifikat. |
| **Zertifizierungspflicht** | Jede Integration muss vor dem Go-live von TWINT abgenommen werden – ein generisches «installier und los»-Plugin ist damit unvereinbar. |

### Die drei möglichen Wege – und warum nur einer passt

1. **TWINT-Acquiring direkt (mit `.p12`-Zertifikat)**
   Erfordert pro Shop einen Vertrag und eine TWINT-Zertifizierung. Nicht «für alle» nutzbar. Ausserdem bietet TWINT dafür bereits ein **eigenes offizielles Plugin** an – ein weiteres wäre Doppelspurigkeit.

2. **Über einen Payment Service Provider** (Datatrans, Saferpay, Payrexx, Worldline …)
   Funktioniert technisch automatisch, aber: Die Nutzer brauchen ein **kostenpflichtiges PSP-Konto**, und das Ergebnis wäre eigentlich ein *PSP-Plugin*, kein TWINT-Plugin. Pro PSP eigene API, Webhooks und Refund-Logik – hoher Aufwand, der den Nutzen «kostenlos und einfach» zunichtemacht.

3. **Manuelles TWINT-Verfahren** (dieses Plugin)
   Nutzt die TWINT-Funktion «Geld senden / anfordern», die **jede Privatperson und jedes Kleinunternehmen ohne Vertrag** hat. Kein API-Call, keine Zertifizierung, keine laufenden Gebühren. **Der einzige Weg, der das Versprechen einhält.**

---

## Was daraus für das Design folgt

Weil es keine automatische Zahlungsbestätigung gibt, ist das Plugin konsequent darauf ausgelegt, den **manuellen Abgleich so reibungslos wie möglich** zu machen. Jede Designentscheidung folgt direkt aus dieser Realität:

- **Bestellung geht auf «In Wartestellung» (`on-hold`), nicht auf «bezahlt».**
  Es gibt keine technische Bestätigung, also wäre jede automatische «bezahlt»-Markierung gelogen. Du bestätigst nach Sichtprüfung in der TWINT-App von Hand.

- **Zwei Abläufe statt eines.**
  Kleine Verkäufer arbeiten unterschiedlich: Manche lassen den Kunden senden («Kunde sendet»), andere fordern aktiv an («Ich fordere an»). Beide sind echte, gängige Praxis – darum sind beide eingebaut und pro Shop wählbar.

- **Bestellnummer als Mitteilung + optionaler QR-Code.**
  Ohne API ist die **Zuordnung** Zahlung ↔ Bestellung die eigentliche Herausforderung. Die Bestellnummer als Pflicht-Mitteilung und der scannbare QR-Code minimieren Fehlzuordnungen und Tippfehler.

- **Klare Vorgehens-Hinweise im Backend.**
  Bei jeder Bestellung steht die konkrete Handlungsanweisung (Betrag prüfen/anfordern → Status setzen). Das Plugin ersetzt die fehlende Automatik durch einen **geführten manuellen Prozess**.

- **Kein Tracking, keine externen Aufrufe, kein Build-Step.**
  Da nichts mit einem Server «nach Hause telefoniert», bleibt das Plugin schlank, auditierbar und datensparsam – passend zu einem öffentlichen Community-Tool.

- **Klassischer *und* Block-Checkout, HPOS-kompatibel.**
  Damit es wirklich «für alle» läuft – egal welcher Checkout, egal welches Order-Storage.

---

## Was das Plugin bewusst *nicht* tut

Ehrlichkeit gehört zur Architektur. Diese Grenzen sind gewollt, keine Mängel:

- ❌ **Keine automatische Zahlungsbestätigung.** Du prüfst und bestätigst von Hand.
- ❌ **Keine Echtzeit-Statusrückmeldung** aus der TWINT-App in den Shop.
- ❌ **Keine automatischen Rückerstattungen.** Refunds erfolgen manuell in der TWINT-App.
- ❌ **Keine Garantie, dass eine Zahlung eingegangen ist**, bevor du sie selbst gesehen hast.

Für kleine Volumen ist das völlig praktikabel. Bei sehr hohem Bestellaufkommen lohnt sich irgendwann der Wechsel zu einer automatisierten Lösung.

---

## Wann du etwas anderes brauchst

Wähle eine **automatische** Lösung (PSP oder TWINT-Acquiring direkt), wenn:

- du **viele Bestellungen pro Tag** hast und der manuelle Abgleich zur Last wird,
- du **sofortige** «bezahlt»-Bestätigung im Shop brauchst (z. B. für digitale Sofort-Downloads),
- du **automatische Rückerstattungen** über den Shop möchtest.

Für diesen Fall führt der Weg über einen Payment Service Provider oder das offizielle TWINT-Acquiring – beides mit Vertrag und Kosten verbunden.

---

## Zusammengefasst

Dieses Plugin macht **nicht weniger als möglich**, sondern **genau das, was ohne Vertrag, Zertifikat und PSP überhaupt geht** – und macht es sauber:

- ein für alle nutzbares, kostenloses TWINT-Gateway,
- mit geführtem manuellem Prozess statt vorgetäuschter Automatik,
- ehrlich in dem, was es kann und was nicht.

Das ist keine Notlösung, sondern die bewusst passende Antwort auf die Frage: *Wie bringe ich TWINT in jeden WooCommerce-Shop, ohne dass jemand einen Vertrag braucht?*

---

*Bereitgestellt von [Blueforce Digital Solutions](https://blueforce.ch) · [info@blueforce.ch](mailto:info@blueforce.ch). Unabhängiges Community-Projekt, nicht mit der TWINT AG verbunden.*
