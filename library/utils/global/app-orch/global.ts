/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { adm } from "@orch-ui/apis";
import { Status } from "@orch-ui/components";

export const admStatusToUIStatus = (s?: adm.DeploymentStatusRead): Status => {
  let status: Status;
  if (!s) {
    return Status.Unknown;
  }
  switch (s.state) {
    case "RUNNING":
      status = Status.Ready;
      break;
    case "DOWN":
      status = Status.Error;
      break;
    case "UPDATING":
      status = Status.NotReady;
      break;
    case "DEPLOYING":
      status = Status.NotReady;
      break;
    case "TERMINATING":
      status = Status.NotReady;
      break;
    case "INTERNAL_ERROR":
      status = Status.Error;
      break;
    default:
      status = Status.Unknown;
  }
  return status;
};

const parseState = (s: adm.DeploymentStatusRead["state"]): string => {
  if (!s) {
    return "unknown status";
  }
  const str = s.replace("_", " ").toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Returns true if a deployment is performing an operation that will eventually complete, false otherwise
 */
export const isUpdating = (s: adm.DeploymentStatusRead["state"]): boolean => {
  switch (s) {
    case "DEPLOYING":
    case "UPDATING":
    case "TERMINATING":
      return true;
    case "UNKNOWN":
    case "RUNNING":
    case "DOWN":
    case "INTERNAL_ERROR":
    default:
      return false;
  }
};

export const admStatusToText = (s?: adm.DeploymentStatusRead): string => {
  if (s?.message) {
    return s?.message;
  } else {
    return parseState(s?.state);
  }
};
