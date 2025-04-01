/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { alertDefinitionOne } from "@orch-ui/utils";
import AlertDefinitionThreshold from "./AlertDefinitionThreshold";
import AlertDefinitionThresholdPom from "./AlertDefinitionThreshold.pom";

const pom = new AlertDefinitionThresholdPom();
describe("<AlertDefinitionThreshold/>", () => {
  it("should render component", () => {
    pom.interceptApis([pom.api.alertDefinitionTemplate]);
    cy.mount(
      <AlertDefinitionThreshold
        alertDefinition={alertDefinitionOne}
        onChange={cy.stub()}
      />,
    );
    pom.waitForApis();
    pom.root.should("exist");
    pom.root.find("input").first().should("have.value", 30);
  });
  it("should render component with error msg", () => {
    pom.interceptApis([pom.api.alertDefinitionTemplate500Error]);
    cy.mount(
      <AlertDefinitionThreshold
        alertDefinition={alertDefinitionOne}
        onChange={cy.stub()}
      />,
    );
    pom.waitForApis();
    pom.root.should("exist");
    pom.root.contains("no threshold");
  });
});
