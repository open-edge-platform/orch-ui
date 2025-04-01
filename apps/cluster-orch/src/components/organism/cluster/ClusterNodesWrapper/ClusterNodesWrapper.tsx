/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { ApiError, SquareSpinner } from "@orch-ui/components";
import { API_INTERVAL, SharedStorage } from "@orch-ui/utils";
import ClusterNodesTable from "../../ClusterNodesTable/ClusterNodesTable";

const dataCy = "clusterNodesWrapper";
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

  return (
    <div {...cy} className="cluster-nodes-wrapper">
      {isSuccess && clusterDetail.nodes && clusterDetail.nodes.length > 0 && (
        <ClusterNodesTable
          nodes={clusterDetail.nodes}
          readinessType="cluster"
          filterOn="resourceId"
        />
      )}
      {isLoading && <SquareSpinner />}
      {isError && <ApiError error={error} />}
      {clusterDetail?.nodes?.length == 0 && "No nodes available."}
    </div>
  );
};

export default ClusterNodesWrapper;
