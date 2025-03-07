/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { multipleAlertDefinitions, multipleAlerts } from "@orch-ui/utils";
import AlertDrawerPom from "../AlertDrawer/AlertDrawer.pom";
import { dataCy } from "./AlertsList";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "alertList" | "alertDefinitionList";

const endpoints: CyApiDetails<
  ApiAliases,
  | omApi.GetProjectAlertsApiResponse
  | omApi.GetProjectAlertDefinitionsApiResponse
> = {
  alertList: {
    route: "**/alerts*",
    response: { alerts: multipleAlerts },
  },
  alertDefinitionList: {
    route: "**/alerts/definitions*",
    response: {
      alertDefinitions: multipleAlertDefinitions,
    },
  },
};

class AlertsListPom extends CyPom<Selectors, ApiAliases> {
  table: SiTablePom;
  drawer: AlertDrawerPom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], endpoints);
    this.table = new SiTablePom();
    this.drawer = new AlertDrawerPom();
  }
}
export default AlertsListPom;
