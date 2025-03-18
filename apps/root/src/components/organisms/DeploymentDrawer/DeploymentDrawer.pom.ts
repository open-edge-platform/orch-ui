/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import { SiDrawerPom } from "@orch-ui/poms";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { deploymentOne } from "@orch-ui/utils";

const dataCySelectors = ["error", "deploymentDrawerContent"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "getDeployment" | "getDeployment404";

const baseRoute = "**/v1/projects/**/appdeployment/deployments/**";

const endpoints: CyApiDetails<
  ApiAliases,
  adm.DeploymentServiceGetDeploymentApiResponse
> = {
  getDeployment: {
    route: `${baseRoute}?`,
    statusCode: 200,
    response: {
      deployment: deploymentOne,
    },
  },
  getDeployment404: {
    route: `${baseRoute}?`,
    statusCode: 404,
  },
};

export class DeploymentDrawerPom extends CyPom<Selectors, ApiAliases> {
  public drawerPom: SiDrawerPom<Selectors, ApiAliases>;
  constructor(public rootCy: string = "deploymentDrawer") {
    super(rootCy, [...dataCySelectors], endpoints);
    this.drawerPom = new SiDrawerPom(
      this.rootCy,
      [...dataCySelectors],
      endpoints,
    );
  }
}
