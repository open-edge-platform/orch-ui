/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm } from "@orch-ui/apis";
import { BaseStore } from "../baseStore";
import { HostStore } from "../eim/store";
import {
  customersKey,
  customersOne,
  customersTwo,
  userDefinedKeyOne,
  userDefinedKeyTwo,
  userDefinedValueOne,
  userDefinedValueTwo,
} from "../metadata-broker";
import {
  selectClusterFiveV1,
  selectClusterFourV1,
  selectClusterOneV1,
  selectClusterThreeV1,
  selectClusterTwoV1,
} from "./clusterTemplates";
import {
  clusterFiveId,
  clusterFiveName,
  clusterFourId,
  clusterFourName,
  clusterOneId,
  clusterOneName,
  clusterSixId,
  clusterSixName,
  clusterThreeId,
  clusterThreeName,
  clusterTwoId,
  clusterTwoName,
} from "./data/clusterOrchIds";
import {
  nodeFive,
  nodeFour,
  nodeOne,
  nodeSix,
  nodeThree,
  nodeTwo,
} from "./data/nodes";

export type ClusterComplete = ecm.ClusterInfoRead & ecm.ClusterDetailInfoRead;

const lifecyclePhase: ecm.GenericStatusRead = {
  indicator: "STATUS_INDICATION_IDLE",
  message: "Running",
  timestamp: new Date().getTime(),
};

export const clusterInfo1: ecm.ClusterInfo = {
  clusterID: "clusterID1",
  clusterLabels: {},
  //extensionStatus: "Notready",
  kubernetesVersion: "1.0",
  locationList: [
    {
      locationInfo: "locationSiteName",
      locationType: "LOCATION_TYPE_SITE_NAME",
    },
    { locationInfo: "locationSiteId", locationType: "LOCATION_TYPE_SITE_ID" },
  ],
  name: "clusterInfoName",
  nodeQuantity: 1,
  status: "active",
};

export const clusterInfo2: ecm.ClusterInfo = {
  clusterID: "clusterID2",
  clusterLabels: {},
  //extensionStatus: "Ready",
  kubernetesVersion: "1.0",
  locationList: [
    {
      locationInfo: "locationRegionId",
      locationType: "LOCATION_TYPE_REGION_ID",
    },
    {
      locationInfo: "locationRegionName",
      locationType: "LOCATION_TYPE_REGION_NAME",
    },
  ],
  name: "clusterInfoName",
  nodeQuantity: 2,
  status: "error",
};

export const clusterOne: ClusterComplete = {
  clusterID: clusterOneId,
  name: clusterOneName,
  status: "active",
  nodeQuantity: 2,
  kubernetesVersion: "2.1.2",
  clusterLabels: {
    "Extension-Group": "3f7b02f0-cdda-4829-90e1-28da894885a2",
    cpumanager: "true",
    [customersKey]: customersOne,
    "objectset.rio.cattle.io/hash": "d61199e1ee0274dd74871b839f440c8ba2980efe",
    "provider.cattle.io": "rke2",
    [userDefinedKeyOne]: userDefinedValueOne,
    [userDefinedKeyTwo]: userDefinedValueTwo,
  },
  userDefinedLabelKeys: [userDefinedKeyOne, userDefinedKeyTwo],
  locationList: [
    {
      locationInfo: "restaurant-one",
      locationType: "LOCATION_TYPE_SITE_ID",
    },
    {
      locationInfo: "Restaurant 01",
      locationType: "LOCATION_TYPE_SITE_NAME",
    },
    {
      locationInfo: "region-f00cb2dc",
      locationType: "LOCATION_TYPE_REGION_ID",
    },
    {
      locationInfo: "region-portland",
      locationType: "LOCATION_TYPE_REGION_NAME",
    },

    {
      locationType: "LOCATION_TYPE_SITE_NAME",
      locationInfo: "restaurant-1",
    },
  ],
  nodes: {
    // Note: chosen nodes must belong to same site
    nodeInfoList: [nodeOne, nodeTwo],
  },
  resources: {
    capacity: { cpu: "70", memory: `${5 * 1024}`, pods: 9 },
    availability: { cpu: "65", memory: "10", pods: 3 },
  },
  clusterTemplateName: selectClusterOneV1,
  lifecyclePhase,
};

export const clusterTwo: ClusterComplete = {
  clusterID: clusterTwoId,
  name: clusterTwoName,
  status: "active",
  nodeQuantity: 1,
  clusterLabels: {
    "Extension-Group": "3f7b02f0-cdda-4829-90e1-28da894885a2",
    cpumanager: "true",
    [customersKey]: customersTwo,
    "objectset.rio.cattle.io/hash": "d61199e1ee0274dd74871b839f440c8ba2980efe",
    "provider.cattle.io": "rke2",
  },
  kubernetesVersion: "2.1.4",
  locationList: [
    {
      locationType: "LOCATION_TYPE_SITE_ID",
      locationInfo: "restaurant-2",
    },
    {
      locationType: "LOCATION_TYPE_SITE_NAME",
      locationInfo: "restaurant-two",
    },
  ],
  nodes: {
    // Note: chosen nodes must belong to same site
    nodeInfoList: [nodeTwo],
  },
  clusterTemplateName: selectClusterTwoV1,

  lifecyclePhase,
};

export const clusterThree: ClusterComplete = {
  clusterID: clusterThreeId,
  name: clusterThreeName,
  status: "active",
  nodeQuantity: 1,
  clusterLabels: {
    "Extension-Group": "3f7b02f0-cdda-4829-90e1-28da894885a2",
    cpumanager: "true",
    [customersKey]: customersTwo,
    "objectset.rio.cattle.io/hash": "d61199e1ee0274dd74871b839f440c8ba2980efe",
    "provider.cattle.io": "rke2",
  },
  kubernetesVersion: "2.1.4",
  locationList: [
    {
      locationType: "LOCATION_TYPE_SITE_ID",
      locationInfo: "restaurant-3",
    },
    {
      locationType: "LOCATION_TYPE_SITE_NAME",
      locationInfo: "restaurant-three",
    },
    { locationInfo: "location two" },
  ],
  nodes: {
    // Note: chosen nodes must belong to same site
    nodeInfoList: [nodeThree],
  },
  clusterTemplateName: selectClusterThreeV1,

  lifecyclePhase,
};

export const clusterFour: ClusterComplete = {
  clusterID: clusterFourId,
  name: clusterFourName,
  status: "active",
  nodeQuantity: 2,
  clusterLabels: {
    "Extension-Group": "3f7b02f0-cdda-4829-90e1-28da894885a2",
    cpumanager: "true",
    [customersKey]: customersTwo,
    "objectset.rio.cattle.io/hash": "d61199e1ee0274dd74871b839f440c8ba2980efe",
    "provider.cattle.io": "rke2",
    [userDefinedKeyOne]: userDefinedValueOne,
    [userDefinedKeyTwo]: userDefinedValueTwo,
  },
  userDefinedLabelKeys: [userDefinedKeyOne, userDefinedKeyTwo],
  kubernetesVersion: "2.1.4",
  locationList: [
    {
      locationType: "LOCATION_TYPE_SITE_ID",
      locationInfo: "minimart-1",
    },
    {
      locationType: "LOCATION_TYPE_SITE_NAME",
      locationInfo: "minimart-one",
    },
  ],
  nodes: {
    // Note: chosen nodes must belong to same site
    nodeInfoList: [nodeFour, nodeFive],
  },
  resources: {
    capacity: { cpu: "10", memory: "5Ki", pods: 9 },
    availability: { cpu: "5", memory: "0.5Ki", pods: 3 },
  },
  clusterTemplateName: selectClusterFourV1,
  // modern statuses
  appAgentStatus: {
    indicator: "STATUS_INDICATION_IN_PROGRESS",
    message: "Progressing message",
    timestamp: new Date().getTime(),
  },
  lifecyclePhase,
  nodeHealth: {
    indicator: "STATUS_INDICATION_ERROR",
    message: "Node 2 is very unhappy",
    timestamp: new Date().getTime(),
  },
  providerStatus: {
    indicator: "STATUS_INDICATION_UNSPECIFIED",
    message: "Unspecified message",
    timestamp: new Date().getTime(),
  },
  // resourceStatus: {
  //   indicator: "STATUS_INDICATION_IN_PROGRESS",
  //   message: "Progressing message",
  //   timestamp: new Date().getTime(),
  // },
};

export const clusterFive: ClusterComplete = {
  clusterID: clusterFiveId,
  name: clusterFiveName,
  status: "active",
  nodeQuantity: 1,
  clusterLabels: {
    "Extension-Group": "3f7b02f0-cdda-4829-90e1-28da894885a2",
    cpumanager: "true",
    [customersKey]: customersTwo,
    "objectset.rio.cattle.io/hash": "d61199e1ee0274dd74871b839f440c8ba2980efe",
    "provider.cattle.io": "rke2",
  },
  kubernetesVersion: "2.1.4",
  locationList: [
    {
      locationType: "LOCATION_TYPE_SITE_ID",
      locationInfo: "minimart-2",
    },

    {
      locationType: "LOCATION_TYPE_SITE_NAME",
      locationInfo: "minimart-two",
    },
  ],
  nodes: {
    nodeInfoList: [nodeFive],
  },
  clusterTemplateName: selectClusterFiveV1,

  lifecyclePhase,
};

export const clusterSix: ClusterComplete = {
  clusterID: clusterSixId,
  name: clusterSixName,
  status: "active",
  nodeQuantity: 1,
  clusterLabels: {
    "Extension-Group": "3f7b02f0-cdda-4829-90e1-28da894885a2",
    cpumanager: "true",
    [customersKey]: customersTwo,
    "objectset.rio.cattle.io/hash": "d61199e1ee0274dd74871b839f440c8ba2980efe",
    "provider.cattle.io": "rke2",
  },
  kubernetesVersion: "2.1.4",
  locationList: [
    {
      locationType: "LOCATION_TYPE_SITE_ID",
      locationInfo: "store-1",
    },
    {
      locationType: "LOCATION_TYPE_SITE_NAME",
      locationInfo: "store",
    },
  ],
  nodes: {
    nodeInfoList: [nodeSix],
  },
  clusterTemplateName: selectClusterFiveV1,
  resources: {
    capacity: { cpu: "10", memory: "5Mi", pods: 9 },
    availability: { cpu: "8", memory: "1000Ki", pods: 7 },
  },

  lifecyclePhase,
};

export const clusterOneCreating: ClusterComplete = {
  clusterID: clusterOneId,
  name: clusterOneName,
  status: "creating",
  nodeQuantity: 0,
  kubernetesVersion: "2.1.2",
  clusterLabels: {
    "Extension-Group": "3f7b02f0-cdda-4829-90e1-28da894885a2",
    cpumanager: "true",
    [customersKey]: customersOne,
    "objectset.rio.cattle.io/hash": "d61199e1ee0274dd74871b839f440c8ba2980efe",
    "provider.cattle.io": "rke2",
  },
  locationList: [
    { locationInfo: "location one" },
    {
      locationType: "LOCATION_TYPE_SITE_NAME",
      locationInfo: "restaurant-two",
    },
  ],
  nodes: {},
  resources: {
    capacity: { cpu: "70", memory: `${5 * 1024}`, pods: 9 },
    availability: { cpu: "65", memory: "10", pods: 3 },
  },
  clusterTemplateName: selectClusterOneV1,
  lifecyclePhase,
};

export const clusterEmptyNodes: ClusterComplete = {
  clusterID: clusterOneId,
  name: clusterOneName,
  status: "creating",
  nodeQuantity: 3,
  kubernetesVersion: "2.1.2",
  clusterLabels: {
    "Extension-Group": "3f7b02f0-cdda-4829-90e1-28da894885a2",
    cpumanager: "true",
    [customersKey]: customersOne,
    "objectset.rio.cattle.io/hash": "d61199e1ee0274dd74871b839f440c8ba2980efe",
    "provider.cattle.io": "rke2",
  },
  locationList: [
    { locationInfo: "location one" },
    {
      locationType: "LOCATION_TYPE_SITE_NAME",
      locationInfo: "restaurant-two",
    },
  ],
  nodes: { nodeInfoList: [] },
  resources: {
    capacity: { cpu: "70", memory: `${5 * 1024}`, pods: 9 },
    availability: { cpu: "65", memory: "10", pods: 3 },
  },
  clusterTemplateName: selectClusterOneV1,
  lifecyclePhase,
};

export const clusterEmptyLocationInfo: ClusterComplete = {
  clusterID: clusterOneId,
  name: clusterOneName,
  status: "creating",
  nodeQuantity: 3,
  kubernetesVersion: "2.1.2",
  clusterLabels: {
    "Extension-Group": "3f7b02f0-cdda-4829-90e1-28da894885a2",
    cpumanager: "true",
    [customersKey]: customersOne,
    "objectset.rio.cattle.io/hash": "d61199e1ee0274dd74871b839f440c8ba2980efe",
    "provider.cattle.io": "rke2",
  },
  locationList: [
    { locationType: "LOCATION_TYPE_REGION_NAME" },
    { locationType: "LOCATION_TYPE_SITE_NAME" },
    { locationType: "LOCATION_TYPE_SITE_ID" },
  ],
  nodes: { nodeInfoList: [] },
  resources: {
    capacity: { cpu: "70", memory: `${5 * 1024}`, pods: 9 },
    availability: { cpu: "65", memory: "10", pods: 3 },
  },
  clusterTemplateName: selectClusterOneV1,
  lifecyclePhase,
};

let data: ClusterComplete = {};
type UnifiedBodyType =
  | ecm.ClusterSpec
  | ecm.ClusterConfig
  | ecm.ClusterTemplateInfo
  | ecm.ClusterLabels
  | ecm.ClusterInfoRead;

export class ClusterStore extends BaseStore<
  "name",
  ClusterComplete,
  UnifiedBodyType
> {
  convert(
    body: UnifiedBodyType,
    clusterName?: string | undefined,
  ): ClusterComplete {
    // selects post cluster
    const isSpec = (arg: UnifiedBodyType): arg is ecm.ClusterSpec => {
      return "clusterName" in arg;
    };

    // selects put types
    const isTemplate = (
      arg: UnifiedBodyType,
    ): arg is ecm.ClusterTemplateInfo => {
      return "version" in arg;
    };

    const isLabels = (arg: UnifiedBodyType): arg is ecm.ClusterLabels => {
      return "labels" in arg;
    };

    const isNodes = (arg: UnifiedBodyType): arg is ecm.ClusterSpec => {
      return "nodeList" in arg;
    };

    this.resources.forEach((cluster) => {
      if (cluster.name == clusterName) {
        data = {
          ...data,
          name: cluster.name,
          clusterID: cluster.clusterID,
          clusterLabels: cluster.clusterLabels,
          kubernetesVersion: cluster.kubernetesVersion,
          status: cluster.status,

          clusterTemplateName: cluster.clusterTemplateName,
          nodes: cluster.nodes,
          userDefinedLabelKeys: cluster.userDefinedLabelKeys,
        };
      }
    });

    this.resources.forEach((cluster) => {
      if (cluster.name == clusterName) {
        data = {
          ...data,
          name: cluster.name,
          clusterID: cluster.clusterID,
          clusterLabels: cluster.clusterLabels,
          kubernetesVersion: cluster.kubernetesVersion,
          status: cluster.status,

          clusterTemplateName: cluster.clusterTemplateName,
          nodes: cluster.nodes,
          userDefinedLabelKeys: cluster.userDefinedLabelKeys,
        };
      }
    });

    // convert post cluster creation
    if (isSpec(body)) {
      // obtain metadata information from HostStore
      data = {
        clusterID: body.clusterName,
        clusterLabels: body.clusterLabels,
        kubernetesVersion: "1.2.3",
        locationList: body.locationList,
        name: body.clusterName,
        nodeQuantity: body.nodeList.length,
        nodes: {
          nodeInfoList: body.nodeList.map((n) => ({
            guid: n.nodeGuid,
            // NOTE this is a mock serial number, we only need it to populate the table
            serial: "ec26b1ed-311b-0da0-5f2b-fc17f60f35e3",
            role: n.nodeRole,
            os: "linux",
            name: "test-host",
          })),
        },
        userDefinedLabelKeys: [],
      };
      return data;
    }

    // convert put labels
    if (isLabels(body)) {
      data = {
        ...data,
        clusterLabels: body.labels,
        userDefinedLabelKeys: body.userDefinedLabelKeys,
      };
    }
    // convert put nodes
    if (isNodes(body)) {
      const allNodes = body.nodeList;

      const selectedNodes: ecm.NodeInfo[] = [];
      if (allNodes) {
        const mockHost = new HostStore();

        mockHost.resources.forEach((host) => {
          allNodes.forEach((node) => {
            if (host.uuid == node.nodeGuid) {
              selectedNodes.push({
                id: host.resourceId,
                guid: node.nodeGuid,
                name: host.name,
                role: node.nodeRole,
                os: "Linux",
                serial: host.serialNumber,
                status: {
                  condition: "STATUS_CONDITION_READY",
                },
              });
            }
          });
        });
      }

      if (selectedNodes.length > 0) {
        data = {
          ...data,
          nodes: {
            nodeInfoList: selectedNodes,
          },
        };
      } else {
        data = { ...data, nodes: {} };
      }
    }

    // convert put clustertemplate name
    if (isTemplate(body)) {
      this.resources.forEach((cluster) => {
        if (cluster.name == clusterName) {
          data = {
            ...data,
            clusterTemplateName: `${body.name}-${body.version}`,
          };
        }
      });
    }

    return data;
  }

  constructor() {
    super("name", [
      clusterOne,
      clusterTwo,
      clusterThree,
      clusterFour,
      clusterFive,
      clusterSix,
    ]);
  }

  get(name: string): ClusterComplete | undefined {
    return this.resources.find((r) => r.name === name);
  }

  getByNodeUuid(nodeUuid: string): ClusterComplete | undefined {
    return this.resources.find((r) => {
      const isClusterPresent = r.nodes?.nodeInfoList?.reduce(
        (prevVal, node) => prevVal || node.guid === nodeUuid,
        false,
      );
      if (isClusterPresent) return r;
    });
  }

  /**
   * Removes an element from the store
   * @return boolean True if the element was actually remove, false if it wasn't found
   */
  delete(name: string): boolean {
    const cluster = this.get(name);
    if (!cluster) return false;
    this.resources = this.resources.filter((r) => {
      return r[this.idField] !== cluster[this.idField];
    });
    return true;
  }

  filter(
    searchTerm: string | undefined,
    cs: ClusterComplete[],
  ): ClusterComplete[] {
    if (!searchTerm || searchTerm === null || searchTerm.trim().length === 0)
      return cs;
    const searchTermValue = searchTerm.split("OR")[0].split("=")[1];
    return cs.filter(
      (c: ClusterComplete) =>
        c.name?.includes(searchTermValue) ||
        c.status?.includes(searchTermValue),
    );
  }

  sort(orderBy: string | undefined, cs: ClusterComplete[]): ClusterComplete[] {
    if (!orderBy || orderBy === null || orderBy.trim().length === 0) return cs;
    const column: "name" | "status" = orderBy.split(" ")[0] as
      | "name"
      | "status";
    const direction = orderBy.split(" ")[1];

    cs.sort((a, b) => {
      const valueA = a[column] ? a[column]!.toUpperCase() : "";
      const valueB = b[column] ? b[column]!.toUpperCase() : "";
      if (valueA < valueB) {
        return direction === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return cs;
  }
}
