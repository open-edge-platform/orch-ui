/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import { store } from "../../../../store";
import * as deploymentPackageReducer from "../../../../store/reducers/deploymentPackage";
import DeploymentPackageProfileAddEditDrawer from "./DeploymentPackageProfileAddEditDrawer";
import DeploymentPackageProfileAddEditDrawerPom from "./DeploymentPackageProfileAddEditDrawer.pom";

const pom = new DeploymentPackageProfileAddEditDrawerPom();
describe("<DeploymentPackageProfileAddEditDrawer />", () => {
  it("should render empty form in drawer", () => {
    cy.stub(
      deploymentPackageReducer,
      "selectDeploymentPackageReferences",
    ).returns([
      {
        name: "app 1",
        version: "0.0.1",
      },
      {
        name: "app 2",
        version: "0.0.2",
      },
    ]);
    cy.mount(
      <DeploymentPackageProfileAddEditDrawer
        show
        onClose={cy.stub().as("onClose")}
      />,
      {
        reduxStore: store,
      },
    );
    pom.root.should("exist");
    cyGet("drawerContent").should("be.visible");
  });

  it("should not render drawer", () => {
    cy.mount(
      <DeploymentPackageProfileAddEditDrawer
        onClose={cy.stub()}
        show={false}
      />,
      {
        reduxStore: store,
      },
    );

    cyGet("drawerContent").should("not.be.visible");
  });
});
