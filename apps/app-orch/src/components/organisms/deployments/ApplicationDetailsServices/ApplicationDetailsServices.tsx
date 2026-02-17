/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { arm } from "@orch-ui/apis";
import {
  SquareSpinner,
  Status,
  StatusIcon,
  Table,
  TableColumn,
} from "@orch-ui/components";
import { API_INTERVAL, SharedStorage } from "@orch-ui/utils";
import { Text, Tooltip } from "@spark-design/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../store/hooks";
import {
  invalidateCacheByTagname,
  printStatus,
} from "../../../../utils/global";

const { useEndpointsServiceListAppEndpointsQuery } = arm;

interface ApplicationDetailsServicesProps {
  appId: string;
  clusterId: string;
}

const ApplicationDetailsServices = ({
  appId,
  clusterId,
}: ApplicationDetailsServicesProps) => {
  const dispatch = useAppDispatch();

  const {
    data: services,
    isLoading,
    isSuccess,
    isError,
  } = useEndpointsServiceListAppEndpointsQuery(
    {
      appId,
      clusterId,
      projectName: SharedStorage.project?.name ?? "",
    },
    {
      skip: !SharedStorage.project?.name || !appId || !clusterId,
      pollingInterval: API_INTERVAL,
    },
  );

  useEffect(() => {
    // Refresh/Remove cache with new data on every get at API_INTERVAL time.
    if (isSuccess) {
      invalidateCacheByTagname("EndpointsService", dispatch);
    }
  }, [isSuccess]);

  const servicesCols: TableColumn<arm.AppEndpointRead>[] = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Hostname",
      accessor: (row) =>
        row.fqdns?.map((fqdn, idx) => <div key={idx}>{fqdn.fqdn}</div>),
    },
    {
      Header: "Ports",
      accessor: (row) =>
        row.ports?.map((port) => `${port.value}(${port.protocol})`).join(","),
      Cell: ({ row }) => (
        <>
          {row.original.ports?.map((port) => (
            <div key={port.name}>
              {port.serviceProxyUrl ? (
                <Link
                  to={port.serviceProxyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Tooltip content={port.serviceProxyUrl} placement="right">
                    {`${port.value}(${port.protocol})`}
                  </Tooltip>
                </Link>
              ) : (
                `${port.value}(${port.protocol})`
              )}
            </div>
          ))}
        </>
      ),
    },
    {
      Header: "Status",
      accessor: (row) => {
        let state;
        if (!row.endpointStatus?.state) {
          state = Status.Unknown;
        } else {
          switch (row.endpointStatus.state) {
            // green dot
            case "STATE_READY":
              state = Status.Ready;
              break;
            // gray icon
            case "STATE_NOT_READY":
            default:
              state = Status.Unknown;
          }
        }
        return (
          <StatusIcon
            status={state}
            text={
              row.endpointStatus && row.endpointStatus.state
                ? printStatus(row.endpointStatus.state)
                : "Unknown"
            }
          />
        );
      },
    },
  ];

  return (
    <div
      data-cy="applicationDetailsServices"
      className="application-details-services"
    >
      <Text className="table-title">Endpoints</Text>
      {isLoading && <SquareSpinner />}
      {isError && <span>Could not load endpoints.</span>}
      {isSuccess && (
        <Table
          columns={servicesCols}
          data={services?.appEndpoints ?? []}
          sortColumns={[0]}
        />
      )}
    </div>
  );
};

export default ApplicationDetailsServices;
