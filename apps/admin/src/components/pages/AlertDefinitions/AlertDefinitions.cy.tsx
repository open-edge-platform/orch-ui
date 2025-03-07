/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import AlertDefinitions from "./AlertDefinitions";
import AlertDefinitionsPom from "./AlertDefinitions.pom";

const pom = new AlertDefinitionsPom();
describe("<AlertDefinitions/>", () => {
  it("should render component", () => {
    cy.mount(<AlertDefinitions />);
    pom.root.should("exist");
    cyGet("alertDefinitionsList").should("exist");
  });
});
