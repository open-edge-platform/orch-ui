/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import {
  registeredHostFiveIdle,
  registeredHostFourError,
  unconfiguredHostOne,
} from "@orch-ui/utils";
import {
  RegisteredHostsPopup,
  RegisteredHostsPopupProps,
} from "./RegisteredHostsPopup";
import { RegisteredHostsPopupPom } from "./RegisteredHostsPopup.pom";

const pom = new RegisteredHostsPopupPom();
describe("<RegisteredHostsPopup/>", () => {
  beforeEach(() => {
    const props: RegisteredHostsPopupProps = {
      host: unconfiguredHostOne,
      onEdit: cy.stub().as("onEditStub"),
      onOnboard: cy.stub().as("onOnboardStub"),
      onViewDetails: cy.stub().as("onViewDetailsStub"),
    };
    cy.mount(<RegisteredHostsPopup {...props} showViewDetailsOption />);
  });

  describe("during deletion flow", () => {
    it("should show the deletion dialog", () => {
      pom.root.click();
      pom.el.Delete.click();
      pom.getDialog().should("be.visible");
    });

    it("should clear the deletion dialog", () => {
      pom.root.click();
      pom.el.Delete.click();
      pom.cancelDialog();
      pom.getDialog().should("not.exist");
    });

    it("should make API request to delete", () => {
      pom.interceptApis([pom.api.deleteHostSuccessMocked]);
      pom.root.click();
      pom.el.Delete.click();
      pom.confirmDialog();
      pom.waitForApis();
      pom.getDialog().should("not.exist");
    });
  });

  describe("during deauthorize flow", () => {
    it("should show the deauthorize dialog", () => {
      pom.root.click();
      pom.el.Deauthorize.click();
      pom.getDialog().should("be.visible");
    });

    it("should clear the dauthorize dialog", () => {
      pom.root.click();
      pom.el.Deauthorize.click();
      pom.cancelDialog();
      pom.getDialog().should("not.exist");
    });

    it("should make API request to deauthorize", () => {
      pom.interceptApis([pom.api.deauthorizeHostSuccessMocked]);
      pom.root.click();
      pom.el.Deauthorize.click();
      pom.confirmDialog();
      pom.waitForApis();
      pom.getDialog().should("not.exist");
    });
  });

  describe("during call back selections", () => {
    it("should call the edit callback", () => {
      pom.root.click();
      pom.el.Edit.click();
      cy.get("@onEditStub").should("have.been.called");
    });

    it("should call the view details callback", () => {
      pom.root.click();
      pom.el["View Details"].click();
      cy.get("@onViewDetailsStub").should("have.been.called");
    });

    it("should call the edit callback", () => {
      pom.root.click();
      pom.el.Onboard.click();
      cy.get("@onOnboardStub").should("have.been.called");
    });
  });

  describe("popmenu should", () => {
    it("should not render View Error when there is no registration error ", () => {
      const props: RegisteredHostsPopupProps = {
        host: registeredHostFiveIdle,
        onEdit: cy.stub().as("onEditStub"),
        onOnboard: cy.stub().as("onOnboardStub"),
      };
      cy.mount(<RegisteredHostsPopup {...props} />);
      pom.root.click();
      pom.el["View Error"].should("not.exist");
    });
  });

  describe("Host register Error drawer", () => {
    it("should render when registrationStatus indicator is STATUS_INDICATION_ERROR (registration error)", () => {
      const props: RegisteredHostsPopupProps = {
        host: registeredHostFourError,
        onEdit: cy.stub().as("onEditStub"),
        onOnboard: cy.stub().as("onOnboardStub"),
      };
      cy.mount(<RegisteredHostsPopup {...props} />);
      pom.root.click();
      pom.el["View Error"].click();
      pom.el.hostRegisterErrorDrawer.should("exist");
      pom.el.hostRegisterErrorDrawer.contains(
        `${registeredHostFourError.registrationStatus?.message}`,
      );
      pom.el.footerOkButton.should("exist");
      pom.el.footerOkButton.click();
      pom.el.hostRegisterErrorDrawer.should("not.exist");
    });
  });
});
