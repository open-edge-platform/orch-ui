/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ApiErrorPom } from "@orch-ui/components";
import { osUbuntuId } from "@orch-ui/utils";
import OsProfileDropdown from "./OsProfileDropdown";
import OsProfileDropdownPom from "./OsProfileDropdown.pom";

const pom = new OsProfileDropdownPom();
const apiErrorPom = new ApiErrorPom();
describe("<OsProfileDropdown />", () => {
  it("should render select of os resources", () => {
    pom.interceptApis([pom.api.getOSResources]);
    cy.mount(<OsProfileDropdown />);
    pom.waitForApis();
    pom.dropdown.openDropdown(pom.root);
    pom.dropdown.selectDropdownValue(
      pom.root,
      "osProfile",
      osUbuntuId,
      osUbuntuId,
    );
  });
  it("should handle 500 error", () => {
    pom.interceptApis([pom.api.getOSResourcesError500]);
    cy.mount(<OsProfileDropdown />);
    pom.waitForApis();
    apiErrorPom.root.should("be.visible");
  });
  it("should handle empty response", () => {
    pom.interceptApis([pom.api.getOSResourcesEmpty]);
    cy.mount(<OsProfileDropdown />);
    pom.waitForApis();
    pom.el.emptyMessage.should("be.visible");
  });
});
