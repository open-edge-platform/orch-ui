/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApiErrorPom } from "@orch-ui/components";
import { regionUsWestId } from "@orch-ui/utils";
import RegionsDropdown from "./RegionsDropdown";
import RegionsDropdownPom from "./RegionsDropdown.pom";

const pom = new RegionsDropdownPom();
const apiErrorPom = new ApiErrorPom();
describe("<RegionsDropdown/>", () => {
  it("should render select of regions", () => {
    pom.interceptApis([pom.api.getRegions]);
    cy.mount(<RegionsDropdown />);
    pom.waitForApis();
    pom.dropdown.openDropdown(pom.root);
    pom.dropdown.selectDropdownValue(
      pom.root,
      "region",
      regionUsWestId,
      regionUsWestId,
    );
  });
  it("should handle 500 error", () => {
    pom.interceptApis([pom.api.getRegionsError500]);
    cy.mount(<RegionsDropdown />);
    pom.waitForApis();
    apiErrorPom.root.should("be.visible");
  });
  it("should handle 404 error", () => {
    pom.interceptApis([pom.api.getRegions404]);
    cy.mount(<RegionsDropdown />);
    pom.waitForApis();
    apiErrorPom.root.should("be.visible");
  });
  it("should handle empty response", () => {
    pom.interceptApis([pom.api.getRegionsEmpty]);
    cy.mount(<RegionsDropdown />);
    pom.waitForApis();
    pom.el.empty.should("be.visible");
  });
});
