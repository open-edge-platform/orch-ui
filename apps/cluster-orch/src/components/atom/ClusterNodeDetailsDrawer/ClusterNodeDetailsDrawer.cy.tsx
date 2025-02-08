/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { hostOne } from "../../../../../../library/utils/mocks/iaas/store";
import ClusterNodeDetailsDrawer from "./ClusterNodeDetailsDrawer";
import ClusterNodeDetailsDrawerPom from "./ClusterNodeDetailsDrawer.pom";

const pom = new ClusterNodeDetailsDrawerPom();
describe("<ClusterNodeDetailsDrawer/>", () => {
  it("should render component for a specified host", () => {
    cy.mount(
      <ClusterNodeDetailsDrawer isOpen host={hostOne} onHide={() => {}} />,
    );
    pom.root.should("exist");
    pom.drawerBase.should("have.class", "spark-drawer-show");
  });
  it("should not render the component", () => {
    cy.mount(
      <ClusterNodeDetailsDrawer
        isOpen={false}
        host={hostOne}
        onHide={() => {}}
      />,
    );
    pom.drawerBase.should("have.class", "spark-drawer-hide");
  });
  it("should be closed upon close button click", () => {
    cy.mount(
      <ClusterNodeDetailsDrawer
        isOpen
        host={hostOne}
        onHide={cy.stub().as("onHide")}
      />,
    );
    pom.drawerBase.should("have.class", "spark-drawer-show");
    pom.drawerCloseButton.click();
    cy.get("@onHide").should("have.been.called");
  });
});
