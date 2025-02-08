/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { adm } from "@orch-ui/apis";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
//import { deploymentOne, DeploymentsStore } from "library/utils/mocks/app-orch/admin";
import {
  deploymentOne,
  DeploymentsStore,
  deploymentWithUpgradingState,
} from "@orch-ui/utils";
import { DeploymentsTablePom } from "../../organisms/deployments/DeploymentsTable/DeploymentsTable.pom";
import { DeploymentUpgradeModalPom } from "../../organisms/deployments/DeploymentUpgradeModal/DeploymentUpgradeModal.pom";

const dataCySelectors = ["aside", "deploymentsSearch"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "deploymentsListMock"
  | "deploymentsSingleListMock"
  | "deploymentUpgradedMock";

const deploymentsApiUrl = "**/deployment.orchestrator.apis/v1/**";

const deplStore = new DeploymentsStore();
const apis: CyApiDetails<
  ApiAliases,
  adm.DeploymentServiceListDeploymentsApiResponse
> = {
  deploymentsListMock: {
    route: deploymentsApiUrl,
    response: {
      deployments: deplStore.list(),
      totalElements: 3,
    },
  },
  deploymentsSingleListMock: {
    route: deploymentsApiUrl,
    response: {
      deployments: [deploymentOne],
      totalElements: 1,
    },
  },
  deploymentUpgradedMock: {
    route: deploymentsApiUrl,
    response: {
      deployments: [deploymentWithUpgradingState],
      totalElements: 1,
    },
  },
};

class DeploymentsPom extends CyPom<Selectors, ApiAliases> {
  public table = new DeploymentsTablePom();
  public deploymentUpgradeModal = new DeploymentUpgradeModalPom();

  constructor(public rootCy: string = "deployments") {
    super(rootCy, [...dataCySelectors], apis);
  }
}

export default DeploymentsPom;
