/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import {
  ApiError,
  columnApiNameToDisplayName,
  columnDisplayNameToApiName,
  MessageBanner,
  MessageBannerAlertState,
  SortDirection,
  SquareSpinner,
  StatusIcon,
  Table,
  TableColumn,
} from "@orch-ui/components";

import {
  admStatusToText,
  admStatusToUIStatus,
  API_INTERVAL,
  deploymentClusterDetailRoute,
  Direction,
  getOrder,
  SharedStorage,
  useAppOrchNavigate,
} from "@orch-ui/utils";
import { Hyperlink, Text } from "@spark-design/react";
import {
  HyperlinkType,
  HyperlinkVariant,
  TextSize,
} from "@spark-design/tokens";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./DeploymentInstancesTable.scss";

const dataCy = "deploymentInstancesTable";

interface DeploymentInstancesTableProps {
  clusterId?: string;
}
const DeploymentInstancesTable = ({
  clusterId,
}: DeploymentInstancesTableProps) => {
  const cy = { "data-cy": dataCy };
  const navigate = useAppOrchNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showErrorBanner, setShowErrorBanner] = useState<boolean>(false);

  const columns: TableColumn<adm.DeploymentInstancesClusterRead>[] = [
    {
      Header: "Deployment Name",
      apiName: "deploymentDisplayName",
      accessor: (row) => row.deploymentDisplayName ?? "N/A",
      Cell: (table: {
        row: { original: adm.DeploymentInstancesClusterRead };
      }) => {
        const row = table.row.original;
        return (
          <Hyperlink
            data-cy="link"
            variant={HyperlinkVariant.Primary}
            onPress={() => {
              if (row.deploymentUid && clusterId)
                navigate(deploymentClusterDetailRoute, {
                  deplId: row.deploymentUid,
                  name: clusterId,
                });
              else setShowErrorBanner(true);
            }}
            visualType={HyperlinkType.Quiet}
          >
            {row.deploymentDisplayName ?? row.deploymentName ?? "N/A"}
          </Hyperlink>
        );
      },
    },
    {
      Header: "Status",
      Cell: (table: {
        row: { original: adm.DeploymentInstancesClusterRead };
      }) => {
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
      Header: "Applications",
      Cell: (table: {
        row: { original: adm.DeploymentInstancesClusterRead };
      }) => {
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

  // API configuration
  const sortColumn =
    columnApiNameToDisplayName(columns, searchParams.get("column")) ??
    "Deployment Name";
  const sortDirection = searchParams.get("direction") as Direction;
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10");
  const offset = parseInt(searchParams.get("offset") ?? "0");
  const orderBy =
    getOrder(searchParams.get("column"), sortDirection) ?? "id asc";

  const { data, isLoading, isError, error } =
    adm.useDeploymentServiceListDeploymentsPerClusterQuery(
      {
        clusterId: clusterId ?? "",
        projectName: SharedStorage.project?.name ?? "",
        orderBy,
        pageSize,
        offset,
      },
      { pollingInterval: API_INTERVAL },
    );

  const getJSX = () => {
    if (isError) return <ApiError error={error} />;

    return isLoading ? (
      <SquareSpinner />
    ) : (
      <Table
        columns={columns}
        data={data?.deploymentInstancesCluster ?? []}
        sortColumns={[0]}
        canPaginate
        isServerSidePaginated
        totalOverallRowsCount={data?.totalElements ?? 0}
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
  };

  const className = "deployment-instances-table";
  return (
    <div {...cy} className={className}>
      {showErrorBanner && (
        <MessageBanner
          variant={MessageBannerAlertState.Error}
          isDismmisible
          title={"Error"}
          icon="information-circle"
          text={"Deployment missing Uid"}
          onClose={() => setShowErrorBanner(false)}
        />
      )}
      {getJSX()}
    </div>
  );
};

export default DeploymentInstancesTable;
