/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { assignedWorkloadHostOne as hostOne } from "@orch-ui/utils";
import GenericHostPopup from "./GenericHostPopup";
import GenericHostPopupPom from "./GenericHostPopup.pom";

const pom = new GenericHostPopupPom();
describe("<GenericHostPopup/>", () => {
  it("should render component", () => {
    cy.mount(<GenericHostPopup host={hostOne} />);
    pom.root.should("exist");
    pom.el.defaultPopupButton.should("exist");
  });
  it("should render component with provided text", () => {
    const displayText = "Host Action";
    cy.mount(
      <GenericHostPopup host={hostOne} jsx={<button>{displayText}</button>} />,
    );
    pom.root.should("contain.text", "Host Action");
  });
  it("should hide delete", () => {
    cy.mount(<GenericHostPopup host={hostOne} showDeleteOption={false} />);
    pom.root.should("not.contain.text", "Delete");
  });

  describe("testing popup on default props", () => {
    beforeEach(() => {
      cy.mount(<GenericHostPopup host={hostOne} />);
      pom.popupPom.root.click();
    });
    it("should not render `View Details` option", () => {
      pom.root.should("not.contain.text", "View Details");
    });
    it("should render `Delete` option", () => {
      pom.root.should("contain.text", "Delete");
    });
  });

  describe("View Details", () => {
    it("should call default host details route when `View Details` is clicked", () => {
      cy.mount(<GenericHostPopup host={hostOne} showViewDetailsOption />);
      pom.getActionPopupBySearchText("View Details").click();
      pom.getPath().should("eq", `/host/${hostOne.resourceId!}`);
    });
    it("should call onViewDetails when `View Details` is clicked", () => {
      cy.mount(
        <GenericHostPopup
          host={hostOne}
          showViewDetailsOption
          onViewDetails={cy.stub().as("onViewDetails")}
        />,
      );
      pom.getActionPopupBySearchText("View Details").click();
      cy.get("@onViewDetails").should("be.called");
    });
  });

  describe("Deauthorize and Delete", () => {
    beforeEach(() => {
      cy.mount(
        <GenericHostPopup
          host={hostOne}
          showViewDetailsOption
          onDeauthorize={cy.stub().as("onDeauthorize")}
          onDelete={cy.stub().as("onDelete")}
        />,
      );
    });
    it("should call onDeauthorize when `Deauthorize` is clicked", () => {
      pom.getActionPopupBySearchText("Deauthorize").click();
      cy.get("@onDeauthorize").should("be.called");
    });
    it("should call onDelete when `Delete` is clicked", () => {
      pom.getActionPopupBySearchText("Delete").click();
      cy.get("@onDelete").should("be.called");
    });
  });
});
