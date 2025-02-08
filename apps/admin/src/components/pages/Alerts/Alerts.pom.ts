/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import AlertsListPom from "../../organisms/AlertsList/AlertsList.pom";
import { dataCy } from "./Alerts";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class AlertsPom extends CyPom<Selectors> {
  alertsList: AlertsListPom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.alertsList = new AlertsListPom("alertsList");
  }
}
export default AlertsPom;
