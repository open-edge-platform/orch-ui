/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { GenericStatus } from "@orch-ui/components";
import { HostMock } from "../../mocks";

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

const IS_MOCK_RANDOMIZE_ENABLED = true;

export const randomizeHostList = (hosts: infra.HostRead[]): HostMock[] => {
  if (IS_MOCK_RANDOMIZE_ENABLED) {
    const mockHosts: infra.HostRead[] = hosts.map((host, i) => {
      if (i === 0) {
        return host;
      }
      const status = randomizeHostStatus();
      return {
        ...host,
        ...{
          hostStatus: status.message,
          hostStatusIndication: status.indicator,
          hostStatusTimestamp: status.timestamp,
        },
      };
    });
    return mockHosts as HostMock[];
  }
  return hosts as HostMock[];
};

const randomizeHostStatus = () => {
  return hostStatuses[Math.floor(Math.random() * hostStatuses.length)];
};

const hostStatuses: GenericStatus[] = [
  {
    indicator: "STATUS_INDICATION_IDLE",
    message: "Running",
    timestamp: 1717761389,
  },
  {
    indicator: "STATUS_INDICATION_ERROR",
    message: "Error",
    timestamp: 1717761389,
  },
  {
    indicator: "STATUS_INDICATION_IN_PROGRESS",
    message: "Currently in progress",
    timestamp: 1717761389,
  },
  {
    indicator: "STATUS_INDICATION_UNSPECIFIED",
    message: "Unknown",
    timestamp: 1717761389,
  },
];
