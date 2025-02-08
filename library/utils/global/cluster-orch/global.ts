/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm } from "@orch-ui/apis";
import {
  GenericStatus,
  Status as IconStatus,
  Status,
} from "@orch-ui/components";

/**
 * @deprecated remove before 25.03
 * */
export const clusterStatusToText = (
  clusterStatus?: ecm.ClusterInfoRead["status"],
): string => {
  if (!clusterStatus) {
    return "unknown";
  }

  if (clusterStatus === "active") {
    return "Running";
  } else if (clusterStatus === "inactive") {
    return "Down";
  } else {
    return clusterStatus.charAt(0).toUpperCase() + clusterStatus.slice(1);
  }
};

/**
 * @deprecated remove before 25.03
 * */
export const clusterStatusToIconStatus = (
  clusterStatus?: ecm.ClusterInfoRead["status"],
): IconStatus => {
  let state = Status.Unknown;
  switch (clusterStatus) {
    // green dot
    case "init":
    case "active":
      state = Status.Ready;
      break;
    // red dot
    case "inactive":
    case "error":
      state = Status.Error;
      break;
    // spinner
    case "creating":
    case "reconciling":
    case "removing":
    case "updating":
      state = Status.NotReady;
  }
  return state;
};

export const nodeStatusToText = (status?: ecm.StatusInfo): string => {
  if (!status?.condition) {
    return "unknown";
  }
  return status.condition.replace("STATUS_", "").replaceAll("_", " ");
};

export type ClusterGenericStatuses = {
  appAgentStatus?: GenericStatus;
  lifecyclePhase?: GenericStatus;
  nodeHealth?: GenericStatus;
  providerStatus?: GenericStatus;
  resourceStatus?: GenericStatus;
};

export const clusterToStatuses = (
  cluster: ecm.ClusterInfoRead,
): ClusterGenericStatuses => {
  const cgs: ClusterGenericStatuses = {};
  if (cluster.appAgentStatus !== undefined) {
    cgs["appAgentStatus"] = cluster.appAgentStatus;
  }
  if (cluster.lifecyclePhase !== undefined) {
    cgs["lifecyclePhase"] = cluster.lifecyclePhase;
  }
  if (cluster.nodeHealth !== undefined) {
    cgs["nodeHealth"] = cluster.nodeHealth;
  }
  if (cluster.providerStatus !== undefined) {
    cgs["providerStatus"] = cluster.providerStatus;
  }
  if (cluster.resourceStatus !== undefined) {
    cgs["resourceStatus"] = cluster.resourceStatus;
  }
  return cgs;
};

export const nodeStatusToIconStatus = (status?: ecm.StatusInfo): IconStatus => {
  let state = Status.Unknown;

  if (!status) {
    return Status.Unknown;
  }

  switch (status.condition) {
    // green dot
    case "STATUS_CONDITION_PROVISIONING":
    case "STATUS_CONDITION_READY":
      state = Status.Ready;
      break;
    // red dot
    case "STATUS_CONDITION_NOTREADY":
    case "STATUS_CONDITION_REMOVING":
      state = Status.NotReady;
      break;
    // gray dot
    case "STATUS_CONDITION_UNKNOWN":
      state = Status.Unknown;
  }
  return state;
};

export const getDefinedFloatValue = (val: string | number = "0") =>
  parseFloat(val.toString());

/** ECM measurement units for data quantity in bytes */
export type UnitMeasurement = "Ki" | "Mi" | "Gi" | "Ti" | "Pi" | "Ei";

/** converts unit measurement to get actual value in bytes  */
export const convertDataUnitsToBytes = (value = "0") => {
  let numberVal = getDefinedFloatValue(value);

  // Check if any letters got remove upon parsing of string to integer, then unit exists
  if (numberVal.toString() !== value) {
    // all applicable units
    const unitStringToValue = {
      Ki: Math.pow(2, 10),
      Mi: Math.pow(2, 20),
      Gi: Math.pow(2, 30),
      Ti: Math.pow(2, 40),
      Pi: Math.pow(2, 50),
      Ei: Math.pow(2, 60),
    };

    const unitString = value.slice(value.length - 2, value.length);
    if (unitString in unitStringToValue) {
      const unitValue = unitStringToValue[unitString as UnitMeasurement];
      numberVal *= unitValue;
    }
  }

  return numberVal;
};
