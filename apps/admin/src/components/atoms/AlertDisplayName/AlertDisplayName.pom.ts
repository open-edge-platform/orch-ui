/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { alertDefinitionTemplateOne } from "@orch-ui/utils";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "getAlertTemplate" | "getAlertTemplateError";

const mockAlert = {
  ...alertDefinitionTemplateOne,
  alert: "alert-name",
  annotations: {
    ...alertDefinitionTemplateOne.annotations,
    description: "Host $labels.host_uuid connection lost.",
    display_name: "Host - Connection Lost",
    summary: "Host has lost connection.",
  },
};

const alertTemplateUrl = "**/alerts/definitions/**/template**";
const alertTemplateEndpoints: CyApiDetails<
  ApiAliases,
  omApi.GetProjectAlertDefinitionRuleApiResponse
> = {
  getAlertTemplate: {
    route: alertTemplateUrl,
    statusCode: 200,
    response: mockAlert,
  },
  getAlertTemplateError: {
    route: alertTemplateUrl,
    statusCode: 500,
    networkError: true,
  },
};

class AlertDisplayNamePom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = "alertDisplayName") {
    super(rootCy, [...dataCySelectors], alertTemplateEndpoints);
  }
}
export default AlertDisplayNamePom;
