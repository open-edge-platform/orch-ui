/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm, eim } from "@orch-ui/apis";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { clusterOne, ClusterStore, regionPortlandId } from "@orch-ui/utils";

const dataCySelectors = ["clusterDropdown"] as const;
type Selectors = (typeof dataCySelectors)[number];

const site: eim.SiteRead = {
  siteID: "restaurant-one",
  resourceId: "restaurant-one",
  inheritedMetadata: {
    location: [
      {
        key: "region",
        value: "region-portland",
      },
    ],
  },
  name: "Restaurant 01",
  region: { name: regionPortlandId, resourceId: regionPortlandId },
};

export const hostOne: eim.HostRead = {
  resourceId: "host-dh38bjw9",
  uuid: "4c4c4544-0044-4210-8031-c2c04f305239",
  name: "host-unassign1",
  instance: {
    instanceID: "instance-dhaaabbb",
    name: "Instance One",
    resourceId: "host-dh38bjw9",
    //status: "INSTANCE_STATUS_RUNNING",
    kind: "INSTANCE_KIND_METAL",
    //hostID: "host-dh38bjw9",
    //osID: "os-ubuntu",
    os: {
      osResourceID: "os-ubuntu",
      architecture: "x86_64",
      name: "os-ubuntu",
      repoUrl: "repoUrl",
      kernelCommand: "kernelCommand",
      updateSources: ["updateResources"],
      sha256:
        "09f6e5d55cd9741a026c0388d4905b7492749feedbffc741e65aab35fc38430d",
    },
    workloadMembers: [
      {
        resourceId: "instance-dhaabbb",
        instance: { instanceID: "instance-dhaaabbb" },
        //instanceId: "instance-dhaaabbb",
        kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
        //workloadId: "clusterOneName",
        workloadMemberId: "clusterOneName",
      },
    ],
  },
  hostStatus: {
    indicator: "STATUS_INDICATION_IDLE",
    message: "",
    timestamp: 0,
  },
  // state: {
  //   timestamp: "",
  //   condition: "",
  //   type: "STATUS_CONDITION_RUNNING",
  // },
  // siteId: site.siteID,
  site: site,
  metadata: [
    {
      key: "customer",
      value: "culvers",
    },
    {
      key: "regions",
      value: "north-west",
    },
    {
      key: "states",
      value: "california",
    },
  ],
  serialNumber: "ec269d77-9b98-bda3-2f68-61fe4428a8da",
};

type SuccessClusterApiAliases = "getClusters" | "getClusterById" | "putCluster";
type SuccessHostApiAliases = "getHostById";
type SuccessSiteApiAliases = "getSiteById";

type ApiAliases =
  | SuccessClusterApiAliases
  | SuccessHostApiAliases
  | SuccessSiteApiAliases;

const clusterRoute = "**/v1/**/clusters";
const hostByIdRoute = `**/v1/projects/${defaultActiveProject.name}/compute/hosts/**`;
const siteByIdRoute = `**/v1/projects/${defaultActiveProject.name}/regions/**/sites/**`;

const clusterList = new ClusterStore().list();
const clusterSuccessEndpoint: CyApiDetails<
  SuccessClusterApiAliases,
  | cm.GetV2ProjectsByProjectNameClustersApiResponse
  | cm.GetV2ProjectsByProjectNameClustersAndNameApiResponse
> = {
  getClusters: {
    route: `${clusterRoute}*`,
    statusCode: 200,
    response: {
      clusters: clusterList,
      totalElements: clusterList.length,
    },
  },
  getClusterById: {
    route: `${clusterRoute}/*`,
    statusCode: 200,
    response: clusterOne,
  },
  putCluster: {
    method: "PUT",
    route: `${clusterRoute}/**/nodes`,
    statusCode: 200,
  },
};

const hostSuccessEndpoint: CyApiDetails<
  SuccessHostApiAliases,
  eim.GetV1ProjectsByProjectNameComputeHostsAndHostIdApiResponse
> = {
  getHostById: {
    route: hostByIdRoute,
    statusCode: 200,
    response: hostOne,
  },
};

const siteSuccessEndpoint: CyApiDetails<
  SuccessSiteApiAliases,
  eim.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse
> = {
  getSiteById: {
    route: siteByIdRoute,
    statusCode: 200,
    response: {
      siteID: "test-site",
      name: "Portland",
    },
  },
};

class AddToClusterDrawerPom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = "addToClusterDrawer") {
    super(rootCy, [...dataCySelectors], {
      ...clusterSuccessEndpoint,
      ...hostSuccessEndpoint,
      ...siteSuccessEndpoint,
    });
  }
}
export default AddToClusterDrawerPom;
