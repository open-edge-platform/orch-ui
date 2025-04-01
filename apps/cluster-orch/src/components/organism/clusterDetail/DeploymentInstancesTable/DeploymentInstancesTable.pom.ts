/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import { TablePom } from "@orch-ui/components";
import { CyApiDetails, CyPom } from "@orch-ui/tests";

const deploymentsPerCluster: adm.DeploymentServiceListDeploymentsPerClusterApiResponse =
  {
    deploymentInstancesCluster: [
      {
        apps: [
          {
            id: "appId1",
            name: "appName",
            status: {
              message: "appMessage",
              state: "RUNNING",
              summary: {
                down: 2,
                running: 3,
                total: 5,
                type: "appStatusType",
              },
            },
          },
        ],
        deploymentDisplayName: "deploymentDisplayName",
        deploymentName: "deploymentName",
        deploymentUid: "deploymentUid",
        status: {
          message: "deploymentStatusMessage",
          state: "RUNNING",
          summary: {
            down: 2,
            running: 3,
            total: 5,
            type: "deploymentStatusType",
          },
        },
      },
    ],
    totalElements: 1,
  };

const dataCySelectors = ["messageBanner"] as const;
type Selectors = (typeof dataCySelectors)[number];
const deploymentWithoutUid = structuredClone(deploymentsPerCluster);
delete deploymentWithoutUid.deploymentInstancesCluster[0].deploymentUid;

type ApiAliases =
  | "getDeploymentInstances200"
  | "getDeploymentMissingUid"
  | "getDeploymentInstancesEmpty"
  | "getDeploymentInstances500";

const route = "v1/**/deployments/clusters/**";
const endpoints: CyApiDetails<
  ApiAliases,
  adm.DeploymentServiceListDeploymentsPerClusterApiResponse
> = {
  getDeploymentInstances200: {
    route,
    statusCode: 200,
    response: deploymentsPerCluster,
  },
  getDeploymentMissingUid: {
    route,
    statusCode: 200,
    response: deploymentWithoutUid,
  },
  getDeploymentInstancesEmpty: {
    route,
    statusCode: 200,
    response: { deploymentInstancesCluster: [], totalElements: 0 },
  },
  getDeploymentInstances500: {
    route,
    networkError: true,
    statusCode: 500,
  },
};

class DeploymentInstancesTablePom extends CyPom<Selectors, ApiAliases> {
  public table = new TablePom();
  constructor(public rootCy: string = "deploymentInstancesTable") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
export default DeploymentInstancesTablePom;
