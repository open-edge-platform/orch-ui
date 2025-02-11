/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import {
  LocationsPom,
  RegionAndSitePom,
  RegionFormPom,
  RegionSiteTreePom,
  SearchPom,
  SiteFormPom,
  UnconfiguredHostsPom,
} from "@orch-ui/eim-poms";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class EimPom extends CyPom<Selectors> {
  public locationPom: LocationsPom;
  public regionFormPom: RegionFormPom;
  public siteFormPom: SiteFormPom;
  public unconfigureHostsPom: UnconfiguredHostsPom;
  public regionSiteTreePom: RegionSiteTreePom;
  public regionAndSitePom: RegionAndSitePom;
  public searchPom: SearchPom;
  constructor(public rootCy: string) {
    super(rootCy, [...dataCySelectors]);
    this.locationPom = new LocationsPom();
    this.regionFormPom = new RegionFormPom();
    this.siteFormPom = new SiteFormPom();
    this.unconfigureHostsPom = new UnconfiguredHostsPom();
    this.regionSiteTreePom = new RegionSiteTreePom();
    this.regionAndSitePom = new RegionAndSitePom();
    this.searchPom = new SearchPom();
  }
}

export default EimPom;
