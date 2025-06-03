/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import { alertMocks } from "../data/alerts";
import { BaseStore } from "../../base-store";

export default class AlertStore extends BaseStore<"alertDefinitionId", omApi.Alert>{
  constructor() {
    super("alertDefinitionId", [alertMocks.hostConnectionLostAlert,
      alertMocks.hostErrorAlert,
      alertMocks.hostCpuUsageAlert,
      alertMocks.hostRamUsageAlert,
      alertMocks.deploymentDownAlert,
      alertMocks.deploymentErrorAlert,
      alertMocks.clusterDownAlert,
      alertMocks.clusterErrorAlert,
      alertMocks.clusterCpuUsageAlert,
      alertMocks.clusterRamUsageAlert,
      alertMocks.clusterRamUsageAlertNoSource] );
  }

  convert(body: omApi.Alert): omApi.Alert {
    throw new Error("Not supported by API");
  }

  get(id: string): omApi.Alert | undefined {
    throw new Error("Not supported by API");
  }
}
