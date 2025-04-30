/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";

// TODO: Create a Host Resource store
export const hostResourceGpus: infra.HostResourcesGpuRead[] = [
  {
    deviceName: "Device 1",
    vendor: "Vendor A",
    product: "Model 1",
    capabilities: ["a", "b", "c"],
  },
  {
    deviceName: "Device 2",
    vendor: "Vendor B",
    product: "Model 2",
    capabilities: ["e", "d", "c"],
  },
  {
    deviceName: "Device 3",
    vendor: "Vendor C",
    product: "Model 3",
    capabilities: ["f", "t", "h"],
  },
  {
    deviceName: "Device 4",
    vendor: "Vendor D",
    product: "Model 4",
    capabilities: ["f", "t", "h"],
  },
  {
    deviceName: "Device 5",
    vendor: "Vendor E",
    product: "Model 5",
    capabilities: ["f", "t", "h"],
  },
];

export const hostResourceNics: infra.HostResourcesInterfaceRead[] = [
  {
    bmcInterface: false,
    ipaddresses: [
      {
        configMethod: "IP_ADDRESS_CONFIG_MODE_STATIC",
        address: "2345:0425:2CA1::0567:5673:23b5/64",
        status: "IP_ADDRESS_STATUS_ASSIGNED",
        statusDetail: "",
      },
      {
        configMethod: "IP_ADDRESS_CONFIG_MODE_DYNAMIC",
        address: "192.168.0.11/24",
        status: "IP_ADDRESS_STATUS_ASSIGNMENT_ERROR",
        statusDetail: "",
      },
    ],
    linkState: {
      timestamp: new Date().toISOString(),
      type: "LINK_STATE_DOWN",
    },
    macAddr: "90:49:fa:07:6c:fd",
    mtu: "1500",
    deviceName: "eth0",
    pciIdentifier: "0000:00:1f.6",
    sriovEnabled: false,
    sriovVfsNum: 0,
    sriovVfsTotal: 0,
    timestamps: {
      createdAt: new Date().toISOString(),
    },
  },
  {
    deviceName: "Network Interface",
    ipaddresses: [
      {
        address: "192.168.11.1",
        configMethod: "IP_ADDRESS_CONFIG_MODE_STATIC",
      },
      {
        address: "192.168.11.2",
        configMethod: "IP_ADDRESS_CONFIG_MODE_STATIC",
      },
    ],
    macAddr: "123478329",
    pciIdentifier: "Cdsaf23",
    sriovEnabled: true,
    sriovVfsNum: 321,
    sriovVfsTotal: 500,
    mtu: "2",
    bmcInterface: true,
  },
  {
    deviceName: "Interface 2",
    ipaddresses: [
      {
        address: "343232",
        configMethod: "IP_ADDRESS_CONFIG_MODE_STATIC",
      },
    ],
    macAddr: "44345",
    pciIdentifier: "Dser432",
    sriovEnabled: false,
    sriovVfsNum: 234,
    mtu: "2",
    bmcInterface: true,
    linkState: {
      timestamp: "1985‑09‑25 17:45:30.005",
      type: "LINK_STATE_UP",
    },
  },
  {
    deviceName: "Interface 3",
    ipaddresses: [
      {
        address: "12232",
        configMethod: "IP_ADDRESS_CONFIG_MODE_UNSPECIFIED",
      },
    ],
    macAddr: "97656",
    pciIdentifier: "Ferr3r",
    sriovEnabled: true,
    sriovVfsNum: 34,
  },
];

export const hostResourceStorage: infra.HostResourcesStorageRead[] = [
  {
    // 3.8 TB
    vendor: "23423",
    model: "24234",
    serial: "324234",
    wwid: "423432",
    capacityBytes: "3840755982336",
  },
  {
    // 3.8 TB
    vendor: "43423",
    model: "64543",
    serial: "75453",
    wwid: "423432",
    capacityBytes: "54354389",
  },
  {
    // 3.8 TB
    vendor: "3rer",
    model: "23fg",
    serial: "wer324",
    wwid: "4rewerg4",
    capacityBytes: "994358843",
  },
];

export const hostResourceUsb: infra.HostResourcesUsbRead[] = [
  {
    addr: "32412351",
    bus: "100004",
    class: "0Eh",
    idProduct: "0x0A12",
    idVendor: "0x07GH",
    serial: "3AAB-AA16",
  },
  {
    addr: "31000003",
    bus: "99999999",
    class: "00h",
    idProduct: "0x0A12",
    idVendor: "0x08FF",
    serial: "3AAB-AA16",
  },
  {
    addr: "10000045",
    bus: "100006",
    class: "07h",
    idProduct: "0x0A12",
    idVendor: "0x07AB",
    serial: "3AAB-AA16",
  },
];
