/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import About from "./About";
import AboutPom from "./About.pom";

const pom = new AboutPom();
describe("<About/>", () => {
  it("should render component", () => {
    cy.mount(<About />);
    pom.root.should("exist");
  });
});
