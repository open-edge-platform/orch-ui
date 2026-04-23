/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import { BaseStore } from "../../baseStore";
import {
  clusterFive,
  clusterFour,
  clusterOne,
  clusterSix,
  clusterThree,
  clusterTwo,
} from "../../cluster-orch/clusters";
import { packageFour, packageOne, packageThree } from "../catalog/packages";

// ClusterRead was removed in multitenancy simplification; define locally for mock use
interface ClusterRead extends adm.ClusterInfoRead {
  status?: adm.StatusRead;
  apps?: adm.AppRead[];
}

export const clusterA: ClusterRead = {
  id: "cluster-a-id",
  name: clusterOne.name,
  status: {
    state: "RUNNING",
    summary: {
      down: 0,
      running: packageOne.applicationReferences.length,
      total: packageOne.applicationReferences.length,
    },
  },
  apps: packageOne.applicationReferences.map((ar) => ({
    name: ar.name,
    id: ar.name,
    status: {
      state: "RUNNING",
    },
  })),
};

export const clusterB: ClusterRead = {
  id: "cluster-b-id",
  name: clusterTwo.name,
  status: {
    state: "RUNNING",
    summary: {
      down: 0,
      running: packageOne.applicationReferences.length,
      total: packageOne.applicationReferences.length,
    },
  },
};

export const clusterC: ClusterRead = {
  id: "cluster-c-id",
  name: clusterThree.name,
  status: {
    state: "RUNNING",
    summary: {
      down: 0,
      running: packageOne.applicationReferences.length,
      total: packageOne.applicationReferences.length,
    },
  },
};

export const clusterD: ClusterRead = {
  id: "cluster-d-id",
  name: clusterFour.name,
  status: {
    state: "RUNNING",
    summary: {
      down: 0,
      running: packageThree.applicationReferences.length,
      total: packageThree.applicationReferences.length,
    },
  },
};

export const clusterE: ClusterRead = {
  id: "cluster-e-id",
  name: clusterFive.name,
  status: {
    state: "RUNNING",
    summary: {
      down: 0,
      running: packageThree.applicationReferences.length,
      total: packageThree.applicationReferences.length,
    },
  },
};

export const clusterF: ClusterRead = {
  id: "cluster-f-id",
  name: clusterSix.name,
  status: {
    state: "DOWN",
    summary: {
      down: 1,
      running: packageFour.applicationReferences.length,
      total: packageFour.applicationReferences.length,
    },
  },
};

export const clusterNotReady: ClusterRead = {
  id: "cluster-not-ready-id",
  name: clusterOne.name,
  status: {
    state: "DOWN",
    summary: {
      down: 0,
      running: packageOne.applicationReferences.length,
      total: packageOne.applicationReferences.length,
    },
  },
};

export class DeploymentClustersStore extends BaseStore<"id", ClusterRead> {
  constructor() {
    super("id", [clusterA, clusterB, clusterC, clusterD, clusterE, clusterF]);
  }

  convert(body: ClusterRead): ClusterRead {
    return body;
  }

  filter(searchTerm: string | undefined, cs: ClusterRead[]): ClusterRead[] {
    if (!searchTerm || searchTerm === null || searchTerm.trim().length === 0)
      return cs;
    const searchTermValue = searchTerm.split("OR")[0].split("=")[1];
    return cs.filter((c: ClusterRead) => c.name?.includes(searchTermValue));
  }

  sort(orderBy: string | undefined, cs: ClusterRead[]): ClusterRead[] {
    if (!orderBy || orderBy === null || orderBy.trim().length === 0) return cs;
    const column: "name" = orderBy.split(" ")[0] as "name";
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
