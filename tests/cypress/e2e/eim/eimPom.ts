/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  LocationsPom,
  RegionAndSiteConfigurePom,
  RegionFormPom,
  RegionSiteTreePom,
  SearchPom,
  SiteFormPom,
} from "@orch-ui/infra-poms";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class EimPom extends CyPom<Selectors> {
  public locationPom: LocationsPom;
  public regionFormPom: RegionFormPom;
  public siteFormPom: SiteFormPom;
  public regionSiteTreePom: RegionSiteTreePom;
  public regionAndSiteConfigurePom: RegionAndSiteConfigurePom;
  public searchPom: SearchPom;
  constructor(public rootCy: string) {
    super(rootCy, [...dataCySelectors]);
    this.locationPom = new LocationsPom();
    this.regionFormPom = new RegionFormPom();
    this.siteFormPom = new SiteFormPom();
    this.regionSiteTreePom = new RegionSiteTreePom();
    this.regionAndSiteConfigurePom = new RegionAndSiteConfigurePom();
    this.searchPom = new SearchPom();
  }
}

export default EimPom;
