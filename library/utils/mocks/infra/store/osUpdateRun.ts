/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { BaseStore } from "./baseStore";
import {
  osUpdatePolicyLatest,
  osUpdatePolicyTarget,
  osUpdatePolicyUnspecified,
} from "./osUpdatePolicy";

export const createOsUpdateRun = (
  id: string,
  name: string,
  description: string,
  appliedPolicy: infra.OsUpdatePolicyRead,
  instance: infra.InstanceResourceRead,
  statusIndicator: infra.StatusIndication,
  status: string,
  statusDetails?: string,
  startTime?: number,
  endTime?: number,
): infra.OsUpdateRunRead => {
  const currentTime = new Date().toISOString();
  const currentUnixTime = Math.floor(Date.now() / 1000);

  return {
    resourceId: id,
    name,
    description,
    appliedPolicy,
    instance,
    statusIndicator,
    status,
    statusDetails,
    startTime: startTime ?? currentUnixTime - 3600, // Default to 1 hour ago
    endTime: endTime, // Will be undefined for in-progress runs
    statusTimestamp: currentUnixTime,
    timestamps: {
      createdAt: currentTime,
      updatedAt: currentTime,
    },
  };
};

// Sample OS update runs
export const osUpdateRunCompleted = createOsUpdateRun(
  "osupdaterun-completed-001",
  "Security Update Run - Completed",
  "Completed security update for production host",
  osUpdatePolicyLatest,
  {
    instanceID: "inst-prod-001",
    kind: "INSTANCE_KIND_EDGE" as infra.InstanceKind,
    name: "Production Edge Instance 001",
  } as infra.InstanceResourceRead,
  "STATUS_INDICATION_IDLE" as infra.StatusIndication,
  "Update completed successfully",
  "All security patches applied successfully. System rebooted and operational.",
  Math.floor(Date.now() / 1000) - 3600, // Started 1 hour ago
  Math.floor(Date.now() / 1000) - 3300, // Ended 55 minutes ago (5 min duration)
);

export const osUpdateRunInProgress = createOsUpdateRun(
  "osupdaterun-progress-002",
  "Critical Patch Run - In Progress",
  "Currently applying critical security patches",
  osUpdatePolicyUnspecified,
  {
    instanceID: "inst-edge-002",
    kind: "INSTANCE_KIND_EDGE" as infra.InstanceKind,
    name: "Edge Instance 002",
  } as infra.InstanceResourceRead,
  "STATUS_INDICATION_IN_PROGRESS" as infra.StatusIndication,
  "Installing updates",
  "Currently downloading and installing critical patches. Step 3 of 5 completed.",
  Math.floor(Date.now() / 1000) - 900, // Started 15 minutes ago
  undefined, // Still in progress
);

export const osUpdateRunFailed = createOsUpdateRun(
  "osupdaterun-failed-003",
  "Target OS Update - Failed",
  "Failed to update to target OS version",
  osUpdatePolicyTarget,
  {
    instanceID: "inst-dev-003",
    kind: "INSTANCE_KIND_EDGE" as infra.InstanceKind,
    name: "Development Instance 003",
  } as infra.InstanceResourceRead,
  "STATUS_INDICATION_ERROR" as infra.StatusIndication,
  "Update failed",
  "Failed to download target OS image. Network connectivity issues detected.",
  Math.floor(Date.now() / 1000) - 7200, // Started 2 hours ago
  Math.floor(Date.now() / 1000) - 6900, // Failed after 5 minutes
);

export const osUpdateRunPending = createOsUpdateRun(
  "osupdaterun-pending-004",
  "Scheduled Update - Pending",
  "Waiting for maintenance window to begin",
  osUpdatePolicyLatest,
  {
    instanceID: "inst-staging-004",
    kind: "INSTANCE_KIND_EDGE" as infra.InstanceKind,
    name: "Staging Instance 004",
  } as infra.InstanceResourceRead,
  "STATUS_INDICATION_UNSPECIFIED" as infra.StatusIndication,
  "Pending",
  "Waiting for scheduled maintenance window at 2:00 AM UTC.",
  undefined, // Hasn't started yet
  undefined,
);

export const osUpdateRunCompleted3 = createOsUpdateRun(
  "osupdaterun-completed-006",
  "Security Patches - Completed",
  "Applied critical security patches to edge instance",
  osUpdatePolicyLatest,
  {
    instanceID: "inst-edge-006",
    kind: "INSTANCE_KIND_EDGE" as infra.InstanceKind,
    name: "Edge Instance 006",
  } as infra.InstanceResourceRead,
  "STATUS_INDICATION_IDLE" as infra.StatusIndication,
  "Update completed successfully",
  "Security patches applied successfully. No reboot required.",
  Math.floor(Date.now() / 1000) - 172800, // Started 2 days ago
  Math.floor(Date.now() / 1000) - 172500, // Ended after 5 minutes
);

export const osUpdateRunCompleted4 = createOsUpdateRun(
  "osupdaterun-completed-007",
  "Package Updates - Completed",
  "Updated system packages to latest versions",
  osUpdatePolicyUnspecified,
  {
    instanceID: "inst-dev-007",
    kind: "INSTANCE_KIND_EDGE" as infra.InstanceKind,
    name: "Development Instance 007",
  } as infra.InstanceResourceRead,
  "STATUS_INDICATION_IDLE" as infra.StatusIndication,
  "Update completed successfully",
  "All packages updated successfully. System performance improved.",
  Math.floor(Date.now() / 1000) - 259200, // Started 3 days ago
  Math.floor(Date.now() / 1000) - 258900, // Ended after 5 minutes
);

export const osUpdateRunInProgress2 = createOsUpdateRun(
  "osupdaterun-progress-009",
  "System Update - In Progress",
  "Currently updating system components",
  osUpdatePolicyLatest,
  {
    instanceID: "inst-staging-009",
    kind: "INSTANCE_KIND_EDGE" as infra.InstanceKind,
    name: "Staging Instance 009",
  } as infra.InstanceResourceRead,
  "STATUS_INDICATION_IN_PROGRESS" as infra.StatusIndication,
  "Installing updates",
  "System components are being updated. Step 2 of 4 completed.",
  Math.floor(Date.now() / 1000) - 1800, // Started 30 minutes ago
  undefined, // Still in progress
);

export const osUpdateRunFailed2 = createOsUpdateRun(
  "osupdaterun-failed-010",
  "Critical Update - Failed",
  "Failed to apply critical system updates",
  osUpdatePolicyUnspecified,
  {
    instanceID: "inst-test-010",
    kind: "INSTANCE_KIND_EDGE" as infra.InstanceKind,
    name: "Test Instance 010",
  } as infra.InstanceResourceRead,
  "STATUS_INDICATION_ERROR" as infra.StatusIndication,
  "Update failed",
  "Critical system update failed due to insufficient disk space.",
  Math.floor(Date.now() / 1000) - 432000, // Started 5 days ago
  Math.floor(Date.now() / 1000) - 431700, // Failed after 5 minutes
);

export const osUpdateRunPending2 = createOsUpdateRun(
  "osupdaterun-pending-011",
  "Maintenance Update - Pending",
  "Scheduled maintenance update pending approval",
  osUpdatePolicyLatest,
  {
    instanceID: "inst-prod-011",
    kind: "INSTANCE_KIND_EDGE" as infra.InstanceKind,
    name: "Production Instance 011",
  } as infra.InstanceResourceRead,
  "STATUS_INDICATION_UNSPECIFIED" as infra.StatusIndication,
  "Pending approval",
  "Waiting for maintenance window approval from operations team.",
  undefined, // Not started yet
  undefined,
);

export const osUpdateRunCompleted6 = createOsUpdateRun(
  "osupdaterun-completed-012",
  "Driver Update - Completed",
  "Updated hardware drivers to latest versions",
  osUpdatePolicyTarget,
  {
    instanceID: "inst-edge-012",
    kind: "INSTANCE_KIND_EDGE" as infra.InstanceKind,
    name: "Edge Instance 012",
  } as infra.InstanceResourceRead,
  "STATUS_INDICATION_IDLE" as infra.StatusIndication,
  "Update completed successfully",
  "Hardware drivers updated successfully. All devices functioning normally.",
  Math.floor(Date.now() / 1000) - 518400, // Started 6 days ago
  Math.floor(Date.now() / 1000) - 517800, // Ended after 10 minutes
);

export const osUpdateRunCompleted2 = createOsUpdateRun(
  "osupdaterun-completed-012",
  "Security Update - Completed",
  "Security patches successfully applied",
  osUpdatePolicyLatest,
  {
    instanceID: "inst-dev-012",
    kind: "INSTANCE_KIND_EDGE" as infra.InstanceKind,
    name: "Development Instance 012",
  } as infra.InstanceResourceRead,
  "STATUS_INDICATION_SUCCESS" as infra.StatusIndication,
  "Completed successfully",
  "All security patches have been applied and system has been restarted.",
  Math.floor(Date.now() / 1000) - 864000, // Started 10 days ago
  Math.floor(Date.now() / 1000) - 862800, // Completed after 20 minutes
);

export const osUpdateRunCompleted5 = createOsUpdateRun(
  "osupdaterun-completed-013",
  "Firmware Update - Completed",
  "Device firmware successfully updated to latest version",
  osUpdatePolicyUnspecified,
  {
    instanceID: "inst-beta-013",
    kind: "INSTANCE_KIND_EDGE" as infra.InstanceKind,
    name: "Beta Instance 013",
  } as infra.InstanceResourceRead,
  "STATUS_INDICATION_SUCCESS" as infra.StatusIndication,
  "Update successful",
  "Firmware updated to version 2.1.3. All systems operational.",
  Math.floor(Date.now() / 1000) - 1209600, // Started 14 days ago
  Math.floor(Date.now() / 1000) - 1207800, // Completed after 30 minutes
);

export class OsUpdateRunStore extends BaseStore<
  "resourceId",
  infra.OsUpdateRunRead,
  infra.OsUpdateRunWrite
> {
  constructor() {
    super("resourceId", [
      osUpdateRunCompleted,
      osUpdateRunInProgress,
      osUpdateRunFailed,
      osUpdateRunPending,
      osUpdateRunCompleted2,
      osUpdateRunCompleted3,
      osUpdateRunCompleted4,
      osUpdateRunCompleted5,
      osUpdateRunInProgress2,
      osUpdateRunFailed2,
      osUpdateRunPending2,
      osUpdateRunCompleted6,
    ]);
  }

  convert(body: infra.OsUpdateRunWrite): infra.OsUpdateRunRead {
    const currentTime = new Date().toISOString();
    const currentUnixTime = Math.floor(Date.now() / 1000);

    return {
      ...body,
      resourceId: `osupdaterun-${Math.random().toString(36).substr(2, 9)}`,
      startTime: currentUnixTime,
      statusTimestamp: currentUnixTime,
      timestamps: {
        createdAt: currentTime,
        updatedAt: currentTime,
      },
    };
  }

  // Filter runs by instanceId using the instance relationship
  listByInstanceId(instanceId: string): infra.OsUpdateRunRead[] {
    //TODO: temporarily mock data is not filtered
    return this.list().filter(
      (history) => history.instance?.resourceId === instanceId,
    );
  }
}
