/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { packageOne } from "@orch-ui/utils";
import DeploymentPackageDetailsAppProfileList from "../DeploymentPackageDetailsAppProfileList/DeploymentPackageDetailsAppProfileList";
import DeploymentPackageDetailsAppProfileListPom from "./DeploymentPackageDetailsAppProfileList.pom";

const pom = new DeploymentPackageDetailsAppProfileListPom();
describe("<DeploymentPackageDetailsAppProfileList />", () => {
  beforeEach(() => {
    cy.mount(
      <DeploymentPackageDetailsAppProfileList
        deploymentPackage={packageOne}
        deploymentPackageProfile={packageOne.profiles![0]}
      />,
    );
  });
  it("should render component", () => {
    pom.root.should("exist");
  });
  it("should show an application with a profile", () => {
    pom.appProfileTableUtils
      .getRowBySearchText("postgres")
      .should("contain.text", "custom-profile");
  });
  it("should show an application with no profile", () => {
    pom.appProfileTableUtils
      .getRowBySearchText("nginx")
      .should("contain.text", "Application is not provided with a profile.");
  });

  it("should show only empty when no application are present", () => {
    cy.mount(
      <DeploymentPackageDetailsAppProfileList
        deploymentPackage={{
          ...packageOne,
          applicationReferences: [],
        }}
        deploymentPackageProfile={packageOne.profiles![0]}
      />,
    );
    pom.emptyPom.root.should("exist");
    pom.appProfileTablePom.root.should("not.exist");
  });

  it("should show only empty when application are present but no profiles are mentioned ", () => {
    cy.mount(
      <DeploymentPackageDetailsAppProfileList
        deploymentPackage={{
          ...packageOne,
        }}
        deploymentPackageProfile={{
          ...packageOne.profiles![0],
          applicationProfiles: {},
        }}
      />,
    );
    pom.emptyPom.root.should("exist");
    pom.appProfileTablePom.root.should("not.exist");
  });
});
