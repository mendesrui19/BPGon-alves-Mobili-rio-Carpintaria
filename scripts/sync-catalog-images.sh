#!/usr/bin/env bash
# Sincroniza fotos do catálogo a partir de ~/Downloads/bpcarpintarioa
# Ordem: data de modificação do ficheiro (como no Instagram/carrossel)

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_ROOT="${1:-$HOME/Downloads/bpcarpintarioa}"
DST="$ROOT/public/images/catalog"

if [[ ! -d "$SRC_ROOT" ]]; then
  echo "Pasta não encontrada: $SRC_ROOT" >&2
  exit 1
fi

copy_album() {
  local slug="$1"
  local folder="$2"
  rm -rf "$DST/$slug"
  mkdir -p "$DST/$slug"
  local i=1
  while IFS= read -r f; do
    printf -v num "%02d" "$i"
    cp "$f" "$DST/$slug/$num.jpg"
    i=$((i + 1))
  done < <(
    find "$folder" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' \) -print0 \
      | xargs -0 stat -f '%m %N' \
      | sort -n \
      | cut -d' ' -f2-
  )
  echo "$slug: $((i - 1)) fotos"
}

copy_album "cozinha-design-personalizado" "$SRC_ROOT/Cada detalhe desta cozinha foi pensada para unir a praticidade e estilo, criando um espaço único e aconchegante. "
copy_album "escadaria-madeira-microcimento" "$SRC_ROOT/Escadas em Madeira e Corrimão com Paredes em Microcimento. "
copy_album "moradia-ca-palmeira" "$SRC_ROOT/Moradia C&A, Palmeira"
copy_album "projeto-bertrand" "$SRC_ROOT/Projeto Bertrand Uma obra com História"

rsync -a --delete "$SRC_ROOT/" "$ROOT/bpcarpintarioa/"
echo "Catálogo sincronizado."
