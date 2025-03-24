/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim, enhancedEimSlice } from "@orch-ui/apis";
import { clusterFiveName } from "../../cluster-orch/data/clusterOrchIds";
import {
  instanceFiveId,
  instanceFourId,
  instanceOnboardedOneId,
  instanceOneId,
  instanceSixId,
  instanceThreeId,
  instanceTwoId,
  provisionedInstanceOneId,
  provisionedInstanceThreeId,
  provisionedInstanceTwoId,
  workloadFourId,
  workloadOneId,
  workloadSixId,
  workloadThreeId,
  workloadTwoId,
  workloadUnspecifiedOneId,
} from "../data";
import { BaseStore } from "./baseStore";
import {
  assignedWorkloadHostFour,
  assignedWorkloadHostOne,
  assignedWorkloadHostThree,
  assignedWorkloadHostTwo,
  provisionedHostOne,
  provisionedHostThree,
  provisionedHostTwo,
  registeredHostOne,
} from "./hosts";
import { osRedHat, osTb, osTbUpdate, osUbuntu } from "./osresources";
import {
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
  instanceStatusIndicator: "STATUS_INDICATION_IDLE",
  instanceStatus: "Running",
  instanceStatusDetail: "2 of 5 components Running",
  instanceStatusTimestamp: 1717761389,
  kind: "INSTANCE_KIND_METAL",
  currentState: "INSTANCE_STATE_RUNNING",
  os: osUbuntu,
  currentOs: osUbuntu,
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
  instanceStatusIndicator: "STATUS_INDICATION_IDLE",
  instanceStatus: "Running",
  instanceStatusTimestamp: 1717761389,
  kind: "INSTANCE_KIND_METAL",
  os: osTb,
  currentOs: osTb,
  desiredOs: osTbUpdate,
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
  provisioningStatusIndicator: "STATUS_INDICATION_IDLE",
  provisioningStatus: "Provisioned",
  trustedAttestationStatusIndicator: "STATUS_INDICATION_ERROR",
  trustedAttestationStatus: "Failed: PCR Measurement Mismatch",
};

export const instanceThree: enhancedEimSlice.InstanceReadModified = {
  instanceID: instanceThreeId,
  resourceId: instanceThreeId,
  name: "Instance Three",
  instanceStatusIndicator: "STATUS_INDICATION_IDLE",
  instanceStatus: "Running",
  instanceStatusTimestamp: 1717761389,
  kind: "INSTANCE_KIND_METAL",
  os: osRedHat,
  workloadMembers: [
    {
      kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
      resourceId: workloadThreeId,
      workloadMemberId: workloadThreeId,
      workload: workloadThree,
    },
  ],
  desiredState: "INSTANCE_STATE_RUNNING",
  trustedAttestationStatusIndicator: "STATUS_INDICATION_IDLE",
  trustedAttestationStatus: "Verified",
};

export const instanceFour: enhancedEimSlice.InstanceReadModified = {
  instanceID: instanceFourId,
  resourceId: instanceFourId,
  name: "Instance Four",
  instanceStatusIndicator: "STATUS_INDICATION_IDLE",
  instanceStatus: "Running",
  instanceStatusTimestamp: 1717761389,
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
  provisioningStatusIndicator: "STATUS_INDICATION_IDLE",
  provisioningStatus: "Provisioned",
  provisioningStatusTimestamp: +new Date(),
  updateStatusIndicator: "STATUS_INDICATION_ERROR",
  updateStatus: "Update Failed",
  updateStatusDetail: "Detailed error message",
  updateStatusTimestamp: +new Date(),
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
  instanceStatusIndicator: "STATUS_INDICATION_IDLE",
  instanceStatus: "Running",
  instanceStatusTimestamp: +new Date(),
  updateStatusIndicator: "STATUS_INDICATION_ERROR",
  updateStatus: "Update Failed",
  updateStatusTimestamp: +new Date(),
  provisioningStatusIndicator: "STATUS_INDICATION_IN_PROGRESS",
  provisioningStatus: "Provisioning In Progress",
  provisioningStatusTimestamp: +new Date(),
  desiredState: "INSTANCE_STATE_RUNNING",
};

export const instanceSix: enhancedEimSlice.InstanceReadModified = {
  instanceID: instanceSixId,
  resourceId: instanceSixId,
  name: "Instance Six",
  instanceStatusIndicator: "STATUS_INDICATION_IDLE",
  instanceStatus: "Running",
  instanceStatusTimestamp: 1717761389,
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
export const provisionedInstanceOne: enhancedEimSlice.InstanceReadModified = {
  instanceID: provisionedInstanceOneId,
  resourceId: provisionedInstanceOneId,
  name: "Instance Unassign One",
  instanceStatusIndicator: "STATUS_INDICATION_IDLE",
  instanceStatus: "Running",
  instanceStatusTimestamp: 1717761389,
  kind: "INSTANCE_KIND_METAL",
  desiredState: "INSTANCE_STATE_RUNNING",
  os: osUbuntu,
};

export const provisionedInstanceTwo: enhancedEimSlice.InstanceReadModified = {
  instanceID: provisionedInstanceTwoId,
  resourceId: provisionedInstanceTwoId,
  name: "Instance Unassign Two",
  instanceStatusIndicator: "STATUS_INDICATION_IDLE",
  instanceStatus: "Running",
  instanceStatusTimestamp: 1717761389,
  kind: "INSTANCE_KIND_METAL",
  desiredState: "INSTANCE_STATE_RUNNING",
  os: osRedHat,
};

export const provisionedInstanceThree: enhancedEimSlice.InstanceReadModified = {
  instanceID: provisionedInstanceThreeId,
  resourceId: provisionedInstanceThreeId,
  name: "Instance Unassign Three",
  instanceStatusIndicator: "STATUS_INDICATION_ERROR",
  instanceStatus: "Error message",
  instanceStatusTimestamp: 1717761389,
  kind: "INSTANCE_KIND_UNSPECIFIED",
  desiredState: "INSTANCE_STATE_RUNNING",
  os: osUbuntu,
};

export const instanceOnboardedOne: enhancedEimSlice.InstanceReadModified = {
  instanceID: instanceOnboardedOneId,
  resourceId: instanceOnboardedOneId,
  name: "Instance Onboarded One",
  instanceStatusIndicator: "STATUS_INDICATION_ERROR",
  instanceStatus: "Error message",
  instanceStatusTimestamp: 1717761389,
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
  instanceStatusIndicator: "STATUS_INDICATION_UNSPECIFIED",
  instanceStatus: "Unknown",
  instanceStatusTimestamp: 1717761389,
};

export const registeredInstanceOne: enhancedEimSlice.InstanceReadModified = {
  instanceID: "registered-host-1",
  resourceId: "registered-host-1",
  name: "Instance One",
  instanceStatusIndicator: "STATUS_INDICATION_IDLE",
  instanceStatus: "Running",
  instanceStatusTimestamp: 1717761389,
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

export const mockSsh: eim.LocalAccountRead = {
  resourceId: "ssh-abcd81",
  username: "all-groups-example-user",
  sshKey:
    "ssh-rsa AAAAB3NzaC1yc2EgQDf0nWRbXNe7UsO5PPUWWO8GAAAADAQABAAAB/950VwqkUgp851EEhNISCGKY/XVLB/sgVr9nKKoP4p0XP2v3ijAKB5dxSPGe7C0vtNLHA5fA6PAXg/IVjeZBkMFvWN6nT8OWauFzbvZwQHJNb9zL+Uoy82i8x88gEFRN7E8B8rOjmiszLIcHTrWq6E1c5w82rlNbmaozIIj7Nm6v2lQXujXJdpQTvUg7wyTuSUpnzUUV20eORF8ooDdXFCpTDBXa32RJUcgH84bVE4jttxmiYiKorTt43p428zhap3z6JthwLP4xAole6DrACwWuLQp+YPu7Ik8WmZpX/OW5q05DsYwt5YXQjE9Mze3XJnwI8HHGrn5nOWo8jmtJZMR/S4Yiv8Zvzl01c8GMcJmmr+wbWV+l14NJOgRgVmAuK+ZYte7SH6MC+MJQciqyVeNM+CVoxQh1ZueAsKgUnONTvGr2yModM0x9j4JnzUa7ZvRd01PHNZp6hcupM+zodO1UE724phNUNi5cXVOFl1= amr\fakeuser@fake-key",
};

export const generateSshMocks = (size = 10, offset = 0, mock = mockSsh) =>
  [...Array(size).keys()].map((index) => ({
    ...mock,
    sshKey: `${mock.sshKey}-${index + offset}`,
    resourceId: `ssh-mock-${index + offset}`,
  }));

export class InstanceStore extends BaseStore<
  "instanceID",
  enhancedEimSlice.InstanceReadModified,
  eim.Instance
> {
  instanceIndex = 0;

  constructor() {
    const instanceList = [
      // Instance for Provisioned Host with cluster/workload
      instanceOne,
      instanceTwo,
      instanceThree,
      instanceFour,
      instanceFive,
      instanceSix,

      // Instance for Provisioned Host without cluster/workload
      provisionedInstanceOne,
      provisionedInstanceTwo,
      provisionedInstanceThree,
    ];

    const hostList = [
      // Instance for Provisioned Host with cluster/workload
      assignedWorkloadHostOne,
      assignedWorkloadHostTwo,
      assignedWorkloadHostThree,
      assignedWorkloadHostFour,

      // Instance for Provisioned Host without cluster/workload
      provisionedHostOne,
      provisionedHostTwo,
      provisionedHostThree,

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

  convert(
    body: eim.Instance,
    id?: string,
    host?: eim.HostRead,
    os?: eim.OperatingSystemResourceRead,
    localAccount?: eim.LocalAccountRead,
  ): enhancedEimSlice.InstanceReadModified {
    const currentTime = +new Date();
    return {
      ...body,
      resourceId: id,
      instanceStatusIndicator:
        body.instanceStatusIndicator ?? "STATUS_INDICATION_IDLE",
      instanceStatus: "Running",
      instanceStatusTimestamp: currentTime,
      updateStatusIndicator:
        body.updateStatusIndicator ?? "STATUS_INDICATION_ERROR",
      updateStatus: "Failed",
      updateStatusTimestamp: currentTime,
      provisioningStatusIndicator:
        body.provisioningStatusIndicator ?? "STATUS_INDICATION_IN_PROGRESS",
      provisioningStatus: "Provisioning In Progress",
      provisioningStatusTimestamp: currentTime,
      host: host ?? (body.host as eim.HostRead),
      os: os ?? (body.currentOs as eim.OperatingSystemResourceRead),
      currentOs: os ?? (body.currentOs as eim.OperatingSystemResourceRead),
      desiredOs: os ?? (body.desiredOs as eim.OperatingSystemResourceRead),
      localAccount: localAccount ?? (body.localAccount as eim.LocalAccountRead),
      timestamps: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }

  post(
    body: eim.Instance,
    host?: eim.HostRead,
    os?: eim.OperatingSystemResourceRead,
    localAccount?: eim.LocalAccountRead,
  ) {
    const data = this.convert(
      body,
      `instance-${this.instanceIndex++}`,
      host,
      os,
      localAccount,
    );
    this.resources.push(data);
    return data;
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

  getLocalAccounts() {
    return generateSshMocks(3, 0);
  }
}
