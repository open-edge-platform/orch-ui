/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { SharedStorage } from "@orch-ui/utils";
import "./DeploymentUpgradeAvailabilityStatus.scss";

const dataCy = "deploymentUpgradeAvailabilityStatus";
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
 // Function to compare two version strings
  const compareVersions = (a: string, b: string): number => {
    const aParts = a.split(".");
    const bParts = b.split(".");
    const maxLen = Math.max(aParts.length, bParts.length);

    for (let i = 0; i < maxLen; i++) {
      const aNum = parseInt(aParts[i] ?? "0", 10);
      const bNum = parseInt(bParts[i] ?? "0", 10);

      if (aNum > bNum) return 1;
      if (aNum < bNum) return -1;
    }

    return 0;
  };
 // Check if there are any versions greater than the current version
  const hasLatestVersions =
    (data?.deploymentPackages.filter(
      (compositeApp) => compareVersions(compositeApp.version, currentVersion) > 0,
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
