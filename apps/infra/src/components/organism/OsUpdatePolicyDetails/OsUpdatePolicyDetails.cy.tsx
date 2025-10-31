/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { osUpdatePolicyLatest, osUpdatePolicyTarget } from "@orch-ui/utils";
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
      if (osUpdatePolicyTarget.description) {
        cy.contains(osUpdatePolicyTarget.description).should("exist");
      }
    });

    it("should display OS Configuration information", () => {
      cy.mount(<OsUpdatePolicyDetails osUpdatePolicy={osUpdatePolicyTarget} />);
      cy.contains("Update Policy").should("exist");
      cy.contains("OS Configuration").should("exist");
    });

    it("should display Update Policy information", () => {
      cy.mount(<OsUpdatePolicyDetails osUpdatePolicy={osUpdatePolicyTarget} />);
      cy.contains("Update Policy").should("exist");
    });
  });

  describe("Field Display - All Fields Always Visible", () => {
    it("should show main sections", () => {
      cy.mount(<OsUpdatePolicyDetails osUpdatePolicy={osUpdatePolicyTarget} />);

      cy.contains("Details").should("exist");
      cy.contains("OS Configuration").should("exist");
      cy.contains("Update Policy").should("exist");
      cy.contains("Target OS Name").should("exist");
      cy.contains("Kernel Command Update").should("exist");
      cy.contains("Update Sources").should("exist");
    });

    it("should display update packages when available", () => {
      cy.mount(<OsUpdatePolicyDetails osUpdatePolicy={osUpdatePolicyLatest} />);

      // Update Packages should be visible as a field label
      cy.contains("Update Packages").should("exist");
    });

    it("should show correct update policy labels", () => {
      const policyWithLatest = {
        ...osUpdatePolicyLatest,
        updatePolicy: "UPDATE_POLICY_LATEST" as const,
      };

      cy.mount(<OsUpdatePolicyDetails osUpdatePolicy={policyWithLatest} />);
      cy.contains("Update To Latest").should("exist");
    });
  });

  describe("Target OS Display", () => {
    it("should show target OS field", () => {
      cy.mount(<OsUpdatePolicyDetails osUpdatePolicy={osUpdatePolicyTarget} />);

      // the field label should exist
      cy.contains("Target OS Name").should("exist");

      // Should show the target OS name if available, otherwise N/A
      if (osUpdatePolicyTarget.targetOs?.name) {
        cy.contains(osUpdatePolicyTarget.targetOs.name).should("exist");
      } else {
        cy.contains("N/A").should("exist");
      }
    });
  });

  describe("Field Display Logic", () => {
    it("should show 'N/A' for empty optional fields", () => {
      const policyWithEmptyFields = {
        ...osUpdatePolicyLatest,
        updateKernelCommand: "",
        updateSources: [],
        targetOs: undefined,
      };

      cy.mount(
        <OsUpdatePolicyDetails osUpdatePolicy={policyWithEmptyFields} />,
      );
      cy.contains("N/A").should("exist");
    });

    it("should handle policies with all fields populated", () => {
      cy.mount(<OsUpdatePolicyDetails osUpdatePolicy={osUpdatePolicyLatest} />);

      // Check that all available fields are displayed
      cy.contains("Details").should("exist");
      cy.contains(osUpdatePolicyLatest.name).should("exist");
      if (osUpdatePolicyLatest.description) {
        cy.contains(osUpdatePolicyLatest.description).should("exist");
      }
    });

    it("should display update sources as comma-separated list", () => {
      if (osUpdatePolicyLatest.updateSources?.length) {
        cy.mount(
          <OsUpdatePolicyDetails osUpdatePolicy={osUpdatePolicyLatest} />,
        );
        const expectedSources = osUpdatePolicyLatest.updateSources.join(", ");
        cy.contains(expectedSources).should("exist");
      }
    });
  });

  describe("Package Display", () => {
    it("should render update packages correctly", () => {
      const policyWithPackages = {
        ...osUpdatePolicyLatest,
        updatePackages: "package1\npackage2\npackage3",
      };

      cy.mount(<OsUpdatePolicyDetails osUpdatePolicy={policyWithPackages} />);

      // Update Packages should appear as field label, not section header
      cy.contains("Update Packages").should("exist");
      cy.contains("package1").should("exist");
      cy.contains("package2").should("exist");
      cy.contains("package3").should("exist");
    });

    it("should handle empty package list", () => {
      const policyWithEmptyPackages = {
        ...osUpdatePolicyLatest,
        updatePackages: "",
      };

      cy.mount(
        <OsUpdatePolicyDetails osUpdatePolicy={policyWithEmptyPackages} />,
      );

      // Should show N/A when no packages
      cy.contains("Update Packages").should("exist");
      cy.contains("N/A").should("exist");
    });

    it("should handle undefined packages", () => {
      const policyWithoutPackages = {
        ...osUpdatePolicyLatest,
        updatePackages: undefined,
      };

      cy.mount(
        <OsUpdatePolicyDetails osUpdatePolicy={policyWithoutPackages} />,
      );

      // Should show N/A when packages are undefined
      cy.contains("Update Packages").should("exist");
      cy.contains("N/A").should("exist");
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

    it("should display N/A for unknown update policies", () => {
      const unknownPolicy = {
        ...osUpdatePolicyTarget,
        updatePolicy: undefined as any,
      };

      cy.mount(<OsUpdatePolicyDetails osUpdatePolicy={unknownPolicy} />);
      cy.contains("N/A").should("exist");
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
