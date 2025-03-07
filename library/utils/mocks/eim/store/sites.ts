/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import {
  regionAshlandId,
  regionChicagoId,
  regionColumbusId,
  regionDaytonId,
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
} from "../data";
import { BaseStore } from "./baseStore";
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

export class SiteStore extends BaseStore<"resourceId", eim.SiteRead, eim.Site> {
  constructor() {
    super("resourceId", [
      sitePortland,
      siteSantaClara,
      siteBoston,
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
    const siteID = id ?? `site-${randomString}`;
    const currentTime = new Date().toISOString();
    const timestamps = {
      createdAt: currentTime,
      updatedAt: currentTime,
    };
    const resultSite: eim.SiteRead = {
      siteID,
      resourceId: siteID,
      ...body,
      timestamps,
      provider: {
        // TODO: Create a store for Providers
        name: `provider-${siteID}`,
        apiEndpoint: "",
        providerKind: "PROVIDER_KIND_BAREMETAL",
        timestamps,
      },
      ou: {
        // TODO: Create a store for OUs
        resourceId: `ou-${siteID}`,
        ouID: `ou-${siteID}`,
        name: `ou-${siteID}`,
        parentOu: undefined,
        inheritedMetadata: [],
        metadata: [],
        timestamps,
      },
      region: body.region as eim.RegionRead,
    };

    return resultSite;
  }
}
