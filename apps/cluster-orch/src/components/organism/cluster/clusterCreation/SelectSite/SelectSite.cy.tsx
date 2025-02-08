/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */
import { siteRestaurantOne } from "../../../../../../../../library/utils/mocks/iaas/sites";
import SelectSite from "./SelectSite";
import { SelectSitePom } from "./SelectSite.pom";

const pom = new SelectSitePom();
describe("<RegionSiteTree/>", () => {
  it("should render component", () => {
    cy.mount(
      <SelectSite
        selectedSite={siteRestaurantOne}
        onSelectedInheritedMeta={() => {}}
      />,
    );
    pom.root.should("exist");
  });
});
