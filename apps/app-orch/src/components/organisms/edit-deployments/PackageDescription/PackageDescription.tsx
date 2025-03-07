/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm, catalog } from "@orch-ui/apis";
import { Empty, SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";

const PackageDescription = ({ deployment }: { deployment: adm.Deployment }) => {
  const projectName = SharedStorage.project?.name ?? "";
  const {
    data: deploymentPackageData,
    isLoading,
    isError,
  } = catalog.useCatalogServiceGetDeploymentPackageQuery(
    {
      projectName,
      deploymentPackageName: deployment.appName,
      version: deployment.appVersion,
    },
    {
      skip: !projectName,
    },
  );

  const deploymentPackage = deploymentPackageData?.deploymentPackage;

  if (isLoading) {
    return (
      <div data-cy="packageDescriptionText">
        <SquareSpinner message="Loading description..." />
      </div>
    );
  } else if (isError || !deploymentPackage) {
    return (
      <div data-cy="packageDescriptionText">
        <Empty
          icon="cube"
          title="Error in fetching Deployment Package data!"
          dataCy="drawerCaEmpty"
        />
      </div>
    );
  }

  return (
    <div data-cy="packageDescriptionText">
      {deploymentPackage.description || "No Description provided!"}
    </div>
  );
};

export default PackageDescription;
