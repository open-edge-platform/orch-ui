/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cm } from "@orch-ui/apis";
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
  clusterFiveName,
  clusterFourName,
  clusterOneName,
  clusterSixName,
  clusterThreeName,
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

export type ClusterComplete = cm.ClusterInfoRead & cm.ClusterDetailInfoRead;

const lifecyclePhase: cm.GenericStatusRead = {
  indicator: "STATUS_INDICATION_IDLE",
  message: "Running",
  timestamp: new Date().getTime(),
};

export const clusterInfo1: cm.ClusterInfoRead = {
  labels: {},
  kubernetesVersion: "1.0",
  name: "clusterInfoName",
  nodeQuantity: 1,
  providerStatus: {
    message: "active",
    indicator: "STATUS_INDICATION_IDLE",
    timestamp: new Date().getTime(),
  },
};

export const clusterInfo2: cm.ClusterInfoRead = {
  labels: {},
  //extensionStatus: "Ready",
  kubernetesVersion: "1.0",
  name: "clusterInfoName",
  nodeQuantity: 2,
  providerStatus: {
    message: "error",
    indicator: "STATUS_INDICATION_ERROR",
    timestamp: new Date().getTime(),
  },
};

export const clusterOne: ClusterComplete = {
  name: clusterOneName,
  providerStatus: {
    message: "active",
    indicator: "STATUS_INDICATION_IDLE",
    timestamp: new Date().getTime(),
  },
  nodeQuantity: 2,
  kubernetesVersion: "2.1.2",
  labels: {
    "Extension-Group": "3f7b02f0-cdda-4829-90e1-28da894885a2",
    cpumanager: "true",
    [customersKey]: customersOne,
    "objectset.rio.cattle.io/hash": "d61199e1ee0274dd74871b839f440c8ba2980efe",
    "provider.cattle.io": "rke2",
    [userDefinedKeyOne]: userDefinedValueOne,
    [userDefinedKeyTwo]: userDefinedValueTwo,
  },
  nodes: [nodeOne, nodeTwo],
  template: selectClusterOneV1,
  lifecyclePhase,
};

export const clusterTwo: ClusterComplete = {
  name: clusterTwoName,
  providerStatus: {
    message: "active",
    indicator: "STATUS_INDICATION_IDLE",
    timestamp: new Date().getTime(),
  },
  nodeQuantity: 1,
  labels: {
    "Extension-Group": "3f7b02f0-cdda-4829-90e1-28da894885a2",
    cpumanager: "true",
    [customersKey]: customersTwo,
    "objectset.rio.cattle.io/hash": "d61199e1ee0274dd74871b839f440c8ba2980efe",
    "provider.cattle.io": "rke2",
  },
  kubernetesVersion: "2.1.4",
  nodes: [nodeTwo],
  template: selectClusterTwoV1,

  lifecyclePhase,
};

export const clusterThree: ClusterComplete = {
  name: clusterThreeName,
  providerStatus: {
    message: "active",
    indicator: "STATUS_INDICATION_IDLE",
    timestamp: new Date().getTime(),
  },
  nodeQuantity: 1,
  labels: {
    "Extension-Group": "3f7b02f0-cdda-4829-90e1-28da894885a2",
    cpumanager: "true",
    [customersKey]: customersTwo,
    "objectset.rio.cattle.io/hash": "d61199e1ee0274dd74871b839f440c8ba2980efe",
    "provider.cattle.io": "rke2",
  },
  kubernetesVersion: "2.1.4",
  nodes: [nodeThree],
  template: selectClusterThreeV1,

  lifecyclePhase,
};

export const clusterFour: ClusterComplete = {
  name: clusterFourName,
  providerStatus: {
    indicator: "STATUS_INDICATION_UNSPECIFIED",
    message: "Unspecified message",
    timestamp: new Date().getTime(),
  },
  nodeQuantity: 2,
  labels: {
    "Extension-Group": "3f7b02f0-cdda-4829-90e1-28da894885a2",
    cpumanager: "true",
    [customersKey]: customersTwo,
    "objectset.rio.cattle.io/hash": "d61199e1ee0274dd74871b839f440c8ba2980efe",
    "provider.cattle.io": "rke2",
    [userDefinedKeyOne]: userDefinedValueOne,
    [userDefinedKeyTwo]: userDefinedValueTwo,
  },
  kubernetesVersion: "2.1.4",
  nodes: [nodeFour, nodeFive],
  template: selectClusterFourV1,
  lifecyclePhase,
  nodeHealth: {
    indicator: "STATUS_INDICATION_ERROR",
    message: "Node 2 is very unhappy",
    timestamp: new Date().getTime(),
  },
};

export const clusterFive: ClusterComplete = {
  name: clusterFiveName,
  providerStatus: {
    message: "active",
    indicator: "STATUS_INDICATION_IDLE",
    timestamp: new Date().getTime(),
  },
  nodeQuantity: 1,
  labels: {
    "Extension-Group": "3f7b02f0-cdda-4829-90e1-28da894885a2",
    cpumanager: "true",
    [customersKey]: customersTwo,
    "objectset.rio.cattle.io/hash": "d61199e1ee0274dd74871b839f440c8ba2980efe",
    "provider.cattle.io": "rke2",
  },
  kubernetesVersion: "2.1.4",
  nodes: [nodeFive],
  template: selectClusterFiveV1,

  lifecyclePhase,
};

export const clusterSix: ClusterComplete = {
  name: clusterSixName,
  providerStatus: {
    message: "active",
    indicator: "STATUS_INDICATION_IDLE",
    timestamp: new Date().getTime(),
  },
  nodeQuantity: 1,
  labels: {
    "Extension-Group": "3f7b02f0-cdda-4829-90e1-28da894885a2",
    cpumanager: "true",
    [customersKey]: customersTwo,
    "objectset.rio.cattle.io/hash": "d61199e1ee0274dd74871b839f440c8ba2980efe",
    "provider.cattle.io": "rke2",
  },
  kubernetesVersion: "2.1.4",
  nodes: [nodeSix],
  template: selectClusterFiveV1,
  lifecyclePhase,
};

export const clusterOneCreating: ClusterComplete = {
  name: clusterOneName,
  providerStatus: {
    message: "creating",
    indicator: "STATUS_INDICATION_IN_PROGRESS",
    timestamp: new Date().getTime(),
  },
  nodeQuantity: 0,
  kubernetesVersion: "2.1.2",
  labels: {
    "Extension-Group": "3f7b02f0-cdda-4829-90e1-28da894885a2",
    cpumanager: "true",
    [customersKey]: customersOne,
    "objectset.rio.cattle.io/hash": "d61199e1ee0274dd74871b839f440c8ba2980efe",
    "provider.cattle.io": "rke2",
  },
  nodes: [],
  template: selectClusterOneV1,
  lifecyclePhase,
};

export const clusterEmptyNodes: ClusterComplete = {
  name: clusterOneName,
  providerStatus: {
    message: "creating",
    indicator: "STATUS_INDICATION_IN_PROGRESS",
    timestamp: new Date().getTime(),
  },
  nodeQuantity: 3,
  kubernetesVersion: "2.1.2",
  labels: {
    "Extension-Group": "3f7b02f0-cdda-4829-90e1-28da894885a2",
    cpumanager: "true",
    [customersKey]: customersOne,
    "objectset.rio.cattle.io/hash": "d61199e1ee0274dd74871b839f440c8ba2980efe",
    "provider.cattle.io": "rke2",
  },
  nodes: [],
  template: selectClusterOneV1,
  lifecyclePhase,
};

export const clusterEmptyLocationInfo: ClusterComplete = {
  name: clusterOneName,
  providerStatus: {
    message: "creating",
    indicator: "STATUS_INDICATION_IN_PROGRESS",
    timestamp: new Date().getTime(),
  },
  nodeQuantity: 3,
  kubernetesVersion: "2.1.2",
  labels: {
    "Extension-Group": "3f7b02f0-cdda-4829-90e1-28da894885a2",
    cpumanager: "true",
    [customersKey]: customersOne,
    "objectset.rio.cattle.io/hash": "d61199e1ee0274dd74871b839f440c8ba2980efe",
    "provider.cattle.io": "rke2",
  },
  nodes: [],
  template: selectClusterOneV1,
  lifecyclePhase,
};

let data: ClusterComplete = {};
type UnifiedBodyType =
  | cm.ClusterSpec
  | cm.ClusterTemplateInfo
  | cm.ClusterLabels
  | cm.ClusterInfoRead;

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
    const isSpec = (arg: UnifiedBodyType): arg is cm.ClusterSpec => {
      return "clusterName" in arg;
    };

    // selects put types
    const isTemplate = (
      arg: UnifiedBodyType,
    ): arg is cm.ClusterTemplateInfo => {
      return "version" in arg;
    };

    const isLabels = (arg: UnifiedBodyType): arg is cm.ClusterLabels => {
      return "labels" in arg;
    };

    const isNodes = (arg: UnifiedBodyType): arg is cm.ClusterSpec => {
      return "nodeList" in arg;
    };

    this.resources.forEach((cluster) => {
      if (cluster.name == clusterName) {
        data = {
          ...data,
          name: cluster.name,
          labels: cluster.labels,
          kubernetesVersion: cluster.kubernetesVersion,
          providerStatus: cluster.providerStatus,
          template: cluster.template,
          nodes: cluster.nodes,
        };
      }
    });

    this.resources.forEach((cluster) => {
      if (cluster.name == clusterName) {
        data = {
          ...data,
          name: cluster.name,
          labels: cluster.labels,
          kubernetesVersion: cluster.kubernetesVersion,
          providerStatus: cluster.providerStatus,

          template: cluster.template,
          nodes: cluster.nodes,
        };
      }
    });

    // convert post cluster creation
    if (isSpec(body)) {
      // obtain metadata information from HostStore
      data = {
        labels: body.labels,
        kubernetesVersion: "1.2.3",
        name: body.name,
        nodeQuantity: body.nodes.length,
        nodes: body.nodes.map((n) => ({
          id: n.id,
          role: n.id,
        })),
      };
      return data;
    }

    // convert put labels
    if (isLabels(body)) {
      data = {
        ...data,
        labels: body.labels,
      };
    }
    // convert put nodes
    if (isNodes(body)) {
      const allNodes = body.nodes;

      const selectedNodes: cm.NodeInfo[] = [];
      if (allNodes) {
        const mockHost = new HostStore();

        mockHost.resources.forEach((host) => {
          allNodes.forEach((node) => {
            if (host.uuid == node.id) {
              selectedNodes.push({
                id: host.resourceId,
                role: node.role,
              });
            }
          });
        });
      }

      if (selectedNodes.length > 0) {
        data = {
          ...data,
          nodes: selectedNodes,
        };
      } else {
        data = { ...data, nodes: [] };
      }
    }

    // convert put clustertemplate name
    if (isTemplate(body)) {
      this.resources.forEach((cluster) => {
        if (cluster.name == clusterName) {
          data = {
            ...data,
            template: `${body.name}-${body.version}`,
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

  getByNodeUuid(id: string): ClusterComplete | undefined {
    return this.resources.find((r) => {
      const isClusterPresent = r.nodes?.reduce(
        (prevVal, node) => prevVal || node.id === id,
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
    if (!searchTerm || searchTerm.trim().length === 0) return cs;
    const searchTermValue = searchTerm.split("OR")[0].split("=")[1];
    return cs.filter(
      (c: ClusterComplete) =>
        c.name?.includes(searchTermValue) ||
        c.providerStatus?.indicator.includes(searchTermValue),
    );
  }

  sort(orderBy: string | undefined, cs: ClusterComplete[]): ClusterComplete[] {
    if (!orderBy || orderBy.trim().length === 0) return cs;
    const column: "name" | "status" = orderBy.split(" ")[0] as
      | "name"
      | "status";
    const direction = orderBy.split(" ")[1];

    cs.sort((a, b) => {
      let valueA, valueB;
      if (column === "status") {
        valueA = a["providerStatus"] ? a["providerStatus"]!.indicator : "";
        valueB = b["providerStatus"] ? b["providerStatus"]!.indicator : "";
      } else {
        valueA = a[column] ? a[column]!.toUpperCase() : "";
        valueB = b[column] ? b[column]!.toUpperCase() : "";
      }

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
