/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm } from "@orch-ui/apis";
import { ApiError, SquareSpinner, TableColumn } from "@orch-ui/components";
import { API_INTERVAL, SharedStorage } from "@orch-ui/utils";
import { Icon } from "@spark-design/react";
import { Link } from "react-router-dom";
import { NodeTableColumns } from "../../../../utils/NodeTableColumns";
import ClusterNodesTable from "../../ClusterNodesTable/ClusterNodesTable";

export const dataCy = "clusterNodesWrapper";
interface ClusterNodesWrapperProps {
  clusterName: string;
}
const ClusterNodesWrapper = ({ clusterName }: ClusterNodesWrapperProps) => {
  const cy = { "data-cy": dataCy };

  const {
    data: clusterDetail,
    isSuccess,
    isError,
    error,
    isLoading,
  } = ecm.useGetV1ProjectsByProjectNameClustersAndClusterNameQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      clusterName: clusterName,
    },
    {
      skip: !clusterName || !SharedStorage.project?.name,
      pollingInterval: API_INTERVAL,
    },
  );

  // these columns define the nodes in the cluster.
  // They are used to render information about the node
  const nodeColumns: TableColumn<ecm.NodeInfo>[] = [
    NodeTableColumns.nameWithoutLink,
    NodeTableColumns.status,
    NodeTableColumns.serial,
    NodeTableColumns.os,
    NodeTableColumns.actions((node) => (
      <Link to={`/infrastructure/host/${node.id}`}>
        <Icon icon="clipboard-forward" /> View Host Details
      </Link>
    )),
  ];

  return (
    <div {...cy} className="cluster-nodes-wrapper">
      {isSuccess &&
        clusterDetail.nodes?.nodeInfoList &&
        clusterDetail.nodes.nodeInfoList.length > 0 && (
          <ClusterNodesTable
            nodes={clusterDetail.nodes.nodeInfoList}
            columns={nodeColumns}
          />
        )}
      {isLoading && <SquareSpinner />}
      {isError && <ApiError error={error} />}
      {clusterDetail?.nodes?.nodeInfoList?.length == 0 && "No nodes available."}
    </div>
  );
};

export default ClusterNodesWrapper;
