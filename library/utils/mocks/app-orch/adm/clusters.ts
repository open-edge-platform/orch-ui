/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
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

export const clusterA: adm.ClusterRead = {
  name: clusterOne.name,
  id: clusterOne.clusterID,
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

export const clusterB: adm.ClusterRead = {
  name: clusterTwo.name,
  id: clusterTwo.clusterID,
  status: {
    state: "RUNNING",
    summary: {
      down: 0,
      running: packageOne.applicationReferences.length,
      total: packageOne.applicationReferences.length,
    },
  },
};

export const clusterC: adm.ClusterRead = {
  name: clusterThree.name,
  id: clusterThree.clusterID,
  status: {
    state: "RUNNING",
    summary: {
      down: 0,
      running: packageOne.applicationReferences.length,
      total: packageOne.applicationReferences.length,
    },
  },
};

export const clusterD: adm.ClusterRead = {
  name: clusterFour.name,
  id: clusterFour.clusterID,
  status: {
    state: "RUNNING",
    summary: {
      down: 0,
      running: packageThree.applicationReferences.length,
      total: packageThree.applicationReferences.length,
    },
  },
};

export const clusterE: adm.ClusterRead = {
  name: clusterFive.name,
  id: clusterFive.clusterID,
  status: {
    state: "RUNNING",
    summary: {
      down: 0,
      running: packageThree.applicationReferences.length,
      total: packageThree.applicationReferences.length,
    },
  },
};

export const clusterF: adm.ClusterRead = {
  name: clusterSix.name,
  id: clusterSix.clusterID,
  status: {
    state: "DOWN",
    summary: {
      down: 1,
      running: packageFour.applicationReferences.length,
      total: packageFour.applicationReferences.length,
    },
  },
};

export const clusterNotReady: adm.ClusterRead = {
  name: clusterOne.name,
  id: clusterOne.clusterID,
  status: {
    state: "DOWN",
    summary: {
      down: 0,
      running: packageOne.applicationReferences.length,
      total: packageOne.applicationReferences.length,
    },
  },
};

export class DeploymentClustersStore extends BaseStore<"id", adm.ClusterRead> {
  constructor() {
    super("id", [clusterA, clusterB, clusterC, clusterD, clusterE, clusterF]);
  }

  convert(body: adm.ClusterRead): adm.ClusterRead {
    return body;
  }

  filter(
    searchTerm: string | undefined,
    cs: adm.ClusterRead[],
  ): adm.ClusterRead[] {
    if (!searchTerm || searchTerm === null || searchTerm.trim().length === 0)
      return cs;
    const searchTermValue = searchTerm.split("OR")[0].split("=")[1];
    return cs.filter((c: adm.ClusterRead) => c.name?.includes(searchTermValue));
  }

  sort(orderBy: string | undefined, cs: adm.ClusterRead[]): adm.ClusterRead[] {
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
