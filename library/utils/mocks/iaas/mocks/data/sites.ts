/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CrudData } from "shared";
import {
  siteBoston,
  sitePortland,
  siteSantaClara,
  regionEuId,
  regionUsEastId,
  regionUsWestId,
  siteRestaurantOne,
} from "../../store";
import {
  GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse,
  Site,
} from "../../store/iaas";

/**
 * @deprecated
 */
export const sites: { [regionId: string]: Site[] } = {
  [regionUsWestId]: [sitePortland, siteSantaClara, siteRestaurantOne],
  [regionUsEastId]: [siteBoston],
  [regionEuId]: [],
};

/**
 * @deprecated
 */
export const getSitesByRegion = (
  regionId: string
): GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse => {
  return {
    has_next: false,
    sites: sites[regionId],
  };
};

/**
 * @deprecated
 */
const all: Site[] = Object.keys(sites).reduce((s, regionId) => {
  return [...s, ...sites[regionId]];
}, []);

/**
 * @deprecated
 */
export const allSites: GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse =
  {
    has_next: false,
    sites: all,
  };

/**
 * @deprecated
 */
export const data: CrudData<Site> = {
  create: sitePortland,
  read: sitePortland,
  update: {
    ...sitePortland,
    name: `${sitePortland.name} Updated`,
  },
  delete: sitePortland,
};
