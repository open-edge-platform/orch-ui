/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { alertDefinitionOne } from "@orch-ui/utils";
import AlertDisplayName from "./AlertDisplayName";
import AlertDisplayNamePom from "./AlertDisplayName.pom";

const pom = new AlertDisplayNamePom();
describe("<AlertDisplayName/>", () => {
  it("should render component with display_name", () => {
    pom.interceptApis([pom.api.getAlertTemplate]);
    cy.mount(<AlertDisplayName alertDefinition={alertDefinitionOne} />);
    pom.waitForApis();

    pom.root.should("not.contain.text", alertDefinitionOne.name);
    pom.root.should("contain.text", "Host - Connection Lost");
  });
  it("should render component with name", () => {
    pom.interceptApis([pom.api.getAlertTemplateError]);
    cy.mount(<AlertDisplayName alertDefinition={alertDefinitionOne} />);
    pom.waitForApis();

    pom.root.should("contain.text", alertDefinitionOne.name);
    pom.root.should("not.contain.text", "Host - Connection Lost");
  });
});
