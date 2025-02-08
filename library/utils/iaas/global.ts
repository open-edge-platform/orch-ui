/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { Status as IconStatus } from "@orch-ui/components";
import capitalize from "lodash/capitalize";

export const hostStatusToString = (status?: eim.Status["type"]) => {
  if (!status) {
    return "Unspecified";
  }
  return capitalize(status.replace("STATUS_CONDITION_", "").toLowerCase());
};

export const hostProviderStatusToString = (host?: eim.HostRead): string => {
  if (!host || !host?.hostStatus?.indicator) {
    return "Unspecified";
  }

  return host.hostStatus.message;
};

export const hostStatusIndicatorToIconStatus = (
  host: eim.HostRead,
): IconStatus => {
  switch (host.hostStatus?.indicator) {
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

export const hostPowerStatusToString = (status?: eim.HostPowerState) => {
  if (!status) {
    return "Unspecified";
  }
  return capitalize(status.replace("POWER_STATE_", "").toLowerCase());
};

export const hostPowerStatusToIconStatus = (
  status?: eim.HostPowerState,
): IconStatus => {
  switch (status) {
    case "POWER_STATE_ON":
      return IconStatus.Ready;

    case "POWER_STATE_ERROR":
    case "POWER_STATE_OFF":
      return IconStatus.Error;

    case "POWER_STATE_UNSPECIFIED":
    default:
      return IconStatus.Unknown;
  }
};

export const getObservabilityUrl = (): string | undefined => {
  return window.__RUNTIME_CONFIG__ &&
    window.__RUNTIME_CONFIG__.OBSERVABILITY_URL !== ""
    ? window.__RUNTIME_CONFIG__.OBSERVABILITY_URL
    : undefined;
};
