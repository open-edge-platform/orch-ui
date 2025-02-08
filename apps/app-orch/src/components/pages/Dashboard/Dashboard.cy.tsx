/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import Dashboard from "./Dashboard";

describe("App Orchestration: <Dashboard />", () => {
  it("will render dashboard component", () => {
    cy.mount(<Dashboard />);
  });
});
