/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { ConfirmationDialogPom, MetadataDisplayPom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { Cy, CyApiDetails, CyPom } from "@orch-ui/tests";
import {
  clusterEmptyNodes,
  clusterOne,
  regionPortlandId,
} from "@orch-ui/utils";
import { ClusterPerformanceCardPom } from "../../atom/ClusterPerformanceCard/ClusterPerformanceCard.pom";
import DeploymentInstancesTablePom from "../../organism/clusterDetail/DeploymentInstancesTable/DeploymentInstancesTable.pom";
import ClusterNodesTablePom from "../../organism/ClusterNodesTable/ClusterNodesTable.pom";

const dataCySelectors = [
  "clusterDetailHeading",
  "clusterDetailPopup",
  "clusterDetailStatus",
  "clusterDetailGeneralInfoTable",
  "clusterDetailTabs",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type ClusterSuccessApiAliases =
  | "getClusterSuccess"
  | "deleteCluster"
  | "getClusterEmptyNodes";
type HostSuccessApiAliases = "getFirstHostData";
type SiteSuccessApiAliases = "getSiteData";
type ClusterErrorApiAliases = "getClusterError";
type KubeconfigApiAliases = "getKubeconfig";
type ApiAliases =
  | ClusterSuccessApiAliases
  | HostSuccessApiAliases
  | SiteSuccessApiAliases
  | ClusterErrorApiAliases
  | KubeconfigApiAliases;

const route = "**v2/**/clusters/**";
const kubeconfigRoute = "**/v2/**/clusters/kubeconfigs/**";
const firstHostRoute = "**/v1/projects/**/compute/hosts/**";
const siteRoute = "/v1/projects/**/regions/**/sites/**";

const siteRestaurantOne: infra.SiteRead = {
  name: "Restaurant 01",
  region: { name: regionPortlandId },
  resourceId: "site-1",
};

const successClusterEndpoints: CyApiDetails<
  ClusterSuccessApiAliases,
  cm.GetV2ProjectsByProjectNameClustersAndNameApiResponse
> = {
  getClusterSuccess: {
    route: route,
    statusCode: 200,
    response: clusterOne,
  },
  deleteCluster: {
    route: `${route}/*`,
    method: "DELETE",
    statusCode: 200,
  },
  getClusterEmptyNodes: {
    route: route,
    statusCode: 200,
    response: clusterEmptyNodes,
  },
};
const successHostEndpointconst: CyApiDetails<
  HostSuccessApiAliases,
  infra.GetV1ProjectsByProjectNameComputeHostsAndHostIdApiResponse
> = {
  getFirstHostData: {
    route: firstHostRoute,
    statusCode: 200,
    response: {
      resourceId: "test-host",
      name: "Host One",
      site: siteRestaurantOne,
    },
  },
};

const successSiteEndpoint: CyApiDetails<
  SiteSuccessApiAliases,
  infra.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse
> = {
  getSiteData: {
    route: siteRoute,
    statusCode: 200,
    response: siteRestaurantOne,
  },
};

const errorClusterEndpoint: CyApiDetails<ClusterErrorApiAliases> = {
  getClusterError: {
    route: route,
    statusCode: 404,
    response: {
      status: 404,
      detail: "No resources found",
    },
  },
};

const kubeconfigEndpoint: CyApiDetails<
  KubeconfigApiAliases,
  cm.GetV2ProjectsByProjectNameClustersAndNameKubeconfigsApiResponse
> = {
  getKubeconfig: {
    route: kubeconfigRoute,
    statusCode: 200,
    response: {
      kubeconfig: "testing",
    },
  },
};

export class ClusterDetailPom extends CyPom<Selectors, ApiAliases> {
  public table: SiTablePom;
  public testClusterId = clusterOne.name;
  public testCluster = clusterOne;
  public testSite = siteRestaurantOne;
  public deploymentMetadataPom: MetadataDisplayPom;
  public performanceChartPoms: {
    cpu: ClusterPerformanceCardPom;
    memory: ClusterPerformanceCardPom;
    storage: ClusterPerformanceCardPom;
  };
  public clusterHostTablePom: ClusterNodesTablePom;
  public confirmationDialogPom: ConfirmationDialogPom;
  public deploymentInstancesTablePom: DeploymentInstancesTablePom;

  constructor(public rootCy: string = "clusterDetail") {
    super(rootCy, [...dataCySelectors], {
      ...successClusterEndpoints,
      ...successHostEndpointconst,
      ...successSiteEndpoint,
      ...errorClusterEndpoint,
      ...kubeconfigEndpoint,
    });
    this.deploymentMetadataPom = new MetadataDisplayPom();
    this.performanceChartPoms = {
      cpu: new ClusterPerformanceCardPom("cpuChart"),
      memory: new ClusterPerformanceCardPom("memoryChart"),
      storage: new ClusterPerformanceCardPom("storageChart"),
    };
    this.clusterHostTablePom = new ClusterNodesTablePom();
    this.confirmationDialogPom = new ConfirmationDialogPom();
    this.deploymentInstancesTablePom = new DeploymentInstancesTablePom();
  }

  getGeneralInfoValueByKey(key: string): Cy {
    return this.el.clusterDetailGeneralInfoTable.contains(key).siblings();
  }

  gotoTab(tabName: string): Cy {
    return this.el.clusterDetailTabs.contains(tabName).click();
  }
}
