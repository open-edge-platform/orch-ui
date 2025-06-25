/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { catalog } from "@orch-ui/apis";
import { setActiveNavItem, setBreadcrumb } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Heading } from "@spark-design/react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DeploymentPackageHelmChartInfoForm, {
  PackageInputs,
} from "src/components/organisms/deploymentPackages/DeploymentPackageHelmChartInfoForm/DeploymentPackageHelmChartInfoForm";
import {
  deploymentPackageBreadcrumb,
  homeBreadcrumb,
  importDeploymentPackageFromHelmChartBreadcrumb,
  packagesNavItem,
} from "../../../routes/const";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectDeploymentPackage } from "../../../store/reducers/deploymentPackage";

const dataCy = "deploymentPackageImportFromHelmChart";

const DeploymentPackageImportFromHelmChart = () => {
  const cy = { "data-cy": dataCy };
  const [includeAuth, setIncludeAuth] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const deploymentPackage = useAppSelector(selectDeploymentPackage);
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
  } = useForm<PackageInputs>({
    mode: "all",
    defaultValues: {
      helmChartURL: deploymentPackage.helmChartURL,
      username: deploymentPackage.username,
      password: deploymentPackage.password,
    },
  });
  const [importDeploymentPackage] = catalog.useCatalogServiceImportMutation();

  const breadcrumb = useMemo(
    () => [
      homeBreadcrumb,
      deploymentPackageBreadcrumb,
      importDeploymentPackageFromHelmChartBreadcrumb,
    ],
    [],
  );

  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));
    dispatch(setActiveNavItem(packagesNavItem));
  }, [dispatch, breadcrumb]);

  const handleImport = () => {
    const dpPayload: catalog.CatalogServiceImportApiArg = {
      url: deploymentPackage.helmChartURL,
      projectName: SharedStorage.project?.name ?? "",
    };
    if (includeAuth) {
      // auth toggle
      dpPayload.username = deploymentPackage.username;
      dpPayload.authToken = deploymentPackage.password;
    }
    importDeploymentPackage(dpPayload);
    navigate("../packages");
  };

  return (
    <div {...cy} className="deployment-package-import-from-helm-chart">
      <Heading semanticLevel={1} size="l" data-cy="title">
        Import from Helm Chart
      </Heading>
      <Heading
        semanticLevel={2}
        size="xs"
        data-cy="subTitle"
        style={{ marginBottom: "3rem" }}
      >
        Provide Helm Chart details to import a deployment
      </Heading>

      <DeploymentPackageHelmChartInfoForm
        control={control}
        errors={errors}
        handleImport={handleImport}
      />
    </div>
  );
};

export default DeploymentPackageImportFromHelmChart;
