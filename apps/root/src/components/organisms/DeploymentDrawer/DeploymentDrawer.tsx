/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import { SquareSpinner } from "@orch-ui/components";
import { parseError, SharedStorage } from "@orch-ui/utils";
import { Drawer, MessageBanner } from "@spark-design/react";
import { useNavigate } from "react-router-dom";
import DeploymentDrawerContent from "../DeploymentDrawerContent/DeploymentDrawerContent";

const { useDeploymentServiceGetDeploymentQuery } = adm;

interface DeploymentDrawerProps {
  deploymentId?: string;
}

const dataCy = "deploymentDrawer";

const DeploymentDrawer = ({ deploymentId }: DeploymentDrawerProps) => {
  const projectName = SharedStorage.project?.name ?? "";
  const cy = { "data-cy": dataCy };
  const navigate = useNavigate();

  const {
    data: deployment,
    isLoading,
    isError,
    error,
  } = useDeploymentServiceGetDeploymentQuery(
    {
      deplId: deploymentId!,
      projectName,
    },
    { skip: !projectName || !deploymentId },
  );

  if (isLoading) {
    return <SquareSpinner {...cy} />;
  }

  if (isError) {
    return (
      <div {...cy}>
        <div data-cy="error">
          <MessageBanner
            variant="error"
            outlined={true}
            messageTitle="Not Found"
            messageBody={parseError(error).data}
          />
        </div>
      </div>
    );
  }

  if (deploymentId && !deployment) {
    throw new Error("Something went wrong, no API error and no deployment");
  }

  return (
    <div {...cy}>
      <Drawer
        show={deploymentId !== undefined}
        backdropClosable={true}
        onHide={() => navigate("/dashboard")}
        headerProps={{
          title:
            deployment?.deployment.displayName ?? deployment?.deployment.name,
        }}
        bodyContent={
          deployment ? (
            <DeploymentDrawerContent deployment={deployment.deployment} />
          ) : (
            <MessageBanner
              variant="error"
              outlined={true}
              messageTitle="Error while loading deployment"
              messageBody={parseError(error).data}
            />
          )
        }
      ></Drawer>
    </div>
  );
};

export default DeploymentDrawer;
