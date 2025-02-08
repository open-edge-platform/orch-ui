/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { Operator } from "../../../interfaces/Pagination";
import {
  customersKey,
  customersOne,
  customersTwo,
  regionsFour,
  regionsKey,
  regionsThree,
  regionsTwo,
  statesKey,
  statesTwo,
} from "../../metadata-broker/metadata";
import BaseStore from "./baseStore";

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
import StoreUtils from "./utils";

type KeyValuePairs = { [key: string]: string };

// Configured/Assigned Hosts
export const hostOneMetadata: eim.Metadata = [
  {
    key: customersKey,
    value: customersOne,
  },
  {
    key: regionsKey,
    value: regionsThree,
  },
  {
    key: statesKey,
    value: statesTwo,
  },
];

export const hostTwoMetadata: eim.Metadata = [
  {
    key: customersKey,
    value: customersOne,
  },
  {
    key: regionsKey,
    value: regionsThree,
  },
  {
    key: statesKey,
    value: statesTwo,
  },
];

export const hostThreeMetadata: eim.Metadata = [
  {
    key: customersKey,
    value: customersOne,
  },
  {
    key: regionsKey,
    value: regionsThree,
  },
];

export const hostFourMetadata: eim.Metadata = [
  {
    key: customersKey,
    value: customersTwo,
  },
  {
    key: regionsKey,
    value: regionsTwo,
  },
];

export const hostFiveMetadata: eim.Metadata = [
  {
    key: customersKey,
    value: customersTwo,
  },
  {
    key: regionsKey,
    value: regionsTwo,
  },
];

export const hostSixMetadata: eim.Metadata = [
  {
    key: customersKey,
    value: customersTwo,
  },
  {
    key: regionsKey,
    value: regionsFour,
  },
];

export interface HostMock extends eim.HostRead {
  deauthorized?: boolean;
}

export const hostNoName: HostMock = {
  resourceId: hostTwoId,
  inheritedMetadata: {
    location: hostFourMetadata,
  },
  name: "",
  uuid: hostTwoUuid,
  site: siteRestaurantTwo,
  metadata: hostTwoMetadata,
  serialNumber: hostTwoSerial,
};

/* structuredClone() is called to avoid circular reference where instance requires hosts and host requires instance */
export const hostOne: HostMock = {
  resourceId: hostOneId,
  instance: instanceOne,
  name: hostOneId,
  uuid: hostOneUuid,
  site: siteRestaurantOne,
  metadata: hostOneMetadata,
  serialNumber: hostOneSerial,
};

instanceOne.host = structuredClone(hostOne);

export const hostTwo: HostMock = {
  resourceId: hostTwoId,
  instance: instanceTwo,
  inheritedMetadata: {
    location: hostFourMetadata,
  },
  name: hostTwoId,
  uuid: hostTwoUuid,
  site: siteRestaurantTwo,
  metadata: hostTwoMetadata,
  serialNumber: hostTwoSerial,
};

instanceTwo.host = structuredClone(hostTwo);

export const hostThree: HostMock = {
  resourceId: hostThreeId,
  instance: instanceThree,
  biosReleaseDate: "10/16/2017",
  biosVendor: "Amazon EC2",
  biosVersion: "1.0",
  cpuArchitecture: "x86_64",
  cpuCapabilities:
    "fpu,vme,de,pse,tsc,msr,pae,mce,cx8,apic,sep,mtrr,pge,mca,cmov,pat,pse36,clflush,mmx,fxsr,sse,sse2,ss,ht,syscall,nx,pdpe1gb,rdtscp,lm,constant_tsc,rep_good,nopl,xtopology,nonstop_tsc,cpuid,tsc_known_freq,pni,pclmulqdq,ssse3,fma,cx16,pcid,sse4_1,sse4_2,x2apic,movbe,popcnt,tsc_deadline_timer,aes,xsave,avx,f16c,rdrand,hypervisor,lahf_lm,abm,3dnowprefetch,invpcid_single,pti,fsgsbase,tsc_adjust,bmi1,avx2,smep,bmi2,erms,invpcid,mpx,avx512f,avx512dq,rdseed,adx,smap,clflushopt,clwb,avx512cd,avx512bw,avx512vl,xsaveopt,xsavec,xgetbv1,xsaves,ida,arat,pku,ospke",
  cpuCores: 2,
  cpuModel: "Intel(R) Xeon(R) Platinum 8259CL CPU @ 2.50GHz",
  cpuSockets: 1,
  cpuThreads: 4,
  hostGpus: [],
  hostNics: [],
  hostStorages: [
    {
      capacityBytes: "34359738368",
      deviceName: "nvme0n1",
      model: "Amazon Elastic Block Store",
      serial: "vol0933ffb6fcfb90b9b",
      status: {
        condition: "HOST_COMPONENT_STATE_EXISTS",
        type: "STATUS_CONDITION_UNSPECIFIED",
        timestamp: "",
      },
      vendor: "unknown",
      wwid: "",
    },
  ],
  hostUsbs: [],
  memoryBytes: "17045651456",
  productName: "t3.xlarge",
  name: hostThreeId,
  uuid: hostThreeUuid,
  site: siteRestaurantThree,
  metadata: hostThreeMetadata,
  serialNumber: hostThreeSerial,
};

instanceThree.host = structuredClone(hostThree);

export const hostFour: HostMock = {
  resourceId: hostFourId,
  instance: instanceFour,
  name: hostFourId,
  uuid: hostFourUuid,
  site: siteMinimartOne,
  metadata: hostFourMetadata,
  serialNumber: hostFourSerial,
};

instanceFour.host = structuredClone(hostFour);

export const hostFive: HostMock = {
  resourceId: hostFiveId,
  instance: instanceFive,
  name: hostFiveId,
  uuid: hostFiveUuid,
  site: siteMinimartTwo,
  metadata: hostFiveMetadata,
  serialNumber: hostFiveSerial,
};

instanceFive.host = structuredClone(hostFive);

export const hostSix: HostMock = {
  resourceId: hostSixId,
  instance: instanceSix,
  name: "",
  uuid: hostSixUuid,
  site: siteStore,
  metadata: hostSixMetadata,
  serialNumber: hostSixSerial,
};

instanceSix.host = structuredClone(hostSix);

// Unassigned Host
export const unassignedHostOne: HostMock = {
  ...hostOne,
  uuid: unassignedHostOneUuid,
  name: unassignedHostOneId,
  instance: instanceUnassignedOne,
};

instanceUnassignedOne.host = structuredClone(unassignedHostOne);

export const unassignedHostTwo: HostMock = {
  ...hostTwo,
  uuid: unassignedHostTwoUuid,
  name: unassignedHostTwoId,
  instance: instanceUnassignedTwo,
};

instanceUnassignedTwo.host = structuredClone(unassignedHostTwo);

export const unassignedHostThree: HostMock = {
  ...hostThree,
  uuid: unassignedHostThreeUuid,
  name: unassignedHostThreeId,
  instance: instanceUnassignedThree,
};

instanceUnassignedThree.host = structuredClone(unassignedHostThree);

// Unconfigured Hosts
const unconfiguredHostMetadata: eim.Metadata = [
  {
    key: customersKey,
    value: customersOne,
  },
  {
    key: regionsKey,
    value: regionsThree,
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
};

export const unconfiguredHostTwo: HostMock = {
  resourceId: unconfiguredHostTwoId,
  name: unconfiguredHostTwoId,
  uuid: unconfiguredHostTwoUuid,
  serialNumber: unconfiguredHostTwoSerial,
  // Host-Specific metadataa
  metadata: unconfiguredHostMetadata,
  note: "",
};

export const unconfiguredHostThree: HostMock = {
  resourceId: unconfiguredHostThreeId,
  name: unconfiguredHostThreeId,
  uuid: unconfiguredHostThreeUuid,
  serialNumber: unconfiguredHostThreeSerial,
};

/* Unconfigured host with instance. */
export const unconfiguredHostWithInstanceOne: HostMock = {
  resourceId: unconfiguredHostWithInstanceOneId,
  name: unconfiguredHostWithInstanceOneId,
  uuid: unconfiguredHostWithInstanceOneUuid,
  serialNumber: unconfiguredHostWithInstanceOneSerial,
  instance: instanceUnspecified,
};

class HostStore extends BaseStore<"resourceId", HostMock> {
  constructor() {
    super("resourceId", [
      //Configured hosts
      hostOne,
      hostTwo,
      hostThree,
      hostFour,
      hostFive,
      hostSix,
      //Unassigned hosts
      unassignedHostOne,
      unassignedHostTwo,
      unassignedHostThree,
      //Unconfigured Hosts
      unconfiguredHostOne,
      unconfiguredHostTwo,
      unconfiguredHostThree,
      unconfiguredHostWithInstanceOne,
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

    if (!params) return resources;

    if (params.deviceUuid) {
      resources = resources.filter((h) => h.uuid === params.deviceUuid);
    }

    // Server side filtering
    if (params?.filter?.match(/NOT has\(site\)/g)) {
      // If site is not available (TODO: Does `NOT has(site)` consider empty string?)
      resources = resources.filter(
        (host) => !host.site || host.site.siteID === "",
      );
    } else if (params?.filter?.match(/has\(site\)/g)) {
      // If site is available and not a empty string (TODO: Does `has(site)` consider not empty string?)
      resources = resources.filter(
        (host) => host.site && host.site.siteID !== "",
      );
    }

    const filterUuid = params?.filter?.match(/uuid="([a-zA-Z\d-]+)"/);
    if (filterUuid && filterUuid.length > 0) {
      // filter by GUID
      resources = resources.filter((h) => h.uuid === filterUuid[1]);
    }

    return resources;
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

          // Host Metadata: Both Inherited and Host-Specific
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
        if (!host.site?.siteID || host.site?.siteID === "") {
          hostStat.unallocated! += 1;
        }

        if (host.hostStatus?.indicator === "STATUS_INDICATION_ERROR") {
          hostStat.error! += 1;
        } else if (
          host.hostStatus?.indicator === "STATUS_INDICATION_IDLE" ||
          host.instance?.provisioningStatus?.indicator ===
            "STATUS_INDICATION_IDLE"
        ) {
          hostStat.running! += 1;
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
  filter: "has(workloadMember) AND has(host.site)",
});
export const assignedHosts: eim.GetV1ProjectsByProjectNameComputeHostsApiResponse =
  {
    hasNext: false,
    hosts: assignedHostList,
    totalElements: assignedHostList.length,
  };
const unassignedHostList = new HostStore().list({
  deviceUuid: null,
  filter: "NOT has(workloadMember) AND has(host.site)",
});
export const unassignedHosts: eim.GetV1ProjectsByProjectNameComputeHostsApiResponse =
  {
    hasNext: false,
    hosts: unassignedHostList,
    totalElements: unassignedHostList.length,
  };

const unconfiguredHostList = new HostStore().list({
  deviceUuid: null,
  filter: "NOT has(host.site)",
});
export const unconfiguredHosts: eim.GetV1ProjectsByProjectNameComputeHostsApiResponse =
  {
    hasNext: false,
    hosts: unconfiguredHostList,
    totalElements: unconfiguredHostList.length,
  };
export default HostStore;
