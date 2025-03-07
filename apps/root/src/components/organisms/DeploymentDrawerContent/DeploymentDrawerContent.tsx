/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import { useState } from "react";
import DeploymentSummary from "../../molecules/DeploymentSummary/DeploymentSummary";

export const dataCy = "deploymentDrawerContent";

interface DeploymentDrawerContentProps {
  deployment: adm.Deployment;
}

/**
 * This component is only responsible to determine whether
 * to render the overall deployment information
 * or the information specific to a cluster
 */
const DeploymentDrawerContent = ({
  deployment,
}: DeploymentDrawerContentProps) => {
  const cy = { "data-cy": dataCy };
  const [deploymentClusterId] = useState<string>();
  return (
    <div {...cy}>
      {deploymentClusterId ? (
        <div>Deployment Instance details</div>
      ) : (
        <DeploymentSummary deployment={deployment} />
      )}
    </div>
  );
};

export default DeploymentDrawerContent;
