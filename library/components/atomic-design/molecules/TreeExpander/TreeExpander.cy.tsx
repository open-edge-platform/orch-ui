/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { expandedLeafMessage, TreeExpander } from "./TreeExpander";
import { TreeExpanderPom } from "./TreeExpander.pom";
const pom = new TreeExpanderPom();
describe("<TreeExpander/>", () => {
  it("should render component", () => {
    cy.mount(
      <TreeExpander
        isLeaf={false}
        isRoot={false}
        onExpand={cy.stub()}
        height={0}
      />,
    );
    pom.root.should("be.visible");
  });

  it("displays the horizontal connector", () => {
    cy.mount(
      <TreeExpander
        isRoot={false}
        isLeaf={false}
        onExpand={cy.stub()}
        height={0}
      />,
    );
    pom.el.horizontalConnector.should("be.visible");
  });

  it("does not display the horizontal connector", () => {
    cy.mount(
      <TreeExpander
        isRoot={false}
        isLeaf={true}
        onExpand={cy.stub().as("onExpandStub")}
        height={0}
      />,
    );
    pom.el.horizontalConnector.should("not.exist");
  });

  it("throws error when is both isExpanded & isLeaf", () => {
    cy.on("uncaught:exception", (error) => {
      return !error.message.includes(expandedLeafMessage);
    });
    cy.mount(
      <TreeExpander
        isLeaf={true}
        isExpanded={true}
        onExpand={cy.stub().as("onExpandStub")}
        height={0}
      />,
    );
  });

  it("shows correct icon when expanded", () => {
    cy.mount(
      <TreeExpander
        isLeaf={false}
        isExpanded={true}
        onExpand={cy.stub().as("onExpandStub")}
        height={0}
      />,
    );
    pom.el.expander.click();
    cy.get("@onExpandStub").should("have.been.called");
    pom.el.expander.should("have.class", "tree-expander__icon--expanded");
  });
});
