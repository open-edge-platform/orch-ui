/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { alertDefinitionTemplateOne } from "@orch-ui/utils";
import { dataCy } from "./AlertDefinitionDuration";

const activeProject = structuredClone(defaultActiveProject);

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "alertDefinitionTemplate" | "alertDefinitionTemplate500Error";

const endpoints: CyApiDetails<
  ApiAliases,
  omApi.GetProjectAlertDefinitionRuleApiResponse
> = {
  alertDefinitionTemplate: {
    route: `**/projects/${activeProject.name}/alerts/definitions/*/template?`,
    response: alertDefinitionTemplateOne,
  },
  alertDefinitionTemplate500Error: {
    route: `**/projects/${activeProject.name}/alerts/definitions/*/template?`,
    statusCode: 500,
  },
};

class AlertDefinitionDurationPom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
export default AlertDefinitionDurationPom;
