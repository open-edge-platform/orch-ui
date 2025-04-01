/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import { TablePom } from "@orch-ui/components";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { clusterA } from "@orch-ui/utils";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type DeploymentClustersSuccessApiAliases =
  | "getClustersEmpty"
  | "getClustersListPage1Size10"
  | "getClustersListPage1Size18"
  | "getClustersListPage2Size18"
  | "getClustersListOrderByNameAsc"
  | "getClustersListOrderByNameDesc"
  | "getClustersListWithSearchFilter";
type DeploymentClustersErrorApiAliases = "getClustersError";
type ApiAliases =
  | DeploymentClustersSuccessApiAliases
  | DeploymentClustersErrorApiAliases;

const deploymentClustersApiUrl =
  "**v1/projects/**/appdeployment/deployments/**/clusters*";

const generateDeploymentClustersList = (size: number, offset = 0) => {
  return [...Array(size).keys()].map(
    (index): adm.ClusterRead => ({
      ...clusterA,
      name: `Cluster ${index + offset}`,
      id: `cluster-${index + offset}`,
    }),
  );
};
const clusterListPage1Size10 = generateDeploymentClustersList(10);
const clusterListPage2Size8 = generateDeploymentClustersList(8, 10);

const successClusterApis: CyApiDetails<
  DeploymentClustersSuccessApiAliases,
  adm.DeploymentServiceListDeploymentClustersApiResponse
> = {
  getClustersEmpty: {
    route: deploymentClustersApiUrl,
    statusCode: 200,
    response: {
      clusters: [],
      totalElements: 0,
    },
  },
  getClustersListPage1Size10: {
    route: `${deploymentClustersApiUrl}offset=0**`,
    statusCode: 200,
    response: {
      clusters: clusterListPage1Size10,
      totalElements: 10,
    },
  },
  getClustersListPage1Size18: {
    route: `${deploymentClustersApiUrl}offset=0**`,
    statusCode: 200,
    response: {
      clusters: clusterListPage1Size10,
      totalElements: 18,
    },
  },
  getClustersListPage2Size18: {
    route: `${deploymentClustersApiUrl}offset=10**`,
    statusCode: 200,
    response: {
      clusters: clusterListPage2Size8,
      totalElements: 18,
    },
  },
  getClustersListWithSearchFilter: {
    route: `${deploymentClustersApiUrl}filter=id%3Dtesting%20OR%20name%3Dtesting**`,
    statusCode: 200,
    response: {
      clusters: [...Array(3).keys()].map((index) => ({
        ...clusterA,
        id: `cluster-${index}`,
        name: "testing",
      })),
      totalElements: 3,
    },
  },
  getClustersListOrderByNameAsc: {
    route: `${deploymentClustersApiUrl}orderBy=id%20asc**`,
    statusCode: 200,
    response: {
      clusters: clusterListPage1Size10,
      totalElements: 10,
    },
  },
  getClustersListOrderByNameDesc: {
    route: `${deploymentClustersApiUrl}orderBy=id%20desc**`,
    statusCode: 200,
    response: {
      clusters: clusterListPage1Size10,
      totalElements: 10,
    },
  },
};

const errorClusterApis: CyApiDetails<
  DeploymentClustersErrorApiAliases,
  adm.DeploymentServiceListDeploymentClustersApiResponse
> = {
  getClustersError: {
    route: deploymentClustersApiUrl,
    statusCode: 500,
  },
};

class DeploymentDetailsTablePom extends CyPom<Selectors, ApiAliases> {
  public table: TablePom;
  constructor(public rootCy: string = "deploymentDetailsTable") {
    super(rootCy, [...dataCySelectors], {
      ...successClusterApis,
      ...errorClusterApis,
    });
    this.table = new TablePom(this.rootCy);
  }
}

export default DeploymentDetailsTablePom;
