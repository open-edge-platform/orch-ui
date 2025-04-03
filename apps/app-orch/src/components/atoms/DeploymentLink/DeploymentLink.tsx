/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import { ApiError, SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Link } from "react-router-dom";

const dataCy = "deploymentLink";

export interface DeploymentLinkProps {
  deplId: string;
}

export const DeploymentLink = ({ deplId }: DeploymentLinkProps) => {
  const cy = { "data-cy": dataCy };

  const {
    data: deploymentResponse,
    isLoading,
    isError,
    error,
  } = adm.useDeploymentServiceGetDeploymentQuery({
    projectName: SharedStorage.project?.name ?? "",
    deplId,
  });

  if (isError) {
    return <ApiError error={error} />;
  }

  if (isLoading || !deploymentResponse) {
    return <SquareSpinner />;
  }

  const deployment = deploymentResponse.deployment;

  return (
    <Link
      {...cy}
      className="deployment-link"
      to={`/applications/deployment/${deployment?.deployId}`}
      relative="path"
    >
      {deployment?.displayName || deployment?.name}
    </Link>
  );
};
