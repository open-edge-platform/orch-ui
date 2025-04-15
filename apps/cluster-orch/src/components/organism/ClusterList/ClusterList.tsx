/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import {
  AggregatedStatuses,
  AggregatedStatusesMap,
  aggregateStatuses,
  columnApiNameToDisplayName,
  columnDisplayNameToApiName,
  SortDirection,
  Table,
  TableColumn,
} from "@orch-ui/components";
import {
  clusterToStatuses,
  Direction,
  getFilter,
  getOrder,
  getTrustedComputeCluster,
  Operator,
  SharedStorage,
} from "@orch-ui/utils";
import { Text } from "@spark-design/react";
import { TextSize } from "@spark-design/tokens";
import { useSearchParams } from "react-router-dom";

const dataCy = "clusterList";
export interface ClusterListProps {
  selectedClusterIds?: string[];
  onSelect?: (selectedRowData: cm.ClusterInfoRead, isSelected: boolean) => void;
  onShowDetails?: (cluster: cm.ClusterInfoRead) => void;
  isForm?: boolean;
}
const ClusterList = ({
  selectedClusterIds,
  onSelect,
  onShowDetails,
  isForm,
}: ClusterListProps) => {
  const cy = { "data-cy": dataCy };
  const projectName = SharedStorage.project?.name ?? "";
  const [searchParams, setSearchParams] = useSearchParams();

  const columns: TableColumn<cm.ClusterInfoRead>[] = [
    {
      Header: "Cluster Name",
      accessor: (item) => item.name,
      apiName: "name",
      Cell: (table) => {
        const row = table.row.original;
        return (
          <a onClick={() => onShowDetails && onShowDetails(row)}>{row.name}</a>
        );
      },
    },
    {
      Header: "Status",
      accessor: (item) =>
        aggregateStatuses(
          clusterToStatuses(item as cm.ClusterInfoRead),
          "lifecyclePhase",
        ).message,
      apiName: "status",
      Cell: (table) => (
        <AggregatedStatuses<AggregatedStatusesMap>
          statuses={clusterToStatuses(table.row.original)}
          defaultStatusName="lifecyclePhase"
        />
      ),
    },
    {
      Header: "Host Count",
      accessor: "nodeQuantity",
    },
    {
      Header: "Trusted Compute",
      accessor: (item) => getTrustedComputeCluster(item).text,
    },
  ];

  const sortColumn = columnApiNameToDisplayName(
    columns,
    searchParams.get("column") ?? "name",
  );
  const sortDirection = (searchParams.get("direction") ?? "asc") as Direction;
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10");
  const offset = parseInt(searchParams.get("offset") ?? "0");

  const { data: clustersResponse } =
    cm.useGetV2ProjectsByProjectNameClustersQuery(
      {
        projectName,
        filter: getFilter<cm.ClusterInfo>(
          searchParams.get("searchTerm") ?? "",
          ["name", "lifecyclePhase.indicator"],
          Operator.OR,
          false,
          { "lifecyclePhase.indicator": "lifecyclePhase" },
        ),
        orderBy: getOrder(searchParams.get("column") ?? "name", sortDirection),
        pageSize: searchParams.get("pageSize")
          ? parseInt(searchParams.get("pageSize")!)
          : 10,
        offset: searchParams.get("offset")
          ? parseInt(searchParams.get("offset")!)
          : 0,
      },
      {
        skip: !projectName,
      },
    );

  return (
    <div {...cy} className="cluster-list">
      <Text size={TextSize.Large} data-cy="clusterTitle">
        Clusters
      </Text>
      <Table
        columns={columns}
        data={clustersResponse?.clusters}
        initialState={{
          pageIndex: Math.floor(offset / pageSize),
        }}
        sortColumns={[0, 1]}
        initialSort={{
          column: sortColumn ?? "name",
          direction: sortDirection,
        }}
        onSort={(column: string, direction: SortDirection) => {
          setSearchParams((prev) => {
            if (direction) {
              const apiName = columnDisplayNameToApiName(columns, column);

              if (apiName) {
                prev.set("column", apiName);
                prev.set("direction", direction);
              }
            } else {
              prev.delete("column");
              prev.delete("direction");
            }
            return prev;
          });
        }}
        key="deployment-table"
        canPaginate
        isServerSidePaginated
        totalOverallRowsCount={clustersResponse?.totalElements ?? 0}
        onChangePage={(index: number) => {
          setSearchParams((prev) => {
            prev.set("offset", (index * pageSize).toString());
            return prev;
          });
        }}
        onChangePageSize={(pageSize: number) => {
          setSearchParams((prev) => {
            prev.set("pageSize", pageSize.toString());
            return prev;
          });
        }}
        // Selection feature
        canSelectRows={isForm}
        getRowId={(cluster) => cluster.name!}
        selectedIds={selectedClusterIds}
        onSelect={onSelect}
      />
    </div>
  );
};

export default ClusterList;
