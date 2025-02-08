/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import { setBreadcrumb, SquareSpinner } from "@orch-ui/components";
import { parseError, SharedStorage } from "@orch-ui/utils";
import { MessageBanner } from "@spark-design/react";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  deploymentPackageBreadcrumb,
  editDeploymentPackageBreadcrumb,
  homeBreadcrumb,
} from "../../../routes/const";
import { useAppDispatch } from "../../../store/hooks";
import { setDeploymentPackage } from "../../../store/reducers/deploymentPackage";
import DeploymentPackageCreateEdit from "../../organisms/deploymentPackages/DeploymentPackageCreateEdit/DeploymentPackageCreateEdit";

export const dataCy = "deploymentPackageEdit";

type urlParams = {
  appName: string;
  version: string;
};

const DeploymentPackageEdit = () => {
  const cy = { "data-cy": dataCy };

  const dispatch = useAppDispatch();
  const breadcrumb = useMemo(
    () => [
      homeBreadcrumb,
      deploymentPackageBreadcrumb,
      editDeploymentPackageBreadcrumb,
    ],
    [],
  );

  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));
  }, []);

  const { appName, version } = useParams<urlParams>();
  const projectName = SharedStorage.project?.name ?? "";
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
      dispatch(setDeploymentPackage(ca));
    }
  }, [isSuccess]);

  if (isLoading) {
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
    <div {...cy} className="deployment-package-edit">
      <DeploymentPackageCreateEdit mode="update" />
    </div>
  );
};

export default DeploymentPackageEdit;
