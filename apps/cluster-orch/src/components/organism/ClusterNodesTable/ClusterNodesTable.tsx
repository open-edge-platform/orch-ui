/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm, infra } from "@orch-ui/apis";
import {
  ApiError,
  SquareSpinner,
  StatusIcon,
  Table,
  TableColumn,
} from "@orch-ui/components";
import {
  getInfraPath,
  getTrustedComputeCompatibility,
  hostDetailsRoute,
  hostProviderStatusToString,
  nodeStatusToIconStatus,
  nodeStatusToText,
  RuntimeConfig,
  SharedStorage,
} from "@orch-ui/utils";
import { Icon } from "@spark-design/react";
import React, { Suspense, useEffect } from "react";
import { Link } from "react-router-dom";

const dataCy = "clusterNodesTable";

const AggregateHostStatus = RuntimeConfig.isEnabled("INFRA")
  ? React.lazy(async () => await import("EimUI/AggregateHostStatus"))
  : null;

type ClusterNode = infra.HostRead & cm.NodeInfo;

interface ClusterNodesTableProps {
  nodes?: cm.NodeInfo[];
  readinessType: "cluster" | "host";
  // NOTE the CO API takes UUID when creating the cluster and returns resourceId when reading it
  // as a result we need to filter on the former in the review page or the latter in the cluster list expansion
  filterOn: "resourceId" | "uuid";
  /** Invoked when data is loaded */
  onDataLoad?: (data: infra.HostRead[]) => void;
}
const ClusterNodesTable = ({
  nodes,
  readinessType,
  filterOn,
  onDataLoad,
}: ClusterNodesTableProps) => {
  const cy = { "data-cy": dataCy };

  const nodesCount = nodes?.length ?? 0;
  const hostsFilter = nodes
    ?.map(({ id }) => `${filterOn}="${id}"`)
    .join(" OR ");

  const {
    data: hostsResponse,
    isSuccess,
    isError,
    error,
  } = infra.useGetV1ProjectsByProjectNameComputeHostsQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      filter: hostsFilter,
    },
    {
      skip: nodesCount === 0,
    },
  );

  useEffect(() => {
    if (onDataLoad && isSuccess && hostsResponse) {
      onDataLoad(hostsResponse.hosts);
    }
  }, [hostsResponse, isSuccess]);

  if (nodesCount > 0 && isError) {
    return <ApiError error={error} />;
  }

  if (nodesCount > 0 && !isSuccess) {
    return <SquareSpinner />;
  }

  const statusHost: TableColumn<ClusterNode> = {
    Header: "Readiness",
    accessor: (item) => hostProviderStatusToString(item),
    Cell: (table: { row: { original: infra.HostRead } }) => (
      <Suspense fallback={<SquareSpinner />}>
        {AggregateHostStatus !== null ? (
          <AggregateHostStatus
            host={table.row.original}
            instance={table.row.original.instance}
          />
        ) : (
          "NA"
        )}
      </Suspense>
    ),
  };

  const statusCluster: TableColumn<ClusterNode> = {
    Header: "Readiness",
    accessor: (node) => nodeStatusToText(node.status),
    Cell: (table: { row: { original: ClusterNode } }) => {
      const row = table.row.original;
      return (
        <StatusIcon
          status={nodeStatusToIconStatus(row.status)}
          text={nodeStatusToText(row.status)}
        />
      );
    },
  };

  const columns: TableColumn<ClusterNode>[] = [
    {
      Header: "Host Name",
      accessor: (node) => node.name || node.resourceId,
    },
    readinessType === "cluster" ? statusCluster : statusHost,
    {
      Header: "Operating System",
      accessor: (node) => node.instance?.os?.name ?? "-",
    },
    {
      Header: "Trusted Compute",
      accessor: (node) => getTrustedComputeCompatibility(node).text,
    },
    {
      Header: "Actions",
      textAlign: "center",
      padding: "0",
      accessor: (node: ClusterNode) => {
        return (
          node.resourceId && (
            <Link
              to={getInfraPath(hostDetailsRoute, {
                id: node.resourceId,
              })}
            >
              <Icon icon="clipboard-forward" /> View Host Details
            </Link>
          )
        );
      },
    },
  ];

  const data: ClusterNode[] = [];

  if (nodesCount > 0) {
    nodes?.forEach((node) => {
      const host = hostsResponse?.hosts?.find(
        (host) => host[filterOn] === node.id,
      );
      if (host) {
        data.push({
          ...host,
          status: node.status,
        });
      }
    });
  }

  return (
    <div {...cy} className="cluster-nodes-table">
      <Table
        columns={columns}
        data={data}
        sortColumns={[0, 1, 2]}
        initialSort={{
          column: "Host Name",
          direction: "asc",
        }}
        key="hosts-table"
      />
    </div>
  );
};

export default ClusterNodesTable;
