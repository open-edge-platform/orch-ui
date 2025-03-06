/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cm } from "@orch-ui/apis";
import { ApiError, SquareSpinner, TableColumn } from "@orch-ui/components";
import { API_INTERVAL, SharedStorage } from "@orch-ui/utils";
import { Icon } from "@spark-design/react";
import { Link } from "react-router-dom";
import { NodeTableColumns } from "../../../../utils/NodeTableColumns";
import ClusterNodesTable from "../../ClusterNodesTable/ClusterNodesTable";

export const dataCy = "clusterNodesWrapper";
interface ClusterNodesWrapperProps {
  name: string;
}
const ClusterNodesWrapper = ({ name }: ClusterNodesWrapperProps) => {
  const cy = { "data-cy": dataCy };

  const {
    data: clusterDetail,
    isSuccess,
    isError,
    error,
    isLoading,
  } = cm.useGetV2ProjectsByProjectNameClustersAndNameQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      name: name,
    },
    {
      skip: !name || !SharedStorage.project?.name,
      pollingInterval: API_INTERVAL,
    },
  );

  // these columns define the nodes in the cluster.
  // They are used to render information about the node
  const nodeColumns: TableColumn<cm.NodeInfo>[] = [
    NodeTableColumns.nameWithoutLink,
    NodeTableColumns.status,
    NodeTableColumns.os,
    NodeTableColumns.actions((node) => (
      <Link to={`/infrastructure/host/${node.id}`}>
        <Icon icon="clipboard-forward" /> View Host Details
      </Link>
    )),
  ];

  return (
    <div {...cy} className="cluster-nodes-wrapper">
      {isSuccess && clusterDetail.nodes && clusterDetail.nodes.length > 0 && (
        <ClusterNodesTable nodes={clusterDetail.nodes} columns={nodeColumns} />
      )}
      {isLoading && <SquareSpinner />}
      {isError && <ApiError error={error} />}
      {clusterDetail?.nodes?.length == 0 && "No nodes available."}
    </div>
  );
};

export default ClusterNodesWrapper;
