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
    "amr-registry.caas.intel.com"
    "devtoolbox"
    "edge I"
    "Edge iaas"
    "Edge-I"
    "Edge-infra"
    "edgei"
    "Eim"
    "ensp"
    "Fleet management"
    "fleetmanagement"
    "fmaas"
    "Iaas"
    "Ifm"
    "intel-innersource"
    "itep"
    "ledge park i"
    "Ledge park-I"
    "Ledge park"
    "ledgepark"
    "ledgeparki"
    "lp-I"
    "Lpi"
    "maestro I"
    "Maestro-I"
    "Maestro"
    "maestroi"
    "one-intel-edge"
    "One Intel Edge"
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
)

ignore_dirs=(
    ".git"
    "node_modules"
    "lib"
    "dist"
    "./library/@orch-utils"
    "./tools/forbidden-words.sh"
    "coverage"
    ".nyc_output"
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
    matches=$(grep -r -i -n "${exclude_opts[@]}" "$word" . || true)
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