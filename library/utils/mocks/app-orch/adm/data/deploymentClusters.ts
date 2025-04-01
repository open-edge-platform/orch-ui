/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import {
  clusterOneId,
  clusterOneName,
  clusterThreeId,
  clusterThreeName,
  clusterTwoId,
  clusterTwoName,
} from "../../../cluster-orch";
import {
  deploymentClusterApps,
  deploymentClusterNotReadyId,
  deploymentClusterUnknownId,
} from "./deploymentApps";

export const deploymentWithMinimalDataId = "1111-1111";
export const deploymentWithAllDataId = "1111-2222";
export const deploymentWithNotReadyDataId = "1111-3333";
export const deploymentWithUnkownDataId = "1111-4444";

/**
 * @deprecated create shared/src/mocks/app-orch/appResourceManager/clusters.ts instead
 * and make sure the cluster-id matches the one define in shared/src/mocks/cluster-orch/clusters.ts
 */
const deploymentClusterReady = (id: string, name: string): adm.ClusterRead => ({
  apps: deploymentClusterApps[id],
  id: id,
  name,
  status: {
    state: "RUNNING",
    message: "ready",
    summary: {
      down: 2,
      running: 3,
      total: 5,
      type: "",
    },
  },
});
const deploymentClusterNotReady = (name: string): adm.ClusterRead => ({
  apps: deploymentClusterApps[deploymentClusterNotReadyId],
  id: deploymentClusterNotReadyId,
  name,
  status: {
    state: "DOWN",
    message: "not-ready",
    summary: {
      down: 0,
      running: 0,
      total: 0,
      type: "",
    },
  },
});

const deploymentClusterUnkown = (name: string): adm.ClusterRead => ({
  apps: deploymentClusterApps[deploymentClusterUnknownId],
  id: deploymentClusterUnknownId,
  name,
  status: {
    state: "UNKNOWN",
    message: "unknown",
    summary: {
      down: 0,
      running: 0,
      total: 0,
      type: "",
    },
  },
});

/**
 * @deprecated create shared/src/mocks/app-orch/appResourceManager/clusters.ts instead
 * and make sure the cluster-id matches the one define in shared/src/mocks/cluster-orch/clusters.ts
 */
export const deploymentClusters: { [key: string]: adm.ClusterRead[] } = {
  [deploymentWithAllDataId]: [
    deploymentClusterReady(clusterOneId, clusterOneName),
    deploymentClusterReady(clusterTwoId, clusterTwoName),
    deploymentClusterReady(clusterThreeId, clusterThreeName),
    deploymentClusterNotReady(clusterThreeName),
    deploymentClusterUnkown(clusterThreeName),
  ],
  [deploymentWithMinimalDataId]: [],
};

export const deploymentsPerCluster: adm.DeploymentServiceListDeploymentsPerClusterApiResponse =
  {
    deploymentInstancesCluster: [
      {
        apps: [
          {
            id: "appId1",
            name: "appName",
            status: {
              message: "appMessage",
              state: "RUNNING",
              summary: {
                down: 2,
                running: 3,
                total: 5,
                type: "appStatusType",
              },
            },
          },
        ],
        deploymentDisplayName: "deploymentDisplayName",
        deploymentName: "deploymentName",
        deploymentUid: "deploymentUid",
        status: {
          message: "deploymentStatusMessage",
          state: "RUNNING",
          summary: {
            down: 2,
            running: 3,
            total: 5,
            type: "deploymentStatusType",
          },
        },
      },
    ],
    totalElements: 1,
  };
