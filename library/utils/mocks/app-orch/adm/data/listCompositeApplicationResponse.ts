/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { smallResponse } from "../../catalog/data/compositeApplication";

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/packages.ts instead
 */
export const mock: catalog.ListDeploymentPackagesResponse = {
  deploymentPackages: smallResponse,
  totalElements: 1,
};
