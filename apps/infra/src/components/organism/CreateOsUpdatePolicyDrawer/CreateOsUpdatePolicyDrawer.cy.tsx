/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import { osRedHat } from "@orch-ui/utils";
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
  });

  describe("Conditional Field Rendering", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getOperatingSystems]);
      cy.mount(<CreateOsUpdatePolicyDrawer {...mockProps} />);
      pom.waitForApis();
    });

    it("should show advanced fields for Mutable OS (default Update To Target)", () => {
      pom.selectOsType("OS_TYPE_MUTABLE");

      // Update policy should be disabled and default to UPDATE_POLICY_TARGET
      cyGet("updatePolicy").should("have.class", "spark-dropdown-is-disabled");

      // Advanced fields should be visible for Mutable OS
      cyGet("updateKernelCommand").should("exist");
      cyGet("updatePackages").should("exist");
      cyGet("updateSources").should("exist");
      // Target OS should not be visible for Mutable OS
      cyGet("targetOs").should("not.exist");
    });

    it("should show advanced fields for Mutable OS with Update To Target", () => {
      pom.selectOsType("OS_TYPE_MUTABLE");

      // Advanced fields should be visible for Mutable OS
      cyGet("updateKernelCommand").should("exist");
      cyGet("updatePackages").should("exist");
      cyGet("updateSources").should("exist");
      // Target OS should not be visible for Mutable OS
      cyGet("targetOs").should("not.exist");
    });

    it("should show target OS field for Immutable OS with Update To Target", () => {
      pom.selectOsType("OS_TYPE_IMMUTABLE");
      pom.selectUpdatePolicy("UPDATE_POLICY_TARGET");

      // Target OS field should be visible for Immutable OS with Update To Target
      cyGet("targetOs").should("exist");
      // Advanced fields should not be visible for Immutable OS
      cyGet("updateKernelCommand").should("exist");
      cyGet("updatePackages").should("not.exist");
      cyGet("updateSources").should("not.exist");
    });

    it("should hide all advanced fields for Immutable OS with Update To Latest", () => {
      pom.selectOsType("OS_TYPE_IMMUTABLE");
      pom.selectUpdatePolicy("UPDATE_POLICY_LATEST");

      // No advanced fields should be visible for Immutable OS with Update To Latest
      cyGet("updateKernelCommand").should("not.exist");
      cyGet("updatePackages").should("not.exist");
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

      // Switch to Mutable OS (will automatically have UPDATE_POLICY_TARGET)
      pom.selectOsType("OS_TYPE_MUTABLE");

      // Wait for fields to appear and fill them
      cyGet("updateKernelCommand").should("exist");
      pom.el.updateKernelCommand.type("test-kernel-command");

      // Change OS type to Immutable
      pom.selectOsType("OS_TYPE_IMMUTABLE");

      // Name and description should be preserved
      pom.el.name.should("have.value", "Test Policy");
      pom.el.description.should("have.value", "Test Description");

      // Update policy should be reset to default (UPDATE_POLICY_LATEST for Immutable)
      pom.el.updatePolicy.should("contain", "Update To Latest");

      // Advanced fields should not be visible for Immutable OS
      cyGet("updateKernelCommand").should("not.exist");
      cyGet("updatePackages").should("not.exist");
      cyGet("updateSources").should("not.exist");
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
      cy.contains("None").should("exist");
      cy.contains(osRedHat.name || "").should("exist");
    });
  });

  describe("Kernel Command and Target OS Mutual Exclusivity", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getOperatingSystems]);
      cy.mount(<CreateOsUpdatePolicyDrawer {...mockProps} />);
      pom.waitForApis();
    });

    it("should show kernel command field only when Update To Target is selected", () => {
      pom.selectOsType("OS_TYPE_IMMUTABLE");
      pom.selectUpdatePolicy("UPDATE_POLICY_LATEST");

      // Kernel command should not be visible for Update To Latest
      cyGet("updateKernelCommand").should("not.exist");

      // Switch to Update To Target
      pom.selectUpdatePolicy("UPDATE_POLICY_TARGET");

      // Kernel command should now be visible
      cyGet("updateKernelCommand").should("exist");
    });

    it("should require either target OS or kernel command", () => {
      pom.selectOsType("OS_TYPE_IMMUTABLE");
      pom.selectUpdatePolicy("UPDATE_POLICY_TARGET");

      // Fill required fields but leave both target OS and kernel command empty
      pom.el.name.type("Test Policy");

      // Try to submit
      cyGet("addBtn").click();

      // Should show validation error
      cy.contains(
        "Either Target OS or Kernel Command must be specified",
      ).should("exist");
    });

    it("should allow submission with only kernel command", () => {
      pom.interceptApis([
        pom.api.getOperatingSystems,
        pom.api.createOsUpdatePolicy,
      ]);

      pom.selectOsType("OS_TYPE_IMMUTABLE");
      pom.selectUpdatePolicy("UPDATE_POLICY_TARGET");

      // Fill required fields with kernel command only
      pom.el.name.type("Test Policy");
      cyGet("updateKernelCommand").type("console=ttyS0");

      // Submit should succeed
      cyGet("addBtn").click();

      cy.wait("@createOsUpdatePolicy").then((interception) => {
        expect(interception.request.body.updateKernelCommand).to.equal(
          "console=ttyS0",
        );
        expect(interception.request.body).to.not.have.property("targetOsId");
      });
    });

    it("should allow submission with only target OS", () => {
      pom.interceptApis([
        pom.api.getOperatingSystems,
        pom.api.createOsUpdatePolicy,
      ]);

      pom.selectOsType("OS_TYPE_IMMUTABLE");
      pom.selectUpdatePolicy("UPDATE_POLICY_TARGET");

      // Fill required fields with target OS only
      pom.el.name.type("Test Policy");

      // Select target OS
      cyGet("targetOs").find("button").click({ force: true });
      cy.get("[role='listbox']")
        .should("be.visible")
        .contains(osRedHat.name || "")
        .click({ force: true });

      cy.get("[role='listbox']").should("not.exist");

      // Submit should succeed
      cyGet("addBtn").click();

      cy.wait("@createOsUpdatePolicy").then((interception) => {
        expect(interception.request.body.targetOsId).to.equal(
          osRedHat.resourceId,
        );
        expect(interception.request.body).to.not.have.property(
          "updateKernelCommand",
        );
      });
    });

    it("should not allow submission with both empty when switching from valid state", () => {
      pom.selectOsType("OS_TYPE_IMMUTABLE");
      pom.selectUpdatePolicy("UPDATE_POLICY_TARGET");

      // Fill required fields with kernel command
      pom.el.name.type("Test Policy");
      cyGet("updateKernelCommand").type("console=ttyS0");

      // Clear the kernel command
      cyGet("updateKernelCommand").clear();

      // Try to submit with both empty
      cyGet("addBtn").click();

      // Should show validation error
      cy.contains(
        "Either Target OS or Kernel Command must be specified",
      ).should("exist");
    });
  });

  describe("Mutable OS Field Validation", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getOperatingSystems]);
      cy.mount(<CreateOsUpdatePolicyDrawer {...mockProps} />);
      pom.waitForApis();
    });

    it("should require at least one of kernel command, update sources, or update packages for Mutable OS", () => {
      pom.selectOsType("OS_TYPE_MUTABLE");
      pom.el.name.type("Test Mutable Policy");
      cyGet("addBtn").click();

      cy.contains(
        "Either Kernel Command, Update Sources, or Update Packages must be specified",
      ).should("exist");
    });
  });
});
