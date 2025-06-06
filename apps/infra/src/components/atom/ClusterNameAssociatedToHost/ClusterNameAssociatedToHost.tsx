/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import {
  API_INTERVAL,
  clusterDetailRoute,
  getInfraPath,
  SharedStorage,
  WorkloadMemberKind,
} from "@orch-ui/utils";
import { Link } from "react-router-dom";
interface ClusterNameAssociatedToHostProps {
  host: infra.HostResourceRead;
}
const dataCy = "clusterNameAssociatedToHost";
const ClusterNameAssociatedToHost = ({
  host,
}: ClusterNameAssociatedToHostProps) => {
  const cy = { "data-cy": dataCy };
  const projectName = SharedStorage.project?.name ?? "";
  const instanceId = host.instance?.resourceId || "";
  const { data } = infra.useInstanceServiceGetInstanceQuery(
    {
      projectName,
      resourceId: instanceId,
    },
    { skip: !instanceId, pollingInterval: API_INTERVAL },
  );

  const workloadMember = data?.workloadMembers?.find(
    (member) => member.kind === WorkloadMemberKind.Cluster,
  );
  const clusterName = workloadMember?.workload?.name;
  return (
    <div {...cy}>
      {clusterName ? (
        <Link
          data-cy="clusterLink"
          to={getInfraPath(clusterDetailRoute, { clusterName: clusterName })}
        >
          {clusterName}
        </Link>
      ) : (
        <span data-cy="notAssigned">Not Assigned</span>
      )}
    </div>
  );
};

export default ClusterNameAssociatedToHost;
