/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

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
});
