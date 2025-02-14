/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import HostSearchFilters from "./HostSearchFilters";
import HostSearchFiltersPom from "./HostSearchFilters.pom";

const pom = new HostSearchFiltersPom();
describe("<HostSearchFilters/>", () => {
  beforeEach(() => {
    pom.interceptApis([pom.api.getOperatingSystems]);
    cy.mount(<HostSearchFilters />);
    pom.waitForApis();
  });
  it("should render component", () => {
    pom.root.should("exist");
  });

  describe("os profiles", () => {
    beforeEach(() => {
      pom.el.filterButton.click();
    });
    it("should show the os profile", () => {
      pom.osProfileCheckboxListPom
        .getCheckbox("os-3")
        .should("have.class", "spark-checkbox-un-checked");
      pom.osProfileCheckboxListPom.getCheckbox("os-3").click();
      pom.osProfileCheckboxListPom
        .getCheckbox("os-3")
        .should("have.class", "spark-checkbox-checked");
    });
  });
});
