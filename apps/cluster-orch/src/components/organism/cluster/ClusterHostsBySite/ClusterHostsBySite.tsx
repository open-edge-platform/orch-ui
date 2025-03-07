/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm, eim } from "@orch-ui/apis";
import { ApiError, SquareSpinner } from "@orch-ui/components";
import { RuntimeConfig, SharedStorage, SparkTableColumn } from "@orch-ui/utils";
import React, { Suspense } from "react";

interface ClusterHostsBySiteProps {
  cluster: cm.ClusterDetailInfo;
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
  } = cm.useGetV2ProjectsByProjectNameClustersAndNameQuery(
    {
      projectName,
      name: cluster.name ?? "",
    },
    {
      skip: !cluster.name || !projectName,
    },
  );

  const clusterHostNodes = clusterDetails?.nodes;
  // Consider all hostsGuids belonging to cluster
  const clusterHostGuids: string[] = [];
  clusterDetails?.nodes?.forEach((hostNode) => {
    if (hostNode.id) {
      clusterHostGuids.push(hostNode.id);
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
    (cluster.providerStatus?.indicator == "STATUS_INDICATION_IN_PROGRESS" &&
      !isClusterError)
  ) {
    return (
      <div data-cy="clusterHostBySite">
        <SquareSpinner
          message={
            cluster.providerStatus?.indicator == "STATUS_INDICATION_IN_PROGRESS"
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
