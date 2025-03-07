/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import { TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { clusterA, clusterB } from "@orch-ui/utils";
import SiteByClusterPom from "../../atoms/SiteByCluster/SiteByCluster.pom";
import { dataCy } from "./DeploymentSiteSummary";

const dataCySelectors = ["siteTable"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "clustersList"
  | "clustersListPage1"
  | "clustersListPage2"
  | "clustersListWithFilter"
  | "clustersListWithOrder";

const deploymentClustersApiUrl =
  "**/v1/projects/**/appdeployment/deployments/**/clusters*";

const generateCluster = (
  clusterMock: adm.ClusterRead,
  length = 10,
  startIndex = 0,
) =>
  [...Array(length).keys()].map((index) => ({
    ...clusterMock,
    id: `cluster-${index + startIndex}`,
    name: `Cluster ${index + startIndex}`,
  }));

const apis: CyApiDetails<
  ApiAliases,
  adm.DeploymentServiceListDeploymentClustersApiResponse
> = {
  clustersList: {
    route: deploymentClustersApiUrl,
    statusCode: 200,
    response: {
      clusters: [
        { ...clusterA, status: { ...clusterA.status, state: "DOWN" } },
        { ...clusterB, status: { ...clusterB.status, state: "RUNNING" } },
      ],
      totalElements: 2,
    },
  },
  clustersListPage1: {
    route: deploymentClustersApiUrl,
    statusCode: 200,
    response: {
      clusters: generateCluster(clusterA, 10),
      totalElements: 18,
    },
  },
  clustersListPage2: {
    route: `${deploymentClustersApiUrl}*offset=10*`,
    statusCode: 200,
    response: {
      clusters: generateCluster(clusterA, 8, 10),
      totalElements: 18,
    },
  },
  clustersListWithFilter: {
    route: `${deploymentClustersApiUrl}*filter=name%3DtestingSearch*`,
    statusCode: 200,
    response: {
      clusters: [clusterA, clusterB],
      totalElements: 2,
    },
  },
  clustersListWithOrder: {
    route: `${deploymentClustersApiUrl}*orderBy=status.state%20asc*`,
    statusCode: 200,
    response: {
      clusters: [clusterA, clusterB],
      totalElements: 2,
    },
  },
};

class DeploymentSiteSummaryPom extends CyPom<Selectors, ApiAliases> {
  public table: TablePom;
  public tableUtils: SiTablePom;
  public siteByClusterPom: SiteByClusterPom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], apis);
    this.table = new TablePom("table");
    this.tableUtils = new SiTablePom("table");
    this.siteByClusterPom = new SiteByClusterPom();
  }
}
export default DeploymentSiteSummaryPom;
