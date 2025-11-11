/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import {
  ApiError,
  Empty,
  Status,
  StatusIcon,
  Table,
  TableColumn,
  TableLoader,
} from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Text } from "@spark-design/react";
import { useSearchParams } from "react-router-dom";

import "./OsUpdateHistory.scss";

const dataCy = "osUpdateHistory";

// Helper function to format timestamps
const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleString();
};

// Helper function to format duration
const formatDuration = (startTime?: number, endTime?: number): string => {
  if (!startTime || !endTime) return "N/A";
  const minutes = Math.round((endTime - startTime) / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

const getStatusIconVariant = (indicator?: infra.StatusIndication): Status => {
  switch (indicator) {
    case "STATUS_INDICATION_IDLE":
      return Status.Ready;
    case "STATUS_INDICATION_IN_PROGRESS":
      return Status.NotReady;
    case "STATUS_INDICATION_ERROR":
      return Status.Error;
    case "STATUS_INDICATION_UNSPECIFIED":
    default:
      return Status.Unknown;
  }
};

interface OsUpdateHistoryProps {
  host: infra.HostResourceRead;
}

const OsUpdateHistory = ({ host }: OsUpdateHistoryProps) => {
  const cy = { "data-cy": dataCy };
  const [searchParams, setSearchParams] = useSearchParams();

  // Pagination configuration
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10");
  const offset = parseInt(searchParams.get("offset") ?? "0");

  // Fetch OS Update Runs for this instance
  const {
    data: osUpdateRuns,
    isLoading: isOsUpdateRunsLoading,
    isError: isOsUpdateRunsError,
    error: osUpdateRunsError,
  } = infra.useOsUpdateRunListOsUpdateRunQuery({
    projectName: SharedStorage.project?.name ?? "",
    filter: `instance.resourceId="${host?.instance?.resourceId}"`,
    pageSize,
    offset,
  });

  const runs = osUpdateRuns?.osUpdateRuns || [];
  const totalElements = osUpdateRuns?.totalElements || 0;

  // Define table columns
  const columns: TableColumn<infra.OsUpdateRunRead>[] = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: (table: { row: { original: infra.OsUpdateRunRead } }) => {
        const run = table.row.original;
        return (
          <div className="os-update-history__status-cell">
            <StatusIcon
              status={getStatusIconVariant(run.statusIndicator)}
              text={run.status || "Unknown"}
            />
          </div>
        );
      },
    },
    {
      Header: "Applied Policy",
      accessor: "appliedPolicy.name",
      Cell: (table: { row: { original: infra.OsUpdateRunRead } }) => {
        const policyName = table.row.original.appliedPolicy?.name;
        return (
          <Text size="s" data-cy="appliedPolicy">
            {policyName || "N/A"}
          </Text>
        );
      },
    },
    {
      Header: "Start Time",
      accessor: "startTime",
      Cell: (table: { row: { original: infra.OsUpdateRunRead } }) => {
        const startTime = table.row.original.startTime;
        return (
          <Text size="s" data-cy="startTime">
            {startTime ? formatTimestamp(startTime) : "N/A"}
          </Text>
        );
      },
    },
    {
      Header: "End Time",
      accessor: "endTime",
      Cell: (table: { row: { original: infra.OsUpdateRunRead } }) => {
        const endTime = table.row.original.endTime;
        return (
          <Text size="s" data-cy="endTime">
            {endTime ? formatTimestamp(endTime) : "In Progress"}
          </Text>
        );
      },
    },
    {
      Header: "Duration",
      accessor: (run) => formatDuration(run.startTime, run.endTime),
      Cell: (table: { row: { original: infra.OsUpdateRunRead } }) => {
        const run = table.row.original;
        return (
          <Text size="s" data-cy="duration">
            {formatDuration(run.startTime, run.endTime)}
          </Text>
        );
      },
    },
  ];

  if (isOsUpdateRunsLoading) {
    return (
      <div {...cy} className="os-update-history">
        <TableLoader />
      </div>
    );
  }

  if (isOsUpdateRunsError) {
    return (
      <div {...cy} className="os-update-history">
        <ApiError error={osUpdateRunsError} />
      </div>
    );
  }

  if (totalElements === 0) {
    return (
      <div {...cy} className="os-update-history">
        <Empty
          icon="list"
          title="No OS Update History"
          subTitle="This instance has no OS update runs recorded"
        />
      </div>
    );
  }

  return (
    <div {...cy} className="os-update-history">
      <Table
        columns={columns}
        data={runs}
        isLoading={isOsUpdateRunsLoading}
        canSearch
        dataCy="osUpdateHistoryTable"
        // Pagination
        canPaginate
        isServerSidePaginated
        totalOverallRowsCount={totalElements}
        initialState={{ pageSize, pageIndex: Math.floor(offset / pageSize) }}
        onChangePage={(index: number) => {
          setSearchParams((prev) => {
            prev.set("offset", (index * pageSize).toString());
            return prev;
          });
        }}
        onChangePageSize={(newPageSize: number) => {
          setSearchParams((prev) => {
            prev.set("pageSize", newPageSize.toString());
            prev.set("offset", "0"); // Reset to first page
            return prev;
          });
        }}
      />
    </div>
  );
};

export default OsUpdateHistory;
