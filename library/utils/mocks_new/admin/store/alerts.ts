/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import { alertMocks } from "../data/alerts";

const multipleAlerts: omApi.Alert[] = [
  alertMocks.hostConnectionLostAlert,
  alertMocks.hostErrorAlert,
  alertMocks.hostCpuUsageAlert,
  alertMocks.hostRamUsageAlert,
  alertMocks.deploymentDownAlert,
  alertMocks.deploymentErrorAlert,
  alertMocks.clusterDownAlert,
  alertMocks.clusterErrorAlert,
  alertMocks.clusterCpuUsageAlert,
  alertMocks.clusterRamUsageAlert,
  alertMocks.clusterRamUsageAlertNoSource, // Added the missing alert
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
