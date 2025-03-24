#!/usr/bin/env bash

# SPDX-FileCopyrightText: 2025 Intel Corporation
#
# SPDX-License-Identifier: Apache-2.0

set -o errexit
set -o pipefail
set -o nounset

if [ -n "${TRACE:-}" ]; then
    set -o xtrace
fi

fail_on_match="${1:-true}"

# Keep list sorted in ascending order 🙏. Will search case insensitive so no need to add upper/lower case variants.
forbidden_words=(
    "amr-registry"
    "devtoolbox"
    "edge i"
    "edge iaas"
    "edge-i"
    "edgei"
    "eim"
    "ensp"
    "Fleet management"
    "fleetmanagement"
    "fmaas"
    "Iaas"
    "Ifm"
    "innersource"
    "itep"
    "Ledge park"
    "ledgepark"
    "lp-I"
    "Lpi"
    "maestro"
    "maestro-a"
    "maestroa"
    "maestro-c"
    "maestroc"
    "maestro-i"
    "maestroi"
    "one-intel-edge"
    "One Intel Edge"
    "open-registry"
    "proxy-dmz.intel.com"
    "proxy.intel.com"
    "springboard"
    "strata"
    "tiber"
    "wireless guardian"
    "Wirelessguardian"
)

ignore_globs=(
    "*.bin"
    "*.dll"
    "*.exe"
    "*.o"
    "*.so"
    "*.log"
    "*forbidden-words.sh"
)

ignore_dirs=(
    ".git"
    "lint-forbidden-words"
    "node_modules"
    "lib"
    "dist"
    "./library/@orch-utils"
    "coverage"
    ".nyc_output"
    "./tests/cypress/logs"
    "./tests/cypress/reports"
)

found=0
total_matches=0

# Build the grep exclude options
exclude_opts=()
for glob in "${ignore_globs[@]}"; do
    exclude_opts+=(--exclude="$glob")
done
for dir in "${ignore_dirs[@]}"; do
    exclude_opts+=(--exclude-dir="$dir")
done

for word in "${forbidden_words[@]}"; do
    matches=$(grep -r -w -i -n "${exclude_opts[@]}" "$word" . || true)
    match_count=$(echo "$matches" | wc -l)
    echo "---"
    if [ "$match_count" -gt 1 ]; then
        echo "Found $match_count occurrences of: $word"
        echo "$matches"
        found=1
        total_matches=$((total_matches + match_count))
    else
        echo "No occurrences found for: $word"
    fi
done

echo "---"
echo "Total number of matches: $total_matches"

if [ "$fail_on_match" = "true" ]; then
    exit $found
else
    exit 0
fi