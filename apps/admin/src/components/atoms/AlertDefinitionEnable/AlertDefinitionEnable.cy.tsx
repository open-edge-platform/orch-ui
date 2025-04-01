/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { alertDefinitionOne } from "../../../../../../library/utils/mocks/tenancy/data/alertDefinitions";
import AlertDefinitionEnable from "./AlertDefinitionEnable";
import AlertDefinitionEnablePom from "./AlertDefinitionEnable.pom";

const pom = new AlertDefinitionEnablePom();
describe("<AlertDefinitionEnable/>", () => {
  it("should render component", () => {
    pom.interceptApis([pom.api.alertDefinitionTemplate]);
    cy.mount(
      <AlertDefinitionEnable
        alertDefinition={alertDefinitionOne}
        onChange={cy.stub().as("onChange")}
      />,
    );
    pom.waitForApis();
    pom.root.should("exist");
  });
  it("should render component with error msg", () => {
    pom.interceptApis([pom.api.alertDefinitionTemplate500Error]);
    cy.mount(
      <AlertDefinitionEnable
        alertDefinition={alertDefinitionOne}
        onChange={cy.stub().as("onChange")}
      />,
    );
    pom.waitForApis();
    pom.root.should("exist");
    pom.root.contains("no enable info");
  });
});
