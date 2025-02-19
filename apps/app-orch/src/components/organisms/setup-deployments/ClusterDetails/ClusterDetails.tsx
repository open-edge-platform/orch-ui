/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm, eim } from "@orch-ui/apis";
import { Flex, MetadataDisplay, SquareSpinner } from "@orch-ui/components";
import {
  hostProviderStatusToString,
  RuntimeConfig,
  SharedStorage,
  SparkTableColumn,
} from "@orch-ui/utils";
import { Drawer, Text } from "@spark-design/react";
import React, { Suspense } from "react";
import { generateMetadataPair } from "../../../../utils/global";
import "./ClusterDetails.scss";

export const dataCy = "clusterDetails";

interface ClusterDetailsProps {
  isOpen: boolean;
  onCloseDrawer: () => void;
  cluster: ecm.ClusterInfo;
}

const HostsTableRemote = RuntimeConfig.isEnabled("FM")
  ? React.lazy(async () => await import("EimUI/HostsTableRemote"))
  : null;

const AggregateHostStatus = RuntimeConfig.isEnabled("FM")
  ? React.lazy(async () => await import("EimUI/AggregateHostStatus"))
  : null;

/* TODO: this component may need to be moved to ClusterOrch and imported via remote mfe component
   OR preffered: better to reuse ClusterDetails page component as drawer for SelectHost table
*/
const ClusterDetails = ({
  cluster,
  isOpen = false,
  onCloseDrawer,
}: ClusterDetailsProps) => {
  const cy = { "data-cy": dataCy };
  const projectName = SharedStorage.project?.name ?? "";
  const { data: clusterDetail } =
    ecm.useGetV1ProjectsByProjectNameClustersAndClusterNameQuery(
      {
        projectName,
        clusterName: cluster.name!,
      },
      { skip: !cluster.name || !projectName },
    );

  const guids = (): string[] => {
    const result =
      clusterDetail?.nodes?.nodeInfoList?.reduce(
        (l, n) => (n.guid ? [n.guid, ...l] : l),
        [],
      ) ?? [];
    return result;
  };

  const columns: SparkTableColumn<eim.HostRead>[] = [
    {
      Header: "Host Name",
      accessor: "name",
    },
    {
      Header: "Status",
      accessor: (item: eim.HostRead) => hostProviderStatusToString(item),
      Cell: (table: { row: { original: eim.HostRead } }) => (
        <Suspense fallback={<SquareSpinner />}>
          {AggregateHostStatus !== null ? (
            <AggregateHostStatus
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
      {...cy}
      className="cluster-details"
      show={isOpen}
      backdropClosable={true}
      onHide={onCloseDrawer}
      headerProps={{
        title: clusterDetail ? clusterDetail.name : "Cluster Details",
      }}
      bodyContent={
        <div>
          <div className="cluster-details-basic">
            <Flex cols={[4, 8]}>
              <Text data-cy="status">Status</Text>
              <Text data-cy="statusValue">{clusterDetail?.status}</Text>
            </Flex>
            <Flex cols={[4, 8]}>
              <Text data-cy="id">Cluster ID</Text>
              <Text data-cy="idValue">{clusterDetail?.clusterID}</Text>
            </Flex>
            <Flex cols={[4, 8]}>
              <Text data-cy="site">Site</Text>
              <Text data-cy="siteValue">
                {cluster.locationList?.reduce((p, c) => {
                  if (c.locationInfo) {
                    return c.locationInfo + "; " + p;
                  } else {
                    return p;
                  }
                }, "")}
              </Text>
            </Flex>
          </div>
          <div className="cluster-details-label" data-cy="labels">
            <Text size="l">Cluster Labels</Text>
            <MetadataDisplay
              metadata={generateMetadataPair(clusterDetail?.clusterLabels)}
            />
          </div>
          <div className="cluster-details-host" data-cy="hosts">
            <Text size="l">Hosts</Text>
            {HostsTableRemote && (
              <Suspense fallback={<SquareSpinner />}>
                <HostsTableRemote columns={columns} filterByUuids={guids()} />
              </Suspense>
            )}
          </div>
        </div>
      }
    />
  );
};

export default ClusterDetails;
