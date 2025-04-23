/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { multipleAlertDefinitions } from "@orch-ui/utils";
import AlertDefinitionsList from "./AlertDefinitionsList";
import AlertDefinitionsListPom from "./AlertDefinitionsList.pom";

const pom = new AlertDefinitionsListPom();
describe("<AlertDefinitionsList/>", () => {
  it("should render component", () => {
    pom.interceptApis([pom.api.alertDefinitionList]);
    cy.mount(<AlertDefinitionsList />);
    pom.waitForApis();
    pom.root.should("exist");
    pom.table.getRows().should("have.length", multipleAlertDefinitions.length);
  });
  it("should show alert definition name", () => {
    pom.interceptApis([pom.api.alertDefinitionSingle]);
    cy.mount(<AlertDefinitionsList />);
    pom.waitForApis();
    pom.alertDisplayNamePom.root.should(
      "contain.text",
      "Host - Connection Lost",
    );
  });
});
