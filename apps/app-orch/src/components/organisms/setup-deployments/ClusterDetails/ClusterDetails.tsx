/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { Flex, MetadataDisplay } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Drawer, Text } from "@spark-design/react";
import { generateMetadataPair } from "../../../../utils/global";
import "./ClusterDetails.scss";

const dataCy = "clusterDetails";

interface ClusterDetailsProps {
  isOpen: boolean;
  onCloseDrawer: () => void;
  cluster: cm.ClusterInfo;
}

// const HostsTableRemote = RuntimeConfig.isEnabled("INFRA")
//   ? React.lazy(async () => await import("EimUI/HostsTableRemote"))
//   : null;

// const AggregateHostStatus = RuntimeConfig.isEnabled("INFRA")
//   ? React.lazy(async () => await import("EimUI/AggregateHostStatus"))
//   : null;

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
    cm.useGetV2ProjectsByProjectNameClustersAndNameQuery(
      {
        projectName,
        name: cluster.name!,
      },
      { skip: !cluster.name || !projectName },
    );

  // const guids = (): string[] =>
  //   clusterDetail?.nodes?.reduce(
  //     (l, n) => (n.id ? [n.id, ...l] : l),
  //     [] as string[],
  //   ) ?? [];

  // const columns: SparkTableColumn<infra.HostRead>[] = [
  //   {
  //     Header: "Host Name",
  //     accessor: "name",
  //   },
  //   {
  //     Header: "Status",
  //     accessor: (item: infra.HostRead) => hostProviderStatusToString(item),
  //     Cell: (table: { row: { original: infra.HostRead } }) => (
  //       <Suspense fallback={<SquareSpinner />}>
  //         {AggregateHostStatus !== null ? (
  //           <AggregateHostStatus
  //             host={table.row.original}
  //             instance={table.row.original.instance}
  //           />
  //         ) : (
  //           "Remote Error"
  //         )}
  //       </Suspense>
  //     ),
  //   },
  //   {
  //     Header: "Serial Number",
  //     accessor: "serialNumber",
  //   },
  // ];

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
              <Text data-cy="statusValue">
                {clusterDetail?.providerStatus?.indicator}
              </Text>
            </Flex>
            <Flex cols={[4, 8]}>
              <Text data-cy="id">Cluster ID</Text>
              <Text data-cy="idValue">{clusterDetail?.name}</Text>
            </Flex>
          </div>
          <div className="cluster-details-label" data-cy="labels">
            <Text size="l">Cluster Labels</Text>
            <MetadataDisplay
              metadata={generateMetadataPair(clusterDetail?.labels)}
            />
          </div>
          <div className="cluster-details-host" data-cy="hosts">
            {/*TODO: Host Table need to be added with fix
            {HostsTableRemote && (
              <Suspense fallback={<SquareSpinner />}>
                <HostsTableRemote columns={columns} filterByUuids={guids()} />
              </Suspense>
            )}*/}
          </div>
        </div>
      }
    />
  );
};

export default ClusterDetails;
