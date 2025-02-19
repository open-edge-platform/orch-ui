/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { adm } from "@orch-ui/apis";
import { RibbonPom, TablePom } from "@orch-ui/components";
import { Cy, CyApiDetails, cyGet, CyPom } from "@orch-ui/tests";
import { deploymentOne, DeploymentsStore } from "@orch-ui/utils";
import DeploymentUpgradeAvailabilityStatusPom from "../../../atoms/DeploymentUpgradeAvailabilityStatus/DeploymentUpgradeAvailabilityStatus.pom";
import { DeploymentUpgradeModalPom } from "../DeploymentUpgradeModal/DeploymentUpgradeModal.pom";

const dataCySelectors = ["empty", "search", "addDeploymentButton"] as const;
type Selectors = (typeof dataCySelectors)[number];

type SuccessDeploymentsApiAliases =
  | "getSingleDeploymentsList"
  | "getDeploymentsList"
  | "getEmptyDeploymentsList"
  | "getDeploymentsListPage1Size10"
  | "getDeploymentsListPage1Size18"
  | "getDeploymentsListPage2Size18"
  | "getDeploymentsListWithSearchFilter"
  | "getDeploymentsListWithOrderByNameAsc"
  | "getDeploymentsListWithOrderByNameDesc";
type ErrorDeploymentsApiAliases = "getDeploymentsListError";
type SuccessDeleteDeploymentApiAliases = "deleteDeploymentByDeployId";
type ApiAliases =
  | SuccessDeploymentsApiAliases
  | ErrorDeploymentsApiAliases
  | SuccessDeleteDeploymentApiAliases;

const deploymentsApiUrl = "**/v1/projects/**/appdeployment/deployments*";
const deploymentStore = new DeploymentsStore();
const generateDeploymentList = (
  listSize: number,
  offset: number,
  update: any = {},
): adm.Deployment[] => {
  return [...Array(listSize).keys()].map((i) => ({
    ...deploymentOne,
    displayName: `Deployment ${i + 1 + offset}`,
    name: `deployment-${i + 1 + offset}`,
    ...update,
  }));
};
export const successDeploymentsEndpoints: CyApiDetails<
  SuccessDeploymentsApiAliases,
  adm.DeploymentServiceListDeploymentsApiResponse
> = {
  getSingleDeploymentsList: {
    route: deploymentsApiUrl,
    response: {
      deployments: [deploymentOne],
      totalElements: 1,
    },
  },
  getDeploymentsList: {
    route: deploymentsApiUrl,
    statusCode: 200,
    response: {
      deployments: deploymentStore.list(),
      totalElements: deploymentStore.list().length,
    },
  },
  getEmptyDeploymentsList: {
    route: deploymentsApiUrl,
    statusCode: 200,
    response: {
      deployments: [],
      totalElements: 0,
    },
  },
  getDeploymentsListPage1Size10: {
    route: `${deploymentsApiUrl}offset=0&orderBy=**&pageSize=10`,
    statusCode: 200,
    response: {
      deployments: generateDeploymentList(10, 0),
      totalElements: 10,
    },
  },
  getDeploymentsListPage1Size18: {
    route: `${deploymentsApiUrl}offset=0&orderBy=**&pageSize=10`,
    statusCode: 200,
    response: {
      deployments: generateDeploymentList(10, 0),
      totalElements: 18,
    },
  },
  getDeploymentsListPage2Size18: {
    route: `${deploymentsApiUrl}offset=10&orderBy=**&pageSize=10`,
    statusCode: 200,
    response: {
      deployments: generateDeploymentList(8, 10),
      totalElements: 18,
    },
  },
  getDeploymentsListWithSearchFilter: {
    route: `${deploymentsApiUrl}filter=*`,
    statusCode: 200,
    response: {
      deployments: generateDeploymentList(8, 0, {
        appName: "test-filter",
      }),
      totalElements: 8,
    },
  },
  getDeploymentsListWithOrderByNameAsc: {
    route: `${deploymentsApiUrl}orderBy=name%20asc**`,
    statusCode: 200,
    response: {
      deployments: generateDeploymentList(10, 0),
      totalElements: 10,
    },
  },
  getDeploymentsListWithOrderByNameDesc: {
    route: `${deploymentsApiUrl}orderBy=name%20desc**`,
    statusCode: 200,
    response: {
      deployments: generateDeploymentList(10, 0).reverse(),
      totalElements: 10,
    },
  },
};

export const errorDeploymentsEndpoints: CyApiDetails<
  ErrorDeploymentsApiAliases,
  adm.DeploymentServiceListDeploymentsApiResponse
> = {
  getDeploymentsListError: {
    route: deploymentsApiUrl,
    statusCode: 500,
  },
};

export const successDeleteDeploymentEndpoints: CyApiDetails<
  SuccessDeleteDeploymentApiAliases,
  adm.DeploymentServiceDeleteDeploymentApiResponse
> = {
  deleteDeploymentByDeployId: {
    method: "DELETE",
    route: "**/v1/projects/**/appdeployment/deployments/**",
    statusCode: 200,
  },
};

export class DeploymentsTablePom extends CyPom<Selectors, ApiAliases> {
  public ribbon: RibbonPom;
  public tablePom: TablePom;
  public upgradePom: DeploymentUpgradeModalPom;
  public upgradeStatusPom: DeploymentUpgradeAvailabilityStatusPom;
  constructor(public rootCy: string = "deploymentsTable") {
    super(rootCy, [...dataCySelectors], {
      ...successDeploymentsEndpoints,
      ...errorDeploymentsEndpoints,
      ...successDeleteDeploymentEndpoints,
    });
    this.tablePom = new TablePom();
    this.ribbon = new RibbonPom();
    this.upgradePom = new DeploymentUpgradeModalPom();
    this.upgradeStatusPom = new DeploymentUpgradeAvailabilityStatusPom();
  }

  // TODO: Move this to @orch-ui/components Table component
  public getRowBySearchText(searchFor: string): Cy<HTMLTableRowElement> {
    return this.root.contains(searchFor).closest("tr");
  }

  public getConfirmationDialog() {
    return cyGet("dialog");
  }
}
