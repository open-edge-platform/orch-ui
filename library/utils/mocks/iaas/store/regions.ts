/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import BaseStore from "./baseStore";
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
import StoreUtils from "./utils";

/**
 * Aggregates Metadata from the current region and the inherited ones
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
 * Generates a mock region, so that the Metadata are set as we expect to save them
 */
export const createRegion = (
  id: string,
  type: string,
  name: string,
  parent?: eim.RegionRead,
): eim.RegionRead => {
  return {
    resourceId: id,
    regionID: id,
    name: name,
    metadata: [{ key: type, value: name }],
    parentRegion: parent,
    inheritedMetadata: combineMetadata(parent),
  };
};

export const regionUsWest: eim.RegionRead = createRegion(
  regionUsWestId,
  "Area",
  "Us West",
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

export const regionCalifornia: eim.RegionRead = createRegion(
  regionCaliforniaId,
  "State",
  "California",
  regionUsWest,
);

export const regionEuSouth: eim.RegionRead = createRegion(
  regionEuSouthId,
  "Area",
  "Europe",
  regionEu,
);

export const regionIta: eim.RegionRead = createRegion(
  regionEuItaId,
  "Country",
  "Italy",
  regionEuSouth,
);

export default class RegionStore extends BaseStore<
  "resourceId",
  eim.RegionRead,
  eim.RegionRead
> {
  constructor() {
    super("resourceId", [
      regionUsWest,
      regionUsMidwest,
      regionUsEast,
      regionPortland,
      regionAshland,
      regionChicago,
      regionColumbus,
      regionDayton,
      regionSalem,
    ]);
  }

  list(parent?: string | null): eim.RegionRead[] {
    if (parent) {
      return this.resources.filter((r) => r.parentRegion?.regionID === parent);
    }
    return this.resources;
  }

  convert(body: eim.RegionRead, id?: string): eim.RegionRead {
    return {
      ...body,
      regionID: id ?? `regione-${StoreUtils.randomString()}`,
      resourceId: id ?? `regione-${StoreUtils.randomString()}`,
    };
  }
}
