/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ApiErrorPom } from "@orch-ui/components";
import { osUbuntuId } from "@orch-ui/utils";
import { GlobalOsDropdown } from "./GlobalOsDropdown";
import { GlobalOsDropdownPom } from "./GlobalOsDropdown.pom";

const pom = new GlobalOsDropdownPom();
const apiErrorPom = new ApiErrorPom();

describe("<GlobalOsDropdown/>", () => {
  it("should set global value", () => {
    const onChange = cy.spy().as("onChange");
    pom.interceptApis([pom.api.getOSResources]);
    cy.mount(<GlobalOsDropdown onSelectionChange={onChange} />);
    pom.waitForApis();
    pom.root.should("exist");

    pom.dropdown.openDropdown(pom.root);
    pom.dropdown.selectDropdownValue(
      pom.root,
      "globalOs",
      osUbuntuId,
      osUbuntuId,
    );

    cy.get("@onChange").should("have.been.calledWith", osUbuntuId);
  });
  it("should handle api error", () => {
    pom.interceptApis([pom.api.getOSResourcesError500]);
    cy.mount(<GlobalOsDropdown />);
    pom.waitForApis();
    apiErrorPom.root.should("be.visible");
  });
});
