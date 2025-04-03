/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { deploymentOne } from "@orch-ui/utils";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "getDeploymentById";

const endpoints: CyApiDetails<ApiAliases> = {
  getDeploymentById: {
    route: "**/appdeployment/deployments/*",
    statusCode: 200,
    response: { deployment: deploymentOne },
  },
};

export class DeploymentLinkPom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = "deploymentLink") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
