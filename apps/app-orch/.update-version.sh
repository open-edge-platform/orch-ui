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

bash ./tools/set-version.sh "$new_version"
