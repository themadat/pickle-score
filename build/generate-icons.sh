#!/usr/bin/env bash
#
# generate-icons.sh
# -----------------
# Generate every PNG icon resource the app needs from the two source SVGs:
#   assets/icons/pickle-score-light.svg -> light variants
#   assets/icons/pickle-score-dark.svg  -> dark variants
#
# Outputs to assets/icons/:
#   apple-touch-icon.png       180x180
#   apple-touch-icon-dark.png  180x180
#   favicon-16.png              16x16
#   favicon-32.png              32x32
#   favicon-16-dark.png         16x16
#   favicon-32-dark.png         32x32
#   icon-192.png               192x192
#   icon-512.png               512x512
#   icon-192-dark.png          192x192
#   icon-512-dark.png          512x512
#   favicon.svg                          light+dark via prefers-color-scheme
#
# Requires: qlmanage (ships with macOS).
#
# Usage: ./build/generate-icons.sh
#

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
LIGHT_SVG="$REPO_ROOT/assets/icons/pickle-score-light.svg"
DARK_SVG="$REPO_ROOT/assets/icons/pickle-score-dark.svg"
DEST_DIR="$REPO_ROOT/assets/icons"
mkdir -p "$DEST_DIR"

if ! command -v qlmanage >/dev/null 2>&1; then
  echo "Error: qlmanage not found. This script needs macOS (qlmanage ships with the OS)." >&2
  exit 1
fi

for svg in "$LIGHT_SVG" "$DARK_SVG"; do
  if [ ! -f "$svg" ]; then
    echo "Error: missing source SVG: $svg" >&2
    exit 1
  fi
done

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

render() {
  local src="$1" size="$2" dest_name="$3"
  local out_dir="$TMP/out"
  rm -rf "$out_dir"
  mkdir -p "$out_dir"

  qlmanage -t -s "$size" -o "$out_dir" "$src" >/dev/null 2>&1 &
  local pid=$!
  local generated="$out_dir/$(basename "$src").png"
  local waited=0
  while [ ! -f "$generated" ] && [ $waited -lt 20 ]; do
    sleep 1
    waited=$((waited + 1))
  done
  kill -9 "$pid" 2>/dev/null || true
  wait "$pid" 2>/dev/null || true

  if [ ! -f "$generated" ]; then
    echo "Error: qlmanage failed to render $src at ${size}x${size}." >&2
    echo "       Try restarting QuickLook: killall -9 QuickLookUIService quicklookd" >&2
    exit 1
  fi

  mv "$generated" "$DEST_DIR/$dest_name"
  printf '  %-32s %dx%d\n' "$dest_name" "$size" "$size"
}

echo "Generating icons:"
echo "  light source: $LIGHT_SVG"
echo "  dark source:  $DARK_SVG"
echo

render "$LIGHT_SVG" 180 "apple-touch-icon.png"
render "$DARK_SVG"  180 "apple-touch-icon-dark.png"
render "$LIGHT_SVG" 192 "icon-192.png"
render "$LIGHT_SVG" 512 "icon-512.png"
render "$DARK_SVG"  192 "icon-192-dark.png"
render "$DARK_SVG"  512 "icon-512-dark.png"
render "$LIGHT_SVG"  32 "favicon-32.png"
render "$LIGHT_SVG"  16 "favicon-16.png"
render "$DARK_SVG"   32 "favicon-32-dark.png"
render "$DARK_SVG"   16 "favicon-16-dark.png"

if command -v python3 >/dev/null 2>&1; then
  python3 "$SCRIPT_DIR/generate-favicon.py"
else
  echo "  warning: python3 not found; skipping favicon.svg regeneration"
fi

echo
echo "Done. Assets written to $REPO_ROOT/"
