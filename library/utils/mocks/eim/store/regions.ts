/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { BaseStore } from "./baseStore";
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
} from "./iaasIds";
import { SiteStore } from "./sites";
import { StoreUtils } from "./utils";

/**
 * Aggregates eim.Metadata from the current region and the inherited ones
 */
export const combineMetadata = (r?: eim.RegionRead): eim.Metadata => {
  if (!r) {
    return [];
  }

  const m: eim.Metadata = [];
  if (r.metadata) {
    m.concat(...r.metadata);
  }
  if (r.inheritedMetadata) {
    m.concat(...r.inheritedMetadata);
  }
  return m;
};

/**
 * Generates a mock region, so that the eim.Metadata are set as we expect to save them
 */
export const createRegion = (
  id: string,
  type: string,
  name: string,
  parent?: eim.RegionRead,
): eim.RegionRead => {
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

export const regionUsWest: eim.RegionRead = createRegion(
  regionUsWestId,
  "Area",
  "Us-West",
);

export const regionSalem: eim.RegionRead = createRegion(
  regionSalemId,
  "City",
  "Salem",
  regionUsWest,
);

export const regionPortland: eim.RegionRead = createRegion(
  regionPortlandId,
  "City",
  "Portland",
  regionUsWest,
);

export const regionAshland: eim.RegionRead = createRegion(
  regionAshlandId,
  "City",
  "Ashland",
  regionUsWest,
);

export const regionCalifornia: eim.RegionRead = createRegion(
  regionCaliforniaId,
  "State",
  "California",
  regionUsWest,
);

export const regionUsMidwest: eim.RegionRead = createRegion(
  regionUsMidwestId,
  "Area",
  "US Midwest",
);

export const regionChicago: eim.RegionRead = createRegion(
  regionChicagoId,
  "City",
  "Chicago",
  regionUsMidwest,
);

export const regionUsEast: eim.RegionRead = createRegion(
  regionUsEastId,
  "Area",
  "Us East",
);

export const regionDayton: eim.RegionRead = createRegion(
  regionDaytonId,
  "City",
  "Dayton",
  regionUsEast,
);

export const regionColumbus: eim.RegionRead = createRegion(
  regionColumbusId,
  "City",
  "Columbus",
  regionUsEast,
);

export const regionEu: eim.RegionRead = createRegion(
  regionEuId,
  "Continent",
  "Europe",
);

export const regionEuSouth: eim.RegionRead = createRegion(
  regionEuSouthId,
  "Area",
  "Southern Europe",
  regionEu,
);

export const regionEuIta: eim.RegionRead = createRegion(
  regionEuItaId,
  "Country",
  "Italy",
  regionEuSouth,
);

export const regions: eim.GetV1ProjectsByProjectNameRegionsApiResponse = {
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
  eim.RegionRead,
  eim.Region
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

  list(parent?: string | null): eim.RegionRead[] {
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

  getTotalSiteInRegion(region: eim.RegionRead, siteStore: SiteStore) {
    if (region.resourceId) {
      let siteList = siteStore.list({ regionId: region.resourceId }).length;
      this.list(region.resourceId).forEach((subRegion) => {
        siteList += this.getTotalSiteInRegion(subRegion, siteStore);
      });
      return siteList;
    }
    return 0;
  }

  convert(body: eim.Region, id?: string): eim.RegionRead {
    const randomString = StoreUtils.randomString();
    return {
      ...body,
      regionID: id ?? `region-${randomString}`,
      resourceId: id ?? `region-${randomString}`,
    };
  }
}
