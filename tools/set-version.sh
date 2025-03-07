#!/usr/bin/env bash

# Copyright 2023 Intel Corp.
# SPDX-License-Identifier: LicenseRef-Intel

CYAN='\033[0;36m'
NC='\033[0m' # No Color

if [ -n "$1" ]
then
  app="$1"
else
  echo "ERROR: missing required app parameter"
  exit 1
fi

if [ -n "$2" ]
then
  new_version="$2"
else
  echo "ERROR: missing required version parameter"
  exit 1
fi

echo "$new_version" > "apps/$app/VERSION"
make -C "apps/$app" apply-version
helm dep update apps/$app/deploy/

echo -e "${CYAN}Version has been update to $new_version in $app ${NC}"
echo "Make sure all APIs point to released versions with 'make check-valid-api'"
