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
export const workloadOne: infra.WorkloadResourceRead = {
  workloadId: workloadOneId,
  externalId: clusterOneId,
  members: [],
  resourceId: workloadOneId,
  name: clusterOneName,
  status: "",
  kind: "WORKLOAD_KIND_CLUSTER",
};

export const workloadTwo: infra.WorkloadResourceRead = {
  workloadId: workloadTwoId,
  externalId: clusterTwoId,
  members: [],
  resourceId: workloadTwoId,
  name: clusterTwoName,
  status: "",
  kind: "WORKLOAD_KIND_CLUSTER",
};

export const workloadThree: infra.WorkloadResourceRead = {
  workloadId: workloadThreeId,
  externalId: clusterThreeId,
  members: [],
  resourceId: workloadThreeId,
  name: clusterThreeName,
  status: "",
  kind: "WORKLOAD_KIND_CLUSTER",
};

export const workloadFour: infra.WorkloadResourceRead = {
  workloadId: workloadFourId,
  externalId: clusterFourId,
  members: [],
  resourceId: workloadFourId,
  name: clusterFourName,
  status: "",
  kind: "WORKLOAD_KIND_CLUSTER",
};

export const workloadFive: infra.WorkloadResourceRead = {
  workloadId: workloadFiveId,
  externalId: clusterFiveId,
  members: [],
  resourceId: workloadFiveId,
  name: clusterFiveName,
  status: "",
  kind: "WORKLOAD_KIND_CLUSTER",
};

export const workloadSix: infra.WorkloadResourceRead = {
  workloadId: workloadSixId,
  externalId: clusterSixId,
  members: [],
  resourceId: workloadSixId,
  name: clusterSixName,
  status: "",
  kind: "WORKLOAD_KIND_CLUSTER",
};

// `Unspecified` workloads
export const workloadUnspecifiedOne: infra.WorkloadResourceRead = {
  workloadId: workloadUnspecifiedOneId,
  externalId: "",
  members: [],
  resourceId: workloadUnspecifiedOneId,
  name: "Unspecified Cluster",
  status: "",
  kind: "WORKLOAD_KIND_CLUSTER",
};

export class WorkloadStore extends BaseStore<
  "workloadId",
  infra.WorkloadResourceRead,
  infra.WorkloadResourceWrite
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

  convert(body: infra.WorkloadResourceWrite): infra.WorkloadResourceRead {
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

  get(id: string): infra.WorkloadResourceRead | undefined {
    return this.resources.find((workload) => workload.workloadId === id);
  }

  list(): infra.WorkloadResourceRead[] {
    return this.resources;
  }
}
