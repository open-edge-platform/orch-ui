/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import { ApiError, SquareSpinner } from "@orch-ui/components";
import { Link } from "react-router-dom";

const dataCy = "deploymentLink";

export interface DeploymentLinkProps {
  deplId: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DeploymentLink = ({ deplId }: DeploymentLinkProps) => {
  const cy = { "data-cy": dataCy };

  // TODO: GetDeployment endpoint removed in multitenancy simplification
  // Returning placeholder while API is updated
  const deploymentResponse: { deployment?: adm.DeploymentRead } | undefined =
    undefined;
  const isLoading = false;
  const isError = false;
  const error = undefined;

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
