/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim, enhancedEimSlice } from "@orch-ui/apis";
import {
  FieldLabels,
  GenericStatus,
  Status as IconStatus,
} from "@orch-ui/components";
import { capitalize } from "lodash";

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

/** TODO: This is created to avoid any error on new api and old coder environment */
const getMessageByGenericStatus = (status: any) => {
  // in below line message: host.hostStatus; This will show Error in Old coder of MI API (in orch-deploy)
  return typeof status == "string" ? status : (status as GenericStatus).message;
};

export const hostToStatuses = (
  host: eim.HostRead,
  instance?: eim.InstanceRead,
): HostGenericStatuses => {
  const hgs: HostGenericStatuses = {};
  if (host.hostStatus) {
    hgs.hostStatus = {
      indicator: host.hostStatusIndicator ?? "STATUS_INDICATION_UNSPECIFIED",
      message: getMessageByGenericStatus(host.hostStatus),
      timestamp: host.hostStatusTimestamp,
    };
  }
  if (host.onboardingStatus) {
    hgs.onboardingStatus = {
      indicator:
        host.onboardingStatusIndicator ?? "STATUS_INDICATION_UNSPECIFIED",
      message: getMessageByGenericStatus(host.onboardingStatus),
      timestamp: host.onboardingStatusTimestamp,
    };
  }

  if (host.registrationStatus) {
    hgs.registrationStatus = {
      indicator:
        host.registrationStatusIndicator ?? "STATUS_INDICATION_UNSPECIFIED",
      message: getMessageByGenericStatus(host.registrationStatus),
      timestamp: host.registrationStatusTimestamp,
    };
  }

  if (instance) {
    if (instance.instanceStatus) {
      hgs.instanceStatus = {
        indicator:
          instance.instanceStatusIndicator ?? "STATUS_INDICATION_UNSPECIFIED",
        message: getMessageByGenericStatus(instance.instanceStatus),
        timestamp: instance.instanceStatusTimestamp,
      };
    }
    if (instance.provisioningStatus) {
      hgs.provisioningStatus = {
        indicator:
          instance.provisioningStatusIndicator ??
          "STATUS_INDICATION_UNSPECIFIED",
        message: getMessageByGenericStatus(instance.provisioningStatus),
        timestamp: instance.provisioningStatusTimestamp,
      };
    }
    if (instance.updateStatus) {
      hgs.updateStatus = {
        indicator:
          instance.updateStatusIndicator ?? "STATUS_INDICATION_UNSPECIFIED",
        message: getMessageByGenericStatus(instance.updateStatus),
        timestamp: instance.updateStatusTimestamp,
      };
    }
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

const getHostProvisionMessages = (
  provisioningStatusIndicator?: eim.StatusIndicatorRead,
) => {
  const provisionedMsg = {
    title: "Host is provisioned",
    subTitle:
      "Host is configured and ready to use. Add a site and cluster to activate.",
  };
  switch (provisioningStatusIndicator) {
    case "STATUS_INDICATION_IN_PROGRESS":
      return {
        title: "Host provisioning in progress",
        subTitle: "Host is provisioning.",
      };
    case "STATUS_INDICATION_ERROR":
      return {
        title: "Host has provisioning error",
        subTitle: "Host has an error when provisioning OS.",
      };
    case "STATUS_INDICATION_IDLE":
      return provisionedMsg;
    default:
      return provisionedMsg;
  }
};

const getHostOnboardingMessages = (
  onboardingStatusIndicator?: eim.StatusIndicatorRead,
) => {
  const onboardingMsg = {
    title: "Host is onboarded",
    subTitle: "Host is onboarded and ready to be provisioned.",
  };
  switch (onboardingStatusIndicator) {
    case "STATUS_INDICATION_IN_PROGRESS":
      return {
        title: "Host onboarding in progress",
        subTitle:
          "Host is registered and set to auto-onboard. Onboarding is in progress.",
      };
    case "STATUS_INDICATION_ERROR":
      return {
        title: "Host has onboarding error",
      };
    case "STATUS_INDICATION_IDLE":
      return onboardingMsg;
    default:
      return onboardingMsg;
  }
};

const getHostRegistrationMessages = (
  registrationStatusIndicator?: eim.StatusIndicatorRead,
) => {
  const registrationMsg = {
    title: "Host is registered",
    subTitle: "Host is registered and ready to be onboarded.",
  };
  switch (registrationStatusIndicator) {
    case "STATUS_INDICATION_IN_PROGRESS":
      return {
        title: "Host registration in progress",
      };
    case "STATUS_INDICATION_ERROR":
      return {
        title: "Host has registration error",
      };
    case "STATUS_INDICATION_IDLE":
      return registrationMsg;
    default:
      return registrationMsg;
  }
};

export const genericHostStatusMessages = (
  host: eim.HostRead,
): {
  title?: string;
  subTitle?: string;
} => {
  // active host
  if (
    host.currentState === "HOST_STATE_ONBOARDED" &&
    host.instance?.resourceId &&
    host.site?.resourceId
  ) {
    return { title: "Host is active" };
  }

  // Provisioned host
  if (
    host.currentState === "HOST_STATE_ONBOARDED" &&
    host.instance?.resourceId &&
    host.instance?.provisioningStatus
  ) {
    return getHostProvisionMessages(host.instance?.provisioningStatusIndicator);
  }

  // onboarded host
  if (
    host.currentState === "HOST_STATE_ONBOARDED" &&
    !host.instance &&
    host.onboardingStatus
  ) {
    return getHostOnboardingMessages(host.onboardingStatusIndicator);
  }

  // registered host
  if (
    host.currentState === "HOST_STATE_REGISTERED" &&
    host.registrationStatus
  ) {
    return getHostRegistrationMessages(host.registrationStatusIndicator);
  }

  // Not connected host
  return {
    title: "Host is not connected",
    subTitle: "Waiting for host to connect.",
  };
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
