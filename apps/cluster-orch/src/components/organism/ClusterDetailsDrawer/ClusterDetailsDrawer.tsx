/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm, infra } from "@orch-ui/apis";
import {
  Flex,
  MetadataDisplay,
  SquareSpinner,
  TableColumn,
} from "@orch-ui/components";
import {
  generateMetadataPair,
  RuntimeConfig,
  SharedStorage,
} from "@orch-ui/utils";
import { Drawer, Heading, Text } from "@spark-design/react";
import { HeaderSize } from "@spark-design/tokens";
import React, { Suspense } from "react";
import "./ClusterDetailsDrawer.scss";

const dataCy = "clusterDetailsDrawer";

export interface ClusterDetailsDrawerProps {
  /** cluster-orch's cluster */
  cluster: cm.ClusterInfo;
  /** is this drawer component currently open? */
  isOpen: boolean;
  /** function to close the drawer */
  onHide: () => void;

  /** remote components for infra.HostTable*/
  __HostsTableRemote?: React.LazyExoticComponent<
    React.ComponentType<any>
  > | null;
  /** remote components for infra.AggregateHostStatus */
  __AggregateHostStatus?: React.LazyExoticComponent<
    React.ComponentType<any>
  > | null;
}

const HostsTableRemote = RuntimeConfig.isEnabled("INFRA")
  ? React.lazy(async () => await import("EimUI/HostsTableRemote"))
  : null;

const AggregateHostStatus = RuntimeConfig.isEnabled("INFRA")
  ? React.lazy(async () => await import("EimUI/AggregateHostStatus"))
  : null;

/* TODO: Refactor/Check - if we can reuse cluster_orch.ClusterDetails instead of below */
const ClusterDetailsDrawer = ({
  cluster,
  isOpen = false,
  onHide,
  __HostsTableRemote = HostsTableRemote,
  __AggregateHostStatus = AggregateHostStatus,
}: ClusterDetailsDrawerProps) => {
  const cy = { "data-cy": dataCy };
  const className = "cluster-details-drawer";
  const projectName = SharedStorage.project?.name ?? "";
  const { data: clusterDetail } =
    cm.useGetV2ProjectsByProjectNameClustersAndNameQuery(
      {
        projectName,
        name: cluster.name!,
      },
      { skip: !cluster.name || !projectName },
    );

  const guids = (): string[] =>
    clusterDetail?.nodes?.reduce(
      (l, n) => (n.id ? [n.id, ...l] : l),
      [] as string[],
    ) ?? [];

  const columns: TableColumn<infra.HostResourceRead>[] = [
    {
      Header: "Host Name",
      apiName: "name",
      accessor: (host) => host.name || host.resourceId,
    },
    {
      Header: "Status",
      Cell: (table: { row: { original: infra.HostResourceRead } }) => (
        <Suspense fallback={<SquareSpinner />}>
          {__AggregateHostStatus ? (
            <__AggregateHostStatus
              host={table.row.original}
              instance={table.row.original.instance}
            />
          ) : (
            "Remote Error"
          )}
        </Suspense>
      ),
    },
    {
      Header: "Serial Number",
      accessor: "serialNumber",
    },
  ];

  return (
    <Drawer
      // Drawer Configuration
      {...cy}
      className={className}
      show={isOpen}
      onHide={onHide}
      backdropClosable
      // Drawer Content
      headerProps={{
        title: clusterDetail ? clusterDetail.name : "Cluster Details",
        onHide: onHide,
      }}
      bodyContent={
        <>
          <div className={`${className}-info`}>
            <Flex cols={[4, 8]}>
              <Text className="text-bold" data-cy="status">
                Status
              </Text>
              <Text data-cy="statusValue">
                {clusterDetail?.providerStatus?.indicator}
              </Text>
              <Text className="text-bold" data-cy="id">
                Cluster ID
              </Text>
              <Text data-cy="idValue">{clusterDetail?.name}</Text>
            </Flex>
          </div>
          <div className={`${className}-label`} data-cy="labels">
            <Text className="text-bold">Cluster Labels</Text>
            <MetadataDisplay
              metadata={generateMetadataPair(clusterDetail?.labels)}
            />
          </div>
          <div className={`${className}-host`} data-cy="hosts">
            <Heading semanticLevel={6} size={HeaderSize.Small}>
              Hosts
            </Heading>
            {__HostsTableRemote ? (
              <Suspense fallback={<SquareSpinner />}>
                <__HostsTableRemote
                  columns={columns}
                  // TODO: The api seems to return hostId instead of Guids
                  filters={{ byHostIds: guids() }}
                  hideSelectedItemBanner
                  poll
                />
              </Suspense>
            ) : (
              "Remote Error"
            )}
          </div>
        </>
      }
    />
  );
};

export default ClusterDetailsDrawer;
