/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import DeploymentStatusFilter from "./DeploymentStatusFilter";

describe("<DeploymentStatusFilter />", () => {
  it("should render", () => {
    cy.mount(
      <DeploymentStatusFilter
        label="test label"
        value={100}
        filterActivated={() => {}}
      />,
    );
    cy.contains("test label");
    cy.contains("100");
  });

  it("should activated state", () => {
    cy.mount(
      <DeploymentStatusFilter
        label="test label"
        value={100}
        active={true}
        filterActivated={() => {}}
      />,
    );
    cy.get(".deployments__status-search").should(
      "have.class",
      "deployments__status-search-active",
    );
  });

  it("should listen to click event", () => {
    const clickHandler = cy.spy().as("onClickSpy");
    cy.mount(
      <DeploymentStatusFilter
        label="test label"
        value={100}
        filterActivated={clickHandler}
      />,
    );
    cy.get(".deployments__status-search").click({ force: true });
    cy.get("@onClickSpy").should("have.been.calledWith", "test label");
  });
});
