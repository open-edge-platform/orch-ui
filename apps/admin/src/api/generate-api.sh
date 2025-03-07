#!/bin/bash

#
# SPDX-FileCopyrightText: (C) 2023 Intel Corporation
# SPDX-License-Identifier: Apache-2.0
#

YELLOW="\033[1;33m"
GREEN="\033[0;32m"
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}Generate RTK endpoints for Observability and Monitoring APIs${NC}"
npx @rtk-query/codegen-openapi ./src/api/observabilityMonitor.config.json

echo -e "${CYAN}Applying code styles to generated files${NC}"
npx prettier --write ./src/api/src/**/*Slice.ts
