/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import {
  GenericStatus,
  MetadataPair,
  Status as IconStatus,
  Status,
} from "@orch-ui/components";
import { TrustedComputeCompatibility } from "../../../components/atomic-design/organisms/TrustedCompute/TrustedCompute";

/**
 * @deprecated remove before 25.03
 * */
export const clusterStatusToText = (
  clusterStatus?: cm.ClusterInfoRead["providerStatus"],
): string => {
  if (!clusterStatus) {
    return "unknown";
  }

  if (clusterStatus.message === "active") {
    return "Running";
  } else if (clusterStatus.message === "inactive") {
    return "Down";
  } else {
    return (
      clusterStatus.message.charAt(0).toUpperCase() +
      clusterStatus.message.slice(1)
    );
  }
};

/**
 * @deprecated remove before 25.03
 * */
export const clusterStatusToIconStatus = (
  clusterStatus?: cm.ClusterInfoRead["providerStatus"],
): IconStatus => {
  let state = Status.Unknown;
  switch (clusterStatus?.message) {
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

export const nodeStatusToText = (status?: cm.StatusInfo): string => {
  if (!status) {
    return "unknown";
  }

  if (status.reason) {
    return status.reason;
  }

  return "unknown";
};

export type ClusterGenericStatuses = {
  infrastructureReady?: GenericStatus;
  lifecyclePhase?: GenericStatus;
  nodeHealth?: GenericStatus;
  providerStatus?: GenericStatus;
  controlPlaneReady?: GenericStatus;
};

export const clusterToStatuses = (
  cluster: cm.ClusterInfoRead,
): ClusterGenericStatuses => {
  const cgs: ClusterGenericStatuses = {};
  if (cluster.infrastructureReady !== undefined) {
    cgs["infrastructureReady"] = cluster.infrastructureReady;
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
  if (cluster.controlPlaneReady !== undefined) {
    cgs["controlPlaneReady"] = cluster.controlPlaneReady;
  }
  return cgs;
};

export const nodeStatusToIconStatus = (status?: cm.StatusInfo): IconStatus => {
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

/** CM measurement units for data quantity in bytes */
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

/**
 * Determines if a given cluster is trusted compute compatible.
 *
 * @param cluster - The cluster information object.
 * @returns An object indicating whether the cluster is trusted compute compatible,
 *          along with a tooltip providing additional information.
 */
export const getTrustedComputeCluster = (
  cluster?: cm.ClusterInfoRead,
  tcEnabled?: boolean,
): TrustedComputeCompatibility => {
  if (
    tcEnabled ||
    (cluster &&
      cluster.labels &&
      "trusted-compute-compatible" in cluster.labels &&
      cluster.labels["trusted-compute-compatible"] === "true")
  ) {
    return {
      text: "Compatible",
      tooltip:
        "This cluster contains at least one host that has Secure Boot and Full Disk Encryption enabled.",
    };
  } else {
    return {
      text: "Not compatible",
      tooltip:
        "This cluster does not contain any host that has Secure Boot and Full Disk Encryption enabled.",
    };
  }
};

/** Label Object type */
export interface ObjectKeyValue {
  [key: string]: string;
}

/** Label Object to MetadataPair */
export const objectToMetadataPair = (data: ObjectKeyValue) => {
  const labelPair: MetadataPair[] = [];
  Object.entries(data).forEach(function (entry) {
    const label = {
      key: entry[0],
      value: entry[1],
    };
    labelPair.push(label);
  });
  return labelPair;
};

// labels to object
export const metadataPairToObject = (pairs: MetadataPair[]) => {
  const labelObject: any = {};
  pairs.forEach((tags) => {
    labelObject[tags.key] = tags.value;
  });
  return labelObject;
};
