/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { BaseStore } from "../../base-store";
import { MockUtils } from "../../mock-utils";
import { generateProvider } from "../data.helpers";

export class SiteStore extends BaseStore<
  "resourceId",
  infra.SiteRead,
  infra.Site
> {
  constructor() {
    super("resourceId", []);
  }

  list(params?: { regionId: string | null }): infra.SiteRead[] {
    if (params?.regionId != null) {
      return this.resources.filter(
        (r) => r.region?.regionID === params.regionId,
      );
    }
    return this.resources;
  }

  convert(body: infra.SiteWrite, id?: string): infra.SiteRead {
    const randomString = MockUtils.randomString();
    const currentTime = MockUtils.currentTimestamp();

    const siteID = id ?? `site-${randomString}`;
    const timestamps = {
      createdAt: currentTime,
      updatedAt: currentTime,
    };

    return {
      siteID,
      resourceId: siteID,
      ...body,
      timestamps,
      provider: generateProvider(
        `provider-${siteID}`,
        "",
        "PROVIDER_KIND_BAREMETAL",
        { timestamps },
      ),
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
      region: body.region as infra.RegionRead,
    };
  }
}
