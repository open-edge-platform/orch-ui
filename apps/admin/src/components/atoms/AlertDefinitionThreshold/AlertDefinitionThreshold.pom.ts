/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { alertDefinitionTemplateOne } from "../../../../../../library/utils/mocks/tenancy/data/alertDefinitionTemplates";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "alertDefinitionTemplate" | "alertDefinitionTemplate500Error";

const endpoints: CyApiDetails<
  ApiAliases,
  omApi.GetProjectAlertDefinitionRuleApiResponse
> = {
  alertDefinitionTemplate: {
    route: "**/alerts/definitions/*/template?",
    response: alertDefinitionTemplateOne,
  },
  alertDefinitionTemplate500Error: {
    route: "**/alerts/definitions/*/template?",
    statusCode: 500,
  },
};

class AlertDefinitionThresholdPom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = "alertDefinitionThreshold") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
export default AlertDefinitionThresholdPom;
