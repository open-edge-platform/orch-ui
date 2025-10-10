/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import { osUbuntu } from "@orch-ui/utils";
import CreateOsUpdatePolicyDrawer from "./CreateOsUpdatePolicyDrawer";
import { CreateOsUpdatePolicyDrawerPom } from "./CreateOsUpdatePolicyDrawer.pom";

const pom = new CreateOsUpdatePolicyDrawerPom();

describe("<CreateOsUpdatePolicyDrawer/>", () => {
  let mockProps: any;

  beforeEach(() => {
    // Create fresh stubs for each test
    mockProps = {
      showDrawer: true,
      setShowDrawer: cy.stub(),
      onPolicyCreated: cy.stub(),
      showToast: cy.stub(),
    };
  });

  describe("Basic Functionality", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getOperatingSystems]);
      cy.mount(<CreateOsUpdatePolicyDrawer {...mockProps} />);
      pom.waitForApis();
    });

    it("should render drawer component", () => {
      pom.root.should("exist");
      cy.contains("Create OS Update Policy").should("exist");
    });

    it("should show required fields", () => {
      pom.el.name.should("exist");
      pom.el.description.should("exist");
      pom.el.osType.should("exist");
      pom.el.updatePolicy.should("exist");
    });

    it("should have default values set", () => {
      // OS Type should default to Mutable
      pom.el.osType.should("contain", "Mutable OS");
      // Update Policy should default to Latest
      pom.el.updatePolicy.should("contain", "Update To Latest");
    });
  });

  describe("Form Validation", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getOperatingSystems]);
      cy.mount(<CreateOsUpdatePolicyDrawer {...mockProps} />);
      pom.waitForApis();
    });

    it("should show validation error for empty name", () => {
      cy.get('[data-cy="addBtn"]').click();
      cy.contains("Name is required").should("exist");
    });

    it("should validate name length", () => {
      const longName = "a".repeat(51);
      cy.get('[data-cy="name"]').type(longName);
      cy.get('[data-cy="addBtn"]').click();
      cy.contains("Name must be less than 50 characters").should("exist");
    });

    // it("should validate package names format", () => {
    //   // Switch to Mutable OS and Update To Target to show package field
    //   pom.selectOsType("OS_TYPE_MUTABLE");
    //   pom.selectUpdatePolicy("UPDATE_POLICY_TARGET");

    //   // Enter invalid package name with version
    //   cy.get('[data-cy="installPackages"]').type("package=1.0.0");
    //   cy.get('[data-cy="addBtn"]').click();

    //   cy.contains(
    //     "Package names should not contain version information",
    //   ).should("exist");
    // });

    it("should validate update sources format", () => {
      // Switch to Mutable OS and Update To Target
      pom.selectOsType("OS_TYPE_MUTABLE");
      pom.selectUpdatePolicy("UPDATE_POLICY_TARGET");

      // Enter invalid source format
      cy.get('[data-cy="updateSources"]').type("invalid-source-format");
      cy.get('[data-cy="addBtn"]').click();

      cy.contains("Repository sources must start with 'deb'").should("exist");
    });
  });

  describe("Conditional Field Rendering", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getOperatingSystems]);
      cy.mount(<CreateOsUpdatePolicyDrawer {...mockProps} />);
      pom.waitForApis();
    });

    it("should hide advanced fields for Mutable OS with Update To Latest", () => {
      pom.selectOsType("OS_TYPE_MUTABLE");
      pom.selectUpdatePolicy("UPDATE_POLICY_LATEST");

      // Advanced fields should not be visible
      cyGet("kernelCommand").should("not.exist");
      cyGet("installPackages").should("not.exist");
      cyGet("updateSources").should("not.exist");
      cyGet("targetOs").should("not.exist");
    });

    it("should show advanced fields for Mutable OS with Update To Target", () => {
      pom.selectOsType("OS_TYPE_MUTABLE");
      pom.selectUpdatePolicy("UPDATE_POLICY_TARGET");

      // Advanced fields should be visible
      cyGet("kernelCommand").should("exist");
      cyGet("installPackages").should("exist");
      cyGet("updateSources").should("exist");
      cyGet("targetOs").should("not.exist");
    });

    it("should show target OS field for Immutable OS with Update To Target", () => {
      pom.selectOsType("OS_TYPE_IMMUTABLE");
      pom.selectUpdatePolicy("UPDATE_POLICY_TARGET");

      // Target OS field should be visible
      cyGet("targetOs").should("exist");
      // Advanced fields should not be visible
      cyGet("kernelCommand").should("not.exist");
      cyGet("installPackages").should("not.exist");
      cyGet("updateSources").should("not.exist");
    });

    it("should hide all advanced fields for Immutable OS with Update To Latest", () => {
      pom.selectOsType("OS_TYPE_IMMUTABLE");
      pom.selectUpdatePolicy("UPDATE_POLICY_LATEST");

      // No advanced fields should be visible
      cyGet("kernelCommand").should("not.exist");
      cyGet("installPackages").should("not.exist");
      cyGet("updateSources").should("not.exist");
      cyGet("targetOs").should("not.exist");
    });
  });

  describe("Field Reset Functionality", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getOperatingSystems]);
      cy.mount(<CreateOsUpdatePolicyDrawer {...mockProps} />);
      pom.waitForApis();
    });

    it("should reset fields when OS type changes", () => {
      // Fill in some data
      pom.el.name.type("Test Policy");
      pom.el.description.type("Test Description");

      // Switch to show advanced fields
      pom.selectOsType("OS_TYPE_MUTABLE");
      pom.selectUpdatePolicy("UPDATE_POLICY_TARGET");
      pom.el.kernelCommand.type("test-kernel-command");

      // Change OS type
      pom.selectOsType("OS_TYPE_IMMUTABLE");

      // Name and description should be preserved
      pom.el.name.should("have.value", "Test Policy");
      pom.el.description.should("have.value", "Test Description");

      // Update policy should be reset to default
      pom.el.updatePolicy.should("contain", "Update To Latest");
    });
  });

  describe("Form Submission", () => {
    beforeEach(() => {
      pom.interceptApis([
        pom.api.getOperatingSystems,
        pom.api.createOsUpdatePolicy,
      ]);
      cy.mount(<CreateOsUpdatePolicyDrawer {...mockProps} />);
      pom.waitForApis();
    });
  });

  describe("Target OS Selection", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getOperatingSystems]);
      cy.mount(<CreateOsUpdatePolicyDrawer {...mockProps} />);
      pom.waitForApis();
    });

    it("should populate target OS options for Immutable OS", () => {
      pom.selectOsType("OS_TYPE_IMMUTABLE");
      pom.selectUpdatePolicy("UPDATE_POLICY_TARGET");

      // Should show target OS dropdown
      cyGet("targetOs").should("exist");

      // Click to open dropdown and check options
      cyGet("targetOs").find("button").click();
      cy.contains(osUbuntu.name || "").should("exist");
    });
  });
});
