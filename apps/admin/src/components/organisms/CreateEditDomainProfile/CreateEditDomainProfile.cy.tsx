/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { domain1 } from "@orch-ui/utils";
import { CreateEditDomainProfile } from "./CreateEditDomainProfile";
import CreateEditDomainProfilePom from "./CreateEditDomainProfile.pom";

const pom = new CreateEditDomainProfilePom();

describe("<CreateEditDomainProfile/>", () => {
  it("should render modal when isOpen is true", () => {
    cy.mount(
      <CreateEditDomainProfile
        isOpen={true}
        onClose={() => {}}
        isDimissable={true}
      />,
    );
    pom.root.should("exist");
  });

  it("should display form fields for create mode", () => {
    cy.mount(
      <CreateEditDomainProfile
        isOpen={true}
        onClose={() => {}}
        isDimissable={true}
      />,
    );

    pom.el.domainName.should("be.visible");
    pom.el.domainSuffix.should("be.visible");
    pom.el.certificateUpload.should("be.visible");
    pom.el.certificatePassword.should("be.visible");
    pom.el.submitDomain.should("be.visible");
  });

  it("should disable submit button when required fields are empty", () => {
    cy.mount(
      <CreateEditDomainProfile
        isOpen={true}
        onClose={() => {}}
        isDimissable={true}
      />,
    );

    pom.el.submitDomain.should("have.class", "spark-button-disabled");
  });

  it("should enable submit button after filling all required fields with certificate", () => {
    cy.mount(
      <CreateEditDomainProfile
        isOpen={true}
        onClose={() => {}}
        isDimissable={true}
      />,
    );

    pom.el.domainName.type("test-domain");
    pom.el.domainSuffix.type("example.com");
    pom.el.certificatePassword.type("password123");
    pom.el.uploadInput.selectFile("cypress/fixtures/certificate.pfx", {
      force: true,
    });

    pom.el.submitDomain.should("not.have.class", "spark-button-disabled");
  });

  it("should show selected certificate file name", () => {
    cy.mount(
      <CreateEditDomainProfile
        isOpen={true}
        onClose={() => {}}
        isDimissable={true}
      />,
    );

    pom.el.uploadInput.selectFile("cypress/fixtures/certificate.pfx", {
      force: true,
    });
    pom.el.certificateFileName.should("be.visible");
    cy.contains("Selected: certificate.pfx").should("be.visible");
  });

  it("should create domain successfully", () => {
    const onCreateEdit = cy.stub().as("onCreateEdit");
    pom.interceptApis([pom.api.createDomainSuccess]);

    cy.mount(
      <CreateEditDomainProfile
        isOpen={true}
        onClose={() => {}}
        isDimissable={true}
        onCreateEdit={onCreateEdit}
      />,
    );

    pom.el.domainName.type("new-domain");
    pom.el.domainSuffix.type("example.com");
    pom.el.certificatePassword.type("password123");
    pom.el.uploadInput.selectFile("cypress/fixtures/certificate.pfx", {
      force: true,
    });
    pom.el.submitDomain.click();

    pom.waitForApis();
    cy.get("@onCreateEdit").should("have.been.called");
  });

  it("should handle create domain error", () => {
    const onError = cy.stub().as("onError");
    pom.interceptApis([pom.api.createDomainError]);

    cy.mount(
      <CreateEditDomainProfile
        isOpen={true}
        onClose={() => {}}
        isDimissable={true}
        onError={onError}
      />,
    );

    pom.el.domainName.type("new-domain");
    pom.el.domainSuffix.type("example.com");
    pom.el.certificatePassword.type("password123");
    pom.el.uploadInput.selectFile("cypress/fixtures/certificate.pfx", {
      force: true,
    });
    pom.el.submitDomain.click();

    cy.get("@onError").should("have.been.called");
  });

  it("should handle update domain error", () => {
    const onError = cy.stub().as("onError");
    pom.interceptApis([pom.api.updateDomainError]);

    cy.mount(
      <CreateEditDomainProfile
        isOpen={true}
        onClose={() => {}}
        isDimissable={true}
        editDomain={domain1}
        onError={onError}
      />,
    );

    pom.el.domainSuffix.type("updated.com");
    pom.el.certificatePassword.type("password123");
    pom.el.uploadInput.selectFile("cypress/fixtures/certificate.pfx", {
      force: true,
    });
    pom.el.submitDomain.click();

    cy.get("@onError").should("have.been.called");
  });

  it("should close modal when cancel button is clicked", () => {
    const onClose = cy.stub().as("onClose");

    cy.mount(
      <CreateEditDomainProfile
        isOpen={true}
        onClose={onClose}
        isDimissable={true}
      />,
    );

    pom.el.cancel.click();
    cy.get("@onClose").should("have.been.called");
  });

  it("should prepopulate form fields in edit mode", () => {
    cy.mount(
      <CreateEditDomainProfile
        isOpen={true}
        onClose={() => {}}
        isDimissable={true}
        editDomain={domain1}
      />,
    );

    pom.el.domainName.should("have.value", domain1.profileName);
    pom.el.domainSuffix.should("have.value", domain1.domainSuffix);
  });

  it("should display Create heading in create mode", () => {
    cy.mount(
      <CreateEditDomainProfile
        isOpen={true}
        onClose={() => {}}
        isDimissable={true}
      />,
    );

    cy.contains("Create Domain").should("be.visible");
  });

  it("should display Edit heading in edit mode", () => {
    cy.mount(
      <CreateEditDomainProfile
        isOpen={true}
        onClose={() => {}}
        isDimissable={true}
        editDomain={domain1}
      />,
    );

    cy.contains("Edit Domain").should("be.visible");
  });
});
