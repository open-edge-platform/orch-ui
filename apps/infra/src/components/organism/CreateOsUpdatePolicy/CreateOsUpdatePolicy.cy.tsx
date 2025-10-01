/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import CreateOsUpdatePolicy from "./CreateOsUpdatePolicy";
import CreateOsUpdatePolicyPom from "./CreateOsUpdatePolicy.pom";

const pom = new CreateOsUpdatePolicyPom();
describe("<CreateOsUpdatePolicy/>", () => {
  it("should render component", () => {
    cy.mount(<CreateOsUpdatePolicy />);
    pom.root.should("exist");
  });
});

