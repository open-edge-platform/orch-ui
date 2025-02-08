/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { BaseStore } from "../baseStore";
import { StoreUtils } from "../utils";
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
} from "./store";

export const sitePortland: eim.Site = {
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
  kind: "on-prem",
  lat: 90 * Math.pow(10, 7),
  lng: 90 * Math.pow(10, 7),
  // @ts-ignore
  region: regionUsWestId,
  metadata: [
    {
      key: "customer",
      value: "Culvers",
    },
  ],
};

export const siteSantaClara: eim.Site = {
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
  kind: "on-prem",
  // @ts-ignore
  region: regionUsWestId,
  metadata: [],
};

export const siteBoston: eim.Site = {
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
  kind: "on-prem",
  // @ts-ignore
  region: regionUsEastId,
};

export const siteRestaurantOne: eim.Site = {
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
  kind: "on-prem",
  // @ts-ignore
  region: regionPortlandId,
};

export const siteRestaurantTwo: eim.Site = {
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
  kind: "on-prem",
  // @ts-ignore
  region: regionSalemId,
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

export const siteRestaurantThree: eim.Site = {
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
  kind: "on-prem",
  // @ts-ignore
  region: regionAshlandId,
};

export const siteMinimartOne: eim.Site = {
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
  kind: "on-prem",
  // @ts-ignore
  region: regionColumbusId,
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

// @ts-ignore
export const siteMinimartTwo: eim.Site = {
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
  kind: "on-prem",
  // @ts-ignore
  region: regionDaytonId,
};

export const siteStore: eim.Site = {
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
  kind: "on-prem",
  // @ts-ignore
  region: regionChicagoId,
};

// @ts-ignore
export default class SiteStore extends BaseStore<"siteID", eim.Site, eim.Site> {
  constructor() {
    super("siteID", [
      siteRestaurantOne,
      siteRestaurantTwo,
      siteRestaurantThree,
      siteMinimartOne,
      siteMinimartTwo,
      siteStore,
    ]);
  }

  list(params?: { regionId: string | null }): eim.Site[] {
    if (params && params.regionId) {
      return this.resources.filter((r) => r.region === params.regionId);
    }
    return this.resources;
  }

  convert(body: eim.Site, id?: string): eim.Site {
    return {
      // @ts-ignore
      siteID: id ?? `site-${StoreUtils.randomString()}`,
      ...body,
    };
  }
}
