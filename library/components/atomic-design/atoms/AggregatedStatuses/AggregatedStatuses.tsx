/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Status, StatusIcon } from "../StatusIcon/StatusIcon";

const dataCy = "aggregatedStatuses";

export type StatusIndicator =
  | "STATUS_INDICATION_UNSPECIFIED"
  | "STATUS_INDICATION_ERROR"
  | "STATUS_INDICATION_IN_PROGRESS"
  | "STATUS_INDICATION_IDLE";
export type GenericStatus = {
  indicator: StatusIndicator;
  /** A textual message describing carrying a status message. */
  message?: string;
  /** A Unix, UTC timestamp when the status was last updated. */
  timestamp?: number;
};

export interface AggregatedStatusesMap {
  [key: string]: GenericStatus;
}

interface DefaultMessages {
  inProgress?: string;
  error?: string;
  idle?: string;
}

export type AggregatedStatus = { status: Status; message: string };

export type CustomAggregationStatus = {
  idle?: () => AggregatedStatus;
};
export interface AggregatedStatusesProps<T extends AggregatedStatusesMap> {
  statuses: T;
  defaultStatusName: keyof T;
  // used to customize message when multiple statuses match a specific state
  defaultMessages?: DefaultMessages;
  customAggregationStatus?: CustomAggregationStatus;
}

export const aggregateStatuses = <T extends AggregatedStatusesMap>(
  statuses: T,
  defaultStatusName: keyof T,
  defaultMessage?: DefaultMessages,
  // This method returns custom status and message to be displayed
  customAggregationStatus?: CustomAggregationStatus,
): AggregatedStatus => {
  const customErrMsg = defaultMessage?.error ?? "Error";
  const customInProgressMsg = defaultMessage?.inProgress ?? "In Progress";
  const customIdleMsg = defaultMessage?.idle ?? "Status message not found";

  // if some statuses are UNSPECIFIED, we can ignore them when computing the overall status
  const allIdle: boolean = Object.values(statuses).every(
    (s) =>
      s.indicator === "STATUS_INDICATION_IDLE" ||
      s.indicator === "STATUS_INDICATION_UNSPECIFIED",
  );
  const errors: GenericStatus[] = Object.values(statuses).filter(
    (s) => s.indicator === "STATUS_INDICATION_ERROR",
  );
  const inProgress: GenericStatus[] = Object.values(statuses).filter(
    (s) => s.indicator === "STATUS_INDICATION_IN_PROGRESS",
  );

  if (allIdle) {
    if (customAggregationStatus?.idle) {
      // To return different status and msg when aggregate status is evaluated to idle
      return customAggregationStatus.idle();
    }
    return {
      status: Status.Ready,
      message: statuses[defaultStatusName]?.message || customIdleMsg,
    };
  }

  if (errors.length > 0) {
    if (errors.length === 1) {
      return {
        status: Status.Error,
        message: errors[0].message ?? "-",
      };
    }
    return {
      status: Status.Error,
      message: customErrMsg,
    };
  }

  if (inProgress.length > 0) {
    if (inProgress.length === 1) {
      return {
        status: Status.NotReady,
        message: inProgress[0].message ?? "-",
      };
    }
    return {
      status: Status.NotReady,
      message: customInProgressMsg,
    };
  }

  return {
    status: Status.Unknown,
    message: "Unknown status",
  };
};

export const AggregatedStatuses = <T extends AggregatedStatusesMap>({
  statuses,
  defaultStatusName,
  defaultMessages,
  customAggregationStatus,
}: AggregatedStatusesProps<T>) => {
  const cy = { "data-cy": dataCy };

  const status = aggregateStatuses(
    statuses,
    defaultStatusName,
    defaultMessages,
    customAggregationStatus,
  );

  return (
    <span {...cy} className="aggregated-statuses">
      <StatusIcon status={status.status} text={status.message} />
    </span>
  );
};
