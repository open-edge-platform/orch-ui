/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm, eim } from "@orch-ui/apis";
import { ApiError, SquareSpinner } from "@orch-ui/components";
import { RuntimeConfig, SharedStorage, SparkTableColumn } from "@orch-ui/utils";
import React, { Suspense } from "react";

interface ClusterHostsBySiteProps {
  cluster: ecm.ClusterDetailInfo;
  /** showcase columns from Host data */
  columns: SparkTableColumn<eim.HostRead>[];
  /** show the search ribbon above the host table */
  showRibbon?: boolean;
  /** set table rows as selectable */
  selectable?: boolean;
  /** if rows are selectable, contains selected row ids */
  selectedRowsId?: {
    [key: number]: boolean;
  };
  /** this is executed on each row select action */
  onSelected?: (row: any) => void;
}

const HostsTableRemote = RuntimeConfig.isEnabled("FM")
  ? React.lazy(async () => await import("EimUI/HostsTableRemote"))
  : null;

/** Gets all Hosts belonging to a cluster after finding the site that cluster belongs */
const ClusterHostsBySite = ({
  cluster,
  columns,
  selectable,
  selectedRowsId,
  showRibbon,
  onSelected,
}: ClusterHostsBySiteProps) => {
  const projectName = SharedStorage.project?.name ?? "";
  const {
    data: clusterDetails,
    isLoading: isClusterLoading,
    isError: isClusterError,
  } = ecm.useGetV1ProjectsByProjectNameClustersAndClusterNameQuery(
    {
      projectName,
      clusterName: cluster.name ?? "",
    },
    {
      skip: !cluster.name || !projectName,
    },
  );

  const clusterHostNodes = clusterDetails?.nodes?.nodeInfoList;
  // Consider all hostsGuids belonging to cluster
  const clusterHostGuids: string[] = [];
  clusterDetails?.nodes?.nodeInfoList?.forEach((hostNode) => {
    if (hostNode.guid) {
      clusterHostGuids.push(hostNode.guid);
    }
  });

  const firstNodeIdExist =
    clusterHostNodes && clusterHostNodes.length > 0 && clusterHostNodes[0].id;

  /** This will get the site data from first host/node */
  const {
    data: firstClusterHost,
    isError: isFirstHostError,
    isLoading: isHostLoading,
  } = eim.useGetV1ProjectsByProjectNameComputeHostsAndHostIdQuery(
    {
      projectName,
      hostId: firstNodeIdExist ? (clusterHostNodes[0].id ?? "") : "",
    },
    {
      skip: !firstNodeIdExist || !projectName,
    },
  );

  if (
    isClusterLoading ||
    isHostLoading ||
    (cluster.status == "creating" && !isClusterError)
  ) {
    return (
      <div data-cy="clusterHostBySite">
        <SquareSpinner
          message={
            cluster.status == "creating"
              ? "Adding hosts to cluster..."
              : "One moment..."
          }
        />
      </div>
    );
  } else if (isClusterError) {
    return (
      <div data-cy="clusterHostBySite">
        <ApiError error="Cluster Details not loaded" />
      </div>
    );
  } else if (isFirstHostError || !firstClusterHost?.site) {
    return (
      <div data-cy="clusterHostBySite">
        <ApiError error="Hosts not loaded" />
      </div>
    );
  }

  return (
    <div data-cy="clusterHostBySite">
      {HostsTableRemote && (
        <Suspense fallback={<SquareSpinner />}>
          <HostsTableRemote
            columns={columns}
            filters={{ siteId: firstClusterHost.site }}
            filterByUuids={clusterHostGuids}
            onSelected={onSelected}
            selectedRowsId={selectedRowsId}
            selectable={selectable}
            hideRibbon={!showRibbon}
          />
        </Suspense>
      )}
    </div>
  );
};

export default ClusterHostsBySite;
