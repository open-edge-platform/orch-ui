/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { mps } from "@orch-ui/apis";
import {
  assignedWorkloadHostOneUuid,
  assignedWorkloadHostTwoUuid,
} from "../data";
import { BaseStore } from "./baseStore";

const connectedDevice: mps.Device = {
  connectionStatus: true,
  deviceInfo: {
    currentMode: "Admin",
    features: "AMT,TLS,CIRA",
    fwBuild: "1838",
    fwSku: "16392",
    fwVersion: "16.1.25",
    ipAddress: "192.168.1.100",
    lastUpdated: "2025-07-07T14:30:22Z",
  },
  dnsSuffix: "example.com",
  friendlyName: "Engineering Workstation 01",
  guid: assignedWorkloadHostTwoUuid, //host name: Assigned Host 2
  hostname: "ENG-WS-01",
  lastConnected: "2025-07-08T08:15:30Z",
  lastDisconnected: "2025-07-05T18:22:45Z",
  lastSeen: "2025-07-08T08:15:30Z",
  mpsInstance: "mps-server-01",
  mpsusername: "admin",
  tags: ["engineering", "workstation", "priority"],
  tenantid: "tenant-a-12345",
};

const disconnectedDevice: mps.Device = {
  connectionStatus: false,
  deviceInfo: {
    currentMode: "Client",
    features: "AMT,CIRA",
    fwBuild: "1750",
    fwSku: "16300",
    fwVersion: "15.0.10",
    ipAddress: "10.0.2.15",
    lastUpdated: "2025-06-20T09:45:12Z",
  },
  dnsSuffix: "corp.local",
  friendlyName: "Marketing Laptop 05",
  guid: assignedWorkloadHostOneUuid, //host name: Assigned Host 1,
  hostname: "MKTG-LT-05",
  lastConnected: "2025-06-20T09:45:12Z",
  lastDisconnected: "2025-06-20T10:30:45Z",
  lastSeen: "2025-06-20T10:30:45Z",
  mpsInstance: "mps-server-02",
  mpsusername: "sysadmin",
  tags: ["marketing", "laptop"],
  tenantid: "tenant-b-67890",
};

const minimalDevice: mps.Device = {
  connectionStatus: false,
  deviceInfo: {
    currentMode: "Unknown",
    ipAddress: "172.16.5.22",
    lastUpdated: "2025-05-12T00:00:00Z",
  },
  guid: "a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67890",
  hostname: "UNKNOWN-DEVICE",
  lastSeen: "2025-05-12T00:00:00Z",
  mpsInstance: "mps-server-01",
  tags: ["unclassified"],
};

export class VproDetailsStore extends BaseStore<"guid", any, any> {
  constructor() {
    super("guid", [connectedDevice, disconnectedDevice, minimalDevice]);
  }
  convert(body: mps.Device): mps.Device {
    return body;
  }

  // Get device details by host ID
  getDeviceByGuid(guid: string): mps.Device | undefined {
    const details = this.resources.find((details) => details.guid === guid);
    return details;
  }
}
