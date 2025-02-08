/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim, enhancedEimSlice } from "@orch-ui/apis";
import BaseStore from "./baseStore";
import {
  hostFive,
  hostFour,
  hostOne,
  hostSix,
  hostThree,
  hostTwo,
  unassignedHostOne,
  unassignedHostThree,
  unassignedHostTwo,
  unconfiguredHostWithInstanceOne,
} from "./hosts";
import {
  hostFiveId,
  hostFourId,
  hostSixId,
  hostThreeId,
  hostTwoId,
  instanceFiveId,
  instanceFourId,
  instanceOneId,
  instanceSixId,
  instanceTwoId,
  instanceUnassignedOneId,
  instanceUnassignedThreeId,
  instanceUnassignedTwoId,
} from "./iaasIds";
import { osRedHat, osUbuntu } from "./osresources";

const clusterOneName = "restaurant-portland";
const clusterTwoName = "restaurant-salem";
const clusterThreeName = "restaurant-ashland";
const clusterFourName = "minimart-columbus";
const clusterFiveName = "minimart-dayton";
const clusterSixName = "store-chicago";

/*
Host value is assigned empty here and once hosts created in hosts.ts the value is added into the instance.
This is done to avoid running into `Cannot access 'hostOne' before initialization` error
*/
//Assigned Instance: with workloadMemberId is "notnull"
export const instanceOne: enhancedEimSlice.InstanceReadModified = {
  instanceID: instanceOneId,
  name: "Instance One",
  kind: "INSTANCE_KIND_METAL",
  host: {} as eim.HostRead,
  os: osUbuntu,
  workloadMembers: [
    {
      resourceId: instanceOneId,
      kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
      workload: {
        externalId: "cluster-b2a7f36d",
        kind: "WORKLOAD_KIND_CLUSTER",
        name: "cluster-jf3-geti-2-1-17",
        resourceId: clusterOneName,
        status: "",
        workloadId: clusterOneName,
        members: [],
      },
      workloadMemberId: clusterOneName,
    },
  ],
};

export const instanceTwo: enhancedEimSlice.InstanceReadModified = {
  instanceID: hostTwoId,
  name: "Instance Two",
  kind: "INSTANCE_KIND_METAL",
  host: {} as eim.HostRead,
  os: osUbuntu,
  workloadMembers: [
    {
      resourceId: instanceTwoId,
      kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
      workload: {
        externalId: "cluster-b2a7f36d",
        kind: "WORKLOAD_KIND_CLUSTER",
        name: "cluster-jf3-geti-2-1-17",
        resourceId: clusterTwoName,
        status: "",
        workloadId: clusterTwoName,
        members: [],
      },
      workloadMemberId: clusterTwoName,
    },
  ],
};

export const instanceThree: enhancedEimSlice.InstanceReadModified = {
  instanceID: hostThreeId,
  name: "Instance Three",
  kind: "INSTANCE_KIND_METAL",
  host: {} as eim.HostRead,
  os: osUbuntu,
  workloadMembers: [
    {
      resourceId: hostThreeId,
      kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
      workload: {
        externalId: "cluster-b2a7f36d",
        kind: "WORKLOAD_KIND_CLUSTER",
        name: "cluster-jf3-geti-2-1-17",
        resourceId: clusterThreeName,
        status: "",
        workloadId: clusterThreeName,
        members: [],
      },
      workloadMemberId: clusterThreeName,
    },
  ],
};

export const instanceFour: enhancedEimSlice.InstanceReadModified = {
  instanceID: hostFourId,
  name: "Instance Four",
  kind: "INSTANCE_KIND_METAL",
  host: {} as eim.HostRead,
  os: osUbuntu,
  workloadMembers: [
    {
      resourceId: instanceFourId,
      kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
      workload: {
        externalId: "cluster-b2a7f36d",
        kind: "WORKLOAD_KIND_CLUSTER",
        name: "cluster-jf3-geti-2-1-17",
        resourceId: clusterFourName,
        status: "",
        workloadId: clusterFourName,
        members: [],
      },
      workloadMemberId: clusterFourName,
    },
  ],
};

export const instanceFive: enhancedEimSlice.InstanceReadModified = {
  instanceID: hostFiveId,
  name: "Instance Five",
  kind: "INSTANCE_KIND_METAL",
  host: {} as eim.HostRead,
  os: osRedHat,
  workloadMembers: [
    {
      resourceId: instanceFiveId,
      kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
      workload: {
        externalId: "cluster-b2a7f36d",
        kind: "WORKLOAD_KIND_CLUSTER",
        name: "cluster-jf3-geti-2-1-17",
        resourceId: clusterFiveName,
        status: "",
        workloadId: clusterFiveName,
        members: [],
      },
      workloadMemberId: clusterFiveName,
    },
  ],
};

export const instanceSix: enhancedEimSlice.InstanceReadModified = {
  instanceID: hostSixId,
  name: "Instance Six",
  kind: "INSTANCE_KIND_METAL",
  host: {} as eim.HostRead,
  os: osRedHat,
  workloadMembers: [
    {
      resourceId: instanceSixId,
      kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
      workload: {
        externalId: "cluster-b2a7f36d",
        kind: "WORKLOAD_KIND_CLUSTER",
        name: "cluster-jf3-geti-2-1-17",
        resourceId: clusterSixName,
        status: "",
        workloadId: clusterSixName,
        members: [],
      },
      workloadMemberId: clusterSixName,
    },
  ],
};

// Unassigned Hosts: Below Instance must have no workloadMemberIds
export const instanceUnassignedOne: enhancedEimSlice.InstanceReadModified = {
  instanceID: instanceUnassignedOneId,
  name: "Instance One",
  kind: "INSTANCE_KIND_METAL",
  host: {} as eim.HostRead,
  os: osUbuntu,
};

export const instanceUnassignedTwo: enhancedEimSlice.InstanceReadModified = {
  instanceID: instanceUnassignedTwoId,
  name: "Instance Two",
  kind: "INSTANCE_KIND_METAL",
  host: {} as eim.HostRead,
  os: osRedHat,
};

export const instanceUnassignedThree: enhancedEimSlice.InstanceReadModified = {
  instanceID: instanceUnassignedThreeId,
  name: "Instance Two",
  kind: "INSTANCE_KIND_UNSPECIFIED",
  host: {} as eim.HostRead,
  os: osUbuntu,
};

export const instanceForUnconfiguredHostOne: enhancedEimSlice.InstanceReadModified =
  {
    instanceID: instanceUnassignedThreeId,
    name: "Instance Two",
    kind: "INSTANCE_KIND_UNSPECIFIED",
    host: {} as eim.HostRead,
    os: osUbuntu,
  };

export const instanceUnspecified: enhancedEimSlice.InstanceReadModified = {
  currentState: "INSTANCE_STATE_UNSPECIFIED",
  host: {
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
    productName: "t3.xlarge",
    serialNumber: "FZAP103000Z",
    memoryBytes: "17045651456",
    metadata: [],
    name: "",
    currentPowerState: "POWER_STATE_ON",
    uuid: "ec26b1ed-311b-0da0-5f2b-fc17f60f35e3",
  },
  instanceID: "inst-ebfe2da9",
  kind: "INSTANCE_KIND_METAL",
  name: "",
  os: osUbuntu,
};

export default class InstanceStore extends BaseStore<
  "instanceID",
  enhancedEimSlice.InstanceReadModified,
  enhancedEimSlice.InstanceReadModified
> {
  instanceIndex = 0;

  constructor() {
    const instanceList = [
      //Assigned Instance: with workload not null
      instanceOne,
      instanceTwo,
      instanceThree,
      instanceFour,
      instanceFive,
      instanceSix,

      //Unassigned Instance: With no associated workload
      instanceUnassignedOne,
      instanceUnassignedTwo,
      instanceUnassignedThree,
    ];

    const hostList = [
      //Assigned Instance: with workload not null
      hostOne,
      hostTwo,
      hostThree,
      hostFour,
      hostFive,
      hostSix,

      //Unassigned Instance: With no associated workload
      unassignedHostOne,
      unassignedHostTwo,
      unassignedHostThree,
      // Unconfigured Host Instance
      unconfiguredHostWithInstanceOne,
    ];

    super("instanceID", instanceList);

    this.resources.forEach((instance, i) => {
      this.assignHostToInstance(instance.instanceID!, {
        ...hostList[i],
        instance: undefined,
      });
    });
  }

  assignHostToInstance(id: string, host: eim.HostRead) {
    const instance = this.get(id);
    if (instance) {
      this.put(id, { ...instance, host });
    }
  }

  convert(
    body: enhancedEimSlice.InstanceReadModified,
    id?: string,
  ): enhancedEimSlice.InstanceReadModified {
    const host: eim.HostRead = {
      ...body.host,
      resourceId: id ?? `host-${this.instanceIndex++}`,
      name: body.host?.name ?? `host-${this.instanceIndex++}-name`,
      currentPowerState: "POWER_STATE_ON",
    };
    return {
      ...body,
      host: host,
    };
  }

  list(params?: {
    workloadMemberID?: string | null;
    hostId?: string | null;
    filter?: string | null;
  }): enhancedEimSlice.InstanceReadModified[] {
    let result = this.resources;

    if (!params) {
      // NOTE that this is only used to maintain compatibility with the base class
      return result;
    }

    if (params.hostId) {
      result = this.resources.filter(
        (instance) => instance.host?.resourceId === params.hostId,
      );
    }

    // Server side site filtering
    if (params?.filter?.match(/NOT has\(host.site\)/g)) {
      result = result.filter(
        // If site is not available (TODO: Does `NOT has(site)` consider empty string?)
        (instance) => !instance.host?.site || instance.host.site.siteID === "",
      );
    } else if (params?.filter?.match(/has\(host.site\)/g)) {
      result = result.filter(
        // If site is available and not a empty string (TODO: Does `has(site)` consider not empty string?)
        (instance) => instance.host?.site && instance.host.site.siteID !== "",
      );
    }

    // Server side workload filtering
    if (params?.filter?.match(/NOT has\(workloadMembers\)/g)) {
      result = result.filter((instance) => !instance.workloadMembers);
    } else if (params?.filter?.match(/has\(workloadMembers\)/g)) {
      result = result.filter((instance) => instance.workloadMembers);
    }
    if (params.workloadMemberID) {
      result = result.filter((instance) => {
        const filteredWorkloadMembers = instance.workloadMembers?.filter(
          (workload) => workload.workloadMemberId === params.workloadMemberID,
        );

        // Is workloadMemberId within this `instance`?
        return filteredWorkloadMembers && filteredWorkloadMembers.length > 0;
      });
    }

    return result;
  }
}
