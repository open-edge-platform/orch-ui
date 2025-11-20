/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import {
  ApiError,
  AppOrchGuard,
  Empty,
  SquareSpinner,
  Table,
  TableColumn,
} from "@orch-ui/components";
import {
  Direction,
  getFilter,
  getOrder,
  Operator,
  parseError,
  SharedStorage,
} from "@orch-ui/utils";
import { Icon } from "@spark-design/react";
import { useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import DeploymentStatusCounter from "../../atoms/DeploymentStatusCounter/DeploymentStatusCounter";
import HostStatusCounter from "../../atoms/HostStatusCounter/HostStatusCounter";

const { useDeploymentServiceListDeploymentsQuery } = adm;

const dataCy = "deploymentDetailsTable";

export interface DeploymentDetailsTableProps {
  labels?: string[];
}
const DeploymentDetailsTable = ({ labels }: DeploymentDetailsTableProps) => {
  const cy = { "data-cy": dataCy };
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // API Call
  const { data, isLoading, isError, isSuccess, error } =
    useDeploymentServiceListDeploymentsQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        labels,
        filter: getFilter<adm.DeploymentRead>(
          searchParams.get("searchTerm") ?? "",
          ["name"],
          Operator.OR,
        ),
        orderBy: getOrder(
          searchParams.get("column"),
          searchParams.get("direction") as Direction,
        ),
        pageSize: parseInt(searchParams.get("pageSize")!) || 10,
        offset: parseInt(searchParams.get("offset")!) || 0,
      },
      {
        pollingInterval: 5 * 1000,
        skip: !SharedStorage.project?.name,
      },
    );

  const columns: TableColumn<adm.DeploymentRead>[] = [
    { Header: "Deployment Name", accessor: "displayName" },
    {
      Header: "Deployment Package",
      Cell: (table: { row: { original: adm.DeploymentRead } }) => {
        const deployment = table.row.original;
        return `${deployment.appName} (${deployment.appVersion})`;
      },
    },
    {
      Header: "Deployment #",
      accessor: "status.summary.total",
      Cell: ({ cell: { value } }) => {
        return value ?? "N/A";
      },
    },
    {
      Header: "Deployment Status",
      accessor: "status",
      Cell: ({ cell: { value } }) => {
        const { summary } = value as adm.DeploymentStatus;
        return value ? (
          <DeploymentStatusCounter summary={summary!} />
        ) : (
          <p>NA</p>
        );
      },
    },
    {
      Header: "Host Status",
      Cell: (table: { row: { original: adm.DeploymentRead } }) => {
        const row = table.row.original;
        return row ? <HostStatusCounter deployment={row} /> : <p>NA</p>;
      },
    },
    {
      Header: "Link",
      Cell: (table: { row: { original: adm.DeploymentRead } }) => {
        const { deployId } = table.row.original;
        return (
          <Link to={`/dashboard/${deployId}`} data-cy="detailsBtn">
            <Icon icon="chevron-right" />
          </Link>
        );
      },
    },
  ];

  const jsx = useMemo(
    () => (
      <Table
        dataCy="deployments-table"
        key="deployments-table"
        columns={columns}
        data={data?.deployments ?? []}
        totalOverallRowsCount={data?.totalElements ?? 0}
      />
    ),
    [data, error],
  );

  if (isLoading) {
    return <SquareSpinner />;
  } else if (!data || (isSuccess && data.totalElements === 0)) {
    return (
      <div {...cy} className="deployment-details-row">
        <Empty
          icon="cube-detached"
          title="No deployments are present in the system"
          actions={[
            {
              action: () =>
                navigate("/applications/deployments/setup-deployment"),
              name: "Deploy a package",
            },
          ]}
        />
      </div>
    );
  } else if (isError && parseError(error).status !== 404) {
    return (
      <div {...cy} className="deployment-details-row">
        <ApiError error={error} />
      </div>
    );
  }

  return (
    <AppOrchGuard>
      <div {...cy} className="deployment-details-row">
        {jsx}
      </div>
    </AppOrchGuard>
  );
};

export default DeploymentDetailsTable;
