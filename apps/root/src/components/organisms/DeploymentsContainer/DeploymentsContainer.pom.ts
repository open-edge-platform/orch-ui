/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import { EmptyPom } from "@orch-ui/components";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { deployments } from "@orch-ui/utils";
import DeploymentDetailsTablePom from "../../molecules/DeploymentDetailsTable/DeploymentDetailsTable.pom";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "getDeployments"
  | "getDeployments404"
  | "getDeploymentsWithFilter";

const baseRoute = "/**v1/projects/**/appdeployment/deployments*";

const endpoints: CyApiDetails<
  ApiAliases,
  adm.DeploymentServiceListDeploymentsApiResponse
> = {
  getDeployments: {
    route: `${baseRoute}?*`,
    statusCode: 200,
    response: deployments,
  },
  getDeployments404: {
    route: `${baseRoute}?*`,
    statusCode: 200,
    response: {
      deployments: [],
      totalElements: 0,
    },
  },
  getDeploymentsWithFilter: {
    route: `${baseRoute}?labels=customer%3Dmenards*`,
    statusCode: 200,
    response: deployments,
  },
};

export class DeploymentsContainerPom extends CyPom<Selectors, ApiAliases> {
  public empty = new EmptyPom();
  public deploymentDetailsTablePom: DeploymentDetailsTablePom;

  constructor(public rootCy: string = "deploymentsContainer") {
    super(rootCy, [...dataCySelectors], endpoints);
    this.deploymentDetailsTablePom = new DeploymentDetailsTablePom();
  }
}
