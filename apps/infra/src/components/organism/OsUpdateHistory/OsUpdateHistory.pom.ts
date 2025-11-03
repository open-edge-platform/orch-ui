/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { ApiErrorPom, TablePom } from "@orch-ui/components";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { OsUpdateRunStore } from "@orch-ui/utils";

// Create an instance of the store to use in tests
const osUpdateRunStoreInstance = new OsUpdateRunStore();

const dataCySelectors = [
  "osUpdateHistoryTable",
  "statusBadge",
  "appliedPolicy",
  "startTime",
  "endTime",
  "duration",
  "statusDetails",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "getOsUpdateRuns"
  | "getOsUpdateRunsEmpty"
  | "getOsUpdateRunsError500"
  | "getOsUpdateRunsMultiple"
  | "getOsUpdateRunsFailed"
  | "getOsUpdateRunsInProgress"
  | "getOsUpdateRunsPaginated";

const osUpdateRunsRoute = (filter?: string) => {
  const baseRoute = `**/v1/projects/${defaultActiveProject.name}/os-update-runs`;
  return filter ? `${baseRoute}?filter=${filter}*` : `${baseRoute}*`;
};

const endpoints: CyApiDetails<
  ApiAliases,
  infra.OsUpdateRunListOsUpdateRunApiResponse
> = {
  getOsUpdateRuns: {
    route: osUpdateRunsRoute(),
    response: {
      osUpdateRuns: osUpdateRunStoreInstance.list().slice(0, 2), // First 2 items
      totalElements: 2,
      hasNext: false,
    },
  },
  getOsUpdateRunsEmpty: {
    route: osUpdateRunsRoute(),
    response: {
      osUpdateRuns: [],
      totalElements: 0,
      hasNext: false,
    },
  },
  getOsUpdateRunsError500: {
    route: osUpdateRunsRoute(),
    statusCode: 500,
    response: {
      osUpdateRuns: [],
      totalElements: 0,
      hasNext: false,
    },
  },
  getOsUpdateRunsMultiple: {
    route: osUpdateRunsRoute(),
    response: {
      osUpdateRuns: osUpdateRunStoreInstance.list().slice(0, 5), // First 5 items
      totalElements: 5,
      hasNext: false,
    },
  },
  getOsUpdateRunsFailed: {
    route: osUpdateRunsRoute(),
    response: {
      osUpdateRuns: osUpdateRunStoreInstance
        .list()
        .filter((run) => run.statusIndicator === "STATUS_INDICATION_ERROR"),
      totalElements: 2,
      hasNext: false,
    },
  },
  getOsUpdateRunsInProgress: {
    route: osUpdateRunsRoute(),
    response: {
      osUpdateRuns: osUpdateRunStoreInstance
        .list()
        .filter(
          (run) => run.statusIndicator === "STATUS_INDICATION_IN_PROGRESS",
        ),
      totalElements: 2,
      hasNext: false,
    },
  },
  getOsUpdateRunsPaginated: {
    route: osUpdateRunsRoute(),
    response: {
      osUpdateRuns: osUpdateRunStoreInstance.list().slice(0, 10), // First page of 10
      totalElements: 25, // More than current page to show pagination
      hasNext: true,
    },
  },
};

class OsUpdateHistoryPom extends CyPom<Selectors, ApiAliases> {
  public table: TablePom;
  public apiErrorPom: ApiErrorPom;

  constructor(public rootCy: string = "osUpdateHistory") {
    super(rootCy, [...dataCySelectors], endpoints);
    this.table = new TablePom("osUpdateHistoryTable");
    this.apiErrorPom = new ApiErrorPom();
  }

  // Delegate table methods to TablePom
  public getTableRows() {
    return this.table.getRows();
  }

  public getCell(row: number, column: number) {
    return this.table.getCell(row, column);
  }

  public getRow(rowNumber: number) {
    return this.table.getRow(rowNumber);
  }

  // OS Update History specific selectors
  get statusBadges() {
    return cy.get('.os-update-history__status-cell [data-cy*="statusIcon"]');
  }

  get appliedPolicies() {
    return this.el.appliedPolicy;
  }

  get startTimes() {
    return this.el.startTime;
  }

  get endTimes() {
    return this.el.endTime;
  }

  get durations() {
    return this.el.duration;
  }

  get statusDetails() {
    return this.el.statusDetails;
  }

  // OS Update History specific methods
  verifyUpdateRunExists(name: string) {
    cy.contains(name).should("exist");
  }

  verifyStatusIndicator(status: string) {
    cy.contains(status).should("exist");
  }

  // Pagination methods - delegate to TablePom
  goToNextPage() {
    this.table.getNextPageButton().click();
  }

  goToPreviousPage() {
    this.table.getPreviousPageButton().click();
  }

  verifyPagination() {
    // Use TablePom's pagination methods to verify pagination is visible
    this.table.getTotalItemCount().should("be.visible");
  }
}

export default OsUpdateHistoryPom;
