/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { BaseStore } from "../../base-store";

import { MockUtils } from "../../mock-utils";
import {
  regionAshland,
  regionCalifornia,
  regionChicago,
  regionColumbus,
  regionDayton,
  regionEu,
  regionEuIta,
  regionEuSouth,
  regionPortland,
  regionSalem,
  regionUsEast,
  regionUsMidwest,
  regionUsWest,
} from "../data/regions";

export class RegionStore extends BaseStore<
  "resourceId",
  infra.RegionRead,
  infra.Region
> {
  constructor() {
    super("resourceId", [
      regionUsWest,
      regionSalem,
      regionPortland,
      regionAshland,
      regionCalifornia,
      regionUsMidwest,
      regionChicago,
      regionUsEast,
      regionDayton,
      regionColumbus,
      regionEu,
      regionEuSouth,
      regionEuIta,
    ]);
  }

  list(parent?: string | null): infra.RegionRead[] {
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

  convert(body: infra.Region, id?: string): infra.RegionRead {
    const randomString = MockUtils.randomString();
    const currentTime = MockUtils.currentTimestamp();
    return {
      ...body,
      regionID: id ?? `region-${randomString}`,
      resourceId: id ?? `region-${randomString}`,
      timestamps: {
        createdAt: currentTime,
        updatedAt: currentTime,
      },
      parentRegion: body.parentRegion as infra.RegionRead,
    };
  }
}
