/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { TreePom } from "@orch-ui/components";
import { CyApiDetails, cyGet, CyPom } from "@orch-ui/tests";
import { RegionPom } from "../../../../components/atom/locations/Region/Region.pom";
import { SitePom } from "../../../../components/atom/locations/Site/Site.pom";

const dataCySelectors = ["apiError", "region"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "getRootRegionsMocked"
  | "getRoot1RegionsMocked"
  | "getRootRegionsEmptyMocked"
  | "getRegions500"
  | "getLocationsMocked"
  | "getSitesMocked";

const endpoints: CyApiDetails<ApiAliases> = {
  getRootRegionsMocked: {
    route: "**/regions*NOT%20has%28parentRegion%29*",
    statusCode: 200,
    response: {
      hasNext: false,
      regions: [{ resourceId: "root-1", name: "Root 1" }],
    } as eim.GetV1ProjectsByProjectNameRegionsApiResponse,
  },
  getRootRegionsEmptyMocked: {
    route: "**/regions*NOT%20has%28parentRegion%29*",
    statusCode: 200,
    response: {
      hasNext: false,
      regions: [],
      totalElements: 0,
    } as eim.GetV1ProjectsByProjectNameRegionsApiResponse,
  },
  getRoot1RegionsMocked: {
    route: "**/regions*parentRegion.resourceId%3D%22root-1%22*",
    statusCode: 200,
    response: {
      hasNext: false,
      regions: [
        { resourceId: "region-1.1", name: "Region 1.1" },
        { resourceId: "region-1.2", name: "Region 1.2" },
      ],
    } as eim.GetV1ProjectsByProjectNameRegionsApiResponse,
  },
  getRegions500: {
    route: "**/regions*",
    statusCode: 500,
    networkError: true,
  },
  getLocationsMocked: {
    route: "**/locations*",
    statusCode: 200,
    response: {
      nodes: [
        {
          name: "site-1",
          parentId: "region-232c6321",
          resourceId: "site-6a754398",
          type: "RESOURCE_KIND_SITE",
        },
        {
          name: "SantaClara",
          parentId: "",
          resourceId: "region-232c6321",
          type: "RESOURCE_KIND_REGION",
        },
      ],
    },
  },
  getSitesMocked: {
    route: "**/sites*",
    statusCode: 200,
    response: {
      hasNext: false,
      sites: [
        {
          resourceId: "site-1",
          name: "Site 1",
          region: { resourceId: "1", name: "Root 1" },
        },
      ],
      totalElements: 1,
    } as eim.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse,
  },
};

export class RegionSiteTreePom extends CyPom<Selectors, ApiAliases> {
  public tree = new TreePom();
  public region = new RegionPom();
  public site = new SitePom();

  constructor(public rootCy: string = "regionSiteTree") {
    super(rootCy, [...dataCySelectors], endpoints);
  }

  public expandFirstRootMocked(): void {
    this.interceptApis([
      this.api.getRoot1RegionsMocked,
      this.api.getSitesMocked,
    ]);
    cyGet("treeExpander").click();
    this.waitForApis();
  }

  public expandRegion(name: string): void {
    cy.contains(name).should("be.visible");
    this.root
      .dataCy("region")
      .contains(name)
      .parentsUntil('[data-cy="treeBranch"]')
      .last()
      .parent()
      .within(() => {
        cy.dataCy("treeExpander").click();
      });
  }

  public selectSite(name: string) {
    // assumes the site is already visible
    this.root
      .dataCy("siteName")
      .contains(name)
      .parent()
      .dataCy("selectSiteRadio")
      .click();
  }
}
