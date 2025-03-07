/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

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
  xit("render be able to drag and drop files", () => {
    cy.mount(<DragDrop setFiles={cy.stub().as("setFiles")} />);
    pom.dragDropFile("cypress/fixtures/");
    cy.get("@setFiles").should("have.been.called");
  });
  xit("be able to use handlerError function to check files", () => {
    cy.mount(
      <DragDrop
        setFiles={cy.stub().as("setFiles")}
        handleError={cy.stub().as("handleError")}
      />,
    );
    pom.dragDropFile("cypress/fixtures/");
    cy.get("@handleError").should("have.been.called");
  });
});
