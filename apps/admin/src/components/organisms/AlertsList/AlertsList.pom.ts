/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import AlertDefinitionStore from "library/utils/mocks_new/admin/store/alert-definitions";
import AlertStore from "library/utils/mocks_new/admin/store/alerts";
import AlertDrawerPom from "../AlertDrawer/AlertDrawer.pom";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "alertList" | "alertDefinitionList";

const alertStore = new AlertStore();
const alertDefinitionStore = new AlertDefinitionStore();

const endpoints: CyApiDetails<
  ApiAliases,
  | omApi.GetProjectAlertsApiResponse
  | omApi.GetProjectAlertDefinitionsApiResponse
> = {
  alertList: {
    route: "**/alerts*",
    response: { alerts: alertStore.list() },
  },
  alertDefinitionList: {
    route: "**/alerts/definitions*",
    response: {
      alertDefinitions: alertDefinitionStore.list(),
    },
  },
};

class AlertsListPom extends CyPom<Selectors, ApiAliases> {
  table: SiTablePom;
  drawer: AlertDrawerPom;
  constructor(public rootCy: string = "alertsList") {
    super(rootCy, [...dataCySelectors], endpoints);
    this.table = new SiTablePom();
    this.drawer = new AlertDrawerPom();
  }
}
export default AlertsListPom;
