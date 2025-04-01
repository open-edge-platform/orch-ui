/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import {
  assignedWorkloadHostFourId,
  assignedWorkloadHostOneId,
  assignedWorkloadHostThreeId,
  assignedWorkloadHostTwoId,
  provisionedHostOneId,
  provisionedHostTwoId,
} from "../../infra/data/hostIds";

export const nodeOne: cm.NodeInfo = {
  id: assignedWorkloadHostOneId,
  status: {
    condition: "STATUS_CONDITION_READY",
  },
  role: "worker",
};

export const nodeTwo: cm.NodeInfo = {
  id: assignedWorkloadHostTwoId,
  status: {
    condition: "STATUS_CONDITION_READY",
  },
  role: "worker",
};

export const nodeThree: cm.NodeInfo = {
  id: assignedWorkloadHostThreeId,
  status: {
    condition: "STATUS_CONDITION_READY",
  },
  role: "controlplane",
};

export const nodeFour: cm.NodeInfo = {
  id: assignedWorkloadHostFourId,
  status: {
    condition: "STATUS_CONDITION_READY",
  },
  role: "all",
};

export const nodeFive: cm.NodeInfo = {
  id: provisionedHostOneId,
  status: {
    condition: "STATUS_CONDITION_READY",
  },
  role: "all",
};

export const nodeSix: cm.NodeInfo = {
  id: provisionedHostTwoId,
  status: {
    condition: "STATUS_CONDITION_READY",
  },
  role: "worker",
};
