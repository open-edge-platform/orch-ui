/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm } from "@orch-ui/apis";

export const nodeOne: ecm.NodeInfo = {
  id: "host-dh38bjw9",
  guid: "4c4c4544-0044-4210-8031-c2c04f305233",
  name: "Room Edge Node",
  status: {
    condition: "STATUS_CONDITION_READY",
  },
  serial: "node-one-serial",
  os: "ubuntu",
  role: "worker",
};

export const nodeTwo: ecm.NodeInfo = {
  id: "host-k72ywhgd",
  guid: "4c4c4544-0056-4810-8053-b8c04f595233",
  name: "Kitchen Edge Node",
  status: {
    condition: "STATUS_CONDITION_READY",
  },
  serial: "node-two-serial",
  os: "ubuntu",
  role: "worker",
};

export const nodeThree: ecm.NodeInfo = {
  id: "host-3uc8eh0w",
  guid: "4c4c4544-0035-4210-8030-c4c04f365333",
  name: "Cashier Node",
  status: {
    condition: "STATUS_CONDITION_READY",
  },
  serial: "node-3-serial",
  os: "ubuntu",
  role: "controlplane",
};

export const nodeFour: ecm.NodeInfo = {
  id: "host-5i68cbq7",
  guid: "4c4c4544-004e-3710-8043-b6c04f4d5033",
  name: "Minimart Node",
  status: {
    condition: "STATUS_CONDITION_READY",
  },
  serial: "node-4-serial",
  os: "ubuntu",
  role: "all",
};

export const nodeFive: ecm.NodeInfo = {
  id: "host-bdj38fj0",
  guid: "4c4c4544-0036-4210-8030-b2c04f365333",
  name: "Drive Node",
  status: {
    condition: "STATUS_CONDITION_READY",
  },
  serial: "node-5-serial",
  os: "ubuntu",
  role: "all",
};

export const nodeSix: ecm.NodeInfo = {
  id: "host-v9eyx73m",
  guid: "4c4c4544-0035-3010-8030-c4c04f4a4633",
  name: "Information Edge Node",
  status: {
    condition: "STATUS_CONDITION_READY",
  },
  serial: "node-6-serial",
  os: "ubuntu",
  role: "worker",
};
