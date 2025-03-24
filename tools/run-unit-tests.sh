#!/bin/bash

# Copyright 2023 Intel Corp.
# SPDX-License-Identifier: Apache-2.0

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color


if [ -n "$1" ]
then
  app="$1"
else
  echo "ERROR: missing required app parameter  admin|infra|app-orch|cluster-orch"
  exit 1
fi

TestsInSrcFolder="$(find apps/$app/src -type f -name "*.cy.ts*" | grep -v e2e)"
TestsInUnitTestsFile="$(cat apps/$app/unit-tests.cy.ts | grep import | grep -v "//")"
NumberOfTestsInSrcFolder=$(echo "$TestsInSrcFolder" | wc -l)
NumberOfTestsInUnitTestsFile=$(echo "$TestsInUnitTestsFile" | wc -l)


if [ $NumberOfTestsInSrcFolder -eq $NumberOfTestsInUnitTestsFile ]
then
  printf "${GREEN}${NumberOfTestsInSrcFolder} test files found and accounted for in unit-tests.cy.ts.${NC}\n"
else
  printf "${RED}Not all tests are imported in unit-tests.cy.ts${NC}\n"
  printf "Within the src folders: %s\n" "$NumberOfTestsInSrcFolder"
  printf "In unit-tests.cy.ts: %s\n" "$NumberOfTestsInUnitTestsFile"
  diff <(echo "$TestsInSrcFolder" | sort ) <(echo "$TestsInUnitTestsFile" | sed "s/import //" | sed "s/;//" | sed "s/\"//g" | sort )
  exit 1
fi

printf "${BLUE}Running all component tests...${NC}\n"
cd tests/$app
TZ="Asia/Kolkata" npx cypress run --component --spec ../../apps/$app/unit-tests.cy.ts

CYPRESS_RESULT="$(echo $?)"
if [ $CYPRESS_RESULT -eq 0 ]
then
  printf "All tests ${GREEN}pass${NC} !\n"
else
  printf "${RED}Not all Cypress tests passed !  Exiting...\n"
  exit 1
fi
