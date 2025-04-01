/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { registeredHostOne } from "@orch-ui/utils";
import { RegisterHostDrawer } from "./RegisterHostDrawer";
import { RegisterHostDrawerPom } from "./RegisterHostDrawer.pom";

const pom = new RegisterHostDrawerPom();
describe("<RegisterHostDrawer />", () => {
  beforeEach(() => {
    cy.mount(<RegisterHostDrawer isOpen onHide={cy.stub().as("hideDrawer")} />);
  });
  it("should render drawer component", () => {
    pom.root.should("exist");
  });
  it("should close drawer component", () => {
    pom.getCancelButton().click();
    cy.get("@hideDrawer").should("be.called");
  });
  it("should close drawer component by header close button", () => {
    pom.getHeaderCloseButton().click();
    cy.get("@hideDrawer").should("be.called");
  });

  it("should see Register button disabled", () => {
    pom.getRegisterButton().should("have.class", "spark-button-disabled");
  });
  it("should see Register button disabled when neither serial number nor UUID is entered", () => {
    pom.el.hostName.type("host-1");
    pom.getRegisterButton().should("have.class", "spark-button-disabled");
  });
  it("should see Register button enabled when valid uuid is entered", () => {
    pom.el.uuid.type("ec26b1ed-311b-0da2-5f2b-fc17f60f35e3");
    pom.getRegisterButton().should("not.have.class", "spark-button-disabled");
  });
  it("should see Register button enabled when valid serial number is entered", () => {
    pom.el.serialNumber.type("XGHDGYYD");
    pom.getRegisterButton().should("not.have.class", "spark-button-disabled");
  });
  it("should see registry button disabled invalid uuid entered", () => {
    pom.el.serialNumber.type("XGHDGYYD");
    pom.el.uuid.type("adj5a1-lk2jkj-2k3l12-lkl2kg");
    pom.getRegisterButton().should("have.class", "spark-button-disabled");
  });
  it("should see Register button enabled with valid uuid and s/n entered", () => {
    pom.el.serialNumber.type("XGHDGYYD");
    pom.el.uuid.type("4786ed8a-5f49-42f0-867d-d66bc6c07f52");
    pom.getRegisterButton().should("not.have.class", "spark-button-disabled");
  });

  it("should see drawer after register button click", () => {
    pom.el.serialNumber.type("XGHDGYYD");
    pom.el.uuid.type("4786ed8a-5f49-42f0-867d-d66bc6c07f52");
    pom.getRegisterButton().click();
    pom.el.serialNumber.should("be.empty");
    pom.el.uuid.should("be.empty");
  });
  it("should see drawer after header close button click", () => {
    pom.el.serialNumber.type("XGHDGYYD");
    pom.el.uuid.type("4786ed8a-5f49-42f0-867d-d66bc6c07f52");
    pom.getHeaderCloseButton().click();
    pom.el.serialNumber.should("be.empty");
    pom.el.uuid.should("be.empty");
  });
  it("should see drawer after header close button click", () => {
    pom.el.hostName.type("Hostname");
    pom.el.serialNumber.type("XGHDGYYD");
    pom.el.uuid.type("4786ed8a-5f49-42f0-867d-d66bc6c07f52");
    pom.getCancelButton().click();
    pom.el.hostName.should("be.empty");
    pom.el.serialNumber.should("be.empty");
    pom.el.uuid.should("be.empty");
  });

  it("should trigger callback for hiding drawer after registration", () => {
    pom.interceptApis([pom.api.postRegisterHost200]);
    cy.mount(
      <RegisterHostDrawer
        isOpen
        onHide={cy.stub().as("registerDrawerClose")}
      />,
    );
    pom.completeForm();
    pom.waitForApis();
    cy.get("@registerDrawerClose").should("be.called");
  });

  it("should call the host registration API successfully", () => {
    pom.interceptApis([pom.api.postRegisterHost200]);
    cy.mount(
      <RegisterHostDrawer
        isOpen
        onHide={cy.stub().as("registerDrawerClose")}
      />,
    );
    pom.completeForm();
    pom.waitForApis((alias: string) => {
      expect(alias).to.eq("@postRegisterHost200");
    });
  });

  it("should call the host registration API successfully when only serial number and name is entered", () => {
    pom.interceptApis([pom.api.postRegisterHost200]);
    cy.mount(
      <RegisterHostDrawer
        isOpen
        onHide={cy.stub().as("registerDrawerClose")}
      />,
    );
    pom.el.hostName.type("Hostname");
    pom.el.serialNumber.type("XGHDGYYD");
    pom.getRegisterButton().click();

    cy.get(`@${pom.api.postRegisterHost200}`)
      .its("request.body")
      .should("deep.include", {
        name: "Hostname",
        serialNumber: "XGHDGYYD",
      });
  });

  it("should call the host registration API successfully when only uuid and name is entered", () => {
    pom.interceptApis([pom.api.postRegisterHost200]);
    cy.mount(
      <RegisterHostDrawer
        isOpen
        onHide={cy.stub().as("registerDrawerClose")}
      />,
    );
    pom.el.hostName.type("Hostname");
    pom.el.uuid.type("4786ed8a-5f49-42f0-867d-d66bc6c07f52");
    pom.getRegisterButton().click();

    cy.get(`@${pom.api.postRegisterHost200}`)
      .its("request.body")
      .should("deep.include", {
        name: "Hostname",
        serialNumber: "",
        uuid: "4786ed8a-5f49-42f0-867d-d66bc6c07f52",
      });
  });

  it("should call the update(PATCH) host registration API successfully", () => {
    cy.intercept(
      "PATCH",
      `**/compute/hosts/${registeredHostOne.resourceId}/register`,
      cy.spy().as("patchRegisteredHost"),
    );
    cy.mount(
      <RegisterHostDrawer
        host={registeredHostOne}
        isOpen
        onHide={cy.stub().as("registerDrawerClose")}
      />,
    );
    pom.el.confirmButton.click();
    cy.get("@patchRegisteredHost").should("have.been.called");
  });
});
