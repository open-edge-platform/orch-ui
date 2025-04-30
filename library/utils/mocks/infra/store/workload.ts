/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
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
} from "../../cluster-orch/data/clusterOrchIds";
import {
  workloadFiveId,
  workloadFourId,
  workloadOneId,
  workloadSixId,
  workloadThreeId,
  workloadTwoId,
  workloadUnspecifiedOneId,
} from "../data";
import { BaseStore } from "./baseStore";

// Cluster workloads
export const workloadOne: infra.WorkloadRead = {
  workloadId: workloadOneId,
  externalId: clusterOneId,
  members: [],
  resourceId: workloadOneId,
  name: clusterOneName,
  status: "",
  kind: "WORKLOAD_KIND_CLUSTER",
};

export const workloadTwo: infra.WorkloadRead = {
  workloadId: workloadTwoId,
  externalId: clusterTwoId,
  members: [],
  resourceId: workloadTwoId,
  name: clusterTwoName,
  status: "",
  kind: "WORKLOAD_KIND_CLUSTER",
};

export const workloadThree: infra.WorkloadRead = {
  workloadId: workloadThreeId,
  externalId: clusterThreeId,
  members: [],
  resourceId: workloadThreeId,
  name: clusterThreeName,
  status: "",
  kind: "WORKLOAD_KIND_CLUSTER",
};

export const workloadFour: infra.WorkloadRead = {
  workloadId: workloadFourId,
  externalId: clusterFourId,
  members: [],
  resourceId: workloadFourId,
  name: clusterFourName,
  status: "",
  kind: "WORKLOAD_KIND_CLUSTER",
};

export const workloadFive: infra.WorkloadRead = {
  workloadId: workloadFiveId,
  externalId: clusterFiveId,
  members: [],
  resourceId: workloadFiveId,
  name: clusterFiveName,
  status: "",
  kind: "WORKLOAD_KIND_CLUSTER",
};

export const workloadSix: infra.WorkloadRead = {
  workloadId: workloadSixId,
  externalId: clusterSixId,
  members: [],
  resourceId: workloadSixId,
  name: clusterSixName,
  status: "",
  kind: "WORKLOAD_KIND_CLUSTER",
};

// `Unspecified` workloads
export const workloadUnspecifiedOne: infra.WorkloadRead = {
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
  infra.WorkloadRead,
  infra.Workload
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

  convert(body: infra.Workload): infra.WorkloadRead {
    const currentTime = new Date().toISOString();
    return {
      ...body,
      workloadId: `workload${this.workloadIndex}`,
      resourceId: `workload${this.workloadIndex}`,
      members: [],
      kind: "WORKLOAD_KIND_CLUSTER",
      timestamps: {
        createdAt: currentTime,
        updatedAt: currentTime,
      },
    };
  }

  get(id: string): infra.WorkloadRead | undefined {
    return this.resources.find((workload) => workload.workloadId === id);
  }

  list(): infra.WorkloadRead[] {
    return this.resources;
  }
}
