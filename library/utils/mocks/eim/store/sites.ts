/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { BaseStore } from "./baseStore";
import {
  regionAshlandId,
  regionChicagoId,
  regionColumbusId,
  regionDaytonId,
  regionEuId,
  regionPortlandId,
  regionSalemId,
  regionUsEastId,
  regionUsWestId,
  siteBostonId,
  siteMinimartOneId,
  siteMinimartOneName,
  siteMinimartThreeId,
  siteMinimartTwoId,
  siteMinimartTwoName,
  sitePortlandId,
  siteRestaurantOneId,
  siteRestaurantOneName,
  siteRestaurantThreeId,
  siteRestaurantThreeName,
  siteRestaurantTwoId,
  siteRestaurantTwoName,
  siteSantaClaraId,
  siteStoreId,
  siteStoreName,
} from "./iaasIds";
import {
  regionAshland,
  regionChicago,
  regionColumbus,
  regionDayton,
  regionPortland,
  regionSalem,
  regionUsEast,
  regionUsWest,
} from "./regions";
import { StoreUtils } from "./utils";

export const sitePortland: eim.SiteRead = {
  siteID: sitePortlandId,
  resourceId: sitePortlandId,
  inheritedMetadata: {
    ou: [
      {
        key: "region",
        value: regionUsWestId,
      },
    ],
    location: [
      {
        key: "region",
        value: regionUsWestId,
      },
    ],
  },
  name: "Portland",
  siteLat: 90 * Math.pow(10, 7),
  siteLng: 90 * Math.pow(10, 7),
  region: regionUsWest,
  metadata: [
    {
      key: "customer",
      value: "Culvers",
    },
  ],
};

export const siteSantaClara: eim.SiteRead = {
  siteID: siteSantaClaraId,
  resourceId: siteSantaClaraId,
  inheritedMetadata: {
    ou: [
      {
        key: "region",
        value: regionUsWestId,
      },
    ],
    location: [
      {
        key: "region",
        value: regionUsWestId,
      },
    ],
  },
  name: "Santa Clara",
  region: regionUsWest,
  metadata: [],
  siteLat: 0,
  siteLng: 0,
};

export const siteBoston: eim.SiteRead = {
  siteID: siteBostonId,
  resourceId: siteBostonId,
  inheritedMetadata: {
    ou: [
      {
        key: "region",
        value: regionUsEastId,
      },
    ],
    location: [
      {
        key: "region",
        value: regionUsEastId,
      },
    ],
  },
  name: "Boston",
  region: regionUsEast,
  siteLat: 0,
  siteLng: 0,
};

export const siteRestaurantOne: eim.SiteRead = {
  siteID: siteRestaurantOneId,
  resourceId: siteRestaurantOneId,
  inheritedMetadata: {
    ou: [
      {
        key: "region",
        value: regionPortlandId,
      },
    ],
    location: [
      {
        key: "region",
        value: regionPortlandId,
      },
    ],
  },
  name: siteRestaurantOneName,
  region: regionPortland,
  siteLat: 0,
  siteLng: 0,
};

export const siteRestaurantTwo: eim.SiteRead = {
  siteID: siteRestaurantTwoId,
  resourceId: siteRestaurantTwoId,
  inheritedMetadata: {
    ou: [
      {
        key: "region",
        value: regionSalemId,
      },
    ],
    location: [
      {
        key: "region",
        value: regionSalemId,
      },
    ],
  },
  name: siteRestaurantTwoName,
  region: regionSalem,
  metadata: [
    {
      key: "site",
      value: sitePortlandId,
    },
    {
      key: "site",
      value: sitePortlandId,
    },
  ],
  siteLat: 0,
  siteLng: 0,
};

export const siteRestaurantThree: eim.SiteRead = {
  siteID: siteRestaurantThreeId,
  resourceId: siteRestaurantThreeId,
  inheritedMetadata: {
    ou: [
      {
        key: "region",
        value: regionAshlandId,
      },
    ],
    location: [
      {
        key: "region",
        value: regionAshlandId,
      },
      {
        key: "region",
        value: regionUsEastId,
      },
    ],
  },
  name: siteRestaurantThreeName,
  region: regionAshland,
  siteLat: 0,
  siteLng: 0,
};

export const siteMinimartOne: eim.SiteRead = {
  siteID: siteMinimartOneId,
  resourceId: siteMinimartOneId,
  inheritedMetadata: {
    ou: [
      {
        key: "region",
        value: regionColumbusId,
      },
    ],
    location: [
      {
        key: "region",
        value: regionColumbusId,
      },
      {
        key: "region",
        value: regionAshlandId,
      },
    ],
  },
  name: siteMinimartOneName,
  region: regionColumbus,
  metadata: [
    {
      key: "site",
      value: siteMinimartOneId,
    },
    {
      key: "site",
      value: siteMinimartTwoId,
    },
    {
      key: "site",
      value: siteMinimartThreeId,
    },
  ],
  siteLat: 0,
  siteLng: 0,
};

export const siteMinimartTwo: eim.SiteRead = {
  siteID: siteMinimartTwoId,
  resourceId: siteMinimartTwoId,
  inheritedMetadata: {
    ou: [
      {
        key: "region",
        value: regionDaytonId,
      },
    ],
    location: [
      {
        key: "region",
        value: regionDaytonId,
      },
    ],
  },
  name: siteMinimartTwoName,
  region: regionDayton,
  siteLat: 0,
  siteLng: 0,
};

export const siteStore: eim.SiteRead = {
  siteID: siteStoreId,
  resourceId: siteStoreId,
  inheritedMetadata: {
    ou: [
      {
        key: "region",
        value: regionChicagoId,
      },
    ],
    location: [
      {
        key: "region",
        value: regionChicagoId,
      },
    ],
  },
  name: siteStoreName,
  region: regionChicago,
  siteLat: 0,
  siteLng: 0,
};

// Site to work with tree mock data
export const updateSite = {
  siteID: "Site-1",
  resourceId: "Site-1",
  name: "Site-1",
  region: {
    regionID: "Root-1",
    resourceId: "Root-1",
    name: "Root-1",
  },
  siteLat: 0,
  siteLng: 0,
};

/**
 * @deprecated
 */
export const sites: { [regionId: string]: eim.Site[] } = {
  [regionUsWestId]: [sitePortland, siteSantaClara, siteRestaurantOne],
  [regionUsEastId]: [siteBoston],
  [regionEuId]: [],
};

/**
 * @deprecated
 */
export const getSitesByRegion = (
  regionId: string,
): eim.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse => {
  return {
    hasNext: false,
    sites: sites[regionId],
    totalElements: 9,
  };
};

/**
 * @deprecated
 */
const all: eim.Site[] = Object.keys(sites).reduce((s: eim.Site[], regionId) => {
  return [...s, ...sites[regionId]];
}, []);

/**
 * @deprecated
 */
export const allSites: eim.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse =
  {
    hasNext: false,
    sites: all,
    totalElements: 9,
  };

export class SiteStore extends BaseStore<"resourceId", eim.SiteRead, eim.Site> {
  constructor() {
    super("resourceId", [
      siteRestaurantOne,
      siteRestaurantTwo,
      siteRestaurantThree,
      siteMinimartOne,
      siteMinimartTwo,
      siteStore,
    ]);
  }

  list(params?: { regionId: string | null }): eim.SiteRead[] {
    if (params?.regionId != null) {
      return this.resources.filter(
        (r) => r.region?.regionID === params.regionId,
      );
    }
    return this.resources;
  }

  convert(body: eim.SiteWrite, id?: string): eim.SiteRead {
    const randomString = StoreUtils.randomString();
    return {
      siteID: id ?? `site-${randomString}`,
      resourceId: id ?? `site-${randomString}`,
      ...body,
    };
  }
}
