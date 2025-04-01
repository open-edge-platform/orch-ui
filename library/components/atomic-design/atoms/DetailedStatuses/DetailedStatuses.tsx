/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AggregatedStatusesMap,
  GenericStatus,
  Status,
  StatusIcon,
} from "@orch-ui/components";
import { Text } from "@spark-design/react";
import moment from "moment";
import "./DetailedStatuses.scss";

const dataCy = "detailedStatuses";

const genericStatusToIconStatus = (gs: GenericStatus): Status => {
  switch (gs.indicator) {
    case "STATUS_INDICATION_ERROR":
      return Status.Error;
    case "STATUS_INDICATION_IN_PROGRESS":
      return Status.NotReady;
    case "STATUS_INDICATION_IDLE":
      return Status.Ready;
    default:
      return Status.Unknown;
  }
};

type FieldLabel = {
  label: string;
  formatter?: <I extends GenericStatus>(s: I) => string;
};

// maps the fields in the data object to human readable labels and formatter functions.
export type FieldLabels<T> = {
  [field in keyof T]: FieldLabel;
};

interface DetailedStatusesProps<T extends AggregatedStatusesMap> {
  data: T;
  statusFields: FieldLabels<T>;
  showTimestamp?: boolean;
}
export const DetailedStatuses = <T extends AggregatedStatusesMap>({
  data,
  statusFields,
  showTimestamp = false,
}: DetailedStatusesProps<T>) => {
  const cy = { "data-cy": dataCy };

  const fieldToRow = (data: T, key: string, field: FieldLabel) => {
    if (data[key] === undefined) {
      return <></>;
    }
    const timestamp = data[key].timestamp;
    const humanReadableTimestamp = timestamp
      ? moment(new Date(timestamp * 1000)).format("MMM DD, YYYY hh:mm:ss A")
      : "Unavailable";
    const message = data[key].message ?? "-";
    return (
      <>
        <span className="line"></span>
        <div data-cy={`label-${key}`}>
          <Text>{field.label}</Text>
        </div>
        <div data-cy={`icon-${key}`}>
          <StatusIcon
            status={genericStatusToIconStatus(data[key])}
            text={field.formatter ? field.formatter(data[key]) : message}
          />
        </div>
        {showTimestamp && (
          <div data-cy={`timestamp-${key}`}>
            <Text>{humanReadableTimestamp}</Text>
          </div>
        )}
      </>
    );
  };
  return (
    <div {...cy} className="cluster-status-details">
      <div
        className={`cluster-status-details__grid-wrapper ${showTimestamp ? "col3" : "col2"}`}
      >
        <div>
          <Text style={{ fontWeight: "500" }}>Source</Text>
        </div>
        <div>
          <Text style={{ fontWeight: "500" }}>Status</Text>
        </div>
        {showTimestamp && (
          <div data-cy="last-change">
            <Text style={{ fontWeight: "500" }}>Last Change</Text>
          </div>
        )}
        {Object.entries(statusFields).map(([key, field]) =>
          fieldToRow(data, key, field),
        )}
      </div>
    </div>
  );
};
