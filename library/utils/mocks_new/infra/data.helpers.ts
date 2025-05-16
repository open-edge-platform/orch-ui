/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";

/**
 * Aggregates metadata with inheritedMetadata
 */
export const combineMetadata = <
  T extends { metadata?: infra.Metadata; inheritedMetadata?: infra.Metadata },
>(
  obj?: T,
): infra.Metadata => {
  if (!obj) {
    return [];
  }

  const m: infra.Metadata = [];
  if (obj.metadata) {
    m.concat(...obj.metadata);
  }
  if (obj.inheritedMetadata) {
    m.concat(...obj.inheritedMetadata);
  }
  return m;
};

export const generateRegion = (
  id: string,
  type: string,
  name: string,
  parentRegion?: infra.RegionRead,
  rest?: Partial<Omit<infra.RegionRead, "regionID" | "resourceId" | "name">>,
): infra.RegionRead => ({
  regionID: id,
  resourceId: id,
  name,
  metadata: [{ key: type, value: name }],
  parentRegion,
  inheritedMetadata: combineMetadata(parentRegion),
  ...rest,
});

export const generateSite = (
  id: string,
  name: string,
  region: infra.RegionRead,
  rest?: Partial<
    Omit<infra.SiteRead, "resourceId" | "siteID" | "name" | "region">
  >,
): infra.SiteRead => ({
  resourceId: id,
  siteID: id,
  name,
  region,
  ...rest,
});

export const generateProvider = (
  name: string,
  apiEndpoint: string,
  providerKind: infra.ProviderKind,
  rest?: Partial<
    Omit<infra.ProviderRead, "name" | "apiEndpoint" | "providerKind">
  >,
): infra.ProviderRead => ({
  name,
  apiEndpoint,
  providerKind,
  ...rest,
});
