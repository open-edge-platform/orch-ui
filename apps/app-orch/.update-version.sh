#!/usr/bin/env bash

# Copyright 2023 Intel Corp.
# SPDX-License-Identifier: LicenseRef-Intel

if [ -n "$1" ]
then
  new_version="$1"
else
  echo "ERROR: missing required version parameter"
  exit 1
fi

app_name=$(basename "$(pwd)")
echo "Current directory before cd: $(pwd)"
cd ../../
echo "Current directory after cd: $(pwd)"
echo "Checking if tools directory exists: $(ls -la | grep tools)"

bash ./tools/set-version.sh "$app_name" "$new_version"
