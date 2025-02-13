/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { SharedStorage, WorkloadMemberKind } from "@orch-ui/utils";
import { Link } from "react-router-dom";
interface ClusterNameAssociatedToHostProps {
  host: eim.HostRead;
}
export const dataCy = "clusterNameAssociatedToHost";
const ClusterNameAssociatedToHost = ({
  host,
}: ClusterNameAssociatedToHostProps) => {
  const cy = { "data-cy": dataCy };
  const projectName = SharedStorage.project?.name ?? "";
  const instanceId = host.instance?.resourceId || "";
  const { data } =
    eim.useGetV1ProjectsByProjectNameComputeInstancesAndInstanceIdQuery(
      {
        projectName,
        instanceId,
      },
      { skip: !instanceId },
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
          to={`/infrastructure/cluster/${clusterName}`}
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
