/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import OsUpdatePolicy from "./OsUpdatePolicyDetails";
import OsUpdatePolicyPom from "./OsUpdatePolicyDetails.pom";

const pom = new OsUpdatePolicyPom();
describe("<OsUpdatePolicy/>", () => {
  it("should render component", () => {
    cy.mount(<OsUpdatePolicy />);
    pom.root.should("exist");
  });
});

