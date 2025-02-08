/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { adm, arm, catalog } from "@orch-ui/apis";
import { Status } from "@orch-ui/components";

/**
 * Utility do sort object that have an optional displayName and a mandatory name
 */
export const displayNamedItemSort = (
  a:
    | adm.DeploymentRead
    | catalog.ApplicationRead
    | catalog.DeploymentPackageRead,
  b:
    | adm.DeploymentRead
    | catalog.ApplicationRead
    | catalog.DeploymentPackageRead,
): number => {
  const ta = a.displayName ? a.displayName : a.name;
  const tb = b.displayName ? b.displayName : b.name;
  return ta && tb && ta > tb ? 1 : -1;
};

export const generateContainerStatus = (status: arm.ContainerStatusRead) => {
  if (status.containerStateRunning) {
    return "Running";
  } else if (status.containerStateTerminated) {
    return `Terminated(${
      status.containerStateTerminated.exitCode === 0 ? "Success" : "Fail"
    })`;
  } else {
    return "Waiting";
  }
};

export const generateContainerStatusIcon = (
  status: arm.ContainerStatusRead,
): Status => {
  if (status.containerStateRunning) {
    return Status.Ready;
  } else if (status.containerStateTerminated) {
    return status.containerStateTerminated.exitCode === 0
      ? Status.Ready
      : Status.Error;
  } else {
    return Status.NotReady;
  }
};

export const generateAppWorkloadStatus = (row: arm.AppWorkload) => {
  let state;
  if (!row.virtualMachine && !row.pod) {
    state = Status.Unknown;
  } else if (row.type === "TYPE_VIRTUAL_MACHINE") {
    switch (row.virtualMachine?.status?.state) {
      // green dot
      case "STATE_RUNNING":
      case "STATE_PROVISIONING":
      case "STATE_MIGRATING":
      case "STATE_STARTING":
      case "STATE_TERMINATING":
      case "STATE_WAITING_FOR_VOLUME_BINDING":
        state = Status.Ready;
        break;
      // red dot
      case "STATE_CRASH_LOOP_BACKOFF":
      case "STATE_ERROR_DATA_VOLUME":
      case "STATE_ERROR_IMAGE_PULL":
      case "STATE_ERROR_IMAGE_PULL_BACKOFF":
      case "STATE_ERROR_PVC_NOT_FOUND":
      case "STATE_ERROR_UNSCHEDULABLE":
        state = Status.Error;
        break;
      // gray icon
      case "STATE_PAUSED":
      case "STATE_STOPPED":
      case "STATE_STOPPING":
      default:
        state = Status.Unknown;
    }
  } else if (row.type === "TYPE_POD") {
    switch (row.pod?.status?.state) {
      // green dot
      case "STATE_RUNNING":
      case "STATE_SUCCEEDED":
        state = Status.Ready;
        break;
      // red dot
      case "STATE_FAILED":
        state = Status.Error;
        break;
      // gray icon
      case "STATE_PENDING":
      default:
        state = Status.Unknown;
    }
  } else {
    state = Status.Unknown;
  }
  return state;
};
