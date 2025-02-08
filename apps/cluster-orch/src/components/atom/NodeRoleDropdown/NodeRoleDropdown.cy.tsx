/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import NodeRoleDropdown from "./NodeRoleDropdown";
import NodeRoleDropdownPom from "./NodeRoleDropdown.pom";

const pom = new NodeRoleDropdownPom();
describe("<NodeRoleDropdown/>", () => {
  it("should render component", () => {
    cy.mount(
      <NodeRoleDropdown role={"all"} onSelect={(value) => cy.stub(value)} />,
    );
    pom.root.should("exist");
  });

  it("should render default value 'all' on empty", () => {
    cy.mount(<NodeRoleDropdown role="" />);

    pom.roleDropdownPom.openDropdown(pom.root);
    pom.roleDropdownPom.selectDropdownValue(pom.root, "role", "all", "all");
    pom.root.should("exist");
  });

  it("should render options in dropdown", () => {
    cy.mount(<NodeRoleDropdown role="" />);

    pom.roleDropdownPom.openDropdown(pom.root);
    pom.roleDropdownPom.selectDropdownValue(pom.root, "role", "all", "all");

    pom.roleDropdownPom.openDropdown(pom.root);
    pom.roleDropdownPom.selectDropdownValue(
      pom.root,
      "role",
      "worker",
      "worker",
    );

    pom.roleDropdownPom.openDropdown(pom.root);
    pom.roleDropdownPom.selectDropdownValue(
      pom.root,
      "role",
      "controlplane",
      "controlplane",
    );
    pom.root.should("exist");
  });

  it("should render value as worker", () => {
    cy.mount(<NodeRoleDropdown role="worker" />);
    pom.root.should("exist");
    pom.roleDropdownPom
      .getDropdown("roleDropdown")
      .should("have.text", "Worker");
  });

  it("should render value as controlplane", () => {
    cy.mount(<NodeRoleDropdown role="controlplane" />);
    pom.root.should("exist");
    pom.roleDropdownPom
      .getDropdown("roleDropdown")
      .should("have.text", "Control Plane");
  });
});
