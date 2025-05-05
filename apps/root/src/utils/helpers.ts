/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm, infra } from "@orch-ui/apis";
import { parseError, SharedStorage } from "@orch-ui/utils";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { AppDispatch } from "../store/store";

export interface IHostStatusCounter {
  total: number;
  running: number;
  notRunning: number;
  error: number;
}

/**
 * Given a list of cluster name, find a unique list of host ids
 */
export const getHostsList = async (
  dispatch: AppDispatch,
  clusterNames?: string[],
): Promise<string[]> => {
  if (!clusterNames) {
    return [];
  }
  // fetch details from all clusters at the same time
  const clusters = clusterNames.map((name) => {
    return dispatch(
      cm.clusterManagerApis.endpoints.getV2ProjectsByProjectNameClustersAndName.initiate(
        {
          projectName: SharedStorage.project?.name ?? "",
          name,
        },
      ),
    );
  });

  // wait for all requests to come back
  const clustersDetail = await Promise.all(clusters);

  // create a list of nodes GUID
  const hostGuids = clustersDetail.reduce(
    (list, { data: clustersDetail, isError, error }) => {
      if (isError) {
        throw new Error(
          `getV1ClustersByClusterName returned error: ${parseError(error).data}`,
        );
      }

      const ids = clustersDetail?.nodes?.reduce(
        (l, n) => (n.id ? [n.id, ...l] : l),
        [],
      );
      if (!ids) {
        return list;
      }
      return [...list, ...ids];
    },
    [],
  );

  // unique the list by checking if the index of the retrieved value corresponds to the current item index
  return hostGuids.filter((v, i, a) => a.indexOf(v) === i);
};

export const getHostStatus = async (
  dispatch: AppDispatch,
  uniqueHosts: string[],
): Promise<IHostStatusCounter> => {
  const count: IHostStatusCounter = {
    error: 0,
    notRunning: 0,
    running: 0,
    total: 0,
  };

  // fetch details from all hosts at the same time
  const hosts = uniqueHosts.map((hostId: string) => {
    return dispatch(
      infra.infra.endpoints.getV1ProjectsByProjectNameComputeHosts.initiate({
        filter: `resourceId='${hostId}'`,
        projectName: SharedStorage.project?.name ?? "",
      }),
    );
  });

  // wait for all requests to come back
  const hostsDetail = await Promise.all(hosts);

  hostsDetail.forEach(({ data: hosts, isSuccess, error }) => {
    if (isSuccess) {
      if (hosts.hosts && hosts.hosts[0]) {
        // NOTE that UUID is unique, we should always have a single result
        if (hosts.hosts.length > 1) {
          throw new Error(
            `Duplicated UUID:
            ${hosts.hosts[0].uuid}`,
          );
        }
        const h = hosts.hosts[0];

        switch (h.hostStatusIndicator) {
          case "STATUS_INDICATION_IDLE":
            count.running++;
            break;
          case "STATUS_INDICATION_ERROR":
            count.error++;
            break;
          default:
            count.notRunning++;
        }
      } else {
        // if the Host is not found, for now count it as NotReady
        count.notRunning++;
      }
      count.total++;
    } else {
      throw error;
    }
  });

  return count;
};

/**
 * Given a list of Host UUIDs returns a list of Hosts
 */
export const getHosts = async (
  dispatch: AppDispatch,
  hostIds: string[],
): Promise<infra.HostRead[]> => {
  // fetch details from all hosts at the same time
  const hostsQueries = hostIds.map((resourceId) => {
    return dispatch(
      infra.infra.endpoints.getV1ProjectsByProjectNameComputeHosts.initiate({
        projectName: SharedStorage.project?.name ?? "",
        filter: `resourceId='${resourceId}'`,
      }),
    );
  });

  // wait for all requests to come back
  const hostsDetail = await Promise.all(hostsQueries);

  const hosts: infra.HostRead[] = [];
  hostsDetail.forEach(({ data: _hosts, isSuccess, error }) => {
    if (isSuccess) {
      if (_hosts.hosts && _hosts.hosts[0]) {
        // NOTE that UUID is unique, we should always have a single result
        if (_hosts.hosts.length > 1) {
          throw new Error(
            `Duplicated UUID:
            ${_hosts.hosts[0].uuid}`,
          );
        }
        const h = _hosts.hosts[0];
        hosts.push(h);
      }
    } else {
      throw error;
    }
  });
  return hosts;
};

/**
 * Given a siteId returns the name
 */
export const getSite = async (
  dispatch: AppDispatch,
  siteId: string,
): Promise<infra.Site> => {
  const {
    data: site,
    isError,
    error,
  } = await dispatch(
    infra.infra.endpoints.getV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteId.initiate(
      {
        siteId: siteId,
        regionId: "*", // host have no region information
        projectName: SharedStorage.project?.name ?? "",
      },
    ),
  );
  if (isError) {
    throw error;
  }

  if (!site) {
    const e: FetchBaseQueryError = {
      status: "CUSTOM_ERROR",
      error: "Site not found",
    };
    throw e;
  }

  return site;
};
