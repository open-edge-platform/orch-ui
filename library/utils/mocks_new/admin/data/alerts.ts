/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import {
  deploymentOne,
  deploymentTwo,
} from "../../../mocks/app-orch/adm/deployments";
import { assignedWorkloadHostOne } from "../../../mocks/infra/store/hosts";
import {
  clusterCpuUsageAlertDefinition,
  clusterDownAlertDefinition,
  clusterErrorAlertDefinition,
  clusterRamUsageAlertDefinition,
  deploymentDownAlertDefinition,
  deploymentErrorAlertDefinition,
  hostConnectionLostAlertDefinition,
  hostCpuUsageAlertDefinition,
  hostErrorAlertDefinition,
  hostRamUsageAlertDefinition,
} from "./alert-definitions";

export const hostConnectionLostAlert: omApi.Alert = {
  alertDefinitionId: hostConnectionLostAlertDefinition.id,
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  status: { state: "active" },
  fingerprint: "fingerprint",
  labels: {
    alert_category: "Health",
    alert_context: "host",
    host_uuid: assignedWorkloadHostOne.uuid as string,
  },
  annotations: { description: "accumsan ante sagittis ege" },
};

export const hostErrorAlert: omApi.Alert = {
  alertDefinitionId: hostErrorAlertDefinition.id,
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  status: { state: "active" },
  fingerprint: "fingerprint",
  labels: {
    alert_category: "Health",
    alert_context: "host",
    host_uuid: "4c4c4544-004e-3710-8043-b6c04f4d5033",
  },
  annotations: { description: "accumsan ante sagittis ege" },
};

export const hostCpuUsageAlert: omApi.Alert = {
  alertDefinitionId: hostCpuUsageAlertDefinition.id,
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  status: { state: "active" },
  fingerprint: "fingerprint",
  labels: {
    alert_category: "Health",
    alert_context: "host",
    host_uuid: "4c4c4544-0056-4810-8053-b8c04f595233",
  },
  annotations: { description: "accumsan ante sagittis ege" },
};

export const hostRamUsageAlert: omApi.Alert = {
  alertDefinitionId: hostRamUsageAlertDefinition.id,
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  status: { state: "active" },
  fingerprint: "fingerprint",
  labels: {
    alert_category: "Health",
    alert_context: "host",
    host_uuid: "4c4c4544-0035-3070-8030-c4c04f4a4633",
  },
  annotations: { description: "accumsan ante sagittis ege" },
};

export const deploymentDownAlert: omApi.Alert = {
  alertDefinitionId: deploymentDownAlertDefinition.id,
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  status: { state: "active" },
  fingerprint: "fingerprint",
  labels: {
    alert_category: "Deployment",
    alert_context: "deployment",
    deployment_id: deploymentOne.deployId as string,
  },
  annotations: { description: "accumsan ante sagittis ege" },
};

export const deploymentErrorAlert: omApi.Alert = {
  alertDefinitionId: deploymentErrorAlertDefinition.id,
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  status: { state: "active" },
  fingerprint: "fingerprint",
  labels: {
    alert_category: "Deployment",
    alert_context: "deployment",
    deployment_id: deploymentTwo.deployId as string,
  },
  annotations: { description: "accumsan ante sagittis ege" },
};

export const clusterDownAlert: omApi.Alert = {
  alertDefinitionId: clusterDownAlertDefinition.id,
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  status: { state: "active" },
  fingerprint: "fingerprint",
  labels: {
    alert_category: "Health",
    alert_context: "cluster",
    cluster_name: "clusterA",
  },
  annotations: {
    description: "accumsan ante sagittis ege",
  },
};

export const clusterErrorAlert: omApi.Alert = {
  alertDefinitionId: clusterErrorAlertDefinition.id,
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  status: { state: "active" },
  fingerprint: "fingerprint",
  labels: {
    alert_category: "Health",
    alert_context: "cluster",
    cluster_name: "clusterB",
  },
  annotations: { description: "accumsan ante sagittis ege" },
};

export const clusterCpuUsageAlert: omApi.Alert = {
  alertDefinitionId: clusterCpuUsageAlertDefinition.id,
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  status: { state: "active" },
  fingerprint: "fingerprint",
  labels: {
    alert_category: "Health",
    alert_context: "cluster",
    cluster_name: "clusterC",
  },
  annotations: { description: "accumsan ante sagittis ege" },
};

export const clusterRamUsageAlert: omApi.Alert = {
  alertDefinitionId: clusterRamUsageAlertDefinition.id,
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  status: { state: "active" },
  fingerprint: "fingerprint",
  labels: {
    alert_category: "Health",
    alert_context: "cluster",
    cluster_name: "clusterD",
  },
  annotations: { description: "accumsan ante sagittis ege" },
};

export const clusterRamUsageAlertNoSource: omApi.Alert = {
  alertDefinitionId: clusterRamUsageAlertDefinition.id,
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  status: { state: "active" },
  fingerprint: "fingerprint",
  labels: {
    alert_category: "Health",
    alert_context: "cluster",
    cluster_name: "clusterE",
  },
  annotations: { description: "accumsan ante sagittis ege" },
};
