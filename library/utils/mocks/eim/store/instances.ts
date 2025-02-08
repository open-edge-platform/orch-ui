/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim, enhancedEimSlice } from "@orch-ui/apis";
import { BaseStore } from "./baseStore";
import {
  hostFive,
  hostFour,
  hostOne,
  hostSix,
  hostThree,
  hostTwo,
  registeredHostOne,
  unassignedHostOne,
  unassignedHostThree,
  unassignedHostTwo,
  unconfiguredHostWithInstanceNoName,
  unconfiguredHostWithInstanceOne,
} from "./hosts";
import {
  instanceFiveId,
  instanceFourId,
  instanceOneId,
  instanceSixId,
  instanceThreeId,
  instanceTwoId,
  instanceUnassignedOneId,
  instanceUnassignedThreeId,
  instanceUnassignedTwoId,
  instanceUnconfiguredOneId,
  workloadFourId,
  workloadOneId,
  workloadSixId,
  workloadThreeId,
  workloadTwoId,
  workloadUnspecifiedOneId,
} from "./iaasIds";
import { osRedHat, osTiber, osTiberUpdate, osUbuntu } from "./osresources";
import {
  clusterFiveName,
  workloadFive,
  workloadFour,
  workloadOne,
  workloadSix,
  workloadThree,
  workloadTwo,
  workloadUnspecifiedOne,
} from "./workload";

// Assigned Instance: with workloadMemberId is "notnull"
export const instanceOne: enhancedEimSlice.InstanceReadModified = {
  instanceID: instanceOneId,
  resourceId: instanceOneId,
  name: "Instance One",
  instanceStatus: {
    indicator: "STATUS_INDICATION_IDLE",
    message: "Running",
    timestamp: 1717761389,
  },
  kind: "INSTANCE_KIND_METAL",
  os: osUbuntu,
  securityFeature: "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION",
  workloadMembers: [
    {
      kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
      resourceId: workloadOneId,
      workloadMemberId: workloadOneId,
      workload: workloadOne,
    },
  ],
  desiredState: "INSTANCE_STATE_RUNNING",
};

export const instanceTwo: enhancedEimSlice.InstanceReadModified = {
  instanceID: instanceTwoId,
  resourceId: instanceTwoId,
  name: "Instance Two",
  instanceStatus: {
    indicator: "STATUS_INDICATION_IDLE",
    message: "Running",
    timestamp: 1717761389,
  },
  kind: "INSTANCE_KIND_METAL",
  os: osTiber,
  currentOs: osTiber,
  desiredOs: osTiberUpdate,
  workloadMembers: [
    {
      kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
      resourceId: workloadTwoId,
      workloadMemberId: workloadTwoId,
      workload: workloadTwo,
    },
    {
      kind: "WORKLOAD_MEMBER_KIND_UNSPECIFIED",
      resourceId: workloadUnspecifiedOneId,
      workloadMemberId: workloadUnspecifiedOneId,
      workload: workloadUnspecifiedOne,
    },
  ],
  desiredState: "INSTANCE_STATE_RUNNING",
};

export const instanceThree: enhancedEimSlice.InstanceReadModified = {
  instanceID: instanceThreeId,
  resourceId: instanceThreeId,
  name: "Instance Three",
  instanceStatus: {
    indicator: "STATUS_INDICATION_IDLE",
    message: "Running",
    timestamp: 1717761389,
  },
  kind: "INSTANCE_KIND_METAL",
  os: osUbuntu,
  workloadMembers: [
    {
      kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
      resourceId: workloadThreeId,
      workloadMemberId: workloadThreeId,
      workload: workloadThree,
    },
  ],
  desiredState: "INSTANCE_STATE_RUNNING",
};

export const instanceFour: enhancedEimSlice.InstanceReadModified = {
  instanceID: instanceFourId,
  resourceId: instanceFourId,
  name: "Instance Four",
  instanceStatus: {
    indicator: "STATUS_INDICATION_IDLE",
    message: "Running",
    timestamp: 1717761389,
  },
  kind: "INSTANCE_KIND_METAL",
  os: osUbuntu,
  workloadMembers: [
    {
      kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
      resourceId: workloadFourId,
      workloadMemberId: workloadFourId,
      workload: workloadFour,
    },
  ],
  desiredState: "INSTANCE_STATE_RUNNING",
};

export const instanceFive: enhancedEimSlice.InstanceReadModified = {
  instanceID: instanceFiveId,
  resourceId: instanceFiveId,
  name: "Instance Five",
  kind: "INSTANCE_KIND_METAL",
  os: osRedHat,
  workloadMembers: [
    {
      kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
      resourceId: clusterFiveName,
      workloadMemberId: clusterFiveName,
      workload: workloadFive,
    },
  ],
  instanceStatus: {
    indicator: "STATUS_INDICATION_IDLE",
    message: "Running",
    timestamp: +new Date(),
  },
  updateStatus: {
    indicator: "STATUS_INDICATION_ERROR",
    message: "Update Failed",
    timestamp: +new Date(),
  },
  provisioningStatus: {
    indicator: "STATUS_INDICATION_IN_PROGRESS",
    message: "Provisioning In Progress",
    timestamp: +new Date(),
  },
  desiredState: "INSTANCE_STATE_RUNNING",
};

export const instanceSix: enhancedEimSlice.InstanceReadModified = {
  instanceID: instanceSixId,
  resourceId: instanceSixId,
  name: "Instance Six",
  instanceStatus: {
    indicator: "STATUS_INDICATION_IDLE",
    message: "Running",
    timestamp: 1717761389,
  },
  kind: "INSTANCE_KIND_METAL",
  securityFeature: "SECURITY_FEATURE_NONE",
  os: osRedHat,
  workloadMembers: [
    {
      kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
      resourceId: workloadSixId,
      workloadMemberId: workloadSixId,
      workload: workloadSix,
    },
    {
      kind: "WORKLOAD_MEMBER_KIND_UNSPECIFIED",
      resourceId: workloadUnspecifiedOneId,
      workloadMemberId: workloadUnspecifiedOneId,
      workload: workloadUnspecifiedOne,
    },
  ],
  desiredState: "INSTANCE_STATE_RUNNING",
};

// Unassigned Hosts: Below Instance must have no workloadMemberIds
export const instanceUnassignedOne: enhancedEimSlice.InstanceReadModified = {
  instanceID: instanceUnassignedOneId,
  resourceId: instanceUnassignedOneId,
  name: "Instance Unassign One",
  instanceStatus: {
    indicator: "STATUS_INDICATION_IDLE",
    message: "Running",
    timestamp: 1717761389,
  },
  kind: "INSTANCE_KIND_METAL",
  desiredState: "INSTANCE_STATE_RUNNING",
  os: osUbuntu,
};

export const instanceUnassignedTwo: enhancedEimSlice.InstanceReadModified = {
  instanceID: instanceUnassignedTwoId,
  resourceId: instanceUnassignedTwoId,
  name: "Instance Unassign Two",
  instanceStatus: {
    indicator: "STATUS_INDICATION_IDLE",
    message: "Running",
    timestamp: 1717761389,
  },
  kind: "INSTANCE_KIND_METAL",
  desiredState: "INSTANCE_STATE_RUNNING",
  os: osRedHat,
};

export const instanceUnassignedThree: enhancedEimSlice.InstanceReadModified = {
  instanceID: instanceUnassignedThreeId,
  resourceId: instanceUnassignedThreeId,
  name: "Instance Unassign Three",
  instanceStatus: {
    indicator: "STATUS_INDICATION_ERROR",
    message: "Error message",
    timestamp: 1717761389,
  },
  kind: "INSTANCE_KIND_UNSPECIFIED",
  desiredState: "INSTANCE_STATE_RUNNING",
  os: osUbuntu,
};

export const instanceUnconfiguredOne: enhancedEimSlice.InstanceReadModified = {
  instanceID: instanceUnconfiguredOneId,
  resourceId: instanceUnconfiguredOneId,
  name: "Instance Unconfigured One",
  instanceStatus: {
    indicator: "STATUS_INDICATION_ERROR",
    message: "Error message",
    timestamp: 1717761389,
  },
  kind: "INSTANCE_KIND_UNSPECIFIED",
  os: osUbuntu,
};

export const instanceUnspecified: enhancedEimSlice.InstanceReadModified = {
  currentState: "INSTANCE_STATE_UNSPECIFIED",
  instanceID: "inst-ebfe2da9",
  resourceId: "inst-ebfe2da9",
  kind: "INSTANCE_KIND_METAL",
  name: "",
  os: osUbuntu,
  instanceStatus: {
    indicator: "STATUS_INDICATION_UNSPECIFIED",
    message: "Unknown",
    timestamp: 1717761389,
  },
};

export const registeredInstanceOne: enhancedEimSlice.InstanceReadModified = {
  instanceID: "registered-host-1",
  resourceId: "registered-host-1",
  name: "Instance One",
  instanceStatus: {
    indicator: "STATUS_INDICATION_IDLE",
    message: "Running",
    timestamp: 1717761389,
  },
  desiredState: "INSTANCE_STATE_UNTRUSTED",
  kind: "INSTANCE_KIND_METAL",
  os: osUbuntu,
  securityFeature: "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION",
  workloadMembers: [
    {
      kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
      resourceId: workloadOneId,
      workloadMemberId: workloadOneId,
      workload: workloadOne,
    },
  ],
};

export class InstanceStore extends BaseStore<
  "instanceID",
  enhancedEimSlice.InstanceReadModified,
  eim.Instance
> {
  instanceIndex = 0;

  constructor() {
    const instanceList = [
      // Assigned Instance: with workload not null
      instanceOne,
      instanceTwo,
      instanceThree,
      instanceFour,
      instanceFive,
      instanceSix,

      // Unassigned Instance: With no associated workload
      instanceUnassignedOne,
      instanceUnassignedTwo,
      instanceUnassignedThree,

      // Unconfigured Host Instance
      instanceUnconfiguredOne,
      instanceUnspecified,

      //registered
      registeredInstanceOne,
    ];

    const hostList = [
      // Assigned Host: with workload not null
      hostOne,
      hostTwo,
      hostThree,
      hostFour,
      hostFive,
      hostSix, //host-v9eyx73m

      // Unassigned Host: With no associated workload
      unassignedHostOne,
      unassignedHostTwo,
      unassignedHostThree,

      // Unconfigured Host
      unconfiguredHostWithInstanceOne,
      unconfiguredHostWithInstanceNoName,

      registeredHostOne,
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

  convert(body: eim.Instance): enhancedEimSlice.InstanceReadModified {
    const currentTime = +new Date();
    return {
      ...body,
      instanceStatus: {
        indicator: body.instanceStatus?.indicator ?? "STATUS_INDICATION_IDLE",
        message: "Running",
        timestamp: currentTime,
      },
      updateStatus: {
        indicator: body.updateStatus?.indicator ?? "STATUS_INDICATION_ERROR",
        message: "Failed",
        timestamp: currentTime,
      },
      provisioningStatus: {
        indicator:
          body.provisioningStatus?.indicator ?? "STATUS_INDICATION_IN_PROGRESS",
        message: "Provisioning In Progress",
        timestamp: currentTime,
      },
      host: {
        ...body.host,
        resourceId:
          (body.host as eim.HostRead).resourceId ??
          `host-${this.instanceIndex++}`,
        name: body.host?.name ?? `host-${this.instanceIndex++}-name`,
        currentPowerState: "POWER_STATE_ON",
        instance: undefined,
        onboardingStatus: {
          indicator:
            body.host?.onboardingStatus?.indicator ??
            "STATUS_INDICATION_UNSPECIFIED",
          message: "Host executing normally!",
          timestamp: currentTime,
        },
        hostStatus: {
          indicator:
            body.host?.hostStatus?.indicator ?? "STATUS_INDICATION_UNSPECIFIED",
          message: "Host executing normally!",
          timestamp: currentTime,
        },
        registrationStatus: {
          indicator:
            body.host?.registrationStatus?.indicator ??
            "STATUS_INDICATION_UNSPECIFIED",
          message: "Host executing normally!",
          timestamp: currentTime,
        },
      },
    };
  }

  list(params?: {
    workloadMemberID?: string | null;
    hostId?: string | null;
    filter?: string | null;
  }): enhancedEimSlice.InstanceReadModified[] {
    let result = this.resources;

    /* --- Server side filtering Logic: from here --- */
    // If no filters provided then return all instance. (TODO: filter within a given project)
    if (!params) {
      return result;
    }

    // filter instances within a host by hostId
    if (params.hostId) {
      result = this.resources.filter(
        (instance) => instance.host?.resourceId === params.hostId,
      );
    }

    // filter instance by it's host's `site`
    if (params?.filter?.match(/NOT has\(host.site\)/g)) {
      result = result.filter(
        (instance) => !instance.host?.site || instance.host.site.siteID === "",
      );
    } else if (params?.filter?.match(/has\(host.site\)/g)) {
      result = result.filter(
        (instance) => instance.host?.site && instance.host.site.siteID !== "",
      );
    } else if (params.filter?.match(/host\.site\.resourceId=/)) {
      const matches = params.filter?.match(/host\.site\.resourceId="(.*)"/);
      if (matches && matches?.length > 0) {
        result = result.filter(
          (instance) =>
            instance.host?.site && instance.host.site.resourceId === matches[1],
        );
      }
    }

    // If a workload/cluster is not present(Configured) or present(Active)
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

    // filter by desiredState of this instance
    if (params?.filter?.match(/desiredState=/)) {
      const matches = params.filter.match(
        /desiredState=INSTANCE_STATE_([_A-Z]*)/,
      );
      if (matches && matches.length > 0) {
        result = result.filter(
          (instance) =>
            instance.desiredState === `INSTANCE_STATE_${matches[1]}`,
        );
      }
    }

    /* --- Return final list of Instance --- */
    return result;
  }
}
