/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import {
  clusterCpuUsageAlert,
  clusterDownAlert,
  clusterErrorAlert,
  clusterRamUsageAlert,
  deploymentDownAlert,
  deploymentErrorAlert,
  hostConnectionLostAlert,
  hostCpuUsageAlert,
  hostErrorAlert,
  hostRamUsageAlert,
} from "../data/alerts";

const multipleAlerts: omApi.Alert[] = [
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
];

export default class AlertStore {
  alerts: omApi.Alert[];
  constructor() {
    this.alerts = multipleAlerts;
  }

  list(): omApi.Alert[] {
    return this.alerts;
  }

  get(id: string): omApi.Alert | undefined {
    return this.alerts.find((a) => a.alertDefinitionId === id);
  }
}
