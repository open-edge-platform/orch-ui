#!/usr/bin/env bash

# Copyright 2023 Intel Corp.
# SPDX-License-Identifier: Apache-2.0

CYAN='\033[0;36m'
NC='\033[0m' # No Color

if [ -n "$1" ]
then
  new_version="$1"
else
  echo "ERROR: missing required version parameter"
  exit 1
fi

packagejson_update=$(jq --arg nv "$new_version" '.version = $nv' "package.json")
echo "$packagejson_update" > "package.json"
make apply-version
helm dep update ./deploy/
npm install

echo -e "${CYAN}Version has been update to $new_version${NC}"
echo "Make sure all APIs point to released versions with 'make check-valid-api'"
