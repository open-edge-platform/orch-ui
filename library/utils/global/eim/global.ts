/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim, enhancedEimSlice } from "@orch-ui/apis";
import {
  AggregatedStatus,
  FieldLabels,
  GenericStatus,
  Status as IconStatus,
} from "@orch-ui/components";
import { capitalize } from "lodash";
import { TrustedComputeCompatibility } from "../../../components/atomic-design/organisms/TrustedCompute/TrustedCompute";

export type HostGenericStatuses = {
  /** indicator: host.hostStatusIndicator, message: host.hostStatus, timestamp: host.hostStatusTimestamp */
  hostStatus?: GenericStatus;
  /** indicator: host.onboardingStatusIndicator, message: host.onboardingStatus, timestamp: host.onboardingStatusTimestamp */
  onboardingStatus?: GenericStatus;
  /** indicator: host.instanceStatusIndicator, message: host.instanceStatus, timestamp: host.instanceStatusTimestamp */
  instanceStatus?: GenericStatus;
  /** indicator: host.provisioningStatusIndicator, message: host.provisioningStatus, timestamp: host.provisioningStatusTimestamp */
  provisioningStatus?: GenericStatus;
  /** indicator: host.updateStatusIndicator, message: host.updateStatus, timestamp: host.updateStatusTimestamp */
  updateStatus?: GenericStatus;
  /** indicator: host.registrationStatusIndicator, message: host.registrationStatus, timestamp: host.registrationStatusTimestamp */
  registrationStatus?: GenericStatus;
  /** indicator: instance.trustedAttestationStatus, message: instance.trustedAttestationStatus, timestamp: instance.trustedAttestationStatusTimestamp */
  trustedAttestationStatus?: GenericStatus;
};

export const hostStatusIndicatorToIconStatus = (
  host: eim.HostRead,
): IconStatus => {
  switch (host.hostStatusIndicator) {
    case "STATUS_INDICATION_IN_PROGRESS":
      return IconStatus.NotReady;
    case "STATUS_INDICATION_IDLE":
      return IconStatus.Ready;
    case "STATUS_INDICATION_ERROR":
      return IconStatus.Error;
    case "STATUS_INDICATION_UNSPECIFIED":
      return IconStatus.Unknown;
    default:
      return IconStatus.Unknown;
  }
};

const statusWithDetails = (status: string, details?: string) => {
  return details && details !== "" ? `${status} (${details})` : status;
};

export const hostToStatuses = (
  host: eim.HostRead,
  instance?: eim.InstanceRead,
): HostGenericStatuses => {
  const hgs: HostGenericStatuses = {};
  if (host.hostStatus) {
    hgs.hostStatus = {
      indicator: host.hostStatusIndicator ?? "STATUS_INDICATION_UNSPECIFIED",
      message: host.hostStatus,
      timestamp: host.hostStatusTimestamp,
    };
  }
  if (host.onboardingStatus) {
    hgs.onboardingStatus = {
      indicator:
        host.onboardingStatusIndicator ?? "STATUS_INDICATION_UNSPECIFIED",
      message: host.onboardingStatus,
      timestamp: host.onboardingStatusTimestamp,
    };
  }

  if (host.registrationStatus) {
    hgs.registrationStatus = {
      indicator:
        host.registrationStatusIndicator ?? "STATUS_INDICATION_UNSPECIFIED",
      message: host.registrationStatus,
      timestamp: host.registrationStatusTimestamp,
    };
  }

  if (instance) {
    if (instance.instanceStatus) {
      hgs.instanceStatus = {
        indicator:
          instance.instanceStatusIndicator ?? "STATUS_INDICATION_UNSPECIFIED",
        message: statusWithDetails(
          instance.instanceStatus,
          instance.instanceStatusDetail,
        ),
        timestamp: instance.instanceStatusTimestamp,
      };
    }
    if (instance.provisioningStatus) {
      hgs.provisioningStatus = {
        indicator:
          instance.provisioningStatusIndicator ??
          "STATUS_INDICATION_UNSPECIFIED",
        message: instance.provisioningStatus,
        timestamp: instance.provisioningStatusTimestamp,
      };
    }
    if (instance.updateStatus) {
      hgs.updateStatus = {
        indicator:
          instance.updateStatusIndicator ?? "STATUS_INDICATION_UNSPECIFIED",
        message: statusWithDetails(
          instance.updateStatus,
          instance.updateStatusDetail,
        ),
        timestamp: instance.updateStatusTimestamp,
      };
    }

    /*
    by default trustedAttestationStatus is empty in which case
    "Not Enabled" has to be shown
    */
    hgs.trustedAttestationStatus = {
      indicator:
        instance.trustedAttestationStatusIndicator ??
        "STATUS_INDICATION_UNSPECIFIED",
      message: instance.trustedAttestationStatus
        ? instance.trustedAttestationStatus
        : "Not Enabled",
      timestamp: instance.trustedAttestationStatusTimestamp,
    };
  }

  return hgs;
};

/** Generate cluster name on the spot for a single-host, via site name and host name. */
export const generateClusterName = (siteName: string, hostName: string) =>
  `${siteName}-${hostName}`.replaceAll(" ", "-");

/** Returns `true` if Host is assigned to a cluster. Else returns `false`. */
export const isHostAssigned = (instances: eim.InstanceRead[]): boolean => {
  if (instances.length === 0) return false;
  const result = instances.some((instance: eim.InstanceRead) =>
    instance.workloadMembers?.some(
      (workloadMember: eim.WorkloadMemberRead) =>
        workloadMember.kind === "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
    ),
  );
  return result;
};

export const inheritedScheduleToString = (
  item: enhancedEimSlice.ScheduleMaintenanceRead,
  targetEntityType: string,
  targetEntity: enhancedEimSlice.ScheduleMaintenanceTargetEntity,
) => {
  if (
    item.targetRegion &&
    (targetEntityType !== "region" ||
      targetEntity.resourceId !== item.targetRegion.resourceId)
  ) {
    return item.targetRegion.name ?? item.targetRegion.resourceId;
  } else if (item.targetSite && targetEntityType !== "site") {
    return item.targetSite.name ?? item.targetSite.resourceId;
  } else if (item.targetHost && targetEntityType !== "host") {
    return item.targetHost.name ?? item.targetHost.resourceId;
  }

  return "-";
};

/** Decide the text to display for schedule maintenance status */
export const scheduleStatusToString = (status?: eim.ScheduleStatus) => {
  if (!status) {
    return "Unspecified";
  }
  return status
    .replace("SCHEDULE_STATUS_", "")
    .replace("_", " ")
    .split(" ")
    .map(capitalize)
    .join(" ");
};

export const CONSTANTS = {
  HOST_STATUS: {
    NOT_CONNECTED: "Not Connected",
  },
};

export enum WorkloadMemberKind {
  Cluster = "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
  Unspecified = "WORKLOAD_MEMBER_KIND_UNSPECIFIED",
}

export const hostStatusFields: FieldLabels<HostGenericStatuses> = {
  hostStatus: {
    label: "Host",
  },
  trustedAttestationStatus: {
    label: "Trusted Compute",
  },
  instanceStatus: {
    label: "Software(OS/Agents)",
  },
  updateStatus: {
    label: "Update",
  },
  provisioningStatus: {
    label: "Provisioning",
  },
  onboardingStatus: {
    label: "Onboarding",
  },
};

export const statusIndicatorToIconStatus = (
  statusIndicator: eim.StatusIndicator,
): IconStatus => {
  switch (statusIndicator) {
    case "STATUS_INDICATION_IN_PROGRESS":
      return IconStatus.NotReady;
    case "STATUS_INDICATION_IDLE":
      return IconStatus.Ready;
    case "STATUS_INDICATION_ERROR":
      return IconStatus.Error;
    case "STATUS_INDICATION_UNSPECIFIED":
      return IconStatus.Unknown;
    default:
      return IconStatus.Unknown;
  }
};

export const isOSUpdateAvailable = (instance: eim.InstanceRead | undefined) => {
  const desiredOsId = instance?.desiredOs?.resourceId;
  const currentOs = instance?.currentOs;
  return (
    currentOs?.osType === "OPERATING_SYSTEM_TYPE_IMMUTABLE" &&
    currentOs?.resourceId !== desiredOsId
  );
};

const getHostProvisionTitles = (
  hostName: string,
  provisioningStatusIndicator?: eim.StatusIndicatorRead,
) => {
  switch (provisioningStatusIndicator) {
    case "STATUS_INDICATION_IN_PROGRESS":
      return {
        title: `${hostName} provisioning in progress`,
        subTitle: `${hostName} is provisioning.`,
      };
    case "STATUS_INDICATION_ERROR":
      return {
        title: `${hostName} has provisioning error`,
        subTitle: `${hostName} has an error when provisioning OS.`,
      };
    case "STATUS_INDICATION_IDLE":
      return {
        title: `${hostName} is provisioned`,
      };
  }
};

const getHostOnboardingTitles = (
  hostName: string,
  onboardingStatusIndicator?: eim.StatusIndicatorRead,
) => {
  const onboardingMsg = {
    title: `${hostName} is onboarded`,
    subTitle: `${hostName} is onboarded and ready to be provisioned.`,
  };
  switch (onboardingStatusIndicator) {
    case "STATUS_INDICATION_IN_PROGRESS":
      return {
        title: `${hostName} onboarding in progress`,
        subTitle: `${hostName} is registered and set to auto-onboard. Onboarding is in progress.`,
      };
    case "STATUS_INDICATION_ERROR":
      return {
        title: `${hostName} has onboarding error`,
      };
    case "STATUS_INDICATION_IDLE":
      return onboardingMsg;
    default:
      return onboardingMsg;
  }
};

const getHostRegistrationTitles = (
  hostName: string,
  registrationStatusIndicator?: eim.StatusIndicatorRead,
) => {
  const registrationMsg = {
    title: `${hostName} is registered`,
    subTitle: `${hostName} is registered and ready to be onboarded.`,
  };
  switch (registrationStatusIndicator) {
    case "STATUS_INDICATION_IN_PROGRESS":
      return {
        title: `${hostName} registration in progress`,
      };
    case "STATUS_INDICATION_ERROR":
      return {
        title: `${hostName} has registration error`,
      };
    case "STATUS_INDICATION_IDLE":
      return registrationMsg;
    default:
      return registrationMsg;
  }
};

const getHostCurrentStateTitles = (
  hostName: string,
  currenState?: eim.HostState,
) => {
  switch (currenState) {
    case "HOST_STATE_UNTRUSTED":
      return {
        title: `${hostName} is deauthorized`,
      };
    case "HOST_STATE_ERROR":
      return {
        title: `${hostName} has error`,
      };
    case "HOST_STATE_DELETED":
      return {
        title: `${hostName} is deleted`,
      };
    default:
      return {
        title: `${hostName} is not connected`,
        subTitle: `Waiting for ${hostName} to connect.`,
      };
  }
};

/* Titles to be displayed in Host Status popover */
export const getPopOverTitles = (
  host: eim.HostRead,
): {
  title?: string;
  subTitle?: string;
} => {
  const hostCurrentState = host.currentState;
  const hostName = host.name || "Host";

  const isInstanceRunning =
    hostCurrentState === "HOST_STATE_ONBOARDED" &&
    host.instance?.currentState == "INSTANCE_STATE_RUNNING";

  // active host
  if (isInstanceRunning && host.instance?.workloadMembers?.length) {
    return { title: `${hostName} is active` };
  }

  // Provisioned host
  if (isInstanceRunning && !host.instance?.workloadMembers?.length) {
    return {
      title: `${hostName} is provisioned`,
      subTitle: `${hostName} is configured and ready to use. Add a site and cluster to activate.`,
    };
  }

  // onboarded host
  if (host.currentState === "HOST_STATE_ONBOARDED") {
    return (
      getHostProvisionTitles(
        hostName,
        host.instance?.provisioningStatusIndicator,
      ) ?? getHostOnboardingTitles(hostName, host.onboardingStatusIndicator)
    );
  }

  // registered host
  if (host.currentState === "HOST_STATE_REGISTERED") {
    return getHostRegistrationTitles(
      hostName,
      host.registrationStatusIndicator,
    );
  }

  // other currentStatus
  return getHostCurrentStateTitles(hostName, host.currentState);
};

// --------------------------------------

/** @deprecated  */
export const hostStatusToString = (status?: eim.StatusIndicatorRead) => {
  if (!status) {
    return "Unspecified";
  }
  return capitalize(status.replace("STATUS_INDICATION_", "").toLowerCase());
};

/** Decide the text to display for aggregated host status (actual host status, host in maintenance and host licensing) */
/** @deprecated  */
export const hostProviderStatusToString = (host?: eim.HostRead): string => {
  if (!host) {
    return "Unspecified";
  }

  // If License is IDLE (or good or active),
  // Priority 2: Show Maintenance if activated (Note: This case is handled as a seperate Logic with the use of `/schedules` apis, single or repeated).
  // Priority 3: Display providerStatusDetails, if present.
  else if (host.hostStatusIndicator === "STATUS_INDICATION_UNSPECIFIED") {
    return "Unspecified";
  } else if (
    host.instance?.provisioningStatusIndicator != "STATUS_INDICATION_IDLE"
  ) {
    return host.instance?.provisioningStatus || "Unspecified";
  }
  // Priority 3: Display Actual Host status
  return capitalize(host.hostStatus);
};

// currentState mapping for host to messages
export const hostStateMapping: Record<eim.HostState, any> = {
  HOST_STATE_ERROR: { status: IconStatus.Error, message: "Error" },
  HOST_STATE_DELETING: { status: IconStatus.Error, message: "Deleting" },
  HOST_STATE_DELETED: { status: IconStatus.Error, message: "Deleted" },
  HOST_STATE_ONBOARDED: { status: IconStatus.Ready, message: "Onboarded" },
  HOST_STATE_REGISTERED: { status: IconStatus.Ready, message: "Registered" },
  HOST_STATE_UNTRUSTED: { status: IconStatus.Unknown, message: "Deauthorized" },
  HOST_STATE_UNSPECIFIED: { status: IconStatus.Unknown, message: "Unknown" },
};

// Host status and messages when all modern statuses are in idle status
export const getCustomStatusOnIdleAggregation = (
  host: eim.HostRead,
): AggregatedStatus => {
  const hostCurrentState = host.currentState;
  if (!hostCurrentState)
    return { status: IconStatus.Unknown, message: "Unknown" };

  const isInstanceRunning =
    hostCurrentState === "HOST_STATE_ONBOARDED" &&
    host.instance?.currentState == "INSTANCE_STATE_RUNNING";

  // if workload members are assigned in Instance
  if (isInstanceRunning && host.instance?.workloadMembers?.length) {
    return { status: IconStatus.Ready, message: "Active" };
  }

  // if workload members are not assigned in Instance but instance is running
  if (isInstanceRunning && !host.instance?.workloadMembers?.length) {
    return { status: IconStatus.Ready, message: "Provisioned" };
  }

  // other current statuses
  return hostStateMapping[hostCurrentState];
};

/**
 * Determines the trusted compute compatibility of a given host.
 *
 * @param host - The host object to check for trusted compute compatibility.
 * @returns An object indicating whether the host is compatible or not, along with a tooltip message.
 *
 * The function checks if the host has Secure Boot and Full Disk Encryption enabled,
 * and if the host is in the onboarded state and the instance is running.
 * If all conditions are met, it returns an object with text "Compatible" and a corresponding tooltip.
 * Otherwise, it returns an object with text "Not compatible" and a corresponding tooltip.
 */
export const getTrustedComputeCompatibility = (
  host: eim.HostRead,
): TrustedComputeCompatibility => {
  if (
    host?.instance?.securityFeature ===
      "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION" &&
    host.currentState === "HOST_STATE_ONBOARDED" &&
    host.instance?.currentState == "INSTANCE_STATE_RUNNING"
  )
    return {
      text: "Compatible",
      tooltip: "This host has Secure Boot and Full Disk Encryption enabled.",
    };
  else
    return {
      text: "Not compatible",
      tooltip: "This host has Secure Boot and Full Disk Encryption disabled.",
    };
};
