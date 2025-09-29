/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import OsUpdatePolicy from "./OsUpdatePolicy";
import OsUpdatePolicyPom from "./OsUpdatePolicy.pom";

const pom = new OsUpdatePolicyPom();
describe("<OsUpdatePolicy/>", () => {
  it("should render component", () => {
    cy.mount(<OsUpdatePolicy />);
    pom.root.should("exist");
  });
});

