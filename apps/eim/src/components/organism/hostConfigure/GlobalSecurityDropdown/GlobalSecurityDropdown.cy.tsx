/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { GlobalSecurityDropdown } from "./GlobalSecurityDropdown";
import { GlobalSecurityDropdownPom } from "./GlobalSecurityDropdown.pom";

const pom = new GlobalSecurityDropdownPom();
describe("<GlobalSecurityDropdown/>", () => {
  it("should set global value", () => {
    const onChange = cy.spy().as("onChange");

    cy.mount(<GlobalSecurityDropdown onSelectionChange={onChange} />);
    pom.root.should("exist");

    pom.dropdown.openDropdown(pom.root);
    pom.dropdown.selectDropdownValue(
      pom.root,
      "globalSecurity",
      "Disable All",
      "SECURITY_FEATURE_NONE",
    );

    cy.get("@onChange").should("have.been.calledWith", "SECURITY_FEATURE_NONE");
  });
});
