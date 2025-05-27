/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
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
} from "../data/alert-definitions";

const multipleAlertDefinitions: omApi.AlertDefinition[] = [
  hostConnectionLostAlertDefinition,
  hostErrorAlertDefinition,
  hostCpuUsageAlertDefinition,
  hostRamUsageAlertDefinition,
  deploymentDownAlertDefinition,
  deploymentErrorAlertDefinition,
  clusterDownAlertDefinition,
  clusterErrorAlertDefinition,
  clusterCpuUsageAlertDefinition,
  clusterRamUsageAlertDefinition,
];

export default class AlertDefinitionStore {
  alertDefinitions: omApi.AlertDefinition[];
  constructor() {
    this.alertDefinitions = multipleAlertDefinitions;
  }

  list(): omApi.AlertDefinition[] {
    return this.alertDefinitions;
  }

  get(id: string): omApi.AlertDefinition | undefined {
    return this.alertDefinitions.find((ad) => ad.id === id);
  }
}
