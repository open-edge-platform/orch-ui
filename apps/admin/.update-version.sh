#!/usr/bin/env bash

# Copyright 2025 Intel Corp.
# SPDX-License-Identifier: Apache-2.0

if [ -n "$1" ]
then
  new_version="$1"
else
  echo "ERROR: missing required version parameter"
  exit 1
fi

# Determine path relative to repository - don't assume we need to cd
echo "Current directory: $(pwd)"

# Check if VERSIONFILE is set and not empty
if [ -z "${VERSIONFILE}" ]; then
  echo "ERROR: VERSIONFILE environment variable is not set or empty"
  exit 1
fi


# Use the current VERSION file path to determine the app
VERSIONFILE_PATH="${VERSIONFILE}"
APP_DIR=$(dirname "$VERSIONFILE_PATH")
app_name=$(basename "$APP_DIR")

echo "Using app name: $app_name from path: $APP_DIR"

bash ./tools/set-version.sh "$app_name" "$new_version"
