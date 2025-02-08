/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { SecurityDropdown, SecurityOptions } from "./SecurityDropdown";
import { SecurityDropdownPom } from "./SecurityDropdownPom";

const pom = new SecurityDropdownPom();
describe("<SecurityDropdown/>", () => {
  it("should set local value", () => {
    const options: SecurityOptions = [["test", "Test"]];
    const onChange = cy.spy().as("onChange");

    cy.mount(
      <SecurityDropdown options={options} onSelectionChange={onChange} />,
    );
    pom.root.should("exist");

    pom.dropdown.openDropdown(pom.root);
    pom.dropdown.selectDropdownValue(pom.root, "security", "Test", "test");

    cy.get("@onChange").should("have.been.calledWith", "test");
  });
});
