/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { TreeBranch } from "./TreeBranch";
import {
  createTreeBranchContentJSX,
  createTreeBranchProps,
  TreeBranchNode,
} from "./TreeBranch.mocks";
import { TreeBranchPom } from "./TreeBranch.pom";

const pom = new TreeBranchPom();
describe("<TreeBranch/>", () => {
  it("should render several branches", () => {
    const branchA: TreeBranchNode = { id: "1", name: "RootA" };
    const branchB: TreeBranchNode = { id: "2", name: "RootB" };

    cy.mount(
      <>
        <TreeBranch
          content={createTreeBranchContentJSX(branchA)}
          data={branchA}
          onExpand={cy.stub()}
          isRoot
        />
        <TreeBranch
          content={createTreeBranchContentJSX(branchB)}
          data={branchB}
          onExpand={cy.stub()}
          isRoot
        />
      </>,
    );
    pom.root.should("have.length", 2);
  });

  it("should render valid JSX for a branch", () => {
    const validJSX = "Valid JSX";
    cy.mount(
      <TreeBranch
        content={<div>{validJSX}</div>}
        data={{}}
        onExpand={cy.stub().as("onExpandStub")}
        isRoot
      />,
    );
    pom.el.content.contains(validJSX);
  });

  it("should tigger onExpand call when opening branch", () => {
    const validJSX = "Valid JSX";
    cy.mount(
      <TreeBranch
        content={<div>{validJSX}</div>}
        children={[createTreeBranchProps()]}
        data={{}}
        onExpand={cy.stub().as("onExpandStub")}
        isRoot
      />,
    );
    pom.treeExpander.el.expander.click();
    cy.get("@onExpandStub").should("have.been.called");
  });

  it("demo", () => {
    cy.viewport(600, 600);
    cy.mount(
      <TreeBranch
        content={
          <div
            style={{
              height: "10rem",
              display: "flex",
              alignItems: "center",
              border: "1px solid purple",
            }}
          >
            <h3 style={{ border: "1px solid red" }}>H3</h3>
          </div>
        }
        children={[createTreeBranchProps()]}
        data={{}}
        onExpand={cy.stub().as("onExpandStub")}
      />,
    );
  });
});
