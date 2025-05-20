/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import { DragDrop } from "./DragDrop";
import { DragDropPom } from "./DragDrop.pom";

const pom = new DragDropPom("dragDropArea");
describe("<DragDrop/> should", () => {
  it("render children correctly", () => {
    cy.mount(
      <DragDrop setFiles={cy.stub().as("setFiles")}>
        <p>Testing drag and drop child</p>
      </DragDrop>,
    );
    cy.contains("Testing drag and drop child");
  });
  it("render be able to drag and drop files", () => {
    cy.mount(<DragDrop setFiles={cy.stub().as("setFiles")} />);
    pom.dragDropFile("../cypress/fixtures/");
    cy.get("@setFiles").should("have.been.called");
  });
  it("be able to use handlerError function to check files", () => {
    cy.mount(
      <DragDrop
        setFiles={cy.stub().as("setFiles")}
        handleError={cy.stub().as("handleError")}
      />,
    );
    pom.dragDropFile("../cypress/fixtures/");
    cy.get("@handleError").should("have.been.called");
  });
  it("be able to use handleSingleFile function", () => {
    cy.mount(<DragDrop handleSingleFile={cy.stub().as("handleSingleFile")} />);
    pom.dragDropFile("../cypress/fixtures/");
    cy.get("@handleSingleFile").should("have.been.called");
  });
  it("have correct data-cy attribute", () => {
    cy.mount(<DragDrop dataCy="customDrop" />);
    cyGet("customDrop").should("exist");
  });
  it("not fail if no setFiles are provided", () => {
    cy.mount(<DragDrop />);
    pom.dragDropFile("../cypress/fixtures/");
    cyGet("dragDropArea").should("exist");
  });
});
