/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import { setBreadcrumb, SquareSpinner } from "@orch-ui/components";
import { parseError, SharedStorage } from "@orch-ui/utils";
import { MessageBanner } from "@spark-design/react";
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  cloneDeploymentPackageBreadcrumb,
  deploymentPackageBreadcrumb,
  homeBreadcrumb,
} from "../../../routes/const";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectDeploymentPackage,
  setDeploymentPackage,
  setDisplayName,
} from "../../../store/reducers/deploymentPackage";
import DeploymentPackageCreateEdit from "../../organisms/deploymentPackages/DeploymentPackageCreateEdit/DeploymentPackageCreateEdit";

export const dataCy = "deploymentPackageClone";

type urlParams = {
  appName: string;
  version: string;
};

const DeploymentPackageClone: React.FC = () => {
  const cy = { "data-cy": dataCy };
  const projectName = SharedStorage.project?.name ?? "";
  const { appName, version } = useParams<urlParams>();

  const dispatch = useAppDispatch();
  const deploymentPackage = useAppSelector(selectDeploymentPackage);
  const breadcrumb = useMemo(
    () => [
      homeBreadcrumb,
      deploymentPackageBreadcrumb,
      cloneDeploymentPackageBreadcrumb,
    ],
    [],
  );

  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));
  }, []);

  const {
    data: deploymentPackageResponse,
    isSuccess,
    isLoading,
    error,
  } = catalog.useCatalogServiceGetDeploymentPackageQuery(
    {
      projectName,
      deploymentPackageName: appName!,
      version: version!,
    },
    { skip: !appName || !version || !projectName },
  );

  useEffect(() => {
    if (isSuccess) {
      const ca = deploymentPackageResponse.deploymentPackage;
      dispatch(setDeploymentPackage({ ...ca, ...{ isDeployed: false } }));
      dispatch(setDisplayName(`Copy of ${ca.displayName}`));
    }
  }, [isSuccess]);

  if (isLoading || !deploymentPackage.displayName) {
    // NOTE we forcefully set the display name to start with "Copy of",
    // but we might need to wait for it
    return <SquareSpinner />;
  }

  if (!isSuccess) {
    return (
      <MessageBanner
        variant="error"
        messageTitle="Error"
        messageBody={parseError(error).data}
      />
    );
  }

  return (
    <div {...cy} className="deployment-package-clone">
      <DeploymentPackageCreateEdit mode="clone" />
    </div>
  );
};

export default DeploymentPackageClone;
