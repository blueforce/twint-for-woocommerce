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
echo "--- Inhalt (Auszug) ---"
unzip -l "$OUT" | sed -n '1,15p'
echo "..."
echo "Hauptdatei vorhanden:"
unzip -l "$OUT" | grep -q "${SLUG}/${SLUG}.php" && echo "  OK ${SLUG}/${SLUG}.php" || { echo "  FEHLT!"; exit 1; }
echo "Update-Bibliothek vorhanden:"
unzip -l "$OUT" | grep -q "${SLUG}/includes/plugin-update-checker/plugin-update-checker.php" && echo "  OK plugin-update-checker" || { echo "  FEHLT!"; exit 1; }
