/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm, catalog } from "@orch-ui/apis";
import { Cy, CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import {
  CompositeApplicationOneVersionList,
  CompositeApplicationOneVersionOne,
  deploymentWithUpgradingState,
} from "@orch-ui/utils";

const dataCySelectors = [
  "selectDeploymentVersion",
  "upgradeBtn",
  "cancelBtn",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type DeploymentUpgradeApiAliases =
  | "postUpgradeDeploymentsList"
  | "postUpgradeDeploymentsList400Error"
  | "postUpgradeDeploymentsList500Error";

type VersionApiAliases =
  | "singleVersionList"
  | "multipleVersionList"
  | "emptyVersionList"
  | "versionError400"
  | "versionError500";

const project = defaultActiveProject.name;
const versionApiUrl = `**/v3/projects/${project}/catalog/deployment_packages/**/versions`;
const deploymentsUpgradeApiUrl =
  "**/v1/projects/**/appdeployment/deployments/*";

interface UpgradeErrorResponse {
  message: string;
}

export const versionApis: CyApiDetails<VersionApiAliases> = {
  singleVersionList: {
    route: versionApiUrl,
    response: {
      deploymentPackages: [CompositeApplicationOneVersionOne],
    } as catalog.GetDeploymentPackageVersionsResponse,
  },
  multipleVersionList: {
    route: versionApiUrl,
    response: {
      deploymentPackages: CompositeApplicationOneVersionList,
    } as catalog.GetDeploymentPackageVersionsResponse,
  },
  emptyVersionList: {
    response: {
      deploymentPackages: [],
    } as catalog.GetDeploymentPackageVersionsResponse,
    route: versionApiUrl,
  },
  versionError400: {
    route: versionApiUrl,
    statusCode: 400,
    networkError: true,
  },
  versionError500: {
    route: versionApiUrl,
    statusCode: 500,
  },
};

export const deploymentsUpgradeApis: CyApiDetails<
  DeploymentUpgradeApiAliases,
  adm.DeploymentServiceUpdateDeploymentApiResponse | UpgradeErrorResponse
> = {
  postUpgradeDeploymentsList: {
    method: "put",
    route: deploymentsUpgradeApiUrl,
    response: {
      deployment: deploymentWithUpgradingState,
    },
  },
  postUpgradeDeploymentsList400Error: {
    method: "put",
    route: deploymentsUpgradeApiUrl,
    statusCode: 400,
    response: { message: "400 error" },
  },
  postUpgradeDeploymentsList500Error: {
    method: "put",
    route: deploymentsUpgradeApiUrl,
    statusCode: 500,
    response: { message: "500 error" },
  },
};

export class DeploymentUpgradeModalPom extends CyPom<
  Selectors,
  VersionApiAliases | DeploymentUpgradeApiAliases
> {
  constructor(public rootCy: string = "deploymentUpgradeModal") {
    super(rootCy, [...dataCySelectors], {
      ...versionApis,
      ...deploymentsUpgradeApis,
    });
  }

  public getDescription(): Cy {
    return this.root.find(
      ".spark-message-banner-grid-column-message-column-content-message-description",
    );
  }
}
