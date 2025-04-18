/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { alertDefinitionOne, multipleAlertDefinitions } from "@orch-ui/utils";
import AlertDisplayNamePom from "../../atoms/AlertDisplayName/AlertDisplayName.pom";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "alertDefinitionList" | "alertDefinitionSingle";

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
  alertDefinitionSingle: {
    route: "**/alerts/definitions",
    response: {
      alertDefinitions: [
        {
          ...alertDefinitionOne,
          name: "Host - Connection Lost",
        },
      ],
    },
  },
};

class AlertDefinitionsListPom extends CyPom<Selectors, ApiAliases> {
  table: SiTablePom;
  alertDisplayNamePom: AlertDisplayNamePom;
  constructor(public rootCy: string = "alertDefinitionsList") {
    super(rootCy, [...dataCySelectors], endpoints);
    this.table = new SiTablePom();
    this.alertDisplayNamePom = new AlertDisplayNamePom();
  }
}
export default AlertDefinitionsListPom;
