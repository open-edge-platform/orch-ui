/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  registeredHostFiveIdle,
  registeredHostFourError,
  registeredHostOne,
} from "@orch-ui/utils";
import RegisteredHostPopup, {
  RegisteredHostPopupProps,
} from "./RegisteredHostPopup";
import RegisteredHostPopupPom from "./RegisteredHostPopup.pom";

const pom = new RegisteredHostPopupPom();
describe("<RegisteredHostPopup />", () => {
  beforeEach(() => {
    const props: RegisteredHostPopupProps = {
      host: registeredHostOne,
      onEdit: cy.stub().as("onEditStub"),
      onOnboard: cy.stub().as("onOnboardStub"),
      onViewDetails: cy.stub().as("onViewDetailsStub"),
      onDelete: cy.stub().as("onDeleteStub"),
      onDeauthorize: cy.stub().as("onDeauthorizeStub"),
    };
    cy.mount(<RegisteredHostPopup {...props} showViewDetailsOption />);
    pom.root.click();
  });

  it("should not show `View Details`", () => {
    cy.mount(
      <RegisteredHostPopup
        host={registeredHostOne}
        jsx={<button>Host Actions</button>}
      />,
    );
    pom.root.click();
    pom.hostPopupPom
      .getActionPopupBySearchText("View Details")
      .should("not.exist");
  });

  it("should call `onOnboard`", () => {
    pom.hostPopupPom.getActionPopupBySearchText("Onboard").click();
    cy.get("@onOnboardStub").should("be.called");
  });
  it("should call `onEditStub`", () => {
    pom.hostPopupPom.getActionPopupBySearchText("Edit").click();
    cy.get("@onEditStub").should("be.called");
  });

  it("should call `onViewDetails`", () => {
    pom.hostPopupPom.getActionPopupBySearchText("View Details").click();
    cy.get("@onViewDetailsStub").should("be.called");
  });
  it("should call `onDeleteStub`", () => {
    pom.hostPopupPom.getActionPopupBySearchText("Delete").click();
    cy.get("@onDeleteStub").should("be.called");
  });
  it("should call `onDeauthorizeStub`", () => {
    pom.hostPopupPom.getActionPopupBySearchText("Deauthorize").click();
    cy.get("@onDeauthorizeStub").should("be.called");
  });

  describe("Registered Host error drawer", () => {
    it("should not render View Error when there is no registration error", () => {
      const props: RegisteredHostPopupProps = {
        host: registeredHostFiveIdle,
      };
      cy.mount(<RegisteredHostPopup {...props} />);
      pom.root.click();
      pom.hostPopupPom
        .getActionPopupBySearchText("View Error")
        .should("not.exist");
    });

    it("should render when registrationStatus indicator is STATUS_INDICATION_ERROR (for any registration error)", () => {
      const props: RegisteredHostPopupProps = {
        host: registeredHostFourError,
      };
      cy.mount(<RegisteredHostPopup {...props} />);
      pom.root.click();

      pom.hostPopupPom.getActionPopupBySearchText("View Error").click();

      pom.el.hostRegisterErrorDrawer.should("exist");
      pom.el.hostRegisterErrorDrawer.contains(
        registeredHostFourError.registrationStatus!,
      );
      pom.el.footerOkButton.should("exist");
      pom.el.footerOkButton.click();
      pom.el.hostRegisterErrorDrawer.should("not.exist");
    });
  });
});
