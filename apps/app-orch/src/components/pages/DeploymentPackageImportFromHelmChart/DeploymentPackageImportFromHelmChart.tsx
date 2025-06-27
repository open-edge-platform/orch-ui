/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { setActiveNavItem, setBreadcrumb } from "@orch-ui/components";
import { Heading } from "@spark-design/react";
import { useEffect, useMemo } from "react";
import DeploymentPackageHelmChartInfoForm from "src/components/organisms/deploymentPackages/DeploymentPackageHelmChartInfoForm/DeploymentPackageHelmChartInfoForm";
import {
  deploymentPackageBreadcrumb,
  homeBreadcrumb,
  importDeploymentPackageFromHelmChartBreadcrumb,
  packagesNavItem,
} from "../../../routes/const";
import { useAppDispatch } from "../../../store/hooks";

const dataCy = "deploymentPackageImportFromHelmChart";

const DeploymentPackageImportFromHelmChart = () => {
  const cy = { "data-cy": dataCy };
  const dispatch = useAppDispatch();

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

      <DeploymentPackageHelmChartInfoForm />
    </div>
  );
};

export default DeploymentPackageImportFromHelmChart;
