/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { deploymentOne } from "@orch-ui/utils";
import DeploymentUpgradeAvailabilityStatus from "./DeploymentUpgradeAvailabilityStatus";
import DeploymentUpgradeAvailabilityStatusPom from "./DeploymentUpgradeAvailabilityStatus.pom";

const pom = new DeploymentUpgradeAvailabilityStatusPom();
describe("<DeploymentUpgradeAvailabilityStatus/>", () => {
  it("should render component", () => {
    cy.mount(
      <DeploymentUpgradeAvailabilityStatus
        currentCompositeAppName={deploymentOne.appName}
        currentVersion="1.0.5"
      />,
    );
    pom.waitForApis();
    pom.root.should("have.text", "Upgrade not Fetched!");
  });

  it("when the higher version upgrades are available", () => {
    pom.interceptApis([pom.api.getVersionList]);
    cy.mount(
      <DeploymentUpgradeAvailabilityStatus
        currentCompositeAppName={deploymentOne.appName}
        currentVersion="1.0.5"
      />,
    );
    pom.waitForApis();
    pom.root.should("contain.text", "Upgrades Available!");
  });

  it("when an upgrade is not available", () => {
    pom.interceptApis([pom.api.getVersionList]);
    cy.mount(
      <DeploymentUpgradeAvailabilityStatus
        currentCompositeAppName={deploymentOne.appName}
        currentVersion="1.0.9"
      />,
    );
    pom.waitForApis();
    pom.root.should("be.empty");
  });

  it("should not fail component when upgrade availability is not fetched - 500 error.", () => {
    pom.interceptApis([pom.api.getVersionError]);
    cy.mount(
      <DeploymentUpgradeAvailabilityStatus
        currentCompositeAppName={deploymentOne.appName}
        currentVersion="1.0.0"
      />,
    );
    pom.waitForApis();
    pom.root.should("contain.text", "Upgrade not Fetched!");
  });
});
