/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { deploymentOne } from "@orch-ui/utils";
import DeploymentDrawer from "./DeploymentDrawer";
import { DeploymentDrawerPom } from "./DeploymentDrawer.pom";

const pom = new DeploymentDrawerPom();
describe("<DeploymentDrawer/>", () => {
  describe("when the deployment is not found", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getDeployment404]);
      cy.mount(<DeploymentDrawer deploymentId="fake-deployment" />);
      pom.waitForApis();
    });
    it("should render an error message", () => {
      pom.el.error.should("be.visible");
    });
  });
  describe("when the deployment is found", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getDeployment]);
      cy.mount(<DeploymentDrawer deploymentId="existing-deployment" />);
      pom.waitForApis();
    });
    describe("when the drawer is closed", () => {
      it("should redirect to the dashboard", () => {
        cy.mount(<DeploymentDrawer deploymentId="fake-deployment" />);
        pom.root.should("exist");
        pom.drawerPom.clickBackdrop();
        pom.getPath().should("eq", "/dashboard");
      });
    });

    it("should render the deployment name", () => {
      pom.drawerPom.title.should("have.text", deploymentOne.displayName);
    });

    it("should render the DeploymentDrawerContent component", () => {
      pom.el.deploymentDrawerContent.should("be.visible");
    });
  });
});
