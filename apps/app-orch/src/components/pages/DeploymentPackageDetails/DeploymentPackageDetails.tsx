/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import {
  Empty,
  setActiveNavItem,
  setBreadcrumb,
  SquareSpinner,
} from "@orch-ui/components";
import { parseError, SharedStorage } from "@orch-ui/utils";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { Button } from "@spark-design/react";
import { ButtonSize, ButtonVariant } from "@spark-design/tokens";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deploymentPackageBreadcrumb,
  homeBreadcrumb,
  packagesNavItem,
} from "../../../routes/const";
import { useAppDispatch } from "../../../store/hooks";
import DeploymentPackageDetailsHeader from "../../organisms/deploymentPackages/DeploymentPackageDetailsHeader/DeploymentPackageDetailsHeader";
import DeploymentPackageDetailsMain from "../../organisms/deploymentPackages/DeploymentPackageDetailsMain/DeploymentPackageDetailsMain";
import DeploymentPackageDetailsProfileList from "../../organisms/deploymentPackages/DeploymentPackageDetailsProfileList/DeploymentPackageDetailsProfileList";
import "./DeploymentPackageDetails.scss";

const dataCy = "deploymentPackageDetails";

type params = {
  appName: string;
  version: string;
};

const DeploymentPackageDetails = () => {
  const cy = { "data-cy": dataCy };
  const projectName = SharedStorage.project?.name ?? "";

  const { appName, version } = useParams<keyof params>();
  const dispatch = useAppDispatch();
  const breadcrumb = useMemo(
    () => [
      homeBreadcrumb,
      deploymentPackageBreadcrumb,
      { text: `${appName}`, link: "#" },
    ],
    [],
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));
    dispatch(setActiveNavItem(packagesNavItem));
  }, []);

  const { data, isLoading, isError, isSuccess, error } =
    catalog.useCatalogServiceGetDeploymentPackageQuery(
      {
        projectName,
        deploymentPackageName: appName!,
        version: version!,
      },
      { skip: !appName || !version || !projectName },
    );

  const loadingComponent = <SquareSpinner />;

  let successComponent;
  if (isSuccess && data.deploymentPackage) {
    successComponent = (
      <>
        <DeploymentPackageDetailsHeader
          deploymentPackage={data.deploymentPackage}
        />
        <DeploymentPackageDetailsMain
          deploymentPackage={data.deploymentPackage}
        />
        <DeploymentPackageDetailsProfileList
          deploymentPackage={data.deploymentPackage}
        />
      </>
    );
  }

  const getErrorComponent = (error: FetchBaseQueryError | SerializedError) => (
    <Empty
      icon="cross"
      title="Failed at fetching application details"
      subTitle={parseError(error).data}
    />
  );

  return (
    <div className="deployment-package-details" {...cy}>
      {isSuccess && successComponent}
      {isLoading && loadingComponent}
      {isError && getErrorComponent(error)}

      <div className="deployment-package-details__back-button-container">
        <hr />
        <Button
          className="deployment-package-details__back-button"
          onPress={() => navigate("/applications/packages")}
          size={ButtonSize.Large}
          variant={ButtonVariant.Secondary}
          data-cy="backButton"
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default DeploymentPackageDetails;
