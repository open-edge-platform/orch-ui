/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { BaseStore } from "./baseStore";
import {
  workloadFiveId,
  workloadFourId,
  workloadOneId,
  workloadSixId,
  workloadThreeId,
  workloadTwoId,
  workloadUnspecifiedOneId,
} from "./iaasIds";

/** Cluster Details */
export const clusterOneName = "restaurant-portland";
export const clusterOneId = "r-p-n98bt7tm";

export const clusterTwoName = "restaurant-salem";
export const clusterTwoId = "r-b-v83hy29f";

export const clusterThreeName = "restaurant-ashland";
export const clusterThreeId = "r-a-b28h1kbz";

export const clusterFourName = "minimart-columbus";
export const clusterFourId = "m-c-i48qdv94";

export const clusterFiveName = "minimart-dayton";
export const clusterFiveId = "m-d-ljmy921f";

export const clusterSixName = "store-chicago";
export const clusterSixId = "c-m-iusz73yr";

// Cluster workloads
export const workloadOne: eim.WorkloadRead = {
  workloadId: workloadOneId,
  externalId: clusterOneId,
  members: [],
  resourceId: workloadOneId,
  name: clusterOneName,
  status: "",
  kind: "WORKLOAD_KIND_CLUSTER",
};

export const workloadTwo: eim.WorkloadRead = {
  workloadId: workloadTwoId,
  externalId: clusterTwoId,
  members: [],
  resourceId: workloadTwoId,
  name: clusterTwoName,
  status: "",
  kind: "WORKLOAD_KIND_CLUSTER",
};

export const workloadThree: eim.WorkloadRead = {
  workloadId: workloadThreeId,
  externalId: clusterThreeId,
  members: [],
  resourceId: workloadThreeId,
  name: clusterThreeName,
  status: "",
  kind: "WORKLOAD_KIND_CLUSTER",
};

export const workloadFour: eim.WorkloadRead = {
  workloadId: workloadFourId,
  externalId: clusterFourId,
  members: [],
  resourceId: workloadFourId,
  name: clusterFourName,
  status: "",
  kind: "WORKLOAD_KIND_CLUSTER",
};

export const workloadFive: eim.WorkloadRead = {
  workloadId: workloadFiveId,
  externalId: clusterFiveId,
  members: [],
  resourceId: workloadFiveId,
  name: clusterFiveName,
  status: "",
  kind: "WORKLOAD_KIND_CLUSTER",
};

export const workloadSix: eim.WorkloadRead = {
  workloadId: workloadSixId,
  externalId: clusterSixId,
  members: [],
  resourceId: workloadSixId,
  name: clusterSixName,
  status: "",
  kind: "WORKLOAD_KIND_CLUSTER",
};

// `Unspecified` workloads
export const workloadUnspecifiedOne: eim.WorkloadRead = {
  workloadId: workloadUnspecifiedOneId,
  externalId: "",
  members: [],
  resourceId: workloadUnspecifiedOneId,
  name: "Unspecified Cluster",
  status: "",
  kind: "WORKLOAD_KIND_UNSPECIFIED",
};

export class WorkloadStore extends BaseStore<
  "workloadId",
  eim.WorkloadRead,
  eim.Workload
> {
  workloadIndex = 0;

  constructor() {
    const workloadList = [
      workloadOne,
      workloadTwo,
      workloadThree,
      workloadFour,
      workloadFive,
      workloadSix,
      workloadUnspecifiedOne,
    ];

    super("workloadId", workloadList);
  }

  convert(body: eim.Workload): eim.WorkloadRead {
    return {
      ...body,
      workloadId: `workload${this.workloadIndex}`,
      resourceId: `workload${this.workloadIndex}`,
      members: [],
    };
  }

  get(id: string): eim.WorkloadRead | undefined {
    return this.resources.find((workload) => workload.workloadId === id);
  }

  list(): eim.WorkloadRead[] {
    return this.resources;
  }
}
