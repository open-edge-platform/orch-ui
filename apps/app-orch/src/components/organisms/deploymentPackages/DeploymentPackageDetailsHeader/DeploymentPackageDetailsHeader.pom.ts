/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { CyApiDetails, CyPom } from "@orch-ui/tests";

const dataCySelectors = ["dpTitle"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "deploymentPackageDelete";

const deploymentPackageEndpoints: CyApiDetails<
  ApiAliases,
  catalog.CatalogServiceDeleteDeploymentPackageApiResponse
> = {
  deploymentPackageDelete: {
    method: "DELETE",
    route: "**/deployment_packages/**",
    statusCode: 200,
  },
};

export class DeploymentPackageDetailsHeaderPom extends CyPom<
  Selectors,
  ApiAliases
> {
  constructor(public rootCy = "deploymentPackageDetailsHeader") {
    super(rootCy, [...dataCySelectors], deploymentPackageEndpoints);
  }

  clickPopupActionByActionName(actionName: string) {
    this.root.find("[data-cy='popup']").click().as("popup");
    return cy.get("@popup").contains(actionName).click();
  }
}
