/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import AddDeploymentMeta from "./AddDeploymentMeta";
import AddDeploymentMetaPom from "./AddDeploymentMeta.pom";

const pom = new AddDeploymentMetaPom();

describe("<AddDeploymentMeta/>", () => {
  beforeEach(() => {
    cy.mount(<AddDeploymentMeta hasError={cy.stub().as("hasError")} />);
  });
  it("should render component", () => {
    pom.root.should("exist");
  });
  it("should update component", () => {
    pom.root.should("exist");
    pom.metaformPom.getNewEntryInput("Key").type("testkeyone", { force: true });

    pom.metaformPom.getNewEntryInput("Key").type("testkeyone", { force: true });

    pom.metaformPom
      .getNewEntryInput("Value")
      .type("testvalueone", { force: true });
    pom.metaformPom.el.add.click({ force: true });
    pom.metaformPom.getNewEntryInput("Key").type("testkeytwo", { force: true });

    pom.metaformPom
      .getNewEntryInput("Value")
      .type("testvaluetwo", { force: true });
    pom.root.find("input").should("have.length", 4);
  });

  it("should invoke hasError prop when the is validation error state changes", () => {
    pom.metaformPom.getNewEntryInput("Key").type("testkeyone", { force: true });

    pom.metaformPom
      .getNewEntryInput("Value")
      .type("TestvalueOne", { force: true });

    pom.metaformPom.root.should("contain.text", "Must be lower case");
    cy.get("@hasError").should("have.been.calledWith", true);

    pom.metaformPom
      .getNewEntryInput("Value")
      .clear()
      .type("test", { force: true });

    pom.metaformPom.root.should("not.contain.text", "Must be lower case");
    cy.get("@hasError").should("have.been.calledWith", false);
  });
});
