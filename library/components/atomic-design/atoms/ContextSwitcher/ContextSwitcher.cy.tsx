/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ContextSwitcher } from "./ContextSwitcher";
import { ContextSwitcherPom } from "./ContextSwitcher.pom";

const pom = new ContextSwitcherPom();
describe("<ContextSwitcher/>", () => {
  const tabButtons = ["Item1", "Item2", "Item3"];
  beforeEach(() => {
    cy.mount(<ContextSwitcher tabButtons={tabButtons} defaultName="Item3" />);
  });
  it("should render component", () => {
    pom.root.should("exist");

    // Check if buttons exist
    pom.getTabButton("Item1");
    pom.getTabButton("Item2");
    pom.getTabButton("Item3");
  });
  it("should render default tab", () => {
    pom.getActiveTab().should("contain.text", "Item3");
  });
  it("should select an item", () => {
    pom.getTabButton("Item2").click();
    pom.getActiveTab().should("contain.text", "Item2");
  });
});
