/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import {
  assignedWorkloadHostTwo as mockHost,
  osUpdatePolicyScheduled,
  osUpdatePolicyTarget,
} from "@orch-ui/utils";
import OsUpdate from "./OsUpdate";
import OsUpdatePom from "./OsUpdate.pom";

const pom = new OsUpdatePom();

// Mock host with OS update available
const mockHostWithUpdate: infra.HostResourceRead = {
  ...mockHost,
  instance: {
    ...mockHost.instance!,
    osUpdateAvailable: "Ubuntu 22.04 LTS",
    updatePolicy: osUpdatePolicyTarget,
  },
};

// Mock host without OS update policy assigned
const mockHostNoPolicy: infra.HostResourceRead = {
  ...mockHost,
  instance: {
    ...mockHost.instance!,
    osUpdateAvailable: "Ubuntu 22.04 LTS",
    updatePolicy: undefined,
  },
};

// Mock host without instance
const mockHostNoInstance: infra.HostResourceRead = {
  ...mockHost,
  instance: undefined,
};

describe("<OsUpdate/>", () => {
  describe("Basic Rendering", () => {
    it("should render component with host data", () => {
      pom.interceptApis([pom.api.getOsUpdatePolicies]);
      cy.mount(<OsUpdate host={mockHostWithUpdate} />);
      pom.waitForApis();
      pom.root.should("exist");
    });

    it("should display OS information", () => {
      pom.interceptApis([pom.api.getOsUpdatePolicies]);
      cy.mount(<OsUpdate host={mockHostWithUpdate} />);
      pom.waitForApis();

      cy.contains("OS").should("exist");
      pom.osName.should("contain", mockHostWithUpdate.instance?.os?.name);
    });

    it("should display update availability information", () => {
      pom.interceptApis([pom.api.getOsUpdatePolicies]);
      cy.mount(<OsUpdate host={mockHostWithUpdate} />);
      pom.waitForApis();

      cy.contains("Updates").should("exist");
      pom.updatesAvailable.should("contain", "Ubuntu 22.04 LTS");
    });

    it("should display assigned OS update policy", () => {
      pom.interceptApis([pom.api.getOsUpdatePolicies]);
      cy.mount(<OsUpdate host={mockHostWithUpdate} />);
      pom.waitForApis();

      cy.contains("Assigned OS Update Policy").should("exist");
      pom.assignedPolicy.should("contain", osUpdatePolicyTarget.name);
    });

    it("should show dash when no assigned policy", () => {
      pom.interceptApis([pom.api.getOsUpdatePolicies]);
      cy.mount(<OsUpdate host={mockHostNoPolicy} />);
      pom.waitForApis();

      pom.assignedPolicy.should("contain", "-");
    });

    it("should handle host without instance", () => {
      pom.interceptApis([pom.api.getOsUpdatePolicies]);
      cy.mount(<OsUpdate host={mockHostNoInstance} />);
      pom.waitForApis();

      pom.root.should("exist");
      pom.osName.should("contain", "-");
      pom.updatesAvailable.should("contain", "-");
      pom.assignedPolicy.should("contain", "-");
    });
  });

  describe("OS Update Policy Dropdown", () => {
    it("should load and display OS update policies", () => {
      pom.interceptApis([pom.api.getOsUpdatePolicies]);
      cy.mount(<OsUpdate host={mockHostWithUpdate} />);
      pom.waitForApis();

      pom.dropdown.selectDropdownValueByLabel(
        pom.root,
        "osUpdatePolicy",
        osUpdatePolicyTarget.name,
      );

      // Should show available policies
      cy.contains(osUpdatePolicyTarget.name).should("exist");
      cy.contains(osUpdatePolicyScheduled.name).should("exist");
    });

    it("should show loading state while fetching policies", () => {
      // Don't wait for API to complete to test loading state
      pom.interceptApis([pom.api.getOsUpdatePolicies]);
      cy.mount(<OsUpdate host={mockHostWithUpdate} />);

      pom.policyDropdown.should("contain", "Loading policies...");
    });

    it("should show no policies message when empty response", () => {
      pom.interceptApis([pom.api.getOsUpdatePoliciesEmpty]);
      cy.mount(<OsUpdate host={mockHostWithUpdate} />);
      pom.waitForApis();

      pom.policyDropdown.should("contain", "No OS Update Policies Available");
      pom.policyDropdown.should("have.class", "spark-dropdown-is-disabled");
    });

    it("should handle API error gracefully", () => {
      pom.interceptApis([pom.api.getOsUpdatePoliciesError500]);
      cy.mount(<OsUpdate host={mockHostWithUpdate} />);
      pom.waitForApis();

      // Component should still render but dropdown should show error state
      pom.root.should("exist");
      pom.policyDropdown.should("have.class", "spark-dropdown-is-disabled");
    });

    it("should allow policy selection", () => {
      pom.interceptApis([pom.api.getOsUpdatePolicies]);
      cy.mount(<OsUpdate host={mockHostWithUpdate} />);
      pom.waitForApis();

      // Select a policy
      pom.selectPolicy(osUpdatePolicyTarget.name);

      // Apply button should become enabled
      pom.el.applyPolicyBtn.should("not.have.class", "spark-button-disabled");
    });
  });

  describe("Apply Policy Functionality", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getOsUpdatePolicies]);
      cy.mount(<OsUpdate host={mockHostWithUpdate} />);
      pom.waitForApis();
    });

    it("should disable apply button when no policy selected", () => {
      pom.applyButton.should("have.class", "spark-button-disabled");
    });

    it("should enable apply button when policy is selected", () => {
      pom.selectPolicy(osUpdatePolicyTarget.name);
      pom.applyButton.should("not.have.class", "spark-button-disabled");
    });
  });
});
