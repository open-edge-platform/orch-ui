/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { SharedStorage } from "@orch-ui/utils";
import "./DeploymentUpgradeAvailabilityStatus.scss";

export const dataCy = "deploymentUpgradeAvailabilityStatus";
interface DeploymentUpgradeAvailabilityStatusProps {
  currentCompositeAppName: string;
  currentVersion: string;
}

const DeploymentUpgradeAvailabilityStatus = ({
  currentCompositeAppName,
  currentVersion,
}: DeploymentUpgradeAvailabilityStatusProps) => {
  const cy = { "data-cy": dataCy };
  const projectName = SharedStorage.project?.name ?? "";
  const { data, isError, isLoading } =
    catalog.useCatalogServiceGetDeploymentPackageVersionsQuery(
      {
        projectName,
        deploymentPackageName: currentCompositeAppName,
      },
      {
        skip: !projectName,
      },
    );

  if (isError) {
    return (
      <span
        {...cy}
        className="deployment-upgrade-availability-status not-fetched"
      >
        Upgrade not Fetched!
      </span>
    );
  } else if (isLoading) {
    return (
      <span {...cy} className="deployment-upgrade-availability-status loading">
        Checking for Upgrade...
      </span>
    );
  }

  const hasLatestVersions =
    (data?.deploymentPackages.filter(
      (compositeApp) => compositeApp.version > currentVersion,
    ).length ?? 0) > 0;

  return (
    <span {...cy}>
      {hasLatestVersions && (
        <span className="deployment-upgrade-availability-status available">
          Upgrades Available!
        </span>
      )}

      {/* Empty text: This means no upgrade is available yet. */}
      {!hasLatestVersions && ""}
    </span>
  );
};

export default DeploymentUpgradeAvailabilityStatus;
