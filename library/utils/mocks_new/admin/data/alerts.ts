/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  deploymentOne,
  deploymentTwo,
} from "../../../mocks/app-orch/adm/deployments";
import { assignedWorkloadHostOne } from "../../../mocks/infra/store/hosts";
import { generateAlert } from "../data.helpers";
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

export const hostConnectionLostAlert = generateAlert(
  hostConnectionLostAlertDefinition.id as string,
  {
    alert_category: "Health",
    alert_context: "host",
    host_uuid: assignedWorkloadHostOne.uuid as string,
  },
);

export const hostErrorAlert = generateAlert(
  hostErrorAlertDefinition.id as string,
  {
    alert_category: "Health",
    alert_context: "host",
    host_uuid: "4c4c4544-004e-3710-8043-b6c04f4d5033",
  },
);

export const hostCpuUsageAlert = generateAlert(
  hostCpuUsageAlertDefinition.id as string,
  {
    alert_category: "Health",
    alert_context: "host",
    host_uuid: "4c4c4544-0056-4810-8053-b8c04f595233",
  },
);

export const hostRamUsageAlert = generateAlert(
  hostRamUsageAlertDefinition.id as string,
  {
    alert_category: "Health",
    alert_context: "host",
    host_uuid: "4c4c4544-0035-3070-8030-c4c04f4a4633",
  },
);

export const deploymentDownAlert = generateAlert(
  deploymentDownAlertDefinition.id as string,
  {
    alert_category: "Deployment",
    alert_context: "deployment",
    deployment_id: deploymentOne.deployId as string,
  },
);

export const deploymentErrorAlert = generateAlert(
  deploymentErrorAlertDefinition.id as string,
  {
    alert_category: "Deployment",
    alert_context: "deployment",
    deployment_id: deploymentTwo.deployId as string,
  },
);

export const clusterDownAlert = generateAlert(
  clusterDownAlertDefinition.id as string,
  {
    alert_category: "Health",
    alert_context: "cluster",
    cluster_name: "clusterA",
  },
);

export const clusterErrorAlert = generateAlert(
  clusterErrorAlertDefinition.id as string,
  {
    alert_category: "Health",
    alert_context: "cluster",
    cluster_name: "clusterB",
  },
);

export const clusterCpuUsageAlert = generateAlert(
  clusterCpuUsageAlertDefinition.id as string,
  {
    alert_category: "Health",
    alert_context: "cluster",
    cluster_name: "clusterC",
  },
);

export const clusterRamUsageAlert = generateAlert(
  clusterRamUsageAlertDefinition.id as string,
  {
    alert_category: "Health",
    alert_context: "cluster",
    cluster_name: "clusterD",
  },
);

export const clusterRamUsageAlertNoSource = generateAlert(
  clusterRamUsageAlertDefinition.id as string,
  {
    alert_category: "Health",
    alert_context: "cluster",
    cluster_name: "clusterE",
  },
);
