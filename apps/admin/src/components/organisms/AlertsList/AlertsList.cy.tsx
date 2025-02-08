/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */
import { alertDefinitionOne, multipleAlerts } from "@orch-ui/utils";
import AlertsList from "./AlertsList";
import AlertsListPom from "./AlertsList.pom";

const pom = new AlertsListPom();
describe("<AlertsList/>", () => {
  it("should render component", () => {
    pom.interceptApis([pom.api.alertDefinitionList, pom.api.alertList]);
    cy.mount(<AlertsList />);
    pom.waitForApis();
    pom.root.should("exist");
    pom.table.getRows().should("have.length", multipleAlerts.length);
  });
  it("should open drawer", () => {
    pom.interceptApis([pom.api.alertDefinitionList, pom.api.alertList]);
    cy.mount(<AlertsList />);
    pom.waitForApis();
    pom.table
      .getCell(1, 1)
      .contains(alertDefinitionOne.name ?? "")
      .click();
    pom.drawer.el.alertDrawerBody.should("be.visible");
  });
});
