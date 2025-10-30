/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { assignedWorkloadHostTwo as mockHost } from "@orch-ui/utils";
import OsUpdateHistory from "./OsUpdateHistory";
import OsUpdateHistoryPom from "./OsUpdateHistory.pom";

const pom = new OsUpdateHistoryPom();

// Mock host with instance
const mockHostWithInstance: infra.HostResourceRead = {
  ...mockHost,
  instance: {
    ...mockHost.instance!,
    resourceId: "inst-test-123",
  },
};

// Mock host without instance
const mockHostNoInstance: infra.HostResourceRead = {
  ...mockHost,
  instance: undefined,
};

describe("<OsUpdateHistory/>", () => {
  describe("Basic Rendering", () => {
    it("should render component with host data", () => {
      pom.interceptApis([pom.api.getOsUpdateRuns]);
      cy.mount(<OsUpdateHistory host={mockHostWithInstance} />);
      pom.waitForApis();
      pom.root.should("exist");
    });

    it("should display loading state", () => {
      pom.interceptApis([pom.api.getOsUpdateRuns]);
      cy.mount(<OsUpdateHistory host={mockHostWithInstance} />);

      // TableLoader should be shown during loading
      cy.get('[data-cy="tableLoader"]').should("exist");
    });

    it("should display update runs when data is available", () => {
      pom.interceptApis([pom.api.getOsUpdateRuns]);
      cy.mount(<OsUpdateHistory host={mockHostWithInstance} />);
      pom.waitForApis();

      cy.contains("Security Update Run - Completed").should("exist");
      // Verify that table rows are rendered using TablePom methods
      pom.getTableRows().should("have.length", 2);
      pom.table.root.should("exist");
    });

    it("should display empty state when no update runs", () => {
      pom.interceptApis([pom.api.getOsUpdateRunsEmpty]);
      cy.mount(<OsUpdateHistory host={mockHostWithInstance} />);
      pom.waitForApis();

      cy.contains("No OS Update History").should("exist");
      cy.contains("This instance has no OS update runs recorded").should(
        "exist",
      );
    });

    it("should handle API error gracefully", () => {
      pom.interceptApis([pom.api.getOsUpdateRunsError500]);
      cy.mount(<OsUpdateHistory host={mockHostWithInstance} />);
      pom.waitForApis();

      // Should show ApiError component using ApiErrorPom
      pom.apiErrorPom.root.should("exist");
    });

    it("should handle host without instance", () => {
      pom.interceptApis([pom.api.getOsUpdateRunsEmpty]);
      cy.mount(<OsUpdateHistory host={mockHostNoInstance} />);
      pom.waitForApis();

      pom.root.should("exist");
      cy.contains("No OS Update History").should("exist");
    });
  });

  describe("Update Run Details", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getOsUpdateRuns]);
      cy.mount(<OsUpdateHistory host={mockHostWithInstance} />);
      pom.waitForApis();
    });

    it("should display update run name", () => {
      cy.contains("Security Update Run - Completed").should("exist");
    });

    it("should display status indicator", () => {
      pom.statusBadges.first().should("exist");
      pom.verifyStatusIndicator("Update completed successfully");
    });

    it("should display applied policy information", () => {
      pom.appliedPolicies
        .first()
        .should("contain", "Production Security Updates");
    });

    it("should display timing information", () => {
      pom.startTimes.first().should("not.contain", "N/A");
      pom.endTimes.first().should("not.contain", "In Progress");
    });

    it("should display status details when available", () => {
      pom.statusDetails
        .first()
        .should("contain", "All security patches applied successfully.");
    });

    it("should have proper data-cy attributes", () => {
      pom.table.root.should("have.attr", "data-cy", "osUpdateHistoryTable");
      pom.appliedPolicies.should("have.attr", "data-cy", "appliedPolicy");
      pom.startTimes.should("have.attr", "data-cy", "startTime");
      pom.endTimes.should("have.attr", "data-cy", "endTime");
      pom.durations.should("have.attr", "data-cy", "duration");
      pom.statusDetails.should("have.attr", "data-cy", "statusDetails");
    });
  });

  describe("Multiple Update Runs", () => {
    it("should display correct number of table rows for multiple runs", () => {
      pom.interceptApis([pom.api.getOsUpdateRunsMultiple]);
      cy.mount(<OsUpdateHistory host={mockHostWithInstance} />);
      pom.waitForApis();

      // Verify table has 5 rows using TablePom methods
      pom.getTableRows().should("have.length", 5);

      // Verify we have some update runs displayed
      pom.getTableRows().should("have.length.greaterThan", 1);
    });
  });

  describe("Status Indicators", () => {
    it("should handle different status indicators", () => {
      pom.interceptApis([pom.api.getOsUpdateRunsFailed]);
      cy.mount(<OsUpdateHistory host={mockHostWithInstance} />);
      pom.waitForApis();

      // Should display failed status from mock data
      cy.contains("Update failed").should("exist");
    });

    it("should handle in-progress updates", () => {
      pom.interceptApis([pom.api.getOsUpdateRunsInProgress]);
      cy.mount(<OsUpdateHistory host={mockHostWithInstance} />);
      pom.waitForApis();

      // Should show in-progress status and no end time
      cy.contains("Installing updates").should("exist");
      pom.endTimes.first().should("contain", "In Progress");
    });
  });

  describe("Accessibility", () => {
    it("should have proper component structure", () => {
      pom.interceptApis([pom.api.getOsUpdateRuns]);
      cy.mount(<OsUpdateHistory host={mockHostWithInstance} />);
      pom.waitForApis();

      pom.root.should("have.attr", "data-cy", "osUpdateHistory");
      pom.table.root.should("exist");
    });
  });

  describe("Pagination", () => {
    beforeEach(() => {
      // Use mock data with pagination support
      pom.interceptApis([pom.api.getOsUpdateRunsPaginated]);
    });

    it("should show pagination when total elements exceed page size", () => {
      cy.mount(<OsUpdateHistory host={mockHostWithInstance} />);
      pom.waitForApis();

      // Check if pagination controls are visible
      cy.get('[data-cy*="pagination"]').should("exist");
    });
  });
});
