/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cyGet } from "@orch-ui/tests";
import { PermissionDenied } from "./PermissionDenied";

describe("<PermissionDenied/>", () => {
  it("should render component", () => {
    cy.mount(<PermissionDenied />);
    cyGet("permissionDenied").should("exist");
  });
});
