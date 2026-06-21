#!/usr/bin/env bash
#
# Baut ein sauberes, installierbares Plugin-ZIP für ein GitHub-Release.
#
# Das ZIP enthält genau einen Ordner «twint-for-woocommerce/» mit allen Plugin-
# Dateien (ausser den in .gitattributes als export-ignore markierten). Genau dieses
# Asset lädt der Plugin Update Checker für die 1-Klick-Aktualisierung.
#
# Verwendung:
#   ./build.sh            # ZIP aus dem aktuellen HEAD
#   ./build.sh 1.0.1      # ZIP aus einem bestimmten Tag/Commit
#
set -euo pipefail

SLUG="twint-for-woocommerce"
REF="${1:-HEAD}"
OUT="${SLUG}.zip"

cd "$(dirname "$0")"
rm -f "$OUT"

git archive --format=zip --prefix="${SLUG}/" -o "$OUT" "$REF"

echo "Erzeugt: $OUT  (Ref: $REF)"

# Inhaltsliste einmal erzeugen (robuste Prüfung ohne grep -q / SIGPIPE).
LIST="$(unzip -l "$OUT")"
echo "--- Inhalt (Auszug) ---"
printf '%s\n' "$LIST" | sed -n '1,12p'
echo "..."

require_in_zip() {
	local needle="$1" label="$2"
	if printf '%s\n' "$LIST" | grep -Fq -- "$needle"; then
		echo "  OK   $label"
	else
		echo "  FEHLT: $label  ($needle)"
		exit 1
	fi
}

echo "Pflicht-Bestandteile:"
require_in_zip "${SLUG}/${SLUG}.php"                                          "Hauptdatei"
require_in_zip "${SLUG}/includes/plugin-update-checker/plugin-update-checker.php" "Update-Bibliothek (Loader)"
require_in_zip "${SLUG}/includes/plugin-update-checker/vendor/Parsedown.php"  "Update-Bibliothek (vendor)"
require_in_zip "${SLUG}/includes/class-wc-gateway-bf-twint.php"               "Gateway-Klasse"
echo "ZIP ist vollständig."
