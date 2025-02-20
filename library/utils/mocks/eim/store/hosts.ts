/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim, enhancedEimSlice } from "@orch-ui/apis";
import { Operator } from "../../../interfaces/Pagination";
import * as metadataBrokerMocks from "../../metadata-broker";
import { BaseStore } from "./baseStore";
import {
  hostFiveId,
  hostFiveSerial,
  hostFiveUuid,
  hostFourId,
  hostFourSerial,
  hostFourUuid,
  hostOneId,
  hostOneSerial,
  hostOneUuid,
  hostSixId,
  hostSixSerial,
  hostSixUuid,
  hostThreeId,
  hostThreeSerial,
  hostThreeUuid,
  hostTwoId,
  hostTwoSerial,
  hostTwoUuid,
  unassignedHostOneId,
  unassignedHostOneUuid,
  unassignedHostThreeId,
  unassignedHostThreeUuid,
  unassignedHostTwoId,
  unassignedHostTwoUuid,
  unconfiguredHostOneId,
  unconfiguredHostOneSerial,
  unconfiguredHostOneUuid,
  unconfiguredHostThreeId,
  unconfiguredHostThreeSerial,
  unconfiguredHostThreeUuid,
  unconfiguredHostTwoId,
  unconfiguredHostTwoSerial,
  unconfiguredHostTwoUuid,
  unconfiguredHostWithInstanceOneId,
  unconfiguredHostWithInstanceOneSerial,
  unconfiguredHostWithInstanceOneUuid,
} from "./iaasIds";
import {
  instanceFive,
  instanceFour,
  instanceOne,
  instanceSix,
  instanceThree,
  instanceTwo,
  instanceUnassignedOne,
  instanceUnassignedThree,
  instanceUnassignedTwo,
  instanceUnconfiguredOne,
  instanceUnspecified,
} from "./instances";
import {
  siteMinimartOne,
  siteMinimartTwo,
  siteRestaurantOne,
  siteRestaurantThree,
  siteRestaurantTwo,
  siteStore,
} from "./sites";
import { StoreUtils } from "./utils";

type KeyValuePairs = { [key: string]: string };

// Configured/Assigned Hosts
export const hostOneMetadata: eim.Metadata = [
  {
    key: metadataBrokerMocks.customersKey,
    value: metadataBrokerMocks.customersOne,
  },
  {
    key: metadataBrokerMocks.regionsKey,
    value: metadataBrokerMocks.regionsThree,
  },
  {
    key: metadataBrokerMocks.statesKey,
    value: metadataBrokerMocks.statesTwo,
  },
];

export const hostTwoMetadata: eim.Metadata = [
  {
    key: metadataBrokerMocks.customersKey,
    value: metadataBrokerMocks.customersOne,
  },
  {
    key: metadataBrokerMocks.regionsKey,
    value: metadataBrokerMocks.regionsThree,
  },
  {
    key: metadataBrokerMocks.statesKey,
    value: metadataBrokerMocks.statesTwo,
  },
];

export const hostThreeMetadata: eim.Metadata = [
  {
    key: metadataBrokerMocks.customersKey,
    value: metadataBrokerMocks.customersOne,
  },
  {
    key: metadataBrokerMocks.regionsKey,
    value: metadataBrokerMocks.regionsThree,
  },
];

export const hostFourMetadata: eim.Metadata = [
  {
    key: metadataBrokerMocks.customersKey,
    value: metadataBrokerMocks.customersTwo,
  },
  {
    key: metadataBrokerMocks.regionsKey,
    value: metadataBrokerMocks.regionsTwo,
  },
];

export const hostFiveMetadata: eim.Metadata = [
  {
    key: metadataBrokerMocks.customersKey,
    value: metadataBrokerMocks.customersTwo,
  },
  {
    key: metadataBrokerMocks.regionsKey,
    value: metadataBrokerMocks.regionsTwo,
  },
];

export const hostSixMetadata: eim.Metadata = [
  {
    key: metadataBrokerMocks.customersKey,
    value: metadataBrokerMocks.customersTwo,
  },
  {
    key: metadataBrokerMocks.regionsKey,
    value: metadataBrokerMocks.regionsFour,
  },
];

export interface HostMock extends eim.HostRead {
  deauthorized?: boolean;
  instance?: enhancedEimSlice.InstanceReadModified;
}

export const hostNoName: HostMock = {
  resourceId: hostTwoId,
  name: "",
  uuid: hostTwoUuid,
  serialNumber: hostTwoSerial,
  site: siteRestaurantTwo,
  inheritedMetadata: {
    location: hostFourMetadata,
  },
  metadata: hostTwoMetadata,
  desiredState: "HOST_STATE_ONBOARDED",
  currentState: "HOST_STATE_ONBOARDED",
};

export const hostOne: HostMock = {
  resourceId: hostOneId,
  name: hostOneId,
  uuid: hostOneUuid,
  serialNumber: hostOneSerial,
  site: siteRestaurantOne,
  metadata: hostOneMetadata,
  instance: instanceOne,
  desiredState: "HOST_STATE_ONBOARDED",
  currentState: "HOST_STATE_ONBOARDED",
  hostStatus: {
    indicator: "STATUS_INDICATION_IDLE",
    message: "Running",
    timestamp: 1717761389,
  },
};

export const hostTwo: HostMock = {
  resourceId: hostTwoId,
  name: "Host 2",
  uuid: hostTwoUuid,
  serialNumber: hostTwoSerial,
  site: siteRestaurantTwo,
  inheritedMetadata: {
    location: hostFourMetadata,
  },
  metadata: hostTwoMetadata,
  instance: instanceTwo,
  provider: {
    providerVendor: "PROVIDER_VENDOR_LENOVO_LOCA",
    providerKind: "PROVIDER_KIND_BAREMETAL",
    name: "Lenovo LOC-A",
    apiEndpoint: "/lenovo-loc-a",
  },
  desiredState: "HOST_STATE_ONBOARDED",
  currentState: "HOST_STATE_ONBOARDED",
};

export const hostThree: HostMock = {
  resourceId: hostThreeId,
  name: hostThreeId,
  uuid: hostThreeUuid,
  serialNumber: hostThreeSerial,
  site: siteRestaurantThree,
  metadata: hostThreeMetadata,
  instance: instanceThree,
  desiredState: "HOST_STATE_ONBOARDED",
  currentState: "HOST_STATE_ONBOARDED",
  // TODO: Create a Host Resource store
  cpuCores: 4,
  cpuModel: "i7-6770HQ",
  cpuThreads: 8,
  cpuSockets: 2,
  cpuArchitecture: "x64",
  hostGpus: [
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
  ],
  hostNics: [
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
      linkState: { timestamp: "", type: "LINK_STATE_DOWN" },
      macAddr: "90:49:fa:07:6c:fd",
      mtu: "1500",
      deviceName: "eth0",
      pciIdentifier: "0000:00:1f.6",
      sriovEnabled: false,
      sriovVfsNum: 0,
      sriovVfsTotal: 0,
      status: {
        timestamp: "",
        condition: "HOST_COMPONENT_STATE_EXISTS",
        type: "STATUS_CONDITION_RUNNING",
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
      status: {
        timestamp: "1683624877",
        condition: "condition 1",
        reason: "Reason 1",
        type: "STATUS_CONDITION_RUNNING",
        details: "Details on status",
      },
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
      status: {
        timestamp: "1683624877",
        condition: "Condition 2",
        type: "STATUS_CONDITION_DELETED",
      },
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
      status: {
        timestamp: "1683624877",
        condition: "Condition 3",
        type: "STATUS_CONDITION_ERROR",
      },
    },
  ],
  memoryBytes: "1073741824",
  hostStorages: [
    {
      // 3.8 TB
      vendor: "23423",
      model: "24234",
      serial: "324234",
      wwid: "423432",
      status: {
        timestamp: "23432",
        type: "STATUS_CONDITION_DELETED",
        condition: "rew",
      },
      capacityBytes: "3840755982336",
    },
    {
      // 3.8 TB
      vendor: "43423",
      model: "64543",
      serial: "75453",
      wwid: "423432",
      status: {
        timestamp: "2432",
        type: "STATUS_CONDITION_RUNNING",
        condition: "ertert",
      },
      capacityBytes: "54354389",
    },
    {
      // 3.8 TB
      vendor: "3rer",
      model: "23fg",
      serial: "wer324",
      wwid: "4rewerg4",
      status: {
        timestamp: "2432",
        type: "STATUS_CONDITION_ERROR",
        condition: "ertert",
      },
      capacityBytes: "994358843",
    },
  ],
  hostUsbs: [
    {
      addr: "32412351",
      bus: "100004",
      class: "0Eh",
      idProduct: "0x0A12",
      idVendor: "0x07GH",
      serial: "3AAB-AA16",
      status: {
        condition: "Running",
        timestamp: "20230304",
        type: "STATUS_CONDITION_RUNNING",
        details: "In Use",
        reason: "N/A",
      },
    },
    {
      addr: "31000003",
      bus: "99999999",
      class: "00h",
      idProduct: "0x0A12",
      idVendor: "0x08FF",
      serial: "3AAB-AA16",
      status: {
        condition: "Running",
        timestamp: "20230304",
        type: "STATUS_CONDITION_RUNNING",
        details: "In Use",
        reason: "N/A",
      },
    },
    {
      addr: "10000045",
      bus: "100006",
      class: "07h",
      idProduct: "0x0A12",
      idVendor: "0x07AB",
      serial: "3AAB-AA16",
      status: {
        condition: "Running",
        timestamp: "20230304",
        type: "STATUS_CONDITION_RUNNING",
        details: "In Use",
        reason: "N/A",
      },
    },
  ],
};

export const hostFour: HostMock = {
  resourceId: hostFourId,
  name: hostFourId,
  uuid: hostFourUuid,
  serialNumber: hostFourSerial,
  site: siteMinimartOne,
  metadata: hostFourMetadata,
  instance: instanceFour,
  desiredState: "HOST_STATE_ONBOARDED",
  currentState: "HOST_STATE_ONBOARDED",
};

export const hostFive: HostMock = {
  resourceId: hostFiveId,
  instance: instanceFive,
  name: hostFiveId,
  uuid: hostFiveUuid,
  serialNumber: hostFiveSerial,
  site: siteMinimartTwo,
  metadata: hostFiveMetadata,
  onboardingStatus: {
    indicator: "STATUS_INDICATION_IDLE",
    message: "Onboarded",
    timestamp: 1717761389,
  },
  hostStatus: {
    indicator: "STATUS_INDICATION_IDLE",
    message: "Running",
    timestamp: 1717761389,
  },
  registrationStatus: {
    indicator: "STATUS_INDICATION_IDLE",
    message: "Registered",
    timestamp: 1728574343137,
  },
  desiredState: "HOST_STATE_ONBOARDED",
  currentState: "HOST_STATE_ONBOARDED",
};

export const hostSix: HostMock = {
  resourceId: hostSixId,
  name: hostSixId,
  uuid: hostSixUuid,
  serialNumber: hostSixSerial,
  site: siteStore,
  metadata: hostSixMetadata,
  instance: instanceSix,
  desiredState: "HOST_STATE_ONBOARDED",
  currentState: "HOST_STATE_ONBOARDED",
};

// Unassigned Host
export const unassignedHostOne: HostMock = {
  ...hostOne,
  resourceId: unassignedHostOneId,
  uuid: unassignedHostOneUuid,
  name: unassignedHostOneId,
  instance: instanceUnassignedOne,
  currentState: "HOST_STATE_ONBOARDED",
};

export const unassignedHostTwo: HostMock = {
  ...hostTwo,
  resourceId: unassignedHostTwoId,
  uuid: unassignedHostTwoUuid,
  name: unassignedHostTwoId,
  instance: instanceUnassignedTwo,
  currentState: "HOST_STATE_ONBOARDED",
};

export const unassignedHostThree: HostMock = {
  ...hostThree,
  resourceId: unassignedHostThreeId,
  uuid: unassignedHostThreeUuid,
  name: unassignedHostThreeId,
  instance: instanceUnassignedThree,
  hostStatus: {
    indicator: "STATUS_INDICATION_ERROR",
    message: "Error",
    timestamp: 123123,
  },
  currentState: "HOST_STATE_ONBOARDED",
  //metadata: [{ key: "customer", value: "culvers" }], TODO: needed for metadata cypress test ?
};

// Unconfigured Hosts
const unconfiguredHostMetadata: eim.Metadata = [
  {
    key: metadataBrokerMocks.customersKey,
    value: metadataBrokerMocks.customersOne,
  },
  {
    key: metadataBrokerMocks.regionsKey,
    value: metadataBrokerMocks.regionsThree,
  },
];

export const unconfiguredHostOne: HostMock = {
  resourceId: unconfiguredHostOneId,
  // Parent metadata
  inheritedMetadata: {
    location: unconfiguredHostMetadata,
  },
  name: unconfiguredHostOneId,
  uuid: unconfiguredHostOneUuid,
  serialNumber: unconfiguredHostOneSerial,
  desiredState: "HOST_STATE_ONBOARDED",
  currentState: "HOST_STATE_ONBOARDED",
};

export const unconfiguredHostTwo: HostMock = {
  resourceId: unconfiguredHostTwoId,
  name: unconfiguredHostTwoId,
  uuid: unconfiguredHostTwoUuid,
  serialNumber: unconfiguredHostTwoSerial,
  // Host-Specific metadataa
  metadata: unconfiguredHostMetadata,
  note: "",
  desiredState: "HOST_STATE_ONBOARDED",
  currentState: "HOST_STATE_ONBOARDED",
};

export const unconfiguredHostThree: HostMock = {
  resourceId: unconfiguredHostThreeId,
  inheritedMetadata: { location: hostSixMetadata, ou: [] },
  name: unconfiguredHostThreeId,
  uuid: unconfiguredHostThreeUuid,
  serialNumber: unconfiguredHostThreeSerial,
  desiredState: "HOST_STATE_ONBOARDED",
  currentState: "HOST_STATE_ONBOARDED",
};

/* Unconfigured host with instance. */
export const unconfiguredHostWithInstanceOne: HostMock = {
  resourceId: unconfiguredHostWithInstanceOneId,
  name: unconfiguredHostWithInstanceOneId,
  uuid: unconfiguredHostWithInstanceOneUuid,
  serialNumber: unconfiguredHostWithInstanceOneSerial,
  instance: instanceUnconfiguredOne,
  desiredState: "HOST_STATE_ONBOARDED",
  currentState: "HOST_STATE_ONBOARDED",
};

/* host with unspecified status */
export const unspecifiedStatusHost: HostMock = {
  ...unconfiguredHostOne,
  hostStatus: {
    indicator: "STATUS_INDICATION_UNSPECIFIED",
    message: "Unknown",
    timestamp: 1717761389,
  },
  desiredState: "HOST_STATE_ONBOARDED",
  currentState: "HOST_STATE_ONBOARDED",
};

export const unconfiguredHostWithInstanceNoName: HostMock = {
  resourceId: "host-ed7c5735",
  cpuArchitecture: "",
  cpuCapabilities: "",
  cpuCores: 0,
  cpuModel: "",
  cpuSockets: 0,
  cpuThreads: 0,
  memoryBytes: "0",
  biosReleaseDate: "",
  biosVendor: "",
  biosVersion: "",
  hostname: "",
  productName: "",
  serialNumber: "FZAP103000Z",
  hostUsbs: [],
  metadata: [],
  name: "",
  site: undefined,
  uuid: "ec26b1ed-311b-0da0-5f2b-fc17f60f35e3",
  instance: instanceUnspecified,
  desiredState: "HOST_STATE_ONBOARDED",
  currentState: "HOST_STATE_ONBOARDED",
};

export const registeredHostOne: HostMock = {
  resourceId: "registered-host-1",
  currentState: "HOST_STATE_REGISTERED",
  instance: {
    resourceId: "registered-host-1",
    desiredState: "INSTANCE_STATE_UNTRUSTED",
  },
  serialNumber: "ec269d77-9b98-bda3-2f68-34342w23432a",
  uuid: "ec26b1ed-311b-0da2-5f2b-fc17f60f35e3",
  name: "registered-host-1",
};

export const registeredHostTwo: HostMock = {
  resourceId: "host-ad7c5736",
  currentState: "HOST_STATE_REGISTERED",
  instance: {
    resourceId: "registered-host-2",
    desiredState: "INSTANCE_STATE_UNSPECIFIED",
  },
  serialNumber: "ec269d77-9b98-bda3-2f68-34342w23432b",
  uuid: "ec26b1ed-311b-0da1-5f2b-fc17f60f35e3",
  name: "",
};

export const registeredHostThree: HostMock = {
  resourceId: "host-ed5c5736",
  currentState: "HOST_STATE_REGISTERED",
  instance: {
    resourceId: "registered-host-3",
    desiredState: "INSTANCE_STATE_UNSPECIFIED",
  },
  serialNumber: "ec269d77-9b98-bda3-2f68-34342w23432c",
  uuid: "ec26b1ed-311b-0da0-5f2b-fc17f60f35e3",
  name: "",
};

export const registeredHostFourError: HostMock = {
  resourceId: "test-error-host-zz5c5736",
  currentState: "HOST_STATE_REGISTERED",
  instance: {
    desiredState: "INSTANCE_STATE_UNSPECIFIED",
  },
  serialNumber: "ec269d77-9b98-bda3-2f68-34342w23432c",
  uuid: "ec26b1ed-311b-0da0-5f2b-fc17f60f35e3",
  name: "test-error-host-zl5c5736",
  registrationStatus: {
    message:
      "Host Registration Failed due to mismatch of Serial Number, Correct Serial Number is: JFSRQR3",
    indicator: "STATUS_INDICATION_ERROR",
    timestamp: 1728574343137,
  },
};

export const registeredHostFiveIdle: HostMock = {
  resourceId: "test-idle-host-xy5c5777",
  currentState: "HOST_STATE_REGISTERED",
  instance: {
    resourceId: "registered-host-3",
    desiredState: "INSTANCE_STATE_UNSPECIFIED",
  },
  serialNumber: "ec269d77-9b98-bda3-2f68-34342w23432c",
  uuid: "ec26b1ed-311b-0da0-5f2b-fc17f60f35e3",
  name: "",
  registrationStatus: {
    indicator: "STATUS_INDICATION_IDLE",
    message: "Provisioned",
    timestamp: 1728574343137,
  },
};

export class HostStore extends BaseStore<"resourceId", HostMock> {
  constructor() {
    super("resourceId", [
      // Configured hosts
      hostOne,
      hostTwo,
      hostThree,
      hostFour,
      hostFive,
      hostSix,
      // Unassigned hosts
      unassignedHostOne,
      unassignedHostTwo,
      unassignedHostThree,
      // Unconfigured Hosts
      unconfiguredHostOne,
      unconfiguredHostTwo,
      unconfiguredHostThree,
      unconfiguredHostWithInstanceOne,
      // Registered hosts
      registeredHostOne,
      registeredHostTwo,
      registeredHostThree,
      registeredHostFourError,
      registeredHostFiveIdle,
    ]);
  }

  convert(body: HostMock, id?: string): HostMock {
    return {
      ...body,
      resourceId: id ?? `host-${StoreUtils.randomString()}`,
      // Note: Better not to manually assign instance in host object for the mock.
      //       Cause of circular import seen in `Instance` object having `instance.host.status.instance`
      // Also, Both `instance.host.instance===undefined` and `host.instance.host===undefined`
      instance: body.instance,
      note: body.note,
      deauthorized: body.deauthorized,
    };
  }

  list(params?: {
    siteID?: string | null;
    deviceUuid?: string | null;
    filter?: string | null;
  }): HostMock[] {
    let resources = this.resources;

    /* --- Server side filtering Logic: from here --- */
    // if no filters provided return all available hosts in system. (TODO: project check)
    if (!params) return resources;

    // filter by device uuid of host
    if (params.deviceUuid) {
      resources = resources.filter((h) => h.uuid === params.deviceUuid);
    }

    // filter hosts by it's `site`
    if (params?.filter?.match(/NOT has\(site\)/g)) {
      resources = resources.filter(
        (host) => !host.site || host.site.siteID === "",
      );
    } else if (params?.filter?.match(/has\(site\)/g)) {
      resources = resources.filter(
        (host) => host.site && host.site.siteID !== "",
      );
    } else if (params.filter?.match(/site\.resourceId=/)) {
      const matches = params.filter?.match(/site\.resourceId="(.*)"/);
      if (matches && matches?.length > 0) {
        resources = resources.filter(
          (host) => host.site && host.site.resourceId === matches[1],
        );
      }
    }

    // If Workload/Cluster is `not present(Configured)` or `present(Active)`
    if (params?.filter?.match(/NOT has\(instance.workloadMembers\)/g)) {
      resources = resources.filter((host) => !host?.instance?.workloadMembers);
    } else if (params?.filter?.match(/has\(instance.workloadMembers\)/g)) {
      resources = resources.filter((host) => host?.instance?.workloadMembers);
    }

    // Matching on Current State of Host
    if (params?.filter?.match(/currentState=/)) {
      const matches = params.filter.match(/currentState=HOST_STATE_([_A-Z]*)/);
      if (matches && matches.length > 0) {
        resources = resources.filter(
          (host) => host.currentState === `HOST_STATE_${matches[1]}`,
        );
      }
    }

    // Matching on Desired State of `Instance of this Host`
    if (params?.filter?.match(/instance\.desiredState=/)) {
      const matches = params.filter.match(
        /instance\.desiredState=INSTANCE_STATE_([_A-Z]*) /,
      );
      if (matches && matches.length > 0) {
        resources = resources.filter(
          (host) =>
            host.instance?.desiredState === `INSTANCE_STATE_${matches[1]}`,
        );
      }
    }

    /* --- Return final list of Host --- */
    return resources;
  }

  registerHost(host: HostMock & { isAutoOnboarded?: boolean }) {
    this.post({
      ...host,
      currentState: "HOST_STATE_REGISTERED",
      ...(host.isAutoOnboarded
        ? {
            instance: {
              ...host.instance,
              desiredState: "INSTANCE_STATE_UNSPECIFIED",
            },
          }
        : {}),
    });
  }

  deauthorizeHost(hostId: string, isDeauthorize: boolean, note: string) {
    const host = this.get(hostId);
    if (host) {
      this.put(hostId, {
        ...host,
        instance: host.instance,
        deauthorized: isDeauthorize,
        note,
      });
      return true;
    }
    return false;
  }

  getSummary(
    filter?: string | null,
  ): eim.GetV1ProjectsByProjectNameComputeHostsSummaryApiResponse {
    let hosts = this.resources;
    const hostStat: eim.GetV1ProjectsByProjectNameComputeHostsSummaryApiResponse =
      {
        total: 0,
        running: 0,
        error: 0,
        unallocated: 0,
      };

    if (hosts) {
      // Seperate to simplest filters
      const metadataParams = filter
        ?.split(` ${Operator.AND} `)
        // Check each filter for metadata
        .filter((metadataParam) => metadataParam?.match(/(metadata=)/g));

      if ((metadataParams?.length ?? 0) > 0) {
        const givenMetadataSet: KeyValuePairs = {};
        // For each metadata
        metadataParams?.forEach((keyValuePairs) => {
          // Parse each metadata string for <key,value> pair
          const [, metadataString] = keyValuePairs.split("=");
          const [keyString, valueString] = metadataString
            .slice(1, metadataString.length - 1)
            .split(",");
          let [, key] = keyString.split(":");
          let [, value] = valueString.split(":");
          [key, value] = [
            key.slice(1, key.length - 1),
            value.slice(1, value.length - 1),
          ];
          givenMetadataSet[key] = value;
        });

        // For each host get metadata similarity with given metadata filter
        hosts = hosts.filter((host) => {
          let matchSimilarity = 0;

          // Host eim.Metadata: Both Inherited and Host-Specific
          const metadataSet: KeyValuePairs = {};
          host.inheritedMetadata?.location?.forEach(({ key, value }) => {
            metadataSet[key] = value;
          });
          host.metadata?.forEach(({ key, value }) => {
            metadataSet[key] = value;
          });

          // Compare
          for (const key of Object.keys(givenMetadataSet)) {
            if (metadataSet[key] === givenMetadataSet[key]) {
              matchSimilarity++;
            }
          }

          // If the all metadata within `ous` matches
          return metadataParams?.length === matchSimilarity;
        });
      }

      hostStat.total! += hosts.length;
      hosts.map((host: eim.HostRead) => {
        if (!host.site) {
          hostStat.unallocated! += 1;
        }

        switch (host.hostStatus?.indicator) {
          case "STATUS_INDICATION_ERROR":
            hostStat.error! += 1;
            break;
          case "STATUS_INDICATION_IDLE":
            hostStat.running! += 1;
            break;
        }
      });
    }
    return hostStat;
  }
}

const hostsList = new HostStore().list();
export const hosts: eim.GetV1ProjectsByProjectNameComputeHostsApiResponse = {
  hasNext: false,
  hosts: hostsList,
  totalElements: hostsList.length,
};

const assignedHostList = new HostStore().list({
  deviceUuid: null,
  filter: "has(instance.workloadMembers) AND has(site)",
});
export const assignedHosts: eim.GetV1ProjectsByProjectNameComputeHostsApiResponse =
  {
    hasNext: false,
    hosts: assignedHostList,
    totalElements: assignedHostList.length,
  };

const unassignedHostList = new HostStore().list({
  deviceUuid: null,
  filter: "NOT has(instance.workloadMembers) AND has(site)",
});
export const unassignedHosts: eim.GetV1ProjectsByProjectNameComputeHostsApiResponse =
  {
    hasNext: false,
    hosts: unassignedHostList,
    totalElements: unassignedHostList.length,
  };

const registeredHostList = new HostStore().list({
  deviceUuid: null,
  filter: "currentState=HOST_STATE_REGISTERED",
});
export const registeredHosts: eim.GetV1ProjectsByProjectNameComputeHostsApiResponse =
  {
    hasNext: false,
    hosts: registeredHostList,
    totalElements: registeredHostList.length,
  };

const unconfiguredHostList = new HostStore().list({
  deviceUuid: null,
  filter: "NOT has(site)",
});
export const unconfiguredHosts: eim.GetV1ProjectsByProjectNameComputeHostsApiResponse =
  {
    hasNext: false,
    hosts: unconfiguredHostList,
    totalElements: unconfiguredHostList.length,
  };
