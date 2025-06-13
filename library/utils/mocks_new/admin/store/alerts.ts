/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import { BaseStore } from "../../base-store";
import { alertMocks } from "../data/alerts";

export default class AlertStore extends BaseStore<
  "alertDefinitionId",
  omApi.Alert
> {
  constructor() {
    super("alertDefinitionId", [
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
      alertMocks.clusterRamUsageAlertNoSource,
    ]);
  }

  convert(): omApi.Alert {
    throw new Error("Not supported by API");
  }

  get(): omApi.Alert | undefined {
    throw new Error("Not supported by API");
  }
}
