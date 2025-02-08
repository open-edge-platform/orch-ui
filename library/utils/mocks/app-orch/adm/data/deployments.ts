/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { adm } from "@orch-ui/apis";
import {
  CompositeApplicationOneVersionOne,
  CompositeApplicationTwoVersionOne,
} from "../../catalog/data/compositeApplication";
import {
  deploymentWithAllDataId,
  deploymentWithMinimalDataId,
  deploymentWithNotReadyDataId,
  deploymentWithUnkownDataId,
} from "../data/deploymentClusters";

/**
 * @deprecated use shared/src/mocks/app-orch/appDeploymentManager/deployments.ts
 */
const generateDraftMetaData = (appName: string) => ({
  appName,
  labels: {
    customer: "Culver",
    region: "West",
    state: "Atlanta",
    key1: "Value1",
    key2: "Value2",
    key3: "Value3",
  },
});

/**
 * @deprecated use shared/src/mocks/app-orch/appDeploymentManager/deployments.ts
 */
const initialDeploymentStatusSummaryValue: adm.Summary = {
  down: 0,
  running: 0,
  total: 0,
  type: "",
};

/**
 * @deprecated use shared/src/mocks/app-orch/appDeploymentManager/deployments.ts
 */
const deploymentStatusMinimal: adm.DeploymentStatusRead = {
  state: "RUNNING",
  message: "ready",
  summary: initialDeploymentStatusSummaryValue,
};

/**
 * @deprecated use shared/src/mocks/app-orch/appDeploymentManager/deployments.ts
 */
const deploymentStatusComplete: adm.DeploymentStatusRead = {
  state: "RUNNING",
  message: "ready",
  summary: {
    down: 2,
    running: 5,
    total: 7,
    type: "",
  },
};

/**
 * @deprecated use shared/src/mocks/app-orch/appDeploymentManager/deployments.ts
 */
const deploymentStatusNotReady: adm.DeploymentStatusRead = {
  state: "DOWN",
  message: "not-ready",
  summary: initialDeploymentStatusSummaryValue,
};

/**
 * @deprecated use shared/src/mocks/app-orch/appDeploymentManager/deployments.ts
 */
const deploymentStatusUnknown: adm.DeploymentStatusRead = {
  state: "UNKNOWN",
  message: "unknown",
  summary: initialDeploymentStatusSummaryValue,
};

/**
 * @deprecated use shared/src/mocks/app-orch/appDeploymentManager/deployments.ts
 */
const deploymentStatusUpgrading: adm.DeploymentStatusRead = {
  state: "UPDATING",
  message: "upgrading",
  summary: { down: 3, running: 4, total: 7, type: "" },
};
/**
 * @deprecated use shared/src/mocks/app-orch/appDeploymentManager/deployments.ts
 */
const deploymentStatusDeploying: adm.DeploymentStatusRead = {
  state: "DEPLOYING",
  message: "deploying",
  summary: { down: 3, running: 4, total: 7, type: "" },
};
/**
 * @deprecated use shared/src/mocks/app-orch/appDeploymentManager/deployments.ts
 */
const deploymentStatusError: adm.DeploymentStatusRead = {
  state: "INTERNAL_ERROR",
  message: "Error",
  summary: { down: 3, running: 4, total: 7, type: "" },
};

/**
 * @deprecated use shared/src/mocks/app-orch/appDeploymentManager/deployments.ts
 */
const deploymentWithMinimalData: adm.DeploymentRead = {
  deployId: deploymentWithMinimalDataId,
  createTime: "2022-03-30T13:29:10Z",
  appName: CompositeApplicationOneVersionOne.name,
  appVersion: CompositeApplicationOneVersionOne.version,
  name: "culver-minimal-deployment",
  displayName: "Culver's Minimal Deployment",
  profileName: "default",
  targetClusters: [],
  status: deploymentStatusMinimal,
};

/**
 * @deprecated use shared/src/mocks/app-orch/appDeploymentManager/deployments.ts
 */
const deploymentWithAllData: adm.DeploymentRead = {
  appName: CompositeApplicationTwoVersionOne.name,
  appVersion: CompositeApplicationTwoVersionOne.version,
  createTime: "2023-03-30T22:29:10Z",
  deployId: deploymentWithAllDataId,
  name: "culver-complete-deployment",
  displayName: "Culver's Complete Deployment",
  overrideValues: [],
  profileName: "default",
  status: deploymentStatusComplete,
  targetClusters: [1, 2, 3, 4, 5, 6, 7].map((nameIndex) =>
    generateDraftMetaData(`Culver App ${nameIndex}`),
  ),
};

/**
 * @deprecated use shared/src/mocks/app-orch/appDeploymentManager/deployments.ts
 */
const deploymentWithNotReadyData: adm.DeploymentRead = {
  deployId: deploymentWithNotReadyDataId,
  appName: "Culver Bundle",
  appVersion: "1.0.0",
  name: "culver-notready-deployment",
  displayName: "Culver's Deployment - Not Ready",
  profileName: "default",
  createTime: "2023-03-17T22:29:10Z",
  targetClusters: [],
  status: deploymentStatusNotReady,
};

/**
 * @deprecated use shared/src/mocks/app-orch/appDeploymentManager/deployments.ts
 */
const deploymentWithData: adm.DeploymentRead = {
  deployId: deploymentWithUnkownDataId,
  appName: "Culver Bundle",
  appVersion: "1.0.0",
  name: "culver-Uninitialized-deployment",
  displayName: "Culver's Deployment - Uninitialized",
  profileName: "default",
  createTime: "2023-03-27T22:29:10Z",
  targetClusters: [],
};

/**
 * @deprecated use shared/src/mocks/app-orch/appDeploymentManager/deployments.ts
 */
const deploymentWithUnknownData: adm.DeploymentRead = {
  status: deploymentStatusUnknown,
  ...deploymentWithData,
};

/**
 * @deprecated use shared/src/mocks/app-orch/appDeploymentManager/deployments.ts
 */
export const deploymentWithDeployingState: adm.DeploymentRead = {
  status: deploymentStatusDeploying,
  ...deploymentWithData,
};

/**
 * @deprecated use shared/src/mocks/app-orch/appDeploymentManager/deployments.ts
 */
export const deploymentWithErrorState: adm.DeploymentRead = {
  status: deploymentStatusError,
  ...deploymentWithData,
};

/**
 * @deprecated use shared/src/mocks/app-orch/appDeploymentManager/deployments.ts
 */
export const deploymentWithUpgradingState: adm.DeploymentRead = {
  status: deploymentStatusUpgrading,
  ...deploymentWithData,
};

/**
 * @deprecated use shared/src/mocks/app-orch/appDeploymentManager/deployments.ts
 */
export const deployments: adm.ListDeploymentsResponse = {
  deployments: [
    deploymentWithMinimalData,
    deploymentWithAllData,
    deploymentWithNotReadyData,
    deploymentWithUnknownData,
    deploymentWithUpgradingState,
    deploymentWithDeployingState,
    deploymentWithErrorState,
  ],
  totalElements: 7,
};

/**
 * @deprecated use shared/src/mocks/app-orch/appDeploymentManager/deployments.ts
 */
export const deploymentsEmpty: adm.ListDeploymentsResponse = {
  deployments: [],
  totalElements: 0,
};
