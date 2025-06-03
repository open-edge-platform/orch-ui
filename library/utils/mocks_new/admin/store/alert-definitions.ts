/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import { alertDefinitionMocks } from "../data/alert-definitions";
import { MockUtils } from "../../mock-utils";
import { BaseStore } from "../../base-store";

export default class AlertDefinitionStore extends BaseStore<"id", omApi.AlertDefinition>{
  alertDefinitions: omApi.AlertDefinition[];
  constructor() {
    super("id", [
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
    ]);
  }

  convert(body: omApi.AlertDefinition): omApi.AlertDefinition {
      return {
        ...body,
        name: body.id ?? MockUtils.randomString(),
      };
    }

  list(): omApi.AlertDefinition[] {
    return this.alertDefinitions;
  }

  get(id: string): omApi.AlertDefinition | undefined {
    return this.alertDefinitions.find((ad) => ad.id === id);
  }
}
