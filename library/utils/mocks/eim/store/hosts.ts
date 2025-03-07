/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim, enhancedEimSlice } from "@orch-ui/apis";
import { Operator } from "../../../interfaces/Pagination";
import { BaseStore } from "../../baseStore";
import * as metadataBrokerMocks from "../../metadata-broker";
import {
  assignedWorkloadHostFourId,
  assignedWorkloadHostOneId,
  assignedWorkloadHostOneSerial,
  assignedWorkloadHostOneUuid,
  assignedWorkloadHostThreeId,
  assignedWorkloadHostThreeSerial,
  assignedWorkloadHostThreeUuid,
  assignedWorkloadHostTwoId,
  assignedWorkloadHostTwoSerial,
  assignedWorkloadHostTwoUuid,
  hostResourceGpus,
  hostResourceNics,
  hostResourceStorage,
  hostResourceUsb,
  onboardedHostOneId,
  onboardedHostOneSerial,
  onboardedHostOneUuid,
  onboardedHostThreeId,
  onboardedHostThreeSerial,
  onboardedHostThreeUuid,
  onboardedHostTwoId,
  onboardedHostTwoSerial,
  onboardedHostTwoUuid,
  provisionedHostOneId,
  provisionedHostOneUuid,
  provisionedHostThreeId,
  provisionedHostThreeUuid,
  provisionedHostTwoId,
  provisionedHostTwoUuid,
} from "../data";
import {
  instanceFour,
  instanceOne,
  instanceThree,
  instanceTwo,
  instanceUnspecified,
  provisionedInstanceOne,
  provisionedInstanceThree,
  provisionedInstanceTwo,
} from "./instances";
import {
  siteMinimartOne,
  siteRestaurantOne,
  siteRestaurantThree,
  siteRestaurantTwo,
} from "./sites";
import { StoreUtils } from "./utils";

// hostFiveId,
// hostFiveSerial,
// hostFiveUuid,
// hostFourId,
// hostFourSerial,
// hostFourUuid,
// hostOneId,
// hostOneSerial,
// hostOneUuid,
// hostSixId,
// hostSixSerial,
// hostSixUuid,
// hostThreeId,
// hostThreeSerial,
// hostThreeUuid,
// hostTwoId,
// hostTwoSerial,
// hostTwoUuid,

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

// export const hostNoName: HostMock = {
//   resourceId: hostTwoId,
//   name: "",
//   uuid: hostTwoUuid,
//   serialNumber: hostTwoSerial,
//   site: siteRestaurantTwo,
//   inheritedMetadata: {
//     location: hostFourMetadata,
//   },
//   metadata: hostTwoMetadata,
//   desiredState: "HOST_STATE_ONBOARDED",
//   currentState: "HOST_STATE_ONBOARDED",
// };

export const assignedWorkloadHostOne: HostMock = {
  resourceId: assignedWorkloadHostOneId,
  name: "Assigned Host 1",
  uuid: assignedWorkloadHostOneUuid,
  serialNumber: assignedWorkloadHostOneSerial,
  site: siteRestaurantOne,
  metadata: hostOneMetadata,
  instance: instanceOne,
  desiredState: "HOST_STATE_ONBOARDED",
  currentState: "HOST_STATE_ONBOARDED",
  hostStatus: "Provisioned",
  hostStatusIndicator: "STATUS_INDICATION_IDLE",
  timestamps: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

export const assignedWorkloadHostTwo: HostMock = {
  resourceId: assignedWorkloadHostTwoId,
  name: "Assigned Host 2",
  uuid: assignedWorkloadHostTwoUuid,
  serialNumber: assignedWorkloadHostTwoSerial,
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
  hostStatus: "Provisioned",
  hostStatusIndicator: "STATUS_INDICATION_IDLE",
  timestamps: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

export const assignedWorkloadHostThree: HostMock = {
  resourceId: assignedWorkloadHostThreeId,
  name: "",
  uuid: assignedWorkloadHostThreeUuid,
  serialNumber: assignedWorkloadHostThreeSerial,
  site: siteRestaurantThree,
  metadata: hostThreeMetadata,
  instance: instanceThree,
  desiredState: "HOST_STATE_ONBOARDED",
  currentState: "HOST_STATE_ONBOARDED",
  hostStatus: "Provisioned",
  hostStatusIndicator: "STATUS_INDICATION_IDLE",
  timestamps: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  cpuCores: 4,
  cpuModel: "i7-6770HQ",
  cpuThreads: 8,
  cpuSockets: 2,
  cpuArchitecture: "x64",
  memoryBytes: "1073741824",
  hostGpus: hostResourceGpus,
  hostStorages: hostResourceStorage,
  hostUsbs: hostResourceUsb,
  hostNics: hostResourceNics,
};

export const assignedWorkloadHostFour: HostMock = {
  resourceId: assignedWorkloadHostFourId,
  name: assignedWorkloadHostFourId,
  uuid: "",
  serialNumber: "",
  site: siteMinimartOne,
  metadata: hostFourMetadata,
  instance: instanceFour,
  desiredState: "HOST_STATE_ONBOARDED",
  currentState: "HOST_STATE_ONBOARDED",
  onboardingStatusIndicator: "STATUS_INDICATION_IDLE",
  onboardingStatus: "Onboarded",
  onboardingStatusTimestamp: 1717761389,
  hostStatus: "Provisioned",
  hostStatusIndicator: "STATUS_INDICATION_IDLE",
  registrationStatusIndicator: "STATUS_INDICATION_IDLE",
  registrationStatus: "Registered",
  registrationStatusTimestamp: 1728574343137,
  timestamps: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

// Provisioned Host
export const provisionedHostOne: HostMock = {
  ...assignedWorkloadHostOne,
  resourceId: provisionedHostOneId,
  uuid: provisionedHostOneUuid,
  name: provisionedHostOneId,
  instance: provisionedInstanceOne,
  currentState: "HOST_STATE_ONBOARDED",
};

export const provisionedHostTwo: HostMock = {
  ...assignedWorkloadHostOne,
  resourceId: provisionedHostTwoId,
  uuid: provisionedHostTwoUuid,
  name: provisionedHostTwoId,
  instance: provisionedInstanceTwo,
  currentState: "HOST_STATE_ONBOARDED",
};

export const provisionedHostThree: HostMock = {
  ...assignedWorkloadHostOne,
  resourceId: provisionedHostThreeId,
  uuid: provisionedHostThreeUuid,
  name: provisionedHostThreeId,
  instance: provisionedInstanceThree,
  hostStatusIndicator: "STATUS_INDICATION_ERROR",
  hostStatus: "Error",
  hostStatusTimestamp: 123123,
  currentState: "HOST_STATE_ONBOARDED",
};

// Unconfigured Hosts
const onboardedHostMetadata: eim.Metadata = [
  {
    key: metadataBrokerMocks.customersKey,
    value: metadataBrokerMocks.customersOne,
  },
  {
    key: metadataBrokerMocks.regionsKey,
    value: metadataBrokerMocks.regionsThree,
  },
];

export const onboardedHostOne: HostMock = {
  resourceId: onboardedHostOneId,
  // Parent metadata
  inheritedMetadata: {
    location: onboardedHostMetadata,
  },
  name: onboardedHostOneId,
  uuid: onboardedHostOneUuid,
  serialNumber: onboardedHostOneSerial,
  desiredState: "HOST_STATE_ONBOARDED",
  currentState: "HOST_STATE_ONBOARDED",
};

export const onboardedHostTwo: HostMock = {
  resourceId: onboardedHostTwoId,
  name: onboardedHostTwoId,
  uuid: onboardedHostTwoUuid,
  serialNumber: onboardedHostTwoSerial,
  // Host-Specific metadataa
  metadata: onboardedHostMetadata,
  note: "",
  desiredState: "HOST_STATE_ONBOARDED",
  currentState: "HOST_STATE_ONBOARDED",
};

export const onboardedHostThree: HostMock = {
  resourceId: onboardedHostThreeId,
  inheritedMetadata: { location: hostSixMetadata, ou: [] },
  name: onboardedHostThreeId,
  uuid: onboardedHostThreeUuid,
  serialNumber: onboardedHostThreeSerial,
  desiredState: "HOST_STATE_ONBOARDED",
  currentState: "HOST_STATE_ONBOARDED",
};

export const onboardedHostWithInstanceNoName: HostMock = {
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
  registrationStatus:
    "Host Registration Failed due to mismatch of Serial Number, Correct Serial Number is: JFSRQR3",
  registrationStatusIndicator: "STATUS_INDICATION_ERROR",
  registrationStatusTimestamp: 1728574343137,
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
  registrationStatusIndicator: "STATUS_INDICATION_IDLE",
  registrationStatus: "Provisioned",
  registrationStatusTimestamp: 1728574343137,
};

export class HostStore extends BaseStore<"resourceId", HostMock> {
  constructor() {
    super("resourceId", [
      // Configured hosts
      assignedWorkloadHostOne,
      assignedWorkloadHostTwo,
      assignedWorkloadHostThree,
      assignedWorkloadHostFour,
      // Unassigned hosts
      provisionedHostOne,
      provisionedHostTwo,
      provisionedHostThree,
      // Unconfigured Hosts
      onboardedHostOne,
      onboardedHostTwo,
      onboardedHostThree,
      // onboardedHostWithInstanceOne,
      // Registered hosts
      registeredHostOne,
      registeredHostTwo,
      registeredHostThree,
      registeredHostFourError,
      registeredHostFiveIdle,
    ]);
  }

  convert(body: HostMock, id?: string): HostMock {
    const currentTime = new Date().toISOString();
    return {
      ...body,
      resourceId: id ?? `host-${StoreUtils.randomString()}`,
      // Note: Better not to manually assign instance in host object for the mock.
      //       Cause of circular import seen in `Instance` object having `instance.host.status.instance`
      // Also, Both `instance.host.instance===undefined` and `host.instance.host===undefined`
      instance: body.instance,
      note: body.note,
      deauthorized: body.deauthorized,
      timestamps: {
        createdAt: body.timestamps?.createdAt ?? currentTime,
        updatedAt: currentTime,
      },
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

        switch (host.hostStatusIndicator) {
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

const provisionedHostList = new HostStore().list({
  deviceUuid: null,
  filter: "NOT has(instance.workloadMembers) AND has(site)",
});
export const provisionedHosts: eim.GetV1ProjectsByProjectNameComputeHostsApiResponse =
  {
    hasNext: false,
    hosts: provisionedHostList,
    totalElements: provisionedHostList.length,
  };

const onboardedHostList = new HostStore().list({
  deviceUuid: null,
  filter: "NOT has(site)",
});
export const onboardedHosts: eim.GetV1ProjectsByProjectNameComputeHostsApiResponse =
  {
    hasNext: false,
    hosts: onboardedHostList,
    totalElements: onboardedHostList.length,
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
