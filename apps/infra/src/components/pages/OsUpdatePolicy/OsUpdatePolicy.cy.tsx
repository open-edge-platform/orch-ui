/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
// import * as x from "@orch-ui/utils";
import {
  osUpdatePolicyImmediate,
  osUpdatePolicyScheduled,
  osUpdatePolicyTarget,
} from "@orch-ui/utils";
import OsUpdatePolicy from "./OsUpdatePolicy";
import OsUpdatePolicyPom from "./OsUpdatePolicy.pom";

const pom = new OsUpdatePolicyPom();

describe("<OsUpdatePolicy/>", () => {
  describe("Basic Functionality", () => {
    it("should render component", () => {
      pom.interceptApis([pom.api.getOsUpdatePolicy]);
      cy.mount(<OsUpdatePolicy />);
      pom.waitForApis();
      pom.root.should("exist");
    });

    it("should render loading state initially", () => {
      cy.mount(<OsUpdatePolicy />);
      pom.root.should("exist");
      cy.get(".os-update-policy__table-loader").should("exist");
    });

    it("should show empty state when no policies exist", () => {
      pom.interceptApis([pom.api.getOsUpdatePolicyEmpty]);
      cy.mount(<OsUpdatePolicy />);
      pom.waitForApis();
      pom.root.should("exist");
      cy.contains("No OS update policies are available here.").should("exist");
      cy.contains("Create OS Update Policy").should("exist");
    });

    it("should handle API error gracefully", () => {
      pom.interceptApis([pom.api.getOsUpdatePolicyError]);
      cy.mount(<OsUpdatePolicy />);
      pom.waitForApis();
      pom.apiErrorPom.root.should("exist");
    });
  });

  describe("Table Functionality", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getOsUpdatePolicy]);
      cy.mount(<OsUpdatePolicy />);
      pom.waitForApis();
    });

    it("should display table with policies", () => {
      pom.osProfilesTablePom.root.should("exist");
      // Check that table has content
      pom.osProfilesTablePom.root
        .find("tbody tr")
        .should("have.length.greaterThan", 0);
    });

    it("should display correct table headers", () => {
      pom.osProfilesTablePom.root.should("contain", "Name");
      pom.osProfilesTablePom.root.should("contain", "Target OS");
      pom.osProfilesTablePom.root.should("contain", "Action");
    });

    it("should display policy names in table", () => {
      pom.osProfilesTablePom.root.should("contain", osUpdatePolicyTarget.name);
      pom.osProfilesTablePom.root.should(
        "contain",
        osUpdatePolicyScheduled.name,
      );
      pom.osProfilesTablePom.root.should(
        "contain",
        osUpdatePolicyImmediate.name,
      );
    });

    it("should show Create OS Update Policy button", () => {
      cy.contains("button", "Create OS Update Policy").should("exist");
      cy.contains("button", "Create OS Update Policy").should("be.visible");
    });
  });

  describe("Policy Actions", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getOsUpdatePolicy]);
      cy.mount(<OsUpdatePolicy />);
      pom.waitForApis();
    });

    it("should open details drawer when View Details is clicked", () => {
      // Click on the first policy's popup menu
      cyGet("osProfilesPopup").first().click();
      cy.contains("View Details").click();

      // Check that details drawer is opened
      cyGet("osProfileDrawerContent").should("exist");
    });

    it("should show delete confirmation when Delete is clicked", () => {
      pom.interceptApis([pom.api.deleteOsUpdatePolicy]);

      // Click on the first policy's popup menu
      cyGet("osProfilesPopup").first().click();
      cy.contains("Delete").click();

      // Should show toast notification (the delete should be called immediately)
      pom.waitForApis();
    });

    it.skip("should open create policy drawer when Add button is clicked", () => {
      cyGet("addOsUpdatePolicy").click();
      cyGet("createOsPolicyDrawerContent").should("exist");
    });
  });

  describe("Search Functionality", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getOsUpdatePolicy]);
      cy.mount(<OsUpdatePolicy />);
      pom.waitForApis();
    });

    it("should filter policies by search term", () => {
      // Get the search input and type a search term
      pom.osProfilesTablePom.el.search.type(osUpdatePolicyTarget.name);

      // Should show only matching policies
      pom.osProfilesTablePom.root.should("contain", osUpdatePolicyTarget.name);
      // Should not show non-matching policies
      pom.osProfilesTablePom.root.should(
        "not.contain",
        osUpdatePolicyScheduled.name,
      );
    });

    it("should clear search results when search is cleared", () => {
      // Type and then clear search
      pom.osProfilesTablePom.el.search.type(osUpdatePolicyTarget.name);
      pom.osProfilesTablePom.el.search.clear();

      // Should show all policies again
      pom.osProfilesTablePom.root.should("contain", osUpdatePolicyTarget.name);
      pom.osProfilesTablePom.root.should(
        "contain",
        osUpdatePolicyScheduled.name,
      );
    });
  });

  describe("Toast Notifications", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getOsUpdatePolicy]);
      cy.mount(<OsUpdatePolicy />);
      pom.waitForApis();
    });

    it("should show success toast when policy is deleted successfully", () => {
      pom.interceptApis([pom.api.deleteOsUpdatePolicy]);

      // Click delete on first policy
      cyGet("osProfilesPopup").first().click();
      cy.contains("Delete").click();

      pom.waitForApis();

      // Should show success toast
      cy.get(".spark-toast").should("exist");
      cy.get(".spark-toast").should("contain", "successfully");
    });

    it("should show error toast when deletion fails", () => {
      pom.interceptApis([pom.api.deleteOsUpdatePolicyError]);

      // Click delete on first policy
      cyGet("osProfilesPopup").first().click();
      cy.contains("Delete").click();

      pom.waitForApis();

      // Should show error toast
      cy.get(".spark-toast").should("exist");
      cy.get(".spark-toast").should("contain", "Failed");
    });
  });
});
