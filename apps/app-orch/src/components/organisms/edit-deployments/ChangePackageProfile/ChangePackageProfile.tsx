/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm, catalog } from "@orch-ui/apis";
import { Empty, SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { MessageBanner, Text } from "@spark-design/react";
import { TextSize } from "@spark-design/tokens";
import { useEffect } from "react";
import DeploymentPackage from "../../../atoms/DeploymentPackage/DeploymentPackage";
import SelectProfilesTable from "../../setup-deployments/SelectProfileTable/SelectProfileTable";
import "./ChangePackageProfile.scss";

const dataCy = "changePackageProfile";

interface ChangePackageProfileProps {
  deployment: adm.DeploymentRead;
  selectedProfile?: catalog.DeploymentProfile;
  onProfileSelect?: (row: catalog.DeploymentProfile) => void;
  onDeploymentPackageLoaded?: (
    deploymentPackage: catalog.DeploymentPackage,
  ) => void;
}

const ChangePackageProfile = ({
  deployment,
  selectedProfile,
  onProfileSelect,
  onDeploymentPackageLoaded,
}: ChangePackageProfileProps) => {
  const cy = { "data-cy": dataCy };

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
  const deploymentProfile = deploymentPackage?.profiles?.find(
    (p) => p.name === deployment.profileName,
  );

  useEffect(() => {
    if (!selectedProfile && deploymentProfile) {
      onProfileSelect?.(deploymentProfile);
    }
  }, [deploymentProfile]);

  useEffect(() => {
    if (deploymentPackage) {
      onDeploymentPackageLoaded?.(
        deploymentPackage as catalog.DeploymentPackage,
      );
    }
  }, [deploymentPackage]);

  if (isLoading) {
    return (
      <div {...cy}>
        <SquareSpinner message="Loading package profile data..." />
      </div>
    );
  } else if (isError || !deploymentPackage) {
    return (
      <div {...cy}>
        <Empty
          icon="cube"
          title="Error in fetching Deployment Package data!"
          dataCy="drawerCaEmpty"
        />
      </div>
    );
  }

  return (
    <div {...cy} className="change-package-profile">
      <Text size={TextSize.Large}>Change Deployment Package Profile</Text>
      <DeploymentPackage
        name={deploymentPackage.name}
        version={deploymentPackage.version}
        description={deploymentPackage.description}
      />
      <MessageBanner
        messageTitle=""
        showIcon={true}
        variant="info"
        size="s"
        outlined={true}
        messageBody="Changing the deployment profile may result in change in the override values."
      />
      <SelectProfilesTable
        key="selectProfile"
        selectedPackage={deploymentPackage}
        selectedProfile={selectedProfile ?? deploymentProfile ?? undefined}
        onProfileSelect={onProfileSelect}
        showLabel={false}
      />
    </div>
  );
};

export default ChangePackageProfile;
