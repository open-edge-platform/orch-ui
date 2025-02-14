/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import {
  duplicateIds,
  minimalTree,
} from "../../molecules/TreeBranch/TreeBranch.mocks";
import { duplicateIdsMessage, Tree } from "./Tree";
import { CyExampleTree, CySiteRegionTree } from "./Tree.mocks";
import { TreePom } from "./Tree.pom";

const pom = new TreePom();

describe("<Tree/>", () => {
  it("renders min tree", () => {
    cy.mount(<Tree branches={minimalTree} onExpand={cy.stub()} />);
    //just saying "have.length" is not sufficient, tree will have 3 items
    //but "have.length" == 2 is still technically true
    pom.branch.root.should("have.length.above", 2);
    pom.branch.root.should("have.length.below", 4);
  });

  it("displays error if duplicate ids encountered", () => {
    cy.on("uncaught:exception", (error) => {
      const dupeMessage = duplicateIdsMessage(new Set(["2", "3"]));
      return error.message.includes(dupeMessage);
    });
    cy.mount(<Tree branches={duplicateIds} />);
    pom.el.error.should("exist");
  });

  it("displays example tree", () => {
    cy.mount(<CyExampleTree />);
  });

  it("displays site region tree", () => {
    cy.viewport(600, 600);
    cy.mount(<CySiteRegionTree />);
  });
});
