/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { InfoPopup } from "./InfoPopup";
import { InfoPopupPom } from "./InfoPopup.pom";

const pom = new InfoPopupPom();
describe("<InfoPopup />", () => {
  beforeEach(() => {
    cy.mount(
      <div data-cy="outside" style={{ padding: "1rem" }}>
        <InfoPopup
          children={<p>Child</p>}
          isVisible={true}
          onHide={cy.stub().as("onHideStub")}
          sourceSelector="[data-cy='infoPopup']"
        />
      </div>,
    );
  });

  it("render component", () => {
    pom.root.should("exist").should("be.visible");
    pom.root.contains("Child");
  });

  it("can hide via button", () => {
    pom.el.okButton.click();
    cy.get("@onHideStub").should("have.been.called");
  });

  it("can hide via outside click", () => {
    cy.get("[data-cy='outside']").click();
    cy.get("@onHideStub").should("have.been.called");
  });
});
