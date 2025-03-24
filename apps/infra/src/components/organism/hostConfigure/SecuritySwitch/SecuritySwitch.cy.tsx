/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { SecuritySwitch } from "./SecuritySwitch";
import { SecuritySwitchPom } from "./SecuritySwitch.pom";

const pom = new SecuritySwitchPom();
describe("<SecuritySwitch/>", () => {
  it("should set local value", () => {
    const onChange = cy.spy().as("onChange");

    cy.mount(<SecuritySwitch value={true} onChange={onChange} />);
    pom.root.should("exist");

    pom.el.securitySwitchToggle
      .siblings(".spark-toggle-switch-selector")
      .click();

    cy.get("@onChange").should("have.been.calledWith", false);
  });
});
