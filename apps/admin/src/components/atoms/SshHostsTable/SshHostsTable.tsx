/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import {
  ApiError,
  Empty,
  SquareSpinner,
  Table,
  TableColumn,
} from "@orch-ui/components";
import { API_INTERVAL, RuntimeConfig, SharedStorage } from "@orch-ui/utils";
import { Heading } from "@spark-design/react";
import React, { Suspense } from "react";

const dataCy = "sshHostsTable";

interface SshHostsTableProps {
  /** Local account having ssh which is getting used by the host that are displayed. */
  localAccount: infra.LocalAccountRead;
  poll?: boolean;
  AggregateHostStatusRemote?: React.LazyExoticComponent<
    React.ComponentType<any>
  > | null;
}
const AggregateHostStatus = RuntimeConfig.isEnabled("INFRA")
  ? React.lazy(async () => await import("EimUI/AggregateHostStatus"))
  : null;

type InstanceReadModified = infra.InstanceRead & { host?: infra.HostRead };

const SshHostsTable = ({
  localAccount,
  poll,
  AggregateHostStatusRemote = AggregateHostStatus,
}: SshHostsTableProps) => {
  const cy = { "data-cy": dataCy };
  const filter = `has(localaccount) AND localaccount.resourceId="${localAccount.resourceId}"`;
  const columns: TableColumn<infra.InstanceRead>[] = [
    {
      Header: "Name",
      apiName: "name",
      accessor: (item: InstanceReadModified) =>
        item.host!.name ?? item.host!.resourceId ?? "",
    },
    {
      Header: "Status",
      accessor: (item: InstanceReadModified) => item.host!.hostStatus,
      Cell: (table: { row: { original: infra.InstanceRead } }) => (
        <Suspense fallback={<SquareSpinner />}>
          {AggregateHostStatusRemote !== null ? (
            <AggregateHostStatusRemote
              instance={table.row.original}
              host={table.row.original.host as infra.HostRead}
            />
          ) : (
            "Remote Error"
          )}
        </Suspense>
      ),
    },
  ];

  const {
    data: sshHostList,
    isSuccess,
    isLoading,
    isError,
    error,
  } = infra.useGetV1ProjectsByProjectNameComputeInstancesQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      filter,
    },
    {
      skip: !SharedStorage.project?.name || !localAccount.resourceId,
      ...(poll ? { pollingInterval: API_INTERVAL } : {}),
    },
  );
  const sshInstances = sshHostList?.instances;

  const getTable = () => {
    if (isError) {
      return <ApiError error={error} />;
    } else if (isLoading) {
      return <SquareSpinner />;
    } else if (!sshInstances || (isSuccess && sshInstances.length === 0)) {
      return (
        <Empty
          dataCy="sshHostsEmpty"
          icon="host"
          subTitle="Assign keys to host to display them"
        />
      );
    }

    return (
      <div data-cy="hostTableContainer" className="host-table-container">
        <Table columns={columns} data={sshInstances} />
      </div>
    );
  };

  return (
    <div {...cy} className="ssh-hosts-table">
      <Heading semanticLevel={6}>Host Using Public Key</Heading>
      {getTable()}
    </div>
  );
};

export default SshHostsTable;
