/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { adm } from "@orch-ui/apis";
import {
  ApiError,
  columnApiNameToDisplayName,
  columnDisplayNameToApiName,
  Empty,
  Popup,
  PopupOption,
  Ribbon,
  SortDirection,
  StatusIcon,
  Table,
  TableColumn,
  TableLoader,
} from "@orch-ui/components";
import {
  admStatusToText,
  admStatusToUIStatus,
  API_INTERVAL,
  checkAuthAndRole,
  Direction,
  getFilter,
  getOrder,
  Operator,
  Role,
  SharedStorage,
} from "@orch-ui/utils";
import { Hyperlink, Icon, Text } from "@spark-design/react";
import {
  HyperlinkType,
  HyperlinkVariant,
  TextSize,
} from "@spark-design/tokens";
import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export interface DeploymentDetailsTableProps {
  dataCy?: string;
  deployment: adm.DeploymentRead;
  hideColumns?: string[];
  poll?: boolean;
  columnAction?: (value: string) => void;
}

const DeploymentDetailsTable = ({
  dataCy = "deploymentDetailsTable",
  deployment,
  hideColumns = [],
  poll,
}: DeploymentDetailsTableProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  //TODO: Callback returns browser error
  // Do not call Hooks inside useEffect(...),
  // useMemo(...), or other built-in Hooks.
  const getTableRowPopupOptions = useCallback(
    (cluster: adm.ClusterRead): PopupOption[] => [
      {
        displayText: "View Instance Detail",
        disable: !checkAuthAndRole([Role.AO_WRITE]),
        onSelect: () => {
          navigate(`cluster/${cluster.id}`);
        },
      },
      {
        displayText: "View Cluster Detail",
        disable: !checkAuthAndRole([Role.CLUSTERS_READ, Role.CLUSTERS_WRITE]),
        onSelect: () => {
          navigate(`../../../infrastructure/cluster/${cluster.name}`, {
            relative: "path",
          });
        },
      },
    ],
    [],
  );
  const columns: TableColumn<adm.ClusterRead>[] = [
    {
      Header: "Cluster ID",
      apiName: "id",
      accessor: (cluster) => cluster.id,
      Cell: (table: { row: { original: adm.ClusterRead } }) => {
        const row = table.row.original;
        return (
          <Hyperlink
            variant={HyperlinkVariant.Primary}
            onPress={() => navigate(`cluster/${table.row.original.id}/`, {})}
            visualType={HyperlinkType.Quiet}
          >
            {row.id}
          </Hyperlink>
        );
      },
    },
    {
      Header: "Cluster Name",
      apiName: "name",
      accessor: (cluster) => cluster.name,
      Cell: (table: { row: { original: adm.ClusterRead } }) => {
        const row = table.row.original;
        return row.name;
      },
    },
    {
      Header: "Status",
      accessor: (row) => admStatusToText(row.status),
      Cell: (table: { row: { original: adm.ClusterRead } }) => {
        const row = table.row.original;
        return (
          <StatusIcon
            status={admStatusToUIStatus(row.status)}
            text={admStatusToText(row.status)}
          />
        );
      },
    },
    {
      Header: "Application",
      accessor: (row) =>
        `${row.status?.summary?.running ?? 0}/${
          row.status?.summary?.total ?? 0
        }`,
      Cell: (table: { row: { original: adm.ClusterRead } }) => {
        const row = table.row.original;
        return (
          <Text size={TextSize.Medium}>
            {row.status?.summary?.running ?? 0}/
            {row.status?.summary?.total ?? 0}
          </Text>
        );
      },
    },
  ];
  columns.push({
    Header: "Actions",
    textAlign: "center",
    padding: "0",
    accessor: (row) => (
      <Popup
        options={getTableRowPopupOptions(row)}
        jsx={<Icon icon="ellipsis-v" />}
      />
    ),
  });

  // API configuration
  const sortColumn =
    columnApiNameToDisplayName(columns, searchParams.get("column")) ??
    "Cluster ID";
  const sortDirection = (searchParams.get("direction") as Direction) || "asc";
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10");
  const offset = parseInt(searchParams.get("offset") ?? "0");
  const searchTerm = searchParams.get("searchTerm") ?? undefined;
  const searchFilter = getFilter<adm.ClusterRead>(
    searchParams.get("searchTerm") ?? "",
    ["id", "name"],
    Operator.OR,
  );
  const orderBy =
    getOrder(searchParams.get("column"), sortDirection) ?? "id asc";
  const onDeploymentClustersTableSearch = (searchTerm: string) => {
    setSearchParams((prev) => {
      prev.set("direction", "asc");
      prev.set("offset", "0");
      if (searchTerm) prev.set("searchTerm", searchTerm.trim());
      else prev.delete("searchTerm");
      return prev;
    });
  };
  const { data, isSuccess, isLoading, isError, error } =
    adm.useDeploymentServiceListDeploymentClustersQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        deplId: deployment.deployId ?? "",
        orderBy,
        pageSize,
        offset,
        filter: searchFilter,
      },
      {
        ...(poll ? { pollingInterval: API_INTERVAL } : {}),
        skip: !SharedStorage.project?.name || !deployment.deployId,
      },
    );

  /** Return true if deployments list is empty after a successful api fetch */
  const isEmpty = () => isSuccess && data.clusters.length === 0;
  /** Table or Empty Component */
  let tableContent;
  if (isError) return <ApiError error={error} />;
  else if (isLoading) return <TableLoader />;
  else if (!data || isEmpty()) {
    tableContent = (
      <>
        <Ribbon
          showSearch
          onSearchChange={onDeploymentClustersTableSearch}
          defaultValue={searchTerm}
        />
        <Empty
          dataCy="empty"
          icon="network"
          title="There are no Clusters available within this deployment."
        />
      </>
    );
  } else {
    // Filter table by column
    const filteredColumns = hideColumns
      ? columns.filter((column) => !hideColumns.includes(column.Header))
      : columns;
    tableContent = (
      <Table
        key="deployments-clusters-table"
        isLoading={isLoading}
        // Table data
        columns={filteredColumns}
        data={data.clusters}
        // Sorting
        sortColumns={[0, 1]}
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
        // Pagination
        canPaginate
        isServerSidePaginated
        totalOverallRowsCount={data.totalElements}
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
        // Searching
        canSearch
        searchTerm={searchTerm}
        onSearch={onDeploymentClustersTableSearch}
        // Initial state
        initialState={{
          pageSize,
          pageIndex: Math.floor(offset / pageSize),
        }}
        initialSort={{
          column: sortColumn,
          direction: sortDirection,
        }}
      />
    );
  }

  return <div data-cy={dataCy}>{tableContent}</div>;
};
export default DeploymentDetailsTable;
