/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import Deployments from "./Deployments";
import DeploymentsPom from "./Deployments.pom";

const pom = new DeploymentsPom();
describe("<DeploymentInstanceDetail />", () => {
  it("should render empty", () => {
    pom.table.interceptApis([pom.table.api.getEmptyDeploymentsList]);
    cy.mount(<Deployments />);
    pom.table.el.empty.should("exist");
  });
  it("should render component", () => {
    pom.table.interceptApis([pom.table.api.getDeploymentsList]);
    cy.mount(<Deployments />);
    pom.waitForApis();
    pom.table.tablePom.getRows().should("have.length", 3);
  });
  it("should goto setup deployment page when list is empty", () => {
    pom.table.interceptApis([pom.table.api.getEmptyDeploymentsList]);
    cy.mount(<Deployments />);
    pom.waitForApis();
    pom.table.el.empty
      .find("[data-cy='emptyActionBtn']")
      .contains("Setup a Deployment")
      .click();
    pom.getPath().should("eq", "/deployments/setup-deployment");
  });
  it("should goto setup deployment page when table is showing data", () => {
    pom.table.interceptApis([pom.table.api.getDeploymentsList]);
    cy.mount(<Deployments />);
    pom.waitForApis();
    pom.table.el.actions.contains("Setup a Deployment").click();
    pom.getPath().should("eq", "/deployments/setup-deployment");
  });
});
