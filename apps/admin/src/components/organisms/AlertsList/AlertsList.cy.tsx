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
  it("should render component", () => {
    pom.interceptApis([pom.api.alertDefinitionList, pom.api.alertList]);
    cy.mount(<AlertsList />);
    pom.waitForApis();
    pom.root.should("exist");
    pom.table.getRows().should("have.length", alertStore.list().length);
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
