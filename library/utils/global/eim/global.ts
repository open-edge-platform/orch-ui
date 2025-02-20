/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim, enhancedEimSlice } from "@orch-ui/apis";
import { GenericStatus, Status as IconStatus } from "@orch-ui/components";
import { capitalize } from "lodash";

export type HostGenericStatuses = {
  hostStatus?: GenericStatus;
  onboardingStatus?: GenericStatus;
  instanceStatus?: GenericStatus;
  provisioningStatus?: GenericStatus;
  updateStatus?: GenericStatus;
  registrationStatus?: GenericStatus;
};

export const hostToStatuses = (
  host: eim.HostRead,
  instance?: eim.InstanceRead,
): HostGenericStatuses => {
  const hgs: HostGenericStatuses = {};
  if (host.hostStatus) {
    hgs.hostStatus = {
      indicator: host.hostStatus.indicator,
      message: host.hostStatus.message,
      timestamp: host.hostStatus.timestamp,
    };
  }
  if (host.onboardingStatus) {
    hgs.onboardingStatus = {
      indicator: host.onboardingStatus.indicator,
      message: host.onboardingStatus.message,
      timestamp: host.onboardingStatus.timestamp,
    };
  }

  if (host.registrationStatus) {
    hgs.registrationStatus = {
      indicator: host.registrationStatus.indicator,
      message: host.registrationStatus.message,
      timestamp: host.registrationStatus.timestamp,
    };
  }

  if (instance) {
    if (instance.instanceStatus) {
      hgs.instanceStatus = {
        indicator: instance.instanceStatus.indicator,
        message: instance.instanceStatus.message,
        timestamp: instance.instanceStatus.timestamp,
      };
    }
    if (instance.provisioningStatus) {
      hgs.provisioningStatus = {
        indicator: instance.provisioningStatus.indicator,
        message: instance.provisioningStatus.message,
        timestamp: instance.provisioningStatus.timestamp,
      };
    }
    if (instance.updateStatus) {
      hgs.updateStatus = {
        indicator: instance.updateStatus.indicator,
        message: instance.updateStatus.message,
        timestamp: instance.updateStatus.timestamp,
      };
    }
  }
  return hgs;
};

/**
 * @deprecated
 */
type HostStatus = eim.HostRead["hostStatus"];

/**
 * @deprecated
 */
export enum Status {
  Ready = "ready",
  NotReady = "not-ready",
  Error = "error",
  Unknown = "unknown",
}

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

export const hostStatusToString = (
  status?: eim.Status["type"] | eim.GenericStatusRead["indicator"],
) => {
  if (!status) {
    return "Unspecified";
  }
  return capitalize(status.replace("STATUS_CONDITION_", "").toLowerCase());
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

export const hostStatusToIconStatus = (status?: eim.Status["type"]): Status => {
  switch (status) {
    case "STATUS_CONDITION_RUNNING":
      return Status.Ready;

    case "STATUS_CONDITION_ERROR":
    case "STATUS_CONDITION_STOPPED":
    case "STATUS_CONDITION_DELETED":
      return Status.Error;
    default:
      return Status.Unknown;
  }
};

/** Decide the text to display for aggregated host status (actual host status, host in maintenance and host licensing) */
export const hostProviderStatusToString = (host?: eim.HostRead): string => {
  if (!host) {
    return "Unspecified";
  }

  // If License is IDLE (or good or active),
  // Priority 2: Show Maintenance if activated (Note: This case is handled as a seperate Logic with the use of `/schedules` apis, single or repeated).
  // Priority 3: Display providerStatusDetails, if present.
  else if (host.hostStatus?.indicator === "STATUS_INDICATION_UNSPECIFIED") {
    return "Unspecified";
  } else if (
    host.instance?.provisioningStatus?.indicator != "STATUS_INDICATION_IDLE"
  ) {
    return host.instance?.provisioningStatus?.message || "Unspecified";
  }
  // Priority 3: Display Actual Host status
  return capitalize(host.hostStatus?.message);
};

/**
 * @deprecated
 * Decide the icon color to display for aggregated host status (actual host status, host in maintenance and host licensing)
 * */
export const hostProviderStatusToIconStatus = (
  status?: HostStatus | eim.ScheduleStatus | eim.StatusIndicatorRead | string,
): Status => {
  switch (status) {
    case "HOST_STATUS_BOOTING":
    case "HOST_STATUS_PROVISIONING":
    case "HOST_STATUS_REGISTERING":
    case "HOST_STATUS_UPDATING":
    case "STATUS_INDICATION_IN_PROGRESS":
      return Status.NotReady;

    case "HOST_STATUS_PROVISIONED":
    case "HOST_STATUS_RUNNING":
    case "STATUS_INDICATION_IDLE":
      return Status.Ready;

    case "HOST_STATUS_BOOT_FAILED":
    case "HOST_STATUS_PROVISION_FAILED":
    case "HOST_STATUS_ERROR":
    case "HOST_STATUS_UPDATE_FAILED":
    case "HOST_STATUS_CONNECTION_LOST":
    case "STATUS_INDICATION_ERROR":
      return Status.Error;

    case "STATUS_INDICATION_UNSPECIFIED":
      return Status.Unknown;

    default:
      return Status.Unknown;
  }
};

// export const getObservabilityUrl = (): string | undefined => {
//   return window.__RUNTIME_CONFIG__ &&
//     window.__RUNTIME_CONFIG__.OBSERVABILITY_URL !== ""
//     ? window.__RUNTIME_CONFIG__.OBSERVABILITY_URL
//     : undefined;
// };

export const isOSUpdateAvailable = (instance: eim.InstanceRead | undefined) => {
  const desiredOsId = instance?.desiredOs?.resourceId;
  const currentOs = instance?.currentOs;
  return (
    currentOs?.osType === "OPERATING_SYSTEM_TYPE_IMMUTABLE" &&
    currentOs?.resourceId !== desiredOsId
  );
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

const getHostProvisionMessages = (
  provisioningStatus: eim.GenericStatusRead,
) => {
  const provisionedMsg = {
    title: "Host is provisioned",
    subTitle:
      "Host is configured and ready to use. Add a site and cluster to activate.",
  };
  switch (provisioningStatus.indicator) {
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

const getHostOnboardingMessages = (onboardingStatus: eim.GenericStatusRead) => {
  const onboardingMsg = {
    title: "Host is onboarded",
    subTitle: "Host is onboarded and ready to be provisioned.",
  };
  switch (onboardingStatus.indicator) {
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
  registrationStatus: eim.GenericStatusRead,
) => {
  const registrationMsg = {
    title: "Host is registered",
    subTitle: "Host is registered and ready to be onboarded.",
  };
  switch (registrationStatus.indicator) {
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
    return getHostProvisionMessages(host.instance?.provisioningStatus);
  }

  // onboarded host
  if (
    host.currentState === "HOST_STATE_ONBOARDED" &&
    !host.instance &&
    host.onboardingStatus
  ) {
    return getHostOnboardingMessages(host.onboardingStatus);
  }

  // registered host
  if (
    host.currentState === "HOST_STATE_REGISTERED" &&
    host.registrationStatus
  ) {
    return getHostRegistrationMessages(host.registrationStatus);
  }

  // Not connected host
  return {
    title: "Host is not connected",
    subTitle: "Waiting for host to connect.",
  };
};
