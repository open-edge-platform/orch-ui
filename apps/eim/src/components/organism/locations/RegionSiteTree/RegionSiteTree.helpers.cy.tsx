/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  handleAddSiteAction,
  handleSubRegionAction,
  handleViewRegionAction,
} from "./RegionSiteTree.handlers";

describe("<RegionSiteTree/> helpers", () => {
  it("handle view action", () => {
    handleViewRegionAction(cy.stub().as("dispatchStub"), {});
    cy.get("@dispatchStub").should("not.be.called");
  });

  it("handle add action", () => {
    handleAddSiteAction(cy.stub().as("navigateStub"), {
      name: "Region-1",
      resourceId: "1",
    });
    cy.get("@navigateStub").should(
      "be.calledWith",
      "../regions/1/sites/new?source=region",
    );
  });

  it("handle sub region action", () => {
    handleSubRegionAction(cy.stub().as("navigateStub"), {
      name: "Region-1",
      resourceId: "1",
    });
    cy.get("@navigateStub").should("be.calledWith", "../regions/parent/1/new");
  });
});
