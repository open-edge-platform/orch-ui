/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import {
  ApiError,
  columnApiNameToDisplayName,
  columnDisplayNameToApiName,
  Empty,
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
  Direction,
  getOrder,
  SharedStorage,
} from "@orch-ui/utils";
import { Heading, MessageBanner } from "@spark-design/react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import HostsStatusByCluster from "../../atoms/HostsStatusByCluster/HostsStatusByCluster";
import SiteByCluster from "../../atoms/SiteByCluster/SiteByCluster";

const { useDeploymentServiceListDeploymentClustersQuery } = adm;

interface DeploymentSite {
  deploymentId: string;
  site?: {
    name: string;
    id: string;
  };
  deploymentStatus: adm.DeploymentStatusRead;
  // hostStatus?: { hostId: string; hostName?: string; status: Status }[];
  cluster: {
    name: string;
    id: string;
  };
  createdAt?: string;
}

const dataCy = "deploymentSiteSummary";
interface DeploymentSiteSummaryProps {
  deployment: adm.DeploymentRead;
}

/**
 * DeploymentSiteSummary given a deployment shows of a table with
 * one row for each instance of this deployment and details of
 * the associated Hosts and Site
 */
const DeploymentSiteSummary = ({ deployment }: DeploymentSiteSummaryProps) => {
  const cy = { "data-cy": dataCy };
  const [searchParams, setSearchParams] = useSearchParams();

  const columns: TableColumn<DeploymentSite>[] = [
    {
      Header: "Site",
      Cell: (t) => <SiteByCluster clusterName={t.row.original.cluster.name} />,
    },
    {
      Header: "Deployment Status",
      accessor: "deploymentStatus.state",
      apiName: "status.state",
      Cell: (t) => (
        <Link
          to={`/applications/deployment/${deployment.deployId}/cluster/${t.row.original.cluster.id}`}
        >
          <StatusIcon
            status={admStatusToUIStatus(t.row.original.deploymentStatus)}
            text={admStatusToText(t.row.original.deploymentStatus)}
          />
        </Link>
      ),
    },
    {
      Header: "Host Status",
      accessor: (row) => (
        <HostsStatusByCluster clusterName={row.cluster.name} />
      ),
    },
  ];

  const [rows, setRows] = useState<DeploymentSite[]>([]);

  const sortColumn =
    columnApiNameToDisplayName(columns, searchParams.get("column")) || "Site";
  const sortDirection = (searchParams.get("direction") || "asc") as Direction;
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const offset = parseInt(searchParams.get("offset") || "0");
  const orderBy =
    getOrder(searchParams.get("column"), sortDirection) ?? "name asc";

  const {
    data: deploymentClusters,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useDeploymentServiceListDeploymentClustersQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      deplId: deployment.deployId ?? "",
      orderBy,
      pageSize,
      offset,
    },
    {
      pollingInterval: API_INTERVAL,
      skip: !SharedStorage.project?.name,
    },
  );

  useEffect(() => {
    // NOTE that deployId, cluster name and ID are always present, see LPUUH-575
    if (isSuccess && deploymentClusters?.clusters) {
      const rows = deploymentClusters.clusters.map((d): DeploymentSite => {
        return {
          deploymentId: deployment.deployId ?? "unknown-id",
          deploymentStatus: d.status ?? {},
          cluster: {
            name: d.name ?? "no-cluster-name",
            id: d.id ?? "no-cluster-id",
          },
        };
      });

      if (rows) setRows(rows);
    }
  }, [deployment, deploymentClusters, isSuccess]);

  const getSiteTable = () => {
    if (isLoading) {
      return <SquareSpinner />;
    } else if (isError) {
      return <ApiError error={error} />;
    } else if (
      !deploymentClusters?.clusters ||
      deploymentClusters.totalElements === 0 ||
      rows.length === 0
    ) {
      return (
        <Empty
          icon="network"
          title="There are no Clusters available within this deployment."
        />
      );
    }

    return (
      <Table
        key="site-table"
        columns={columns}
        data={rows}
        canPaginate
        isServerSidePaginated
        totalOverallRowsCount={deploymentClusters.totalElements}
        initialState={{
          pageSize,
          pageIndex: Math.floor(offset / pageSize),
        }}
        initialSort={{
          column:
            (columns.find((column) => column.Header === sortColumn)
              ?.accessor as string) ?? "cluster.name",
          direction: sortDirection,
        }}
        onChangePage={(index) => {
          setSearchParams((prev) => {
            prev.set("offset", (index * pageSize).toString());
            return prev;
          });
        }}
        onChangePageSize={(size) => {
          setSearchParams((prev) => {
            prev.set("pageSize", size.toString());
            prev.set("offset", "0");
            return prev;
          });
        }}
        sortColumns={[1]}
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
      />
    );
  };

  return (
    <div {...cy}>
      <Heading semanticLevel={3} size="s">
        Sites
      </Heading>
      <MessageBanner
        messageTitle=""
        messageBody="Click on the individual status to view the details"
        variant="info"
        size="s"
        showIcon
        outlined
      />
      <div className="pa-2" data-cy="siteTable">
        {getSiteTable()}
      </div>
    </div>
  );
};

export default DeploymentSiteSummary;
