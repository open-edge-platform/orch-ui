/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import ConfigureAllHosts from "./ConfigureAllHosts";
import ConfigureAllHostsPom from "./ConfigureAllHosts.pom";

const pom = new ConfigureAllHostsPom();
describe("<ConfigureAllHosts/>", () => {
  it("should render component", () => {
    cy.mount(<ConfigureAllHosts />);
    pom.root.should("exist");
  });
});
