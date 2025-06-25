/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
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
  siteOregonPortlandId,
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

export const siteOregonPortland: infra.SiteResourceRead = {
  siteID: siteOregonPortlandId,
  resourceId: siteOregonPortlandId,
  inheritedMetadata: [
    {
      key: "region",
      value: regionUsWestId,
    },
  ],
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

export const siteSantaClara: infra.SiteResourceRead = {
  siteID: siteSantaClaraId,
  resourceId: siteSantaClaraId,
  inheritedMetadata: [
    {
      key: "region",
      value: regionUsWestId,
    },
  ],
  name: "Santa Clara",
  region: regionUsWest,
  metadata: [],
  siteLat: 0,
  siteLng: 0,
};

export const siteBoston: infra.SiteResourceRead = {
  siteID: siteBostonId,
  resourceId: siteBostonId,
  inheritedMetadata: [
    {
      key: "region",
      value: regionUsEastId,
    },
  ],
  name: "Boston",
  region: regionUsEast,
  siteLat: 0,
  siteLng: 0,
};

export const siteRestaurantOne: infra.SiteResourceRead = {
  siteID: siteRestaurantOneId,
  resourceId: siteRestaurantOneId,
  inheritedMetadata: [
    {
      key: "region",
      value: regionPortlandId,
    },
  ],
  name: siteRestaurantOneName,
  region: regionPortland,
  siteLat: 0,
  siteLng: 0,
};

export const siteRestaurantTwo: infra.SiteResourceRead = {
  siteID: siteRestaurantTwoId,
  resourceId: siteRestaurantTwoId,
  inheritedMetadata: [
    {
      key: "region",
      value: regionSalemId,
    },
  ],
  name: siteRestaurantTwoName,
  region: regionSalem,
  metadata: [
    {
      key: "site",
      value: siteOregonPortlandId,
    },
    {
      key: "site",
      value: siteOregonPortlandId,
    },
  ],
  siteLat: 0,
  siteLng: 0,
};

export const siteRestaurantThree: infra.SiteResourceRead = {
  siteID: siteRestaurantThreeId,
  resourceId: siteRestaurantThreeId,
  inheritedMetadata: [
    {
      key: "region",
      value: regionAshlandId,
    },
    {
      key: "region",
      value: regionUsEastId,
    },
  ],
  name: siteRestaurantThreeName,
  region: regionAshland,
  siteLat: 0,
  siteLng: 0,
};

export const siteMinimartOne: infra.SiteResourceRead = {
  siteID: siteMinimartOneId,
  resourceId: siteMinimartOneId,
  inheritedMetadata: [
    {
      key: "region",
      value: regionColumbusId,
    },
    {
      key: "region",
      value: regionAshlandId,
    },
  ],
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

export const siteMinimartTwo: infra.SiteResourceRead = {
  siteID: siteMinimartTwoId,
  resourceId: siteMinimartTwoId,
  inheritedMetadata: [
    {
      key: "region",
      value: regionDaytonId,
    },
  ],
  name: siteMinimartTwoName,
  region: regionDayton,
  siteLat: 0,
  siteLng: 0,
};

export const siteStore: infra.SiteResourceRead = {
  siteID: siteStoreId,
  resourceId: siteStoreId,
  inheritedMetadata: [
    {
      key: "region",
      value: regionChicagoId,
    },
  ],
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

export class SiteStore extends BaseStore<
  "resourceId",
  infra.SiteResourceRead,
  infra.SiteResourceWrite
> {
  constructor() {
    super("resourceId", [
      siteOregonPortland,
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

  list(params?: { regionId: string | null }): infra.SiteResourceRead[] {
    if (params?.regionId != null) {
      return this.resources.filter(
        (r) => r.region?.regionID === params.regionId,
      );
    }
    return this.resources;
  }

  getSiteById(params?: {
    resourceId: string | null;
  }): infra.SiteResourceRead | undefined {
    if (params?.resourceId != null) {
      return this.resources.find((r) => r.resourceId === params.resourceId);
    }
    return undefined;
  }

  convert(body: infra.SiteResourceWrite, id?: string): infra.SiteResourceRead {
    const randomString = StoreUtils.randomString();
    const siteID = id ?? `site-${randomString}`;
    const currentTime = new Date().toISOString();
    const timestamps = {
      createdAt: currentTime,
      updatedAt: currentTime,
    };
    const resultSite: infra.SiteResourceRead = {
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
      region: body.region as infra.RegionResourceRead,
    };

    return resultSite;
  }
}
