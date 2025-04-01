/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import {
  clusterFiveId,
  clusterFourId,
  clusterOneId,
  clusterThreeId,
  clusterTwoId,
} from "../../../cluster-orch";

// clusters
export const deploymentClusterReadyId = [
  clusterOneId,
  clusterTwoId,
  clusterThreeId,
  clusterFourId,
  clusterFiveId,
];
export const deploymentClusterNotReadyId = "cluster-not_ready-id";
export const deploymentClusterUnknownId = "cluster-unknown-id";

// apps
export const deploymentClusterOneAppOneId = "cluster-one-app-one-id";
export const deploymentClusterOneAppTwoId = "cluster-one-app-two-id";
export const deploymentClusterOneAppThreeId = "cluster-one-app-three-id";
export const deploymentClusterOneAppConsoleId = "console";
export const deploymentClusterOneAppWordpressId = "wordpress";

/**
 * @deprecated create shared/src/mocks/app-orch/appResourceManager/apps.ts instead
 */
const deploymentClusterOneAppOne: adm.AppRead = {
  id: deploymentClusterOneAppOneId,
  name: "Engage",
  status: {
    state: "DOWN",
    message: "Image Pull Backoff",
    summary: { down: 0, running: 0, total: 0, type: "" },
  },
};
/**
 * @deprecated create shared/src/mocks/app-orch/appResourceManager/apps.ts instead
 */
const deploymentClusterOneAppTwo: adm.AppRead = {
  id: deploymentClusterOneAppTwoId,
  name: "Visibility",
  status: {
    state: "RUNNING",
    message: "",
    summary: { down: 0, running: 0, total: 0, type: "" },
  },
};
/**
 * @deprecated create shared/src/mocks/app-orch/appResourceManager/apps.ts instead
 */
const deploymentClusterOneAppThree: adm.AppRead = {
  id: deploymentClusterOneAppThreeId,
  name: "Sentinel",
  status: {
    state: "UNKNOWN",
    message: "",
    summary: { down: 0, running: 0, total: 0, type: "" },
  },
};
/**
 * @deprecated create shared/src/mocks/app-orch/appResourceManager/apps.ts instead
 */
const deploymentApps: { [key: string]: adm.AppRead[] } = {};
/**
 * @deprecated create shared/src/mocks/app-orch/appResourceManager/apps.ts instead
 */
deploymentClusterReadyId.map((readyId) => {
  deploymentApps[readyId] = [
    deploymentClusterOneAppOne,
    deploymentClusterOneAppTwo,
    deploymentClusterOneAppThree,
  ];
});
/**
 * @deprecated create shared/src/mocks/app-orch/appResourceManager/apps.ts instead
 */
export const deploymentClusterApps = deploymentApps;
