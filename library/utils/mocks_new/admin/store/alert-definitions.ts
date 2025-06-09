/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import { alertDefinitionMocks } from "../data/alert-definitions";

const multipleAlertDefinitions: omApi.AlertDefinition[] = [
  alertDefinitionMocks.hostConnectionLostAlertDefinition,
  alertDefinitionMocks.hostErrorAlertDefinition,
  alertDefinitionMocks.hostCpuUsageAlertDefinition,
  alertDefinitionMocks.hostRamUsageAlertDefinition,
  alertDefinitionMocks.deploymentDownAlertDefinition,
  alertDefinitionMocks.deploymentErrorAlertDefinition,
  alertDefinitionMocks.clusterDownAlertDefinition,
  alertDefinitionMocks.clusterErrorAlertDefinition,
  alertDefinitionMocks.clusterCpuUsageAlertDefinition,
  alertDefinitionMocks.clusterRamUsageAlertDefinition,
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
