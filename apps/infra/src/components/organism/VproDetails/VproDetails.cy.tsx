/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import VproDetails from "./VproDetails";
import VproDetailsPom from "./VproDetails.pom";

const pom = new VproDetailsPom();
describe("<VproDetails/>", () => {
  it("should render component", () => {
    cy.mount(<VproDetails />);
    pom.root.should("exist");
  });
});

