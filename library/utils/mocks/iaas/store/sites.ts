/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import BaseStore from "./baseStore";
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
import StoreUtils from "./utils";

export const sitePortland: eim.SiteRead = {
  siteID: sitePortlandId,
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
};

export const siteBoston: eim.SiteRead = {
  siteID: siteBostonId,
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
};

export const siteRestaurantOne: eim.SiteRead = {
  resourceId: siteRestaurantOneId,
  siteID: siteRestaurantOneId,
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
};

export const siteRestaurantTwo: eim.SiteRead = {
  resourceId: siteRestaurantTwoId,
  siteID: siteRestaurantTwoId,
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
};

export const siteRestaurantThree: eim.SiteRead = {
  resourceId: siteRestaurantThreeId,
  siteID: siteRestaurantThreeId,
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
};

export const siteMinimartOne: eim.SiteRead = {
  resourceId: siteMinimartOneId,
  siteID: siteMinimartOneId,
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
};

export const siteMinimartTwo: eim.SiteRead = {
  resourceId: siteMinimartTwoId,
  siteID: siteMinimartTwoId,
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
};

export const siteStore: eim.SiteRead = {
  resourceId: siteStoreId,
  siteID: siteStoreId,
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
};

export default class SiteStore extends BaseStore<
  "resourceId",
  eim.SiteRead,
  eim.SiteRead
> {
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
    if (params && params.regionId) {
      return this.resources.filter((r) => r.region === params.regionId);
    }
    return this.resources;
  }

  convert(body: eim.SiteRead, id?: string): eim.SiteRead {
    return {
      siteID: id ?? `site-${StoreUtils.randomString()}`,
      resourceId: id ?? `site-${StoreUtils.randomString()}`,
      ...body,
    };
  }
}
