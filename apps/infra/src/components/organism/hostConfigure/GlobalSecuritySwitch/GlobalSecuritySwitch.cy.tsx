/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { GlobalSecuritySwitch } from "./GlobalSecuritySwitch";
import { GlobalSecuritySwitchPom } from "./GlobalSecuritySwitch.pom";

const pom = new GlobalSecuritySwitchPom();
describe("<GlobalSecuritySwitch/>", () => {
  it("should set global value", () => {
    const onChange = cy.spy().as("onChange");

    cy.mount(<GlobalSecuritySwitch value={true} onChange={onChange} />);
    pom.root.should("exist");

    pom.el.globalSecuritySwitchToggle
      .siblings(".spark-toggle-switch-selector")
      .click();

    cy.get("@onChange").should("have.been.calledWith", false);
  });
});
