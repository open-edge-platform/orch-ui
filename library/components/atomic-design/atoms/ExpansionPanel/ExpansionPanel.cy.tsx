/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExpansionPanel } from "./ExpansionPanel";
import { ExpansionPanelPom } from "./ExpansionPanel.pom";

const pom = new ExpansionPanelPom();

describe("<ExpansionPanel/>", () => {
  it("should render component closed", () => {
    cy.mount(
      <ExpansionPanel title="Title">
        <span>elements</span>
      </ExpansionPanel>,
    );
    pom.root.should("not.have.attr", "open");
  });

  it("should render component opened", () => {
    cy.mount(
      <ExpansionPanel title="Title" isOpen>
        <span>elements</span>
      </ExpansionPanel>,
    );
    pom.root.should("have.attr", "open");
  });

  it("should toggle open state on click", () => {
    cy.mount(
      <ExpansionPanel title="Title" onToggle={cy.stub().as("onToggle")}>
        <span>elements</span>
      </ExpansionPanel>,
    );
    pom.root.should("not.have.attr", "open");
    pom.toggle();
    pom.root.should("have.attr", "open");
    cy.get("@onToggle").should("be.calledWith", true);
    pom.toggle();
    pom.root.should("not.have.attr", "open");
    cy.get("@onToggle").should("be.calledWith", false);
  });
});
