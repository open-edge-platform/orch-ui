/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import Deployments from "./Deployments";
import DeploymentsPom from "./Deployments.pom";

const pom = new DeploymentsPom();
describe("<Deployments />", () => {
  it("should render empty", () => {
    pom.deploymentTablePom.interceptApis([
      pom.deploymentTablePom.api.getEmptyDeploymentsList,
    ]);
    cy.mount(<Deployments />);
    pom.deploymentTablePom.el.empty.should("exist");
  });
  it("should render component", () => {
    pom.deploymentTablePom.interceptApis([
      pom.deploymentTablePom.api.getDeploymentsList,
    ]);
    cy.mount(<Deployments />);
    pom.waitForApis();
    pom.deploymentTablePom.tablePom.getRows().should("have.length", 5);
  });
  it("should goto setup deployment page when list is empty", () => {
    pom.deploymentTablePom.interceptApis([
      pom.deploymentTablePom.api.getEmptyDeploymentsList,
    ]);
    cy.mount(<Deployments />);
    pom.waitForApis();
    pom.deploymentTablePom.el.empty
      .find("[data-cy='emptyActionBtn']")
      .contains("Setup a Deployment")
      .click();
    pom.getPath().should("eq", "/deployments/setup-deployment");
  });
  it("should goto setup deployment page when table is showing data", () => {
    pom.deploymentTablePom.interceptApis([
      pom.deploymentTablePom.api.getDeploymentsList,
    ]);
    cy.mount(<Deployments />);
    pom.waitForApis();
    pom.deploymentTablePom.el.addDeploymentButton
      .contains("Setup a Deployment")
      .click();
    pom.getPath().should("eq", "/deployments/setup-deployment");
  });
});
