/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import {
  regionAshlandId,
  regionCaliforniaId,
  regionChicagoId,
  regionColumbusId,
  regionDaytonId,
  regionEuId,
  regionEuItaId,
  regionEuSouthId,
  regionPortlandId,
  regionSalemId,
  regionUsEastId,
  regionUsMidwestId,
  regionUsWestId,
} from "../data";
import { BaseStore } from "./baseStore";
import { SiteStore } from "./sites";
import { StoreUtils } from "./utils";

/**
 * Aggregates infra.Metadata from the current region and the inherited ones
 */
export const combineMetadata = (
  r?: infra.RegionResourceRead,
): infra.MetadataItem[] => {
  if (!r) {
    return [];
  }

  const m: infra.MetadataItem[] = [];
  if (r.metadata) {
    m.concat(...r.metadata);
  }
  if (r.inheritedMetadata) {
    m.concat(...r.inheritedMetadata);
  }
  return m;
};

/**
 * Generates a mock region, so that the infra.Metadata are set as we expect to save them
 */
export const createRegion = (
  id: string,
  type: string,
  name: string,
  parent?: infra.RegionResourceRead,
): infra.RegionResourceRead => {
  return {
    regionID: id,
    resourceId: id,
    name: name,
    metadata: [{ key: type, value: name }],
    parentRegion: parent,
    inheritedMetadata: combineMetadata(parent),
  };
};

/* Region order is west to east chronology  */

export const regionUsWest: infra.RegionResourceRead = createRegion(
  regionUsWestId,
  "Area",
  "Us-West",
);

export const regionSalem: infra.RegionResourceRead = createRegion(
  regionSalemId,
  "City",
  "Salem",
  regionUsWest,
);

export const regionPortland: infra.RegionResourceRead = createRegion(
  regionPortlandId,
  "City",
  "Portland",
  regionUsWest,
);

export const regionAshland: infra.RegionResourceRead = createRegion(
  regionAshlandId,
  "City",
  "Ashland",
  regionUsWest,
);

export const regionCalifornia: infra.RegionResourceRead = createRegion(
  regionCaliforniaId,
  "State",
  "California",
  regionUsWest,
);

export const regionUsMidwest: infra.RegionResourceRead = createRegion(
  regionUsMidwestId,
  "Area",
  "US Midwest",
);

export const regionChicago: infra.RegionResourceRead = createRegion(
  regionChicagoId,
  "City",
  "Chicago",
  regionUsMidwest,
);

export const regionUsEast: infra.RegionResourceRead = createRegion(
  regionUsEastId,
  "Area",
  "Us East",
);

export const regionDayton: infra.RegionResourceRead = createRegion(
  regionDaytonId,
  "City",
  "Dayton",
  regionUsEast,
);

export const regionColumbus: infra.RegionResourceRead = createRegion(
  regionColumbusId,
  "City",
  "Columbus",
  regionUsEast,
);

export const regionEu: infra.RegionResourceRead = createRegion(
  regionEuId,
  "Continent",
  "Europe",
);

export const regionEuSouth: infra.RegionResourceRead = createRegion(
  regionEuSouthId,
  "Area",
  "Southern Europe",
  regionEu,
);

export const regionEuIta: infra.RegionResourceRead = createRegion(
  regionEuItaId,
  "Country",
  "Italy",
  regionEuSouth,
);

export const regions: infra.RegionServiceListRegionsApiResponse = {
  hasNext: false,
  regions: [
    regionUsWest,
    regionUsEast,
    regionEu,
    regionCalifornia,
    regionEuSouth,
    regionEuIta,
  ],
  totalElements: 6,
};

export class RegionStore extends BaseStore<
  "resourceId",
  infra.RegionResourceRead,
  infra.RegionResourceWrite
> {
  constructor() {
    super("resourceId", [
      regionUsWest,
      regionPortland,
      regionAshland,
      regionSalem,
      regionUsMidwest,
      regionChicago,
      regionUsEast,
      regionColumbus,
      regionDayton,
      regionEu,
      regionEuSouth,
      regionEuIta,
    ]);
  }

  list(parent?: string | null): infra.RegionResourceRead[] {
    if (parent === "null") {
      return this.resources.filter((r) => r.parentRegion === undefined);
    }
    if (parent) {
      return this.resources.filter(
        (r) =>
          r.parentRegion !== undefined && r.parentRegion.resourceId === parent,
      );
    }
    return this.resources;
  }

  getTotalSiteInRegion(region: infra.RegionResourceRead, siteStore: SiteStore) {
    if (region.resourceId) {
      let siteList = siteStore.list({ regionId: region.resourceId }).length;
      this.list(region.resourceId).forEach((subRegion) => {
        siteList += this.getTotalSiteInRegion(subRegion, siteStore);
      });
      return siteList;
    }
    return 0;
  }

  convert(
    body: infra.RegionResourceWrite,
    id?: string,
  ): infra.RegionResourceRead {
    const randomString = StoreUtils.randomString();
    const currentTime = new Date().toISOString();
    return {
      ...body,
      regionID: id ?? `region-${randomString}`,
      resourceId: id ?? `region-${randomString}`,
      timestamps: {
        createdAt: currentTime,
        updatedAt: currentTime,
      },
      parentRegion: body.parentRegion as infra.RegionResourceRead,
    };
  }
}
