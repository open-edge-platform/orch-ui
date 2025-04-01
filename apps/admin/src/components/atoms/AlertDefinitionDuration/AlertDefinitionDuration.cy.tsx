/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { defaultActiveProject as activeProject } from "@orch-ui/tests";
import { alertDefinitionOne } from "@orch-ui/utils";
import AlertDefinitionDuration from "./AlertDefinitionDuration";
import AlertDefinitionDurationPom from "./AlertDefinitionDuration.pom";

const pom = new AlertDefinitionDurationPom();
describe("<AlertDefinitionDuration/>", () => {
  it("should render component", () => {
    pom.interceptApis([pom.api.alertDefinitionTemplate]);
    cy.mount(
      <AlertDefinitionDuration
        alertDefinition={alertDefinitionOne}
        onChange={cy.stub()}
      />,
      {
        activeProject,
      },
    );
    pom.waitForApis();
    pom.root.should("exist");
    pom.root.find("input").first().should("have.value", 30);
  });
  it("should render component with error msg", () => {
    pom.interceptApis([pom.api.alertDefinitionTemplate500Error]);
    cy.mount(
      <AlertDefinitionDuration
        alertDefinition={alertDefinitionOne}
        onChange={cy.stub()}
      />,
      {
        activeProject,
      },
    );
    pom.waitForApis();
    pom.root.should("exist");
    pom.root.contains("no duration");
  });
});
