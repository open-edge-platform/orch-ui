/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import ApplicationAddRegistryDrawer from "./ApplicationAddRegistryDrawer";
import ApplicationAddRegistryDrawerPom from "./ApplicationAddRegistryDrawer.pom";

const pom = new ApplicationAddRegistryDrawerPom();
describe("<ApplicationAddRegistryDrawerContent/>", () => {
  const TestComponent = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    return (
      <ApplicationAddRegistryDrawer
        isDrawerOpen={isOpen}
        setIsDrawerOpen={(isOpen: boolean) => setIsOpen(isOpen)}
      />
    );
  };

  describe("add registry", () => {
    const fillForm = () => {
      pom.el.okBtn.should("have.class", "spark-button-disabled");
      pom.el.registryNameInput.clear().type("Intel Registry");
      pom.el.okBtn.should("have.class", "spark-button-disabled");

      pom.el.locationInput.clear().type("http://www.intel-registry.com");
      pom.el.inventoryInput
        .clear()
        .type("http://www.intel-registry.com/inventory");
      pom.el.typeRadio
        .find(".spark-fieldlabel")
        .contains("Docker")
        .click({ force: true }); // To force click radio button with cypress
      cy.get(".registry-authentication-text").should(
        "contain.text",
        "Registry Authentication",
      );
      // Registry Authentication should be optional
      pom.el.okBtn.should("not.have.class", "spark-button-disabled");
      pom.el.usernameInput.clear().type("John Doe");
      pom.el.okBtn.should("not.have.class", "spark-button-disabled");
      pom.el.passwordInput.clear().type("PassWord");
      pom.el.okBtn.should("not.have.class", "spark-button-disabled");

      return {
        name: "intel-registry",
        displayName: "Intel Registry",
        rootUrl: "http://www.intel-registry.com",
        inventoryUrl: "http://www.intel-registry.com/inventory",
        type: "IMAGE",
        username: "John Doe",
        authToken: "PassWord",
      };
    };

    beforeEach(() => {
      cy.mount(<TestComponent />);

      pom.root.should("exist");
      pom.getDrawerBase().should("have.class", "spark-drawer-show");
    });

    it("should add registry", () => {
      const expectedRequest = fillForm();

      pom.interceptApis([pom.api.postRegistry]);
      pom.el.okBtn.click();
      pom.waitForApis();

      cy.get(`@${pom.api.postRegistry}`)
        .its("request.body")
        .should("deep.include", expectedRequest);
    });

    it("should not see drawer on clicking cancel button", () => {
      pom.el.cancelBtn.click();
      pom.getDrawerBase().should("have.class", "spark-drawer-hide");
    });

    it("should close the drawer on api error for adding registry", () => {
      fillForm();

      pom.interceptApis([pom.api.postRegistryError]);
      pom.el.okBtn.click();
      pom.waitForApis();
      pom.getDrawerBase().should("have.class", "spark-drawer-hide");
    });
  });

  describe("edit registry", () => {
    const expectedRequest = {
      name: "intel-registry",
      displayName: "Intel Registry",
      rootUrl: "http://www.intel-registry.com",
      inventoryUrl: "http://www.intel-registry.com/inventory",
      type: "IMAGE",
      username: "John Doe",
      authToken: "PassWord",
    };

    beforeEach(() => {
      cy.mount(
        <ApplicationAddRegistryDrawer
          editRegistryData={expectedRequest}
          isDrawerOpen={true}
          setIsDrawerOpen={() => {}}
        />,
      );
      pom.root.should("exist");
    });

    it("verify existing registry form substitutions", () => {
      // Verify existing registry details
      pom.el.registryNameInput.should(
        "have.value",
        expectedRequest.displayName,
      );

      pom.el.locationInput.should("have.value", expectedRequest.rootUrl);
      pom.el.inventoryInput.should("have.value", expectedRequest.inventoryUrl);

      pom.el.typeRadio
        .find(".type-radio-selected")
        .should(
          "contain.text",
          { HELM: "Helm", IMAGE: "Docker" }[expectedRequest.type],
        );
      pom.el.usernameInput.should("have.value", expectedRequest.username);
      pom.el.passwordInput.should("have.value", expectedRequest.authToken);
    });

    it("should render edit component", () => {
      pom.el.inventoryInput.type("/v1");
      pom.el.okBtn.should("not.have.class", "spark-button-disabled");
      pom.interceptApis([pom.api.editRegistry]);
      pom.el.okBtn.click();
      pom.waitForApis();

      cy.get(`@${pom.api.editRegistry}`)
        .its("request.body")
        .should("deep.include", {
          ...expectedRequest,
          inventoryUrl: `${expectedRequest.inventoryUrl}/v1`,
        });
    });

    describe("reset credentials", () => {
      it("should see old credentials", () => {
        // See old credentials exists
        pom.el.usernameInput.should("have.value", expectedRequest.username);
        pom.el.passwordInput.should("have.value", expectedRequest.authToken);
        pom.el.okBtn.should("not.have.class", "spark-button-disabled");
      });

      it("should perform reset password", () => {
        // Click Reset Button
        pom.el.resetPasswordBtn.click();

        pom.el.usernameInput.should("have.value", expectedRequest.username);
        pom.el.passwordInput.should("have.value", "");
        // Username and Password are optional
        pom.el.okBtn.should("not.have.class", "spark-button-disabled");
      });

      it("should reset credentials", () => {
        pom.el.resetPasswordBtn.click();
        pom.el.okBtn.should("not.have.class", "spark-button-disabled");
        // Edit to new user and password
        pom.el.usernameInput.clear().type("John John");
        pom.el.passwordInput.type("Password123");
        pom.el.okBtn.should("not.have.class", "spark-button-disabled");

        pom.interceptApis([pom.api.editRegistry]);
        pom.el.okBtn.click();
        pom.waitForApis();

        cy.get(`@${pom.api.editRegistry}`)
          .its("request.body")
          .should("deep.include", {
            ...expectedRequest,
            username: "John John",
            authToken: "Password123",
          });
      });
    });
  });
});
