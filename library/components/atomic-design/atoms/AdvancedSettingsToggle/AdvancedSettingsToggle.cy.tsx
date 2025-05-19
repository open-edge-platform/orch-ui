/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import { AdvancedSettingsToggle } from "./AdvancedSettingsToggle";
import { AdvancedSettingsTogglePom } from "./AdvancedSettingsToggle.pom";

const pom = new AdvancedSettingsTogglePom();
describe("<AdvancedSettingsToggle/>", () => {
  it("should invoke the callback appropriately", () => {
    const changeFn = cy.stub().as("onChange");
    cy.mount(<AdvancedSettingsToggle onChange={changeFn} />);
    pom.root.should("exist");
    // NOTE we need to force as SparkIsland passes data-cy to a hidden checkbox
    pom.el.advSettingsTrue.click({ force: true });
    cy.get("@onChange").should("have.been.calledWith", true);

    pom.el.advSettingsFalse.click({ force: true });
    cy.get("@onChange").should("have.been.calledWith", false);
  });

  it("should render with the provided state", () => {
    cy.mount(<AdvancedSettingsToggle onChange={cy.stub()} value={true} />);
    pom.el.advSettingsTrue.should("be.checked");
    pom.el.advSettingsFalse.should("not.be.checked");
  });

  it("should default to false when no value prop is given", () => {
    cy.mount(<AdvancedSettingsToggle onChange={cy.stub()} />);
    pom.el.advSettingsFalse.should("be.checked");
    pom.el.advSettingsTrue.should("not.be.checked");
  });

  it("should render with a custom message", () => {
    const customMessage = "Enable advanced debug options?";
    cy.mount(<AdvancedSettingsToggle onChange={cy.stub()} message={customMessage} />);
    cy.contains(customMessage).should("exist");
  });

  it("should update checked radio after click", () => {
    cy.mount(<AdvancedSettingsToggle onChange={cy.stub()} />);
    
    pom.el.advSettingsTrue.click({ force: true });
    pom.el.advSettingsTrue.should("be.checked");
    pom.el.advSettingsFalse.should("not.be.checked");
  
    pom.el.advSettingsFalse.click({ force: true });
    pom.el.advSettingsFalse.should("be.checked");
    pom.el.advSettingsTrue.should("not.be.checked");
  });

  it("should default to false when value is undefined", () => {
    cy.mount(<AdvancedSettingsToggle value={undefined} onChange={cy.stub()} />);
    pom.el.advSettingsFalse.should("be.checked");
  });
});
