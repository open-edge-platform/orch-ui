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
import { alertDefinitionMocks } from "./alert-definitions";

const hostConnectionLostAlert = generateAlert(
  alertDefinitionMocks.hostConnectionLostAlertDefinition.id as string,
  {
    alert_category: "Health",
    alert_context: "host",
    host_uuid: assignedWorkloadHostOne.uuid as string,
  },
);

const hostErrorAlert = generateAlert(
  alertDefinitionMocks.hostErrorAlertDefinition.id as string,
  {
    alert_category: "Health",
    alert_context: "host",
    host_uuid: "4c4c4544-004e-3710-8043-b6c04f4d5033",
  },
);

const hostCpuUsageAlert = generateAlert(
  alertDefinitionMocks.hostCpuUsageAlertDefinition.id as string,
  {
    alert_category: "Health",
    alert_context: "host",
    host_uuid: "4c4c4544-0056-4810-8053-b8c04f595233",
  },
);

const hostRamUsageAlert = generateAlert(
  alertDefinitionMocks.hostRamUsageAlertDefinition.id as string,
  {
    alert_category: "Health",
    alert_context: "host",
    host_uuid: "4c4c4544-0035-3070-8030-c4c04f4a4633",
  },
);

const deploymentDownAlert = generateAlert(
  alertDefinitionMocks.deploymentDownAlertDefinition.id as string,
  {
    alert_category: "Deployment",
    alert_context: "deployment",
    deployment_id: deploymentOne.deployId as string,
  },
);

const deploymentErrorAlert = generateAlert(
  alertDefinitionMocks.deploymentErrorAlertDefinition.id as string,
  {
    alert_category: "Deployment",
    alert_context: "deployment",
    deployment_id: deploymentTwo.deployId as string,
  },
);

const clusterDownAlert = generateAlert(
  alertDefinitionMocks.clusterDownAlertDefinition.id as string,
  {
    alert_category: "Health",
    alert_context: "cluster",
    cluster_name: "clusterA",
  },
);

const clusterErrorAlert = generateAlert(
  alertDefinitionMocks.clusterErrorAlertDefinition.id as string,
  {
    alert_category: "Health",
    alert_context: "cluster",
    cluster_name: "clusterB",
  },
);

const clusterCpuUsageAlert = generateAlert(
  alertDefinitionMocks.clusterCpuUsageAlertDefinition.id as string,
  {
    alert_category: "Health",
    alert_context: "cluster",
    cluster_name: "clusterC",
  },
);

const clusterRamUsageAlert = generateAlert(
  alertDefinitionMocks.clusterRamUsageAlertDefinition.id as string,
  {
    alert_category: "Health",
    alert_context: "cluster",
    cluster_name: "clusterD",
  },
);

const clusterRamUsageAlertNoSource = generateAlert(
  alertDefinitionMocks.clusterRamUsageAlertDefinition.id as string,
  {
    alert_category: "Health",
  },
);

export const alertMocks = {
  hostConnectionLostAlert,
  hostErrorAlert,
  hostCpuUsageAlert,
  hostRamUsageAlert,
  deploymentDownAlert,
  deploymentErrorAlert,
  clusterDownAlert,
  clusterErrorAlert,
  clusterCpuUsageAlert,
  clusterRamUsageAlert,
  clusterRamUsageAlertNoSource,
};
