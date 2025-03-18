/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { multipleAlertDefinitions } from "@orch-ui/utils";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "alertDefinitionList";

const endpoints: CyApiDetails<
  ApiAliases,
  omApi.GetProjectAlertDefinitionsApiResponse
> = {
  alertDefinitionList: {
    route: "**/alerts/definitions",
    response: {
      alertDefinitions: multipleAlertDefinitions,
    },
  },
};

class AlertDefinitionsListPom extends CyPom<Selectors, ApiAliases> {
  table: SiTablePom;
  constructor(public rootCy: string = "alertDefinitionsList") {
    super(rootCy, [...dataCySelectors], endpoints);
    this.table = new SiTablePom();
  }
}
export default AlertDefinitionsListPom;
