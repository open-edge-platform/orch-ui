#!/bin/bash

#
# SPDX-FileCopyrightText: (C) 2023 Intel Corporation
# SPDX-License-Identifier: Apache-2.0
#

set -e

# Initialize variables
prefix=""

# Parse command-line options
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --prefix)
            prefix="$2"
            shift 2
            ;;
    esac
done

CYAN='\033[0;36m'
NC='\033[0m' # No Color

#---------------------------------------------------------------------------

echo -e "${CYAN}Generate RTK endpoints APIs${NC}"

#echo -e "${CYAN}Generate TENANT_MANAGER RTK endpoints APIs${NC}"
#npx @rtk-query/codegen-openapi ${prefix}tenancy/tenancyDataModel.config.json

echo -e "${CYAN}Generate EDGE_INFRA_MANAGER RTK endpoints APIs${NC}"
npx @rtk-query/codegen-openapi ${prefix}eim/eimApis.config.json

echo -e "${CYAN}Generate CLUSTER_MANAGER RTK endpoints APIs${NC}"
npx @rtk-query/codegen-openapi ${prefix}cluster-manager/clusterManagerApis.config.json

# echo -e "${CYAN}Generate APP_CATALOG RTK endpoints APIs${NC}"
# npx @rtk-query/codegen-openapi ${prefix}app-catalog/appCatalogApis.config.json

# echo -e "${CYAN}Generate APP_CATALOG_UTILITIES RTK endpoints APIs${NC}"
# npx @rtk-query/codegen-openapi ${prefix}app-utilities/appUtilitiesApis.config.json

# echo -e "${CYAN}Generate APP_DEPLOYMENT_MGR RTK endpoints APIs${NC}"
# npx @rtk-query/codegen-openapi ${prefix}app-deploy-mgr/appDeployMgr.config.json

# echo -e "${CYAN}Generate APP_RESOURCE_MGR RTK endpoints APIs${NC}"
# npx @rtk-query/codegen-openapi ${prefix}app-resource-mgr/appResourceMgr.config.json

# echo -e "${CYAN}Generate METADATA_BROKER RTK endpoints APIs${NC}"
# npx @rtk-query/codegen-openapi ${prefix}metadata-broker/mdbApis.config.json

echo -e "${CYAN}Generate OBSERVABILITY_MONITOR RTK endpoints APIs${NC}"
npx @rtk-query/codegen-openapi ${prefix}observabilityMonitor/observabilityMonitor.config.json

npm run library:fix
