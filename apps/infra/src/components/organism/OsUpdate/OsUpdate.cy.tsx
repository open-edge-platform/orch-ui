/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import OsUpdate from "./OsUpdate";
import OsUpdatePom from "./OsUpdate.pom";

const pom = new OsUpdatePom();
describe("<OsUpdate/>", () => {
  it("should render component", () => {
    cy.mount(<OsUpdate />);
    pom.root.should("exist");
  });
});

