/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { BaseStore } from "../baseStore";
import {
  clusterFiveName,
  clusterFourName,
  clusterOneName,
  clusterSixName,
  clusterThreeName,
  clusterTwoName,
} from "../cluster-orch/data/clusterOrchIds";
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
} from "./store/hosts";
import {
  hostFiveId,
  hostFourId,
  hostOneId,
  hostSixId,
  hostThreeId,
  hostTwoId,
  instanceFiveId,
  instanceFourId,
  instanceOneId,
  instanceSixId,
  instanceThreeId,
  instanceTwoId,
  instanceUnassignedOneId,
  instanceUnassignedThreeId,
  instanceUnassignedTwoId,
  osRedHatId,
  osUbuntuId,
  unassignedHostOneId,
  unassignedHostThreeId,
  unassignedHostTwoId,
  unconfiguredHostWithInstanceOneId,
} from "./store/iaasIds";
import { osRedHat, osUbuntu } from "./store/osresources";

//Assigned Instance: with workloadMemberId is "notnull"
export const instanceOne: eim.Instance = {
  instanceID: instanceOneId,
  name: "Instance One",
  status: "INSTANCE_STATUS_RUNNING",
  kind: "INSTANCE_KIND_METAL",
  hostID: hostOneId,
  osID: osUbuntuId,
  os: osUbuntu,
  workloadMembers: [
    {
      resourceId: instanceOneId,
      instanceId: instanceOneId,
      kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
      workloadId: clusterOneName,
      workloadMemberId: clusterOneName,
    },
  ],
};

export const instanceTwo: eim.Instance = {
  instanceID: instanceTwoId,
  name: "Instance Two",
  status: "INSTANCE_STATUS_RUNNING",
  kind: "INSTANCE_KIND_METAL",
  hostID: hostTwoId,
  osID: osUbuntuId,
  os: osUbuntu,
  workloadMembers: [
    {
      resourceId: instanceTwoId,
      instanceId: instanceTwoId,
      kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
      workloadId: clusterTwoName,
      workloadMemberId: clusterTwoName,
    },
  ],
};

export const instanceThree: eim.Instance = {
  instanceID: instanceThreeId,
  name: "Instance Three",
  status: "INSTANCE_STATUS_RUNNING",
  kind: "INSTANCE_KIND_METAL",
  hostID: hostThreeId,
  osID: osUbuntuId,
  os: osUbuntu,
  workloadMembers: [
    {
      resourceId: instanceThreeId,
      instanceId: instanceThreeId,
      kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
      workloadId: clusterThreeName,
      workloadMemberId: clusterThreeName,
    },
  ],
};

export const instanceFour: eim.Instance = {
  instanceID: instanceFourId,
  name: "Instance Four",
  status: "INSTANCE_STATUS_RUNNING",
  kind: "INSTANCE_KIND_METAL",
  hostID: hostFourId,
  osID: osUbuntuId,
  os: osUbuntu,
  workloadMembers: [
    {
      resourceId: instanceFourId,
      instanceId: instanceFourId,
      kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
      workloadId: clusterFourName,
      workloadMemberId: clusterFourName,
    },
  ],
};

export const instanceFive: eim.Instance = {
  instanceID: instanceFiveId,
  name: "Instance Five",
  status: "INSTANCE_STATUS_RUNNING",
  kind: "INSTANCE_KIND_METAL",
  hostID: hostFiveId,
  osID: osRedHatId,
  os: osRedHat,
  workloadMembers: [
    {
      resourceId: instanceFiveId,
      instanceId: instanceFiveId,
      kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
      workloadId: clusterFiveName,
      workloadMemberId: clusterFiveName,
    },
  ],
};

export const instanceSix: eim.Instance = {
  instanceID: instanceSixId,
  name: "Instance Six",
  status: "INSTANCE_STATUS_RUNNING",
  kind: "INSTANCE_KIND_METAL",
  hostID: hostSixId,
  osID: osRedHatId,
  os: osRedHat,
  workloadMembers: [
    {
      resourceId: instanceSixId,
      instanceId: instanceSixId,
      kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
      workloadId: clusterSixName,
      workloadMemberId: clusterSixName,
    },
  ],
};

// Unassigned Hosts: Below Instance must have no workloadMemberIds
export const instanceUnassignedOne: eim.Instance = {
  instanceID: instanceUnassignedOneId,
  name: "Instance One",
  status: "INSTANCE_STATUS_RUNNING",
  kind: "INSTANCE_KIND_METAL",
  hostID: unassignedHostOneId,
  osID: osUbuntuId,
  os: osUbuntu,
};

export const instanceUnassignedTwo: eim.Instance = {
  instanceID: instanceUnassignedTwoId,
  name: "Instance Two",
  status: "INSTANCE_STATUS_RUNNING",
  kind: "INSTANCE_KIND_METAL",
  hostID: unassignedHostTwoId,
  osID: osRedHatId,
  os: osRedHat,
};

export const instanceUnassignedThree: eim.Instance = {
  instanceID: instanceUnassignedThreeId,
  name: "Instance Two",
  status: "INSTANCE_STATUS_ERROR",
  kind: "INSTANCE_KIND_UNSPECIFIED",
  hostID: unassignedHostThreeId,
  osID: osUbuntuId,
  os: osUbuntu,
};

export const instanceForUnconfiguredHostOne: eim.Instance = {
  instanceID: instanceUnassignedThreeId,
  name: "Instance Two",
  status: "INSTANCE_STATUS_ERROR",
  kind: "INSTANCE_KIND_UNSPECIFIED",
  hostID: unconfiguredHostWithInstanceOneId,
  osID: osUbuntuId,
  os: osUbuntu,
};

export default class InstanceStore extends BaseStore<
  "instanceID",
  eim.Instance,
  eim.Instance
> {
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
      // unconfiguredHostWithInstanceOne,
    ];

    super("instanceID", instanceList);

    this.resources.forEach((instance, i) => {
      this.assignHostToInstance(instance.instanceID!, {
        ...hostList[i],
        // Define only till one level
        status: { ...hostList[i].status, instance: undefined },
      });
    });
  }

  assignHostToInstance(id: string, host: eim.Host) {
    const instance = this.get(id);
    if (instance) {
      this.put(id, { ...instance, host });
    }
  }

  convert(body: eim.Instance): eim.Instance {
    return body;
  }

  list(params?: {
    workloadMemberID: string | null;
    hostId?: string | null;
  }): eim.Instance[] {
    let result = this.resources;

    if (!params) {
      // NOTE that this is only used to maintain compatibility with the base class
      return result;
    }

    if (params.hostId) {
      result = this.resources.filter(
        (instance) => instance.hostID === params.hostId,
      );
    }

    if (params.workloadMemberID === "null") {
      // This filter will get hosts with hostId having no workload member)
      result = result.filter((instance) => !instance.workloadMembers);
    } else if (params.workloadMemberID) {
      // Filter result to only give instances with `workloadMemberID` match
      result = result.filter((instance) => {
        const filteredWorkloadMembers = instance.workloadMembers?.filter(
          (workload) => workload.workloadMemberId === params.workloadMemberID,
        );

        // Is workloadMemberId within this `instance`?
        return filteredWorkloadMembers && filteredWorkloadMembers.length > 0;
      });
    } else if (params.workloadMemberID === "") {
      // params.workloadMemberID is not provided
      result = result.filter((instance) => instance.workloadMembers);
    }

    return result;
  }
}
