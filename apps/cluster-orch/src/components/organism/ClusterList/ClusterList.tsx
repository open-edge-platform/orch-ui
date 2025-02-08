/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm } from "@orch-ui/apis";
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
  Operator,
  SharedStorage,
} from "@orch-ui/utils";
import { Text } from "@spark-design/react";
import { TextSize } from "@spark-design/tokens";
import { useSearchParams } from "react-router-dom";

export const dataCy = "clusterList";
export interface ClusterListProps {
  selectedClusterIds?: string[];
  onSelect?: (
    selectedRowData: ecm.ClusterInfoRead,
    isSelected: boolean,
  ) => void;
  onShowDetails?: (cluster: ecm.ClusterInfoRead) => void;
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

  const columns: TableColumn<ecm.ClusterInfoRead>[] = [
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
          clusterToStatuses(item as ecm.ClusterInfoRead),
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
      Header: "Site",
      accessor: (row) =>
        row.locationList?.reduce((p, c) => {
          if (c.locationInfo) {
            return `${p} ${c.locationInfo};`;
          } else {
            return p;
          }
        }, ""),
      Cell: (table) => {
        const row = table.row.original;
        return (
          <Text size="m">
            {row.locationList?.reduce((p, c) => {
              if (c.locationInfo) {
                return `${p} ${c.locationInfo};`;
              } else {
                return p;
              }
            }, "")}
          </Text>
        );
      },
    },
  ];

  const sortColumn = columnApiNameToDisplayName(
    columns,
    searchParams.get("column") ?? "name",
  );
  const sortDirection = (searchParams.get("direction") ?? "asc") as Direction;
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10");
  const offset = parseInt(searchParams.get("offset") ?? "0");

  const { data: clusters } = ecm.useGetV1ProjectsByProjectNameClustersQuery(
    {
      projectName,
      filter: getFilter<ecm.ClusterInfo>(
        searchParams.get("searchTerm") ?? "",
        ["name", "status"],
        Operator.OR,
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
        data={clusters?.clusterInfoList}
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
        totalOverallRowsCount={clusters?.totalElements ?? 0}
        onChangePage={(index: number) => {
          setSearchParams((prev) => {
            prev.set("offset", (index * pageSize).toString());
            return prev;
          });
        }}
        // Selection feature
        canSelectRows={isForm}
        getRowId={(cluster) => cluster.clusterID!}
        selectedIds={selectedClusterIds}
        onSelect={onSelect}
      />
    </div>
  );
};

export default ClusterList;
