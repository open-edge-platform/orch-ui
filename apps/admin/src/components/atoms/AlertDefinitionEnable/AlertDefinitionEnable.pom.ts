/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { omApi } from "@orch-ui/apis";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { alertDefinitionTemplateOne } from "@orch-ui/utils";
import { dataCy } from "./AlertDefinitionEnable";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "alertDefinitionTemplate" | "alertDefinitionTemplate500Error";

const endpoints: CyApiDetails<
  ApiAliases,
  omApi.GetProjectAlertDefinitionRuleApiResponse
> = {
  alertDefinitionTemplate: {
    route: "**/alerts/definitions/*/templates?",
    response: alertDefinitionTemplateOne,
  },
  alertDefinitionTemplate500Error: {
    route: "**/alerts/definitions/*/templates?",
    statusCode: 500,
  },
};

class AlertDefinitionEnablePom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
export default AlertDefinitionEnablePom;
