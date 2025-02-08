/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { regionUsWest } from "@orch-ui/utils";
import RegionCell from "./RegionCell";
import { RegionCellPom } from "./RegionCell.pom";

describe("The RegionCell component", () => {
  let pom: RegionCellPom;

  beforeEach(() => {
    pom = new RegionCellPom();
  });

  describe("when the API return a region", () => {
    it("should render the name", () => {
      pom.interceptApis([pom.api.getRegionSuccess]);
      cy.mount(<RegionCell regionId={regionUsWest.resourceId} />);
      pom.waitForApis();
      pom.root.contains(regionUsWest.name!);
    });
  });

  describe("when the API return no region with a 404 Not Found response", () => {
    it("should render the id", () => {
      pom.interceptApis([pom.api.getRegionNotFound]);
      cy.mount(<RegionCell regionId={regionUsWest.resourceId} />);
      pom.waitForApis();
      pom.root.contains(regionUsWest.resourceId!);
    });
  });

  describe("when no siteId is provided", () => {
    it("should render a dash", () => {
      cy.mount(<RegionCell />);
      pom.root.contains("-");
    });
  });
});
