/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { packageOne } from "@orch-ui/utils";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "getVersionList"
  | "getEmptyVersionList"
  | "getVersionError"
  | "getVersionListForUpdateAvailable";

const project = defaultActiveProject.name;
const versionApiUrl = `/v3/projects/${project}/catalog/deployment_packages/**/versions`;
const generateVersionList = (size: number): catalog.DeploymentPackage[] =>
  [...Array(size).keys()].map((i) => ({
    ...packageOne,
    version: `1.0.${i}`,
  }));
export const versionEndpoints: CyApiDetails<
  ApiAliases,
  catalog.GetDeploymentPackageVersionsResponse
> = {
  getVersionList: {
    route: versionApiUrl,
    response: {
      deploymentPackages: generateVersionList(10),
    },
  },
  getVersionListForUpdateAvailable: {
    route: versionApiUrl,
    response: {
      deploymentPackages: [
        { ...packageOne, name: "upgrade-test-app", version: "2.0.10" },
      ],
    },
  },
  getEmptyVersionList: {
    response: {
      deploymentPackages: [],
    },
    route: versionApiUrl,
  },
  getVersionError: {
    route: versionApiUrl,
    statusCode: 500,
  },
};

class DeploymentUpgradeAvailabilityStatusPom extends CyPom<
  Selectors,
  ApiAliases
> {
  constructor(public rootCy: string = "deploymentUpgradeAvailabilityStatus") {
    super(rootCy, [...dataCySelectors], versionEndpoints);
  }
}
export default DeploymentUpgradeAvailabilityStatusPom;
