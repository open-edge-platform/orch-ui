/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { packageOne } from "@orch-ui/utils";
import DeploymentPackageDetailsMain from "./DeploymentPackageDetailsMain";
import { DeploymentPackageDetailsMainPom } from "./DeploymentPackageDetailsMain.pom";

const pom = new DeploymentPackageDetailsMainPom();
describe("<DeploymentPackageDetailsMain />", () => {
  it("should render the component", () => {
    cy.mount(
      <DeploymentPackageDetailsMain
        deploymentPackage={{
          ...packageOne,
          isDeployed: undefined,
          isVisible: undefined,
        }}
      />,
    );
    pom.el.dpVersion.should("have.text", packageOne.version);
    pom.el.dpDefaultProfile.should("have.text", "No default profile found");
    pom.el.dpIsDeployed.should("have.text", "No");
    pom.el.dpIsVisible.should("have.text", "No");
  });

  it("should show default profile with displayName", () => {
    cy.mount(
      <DeploymentPackageDetailsMain
        deploymentPackage={{
          ...packageOne,
          profiles: [
            {
              name: "profile1",
              displayName: "Profile 1",
              applicationProfiles: {},
            },
          ],
          defaultProfileName: "profile1",
        }}
      />,
    );
    pom.el.dpDefaultProfile.should("have.text", "Profile 1");
  });

  it("should show default profile without displayName", () => {
    cy.mount(
      <DeploymentPackageDetailsMain
        deploymentPackage={{
          ...packageOne,
          profiles: [
            {
              name: "profile1",
              applicationProfiles: {},
            },
          ],
          defaultProfileName: "profile1",
        }}
      />,
    );
    pom.el.dpDefaultProfile.should("have.text", "profile1");
  });

  it("should show yes on isDeployed for deployed package", () => {
    cy.mount(
      <DeploymentPackageDetailsMain
        deploymentPackage={{
          ...packageOne,
          isDeployed: true,
        }}
      />,
    );
    pom.el.dpIsDeployed.should("have.text", "Yes");
  });
  it("should show yes on isVisible for deployed package", () => {
    cy.mount(
      <DeploymentPackageDetailsMain
        deploymentPackage={{
          ...packageOne,
          isVisible: true,
        }}
      />,
    );
    pom.el.dpIsVisible.should("have.text", "Yes");
  });
});
