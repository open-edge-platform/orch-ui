/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import RegisterHosts from "./RegisterHosts";
import RegisterHostsPom from "./RegisterHosts.pom";

const pom = new RegisterHostsPom();
describe("<RegisterHosts/>", () => {
  it("should render component", () => {
    cy.mount(<RegisterHosts />);
    pom.root.should("exist");
  });
});
