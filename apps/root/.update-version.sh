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

bash ./tools/set-version.sh "root" "$new_version"
