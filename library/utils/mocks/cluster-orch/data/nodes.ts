/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";

export const nodeOne: cm.NodeInfo = {
  id: "host-dh38bjw9",
  name: "Room Edge Node",
  status: {
    condition: "STATUS_CONDITION_READY",
  },
  os: "ubuntu",
  role: "worker",
};

export const nodeTwo: cm.NodeInfo = {
  id: "host-k72ywhgd",
  name: "Kitchen Edge Node",
  status: {
    condition: "STATUS_CONDITION_READY",
  },
  os: "ubuntu",
  role: "worker",
};

export const nodeThree: cm.NodeInfo = {
  id: "host-3uc8eh0w",
  name: "Cashier Node",
  status: {
    condition: "STATUS_CONDITION_READY",
  },
  os: "ubuntu",
  role: "controlplane",
};

export const nodeFour: cm.NodeInfo = {
  id: "host-5i68cbq7",
  name: "Minimart Node",
  status: {
    condition: "STATUS_CONDITION_READY",
  },
  os: "ubuntu",
  role: "all",
};

export const nodeFive: cm.NodeInfo = {
  id: "host-bdj38fj0",
  name: "Drive Node",
  status: {
    condition: "STATUS_CONDITION_READY",
  },
  os: "ubuntu",
  role: "all",
};

export const nodeSix: cm.NodeInfo = {
  id: "host-v9eyx73m",
  name: "Information Edge Node",
  status: {
    condition: "STATUS_CONDITION_READY",
  },
  os: "ubuntu",
  role: "worker",
};
