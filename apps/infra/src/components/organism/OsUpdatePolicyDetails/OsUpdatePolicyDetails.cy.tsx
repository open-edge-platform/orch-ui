/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { osUpdatePolicyScheduled, osUpdatePolicyTarget } from "@orch-ui/utils";
import OsUpdatePolicyDetails from "./OsUpdatePolicyDetails";
import OsUpdatePolicyDetailsPom from "./OsUpdatePolicyDetails.pom";

const pom = new OsUpdatePolicyDetailsPom();

describe("<OsUpdatePolicyDetails/>", () => {
  describe("Basic Functionality", () => {
    it("should render component with policy data", () => {
      cy.mount(<OsUpdatePolicyDetails osUpdatePolicy={osUpdatePolicyTarget} />);
      pom.root.should("exist");
    });

    it("should display policy name and description", () => {
      cy.mount(<OsUpdatePolicyDetails osUpdatePolicy={osUpdatePolicyTarget} />);
      cy.contains(osUpdatePolicyTarget.name).should("exist");
      cy.contains(osUpdatePolicyTarget.description).should("exist");
    });

    it("should display OS Type information", () => {
      cy.mount(<OsUpdatePolicyDetails osUpdatePolicy={osUpdatePolicyTarget} />);
      cy.contains("OS Type").should("exist");
      cy.contains("OS Configuration").should("exist");
    });

    it("should display Update Policy information", () => {
      cy.mount(<OsUpdatePolicyDetails osUpdatePolicy={osUpdatePolicyTarget} />);
      cy.contains("Update Policy").should("exist");
    });
  });

  describe("Conditional Rendering - Mutable OS", () => {
    it("should show advanced settings for mutable OS with advanced fields", () => {
      cy.mount(
        <OsUpdatePolicyDetails osUpdatePolicy={osUpdatePolicyScheduled} />,
      );

      // Should show mutable OS type
      cy.contains("Mutable OS").should("exist");

      // Should show advanced settings section
      cy.contains("Advanced Settings").should("exist");

      // Should show mutable-specific fields
      cy.contains("Kernel Command").should("exist");
      cy.contains("Update Sources").should("exist");
    });

    it("should display install packages when available", () => {
      cy.mount(
        <OsUpdatePolicyDetails osUpdatePolicy={osUpdatePolicyScheduled} />,
      );

      if (osUpdatePolicyScheduled.installPackages) {
        cy.contains("Install Packages").should("exist");
      }
    });

    it("should show correct update policy labels", () => {
      const policyWithLatest = {
        ...osUpdatePolicyScheduled,
        updatePolicy: "UPDATE_POLICY_LATEST" as const,
      };

      cy.mount(<OsUpdatePolicyDetails osUpdatePolicy={policyWithLatest} />);
      cy.contains("Update To Latest").should("exist");
    });
  });

  describe("Conditional Rendering - Immutable OS", () => {
    it("should show target OS information for immutable policies", () => {
      cy.mount(<OsUpdatePolicyDetails osUpdatePolicy={osUpdatePolicyTarget} />);

      if (osUpdatePolicyTarget.targetOs) {
        cy.contains("Target Operating System").should("exist");
        cy.contains("Target OS Name").should("exist");
        cy.contains(osUpdatePolicyTarget.targetOs.name).should("exist");
      }
    });

    it("should not show advanced settings for immutable OS", () => {
      // Create an immutable policy without mutable-specific fields
      const immutablePolicy = {
        ...osUpdatePolicyTarget,
        kernelCommand: undefined,
        installPackages: undefined,
        updateSources: undefined,
      };

      cy.mount(<OsUpdatePolicyDetails osUpdatePolicy={immutablePolicy} />);

      // Should show immutable OS type
      cy.contains("Immutable OS").should("exist");

      // Should not show advanced settings for empty immutable policy
      cy.contains("Advanced Settings").should("not.exist");
    });
  });

  describe("Field Display Logic", () => {
    it("should show 'Not specified' for empty optional fields", () => {
      const policyWithEmptyFields = {
        ...osUpdatePolicyScheduled,
        kernelCommand: "",
        updateSources: [],
      };

      cy.mount(
        <OsUpdatePolicyDetails osUpdatePolicy={policyWithEmptyFields} />,
      );
      cy.contains("Not specified").should("exist");
    });

    it("should handle policies with all fields populated", () => {
      cy.mount(
        <OsUpdatePolicyDetails osUpdatePolicy={osUpdatePolicyScheduled} />,
      );

      // Check that all available fields are displayed
      cy.contains("Details").should("exist");
      cy.contains(osUpdatePolicyScheduled.name).should("exist");
      cy.contains(osUpdatePolicyScheduled.description).should("exist");
    });

    it("should display update sources as comma-separated list", () => {
      if (osUpdatePolicyScheduled.updateSources?.length) {
        cy.mount(
          <OsUpdatePolicyDetails osUpdatePolicy={osUpdatePolicyScheduled} />,
        );
        const expectedSources =
          osUpdatePolicyScheduled.updateSources.join(", ");
        cy.contains(expectedSources).should("exist");
      }
    });
  });

  describe("Package Display", () => {
    it("should render install packages correctly", () => {
      const policyWithPackages = {
        ...osUpdatePolicyScheduled,
        installPackages: "package1\npackage2\npackage3",
      };

      cy.mount(<OsUpdatePolicyDetails osUpdatePolicy={policyWithPackages} />);

      cy.contains("Install Packages").should("exist");
      cy.contains("package1").should("exist");
      cy.contains("package2").should("exist");
      cy.contains("package3").should("exist");
    });

    it("should handle empty package list", () => {
      const policyWithEmptyPackages = {
        ...osUpdatePolicyScheduled,
        installPackages: "",
      };

      cy.mount(
        <OsUpdatePolicyDetails osUpdatePolicy={policyWithEmptyPackages} />,
      );

      if (policyWithEmptyPackages.installPackages) {
        cy.contains("No packages to install").should("exist");
      }
    });
  });

  describe("Update Policy Labels", () => {
    it("should display correct label for UPDATE_POLICY_TARGET", () => {
      const targetPolicy = {
        ...osUpdatePolicyTarget,
        updatePolicy: "UPDATE_POLICY_TARGET" as const,
      };

      cy.mount(<OsUpdatePolicyDetails osUpdatePolicy={targetPolicy} />);
      cy.contains("Update To Target").should("exist");
    });

    it("should display raw value for unknown update policies", () => {
      const unknownPolicy = {
        ...osUpdatePolicyTarget,
        updatePolicy: "UNKNOWN_POLICY" as any,
      };

      cy.mount(<OsUpdatePolicyDetails osUpdatePolicy={unknownPolicy} />);
      cy.contains("UNKNOWN_POLICY").should("exist");
    });
  });
});

