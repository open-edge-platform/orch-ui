/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { alertDefinitionMocks } from "library/utils/mocks_new/admin/data/alert-definitions";
import AlertStore from "library/utils/mocks_new/admin/store/alerts";
import AlertsList from "./AlertsList";
import AlertsListPom from "./AlertsList.pom";

const pom = new AlertsListPom();
const alertStore = new AlertStore();

describe("<AlertsList/>", () => {
  it("should render all alerts across paginated pages", () => {
    pom.interceptApis([pom.api.alertDefinitionList, pom.api.alertList]);
    cy.mount(<AlertsList />);
    pom.waitForApis();
  
    const totalAlerts = alertStore.list().length;
    let seenCount = 0;
  
    cy.get('[data-testid^="page-btn-"]')
      .then(($buttons) => {
        const pages = [...$buttons].map((btn) => btn.getAttribute("data-testid"));
        cy.wrap(pages).each((pageTestId) => {
          cy.get(`[data-testid="${pageTestId}"]`).click();
          pom.waitForApis();
  
          pom.table.getRows().then(($rows) => {
            seenCount += $rows.length;
          });
        });
      })
      .then(() => {
        cy.wrap(null).then(() => {
          expect(seenCount).to.eq(totalAlerts);
        });
      });
  });
  it("should open drawer", () => {
    pom.interceptApis([pom.api.alertDefinitionList, pom.api.alertList]);
    cy.mount(<AlertsList />);
    pom.waitForApis();
    pom.table
      .getCell(1, 1)
      .contains(
        alertDefinitionMocks.hostConnectionLostAlertDefinition.name ?? "",
      )
      .click();
    pom.drawer.el.alertDrawerBody.should("be.visible");
  });
});
