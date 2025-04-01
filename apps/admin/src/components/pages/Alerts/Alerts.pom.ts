/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";
import AlertsListPom from "../../organisms/AlertsList/AlertsList.pom";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class AlertsPom extends CyPom<Selectors> {
  alertsList: AlertsListPom;
  constructor(public rootCy: string = "alerts") {
    super(rootCy, [...dataCySelectors]);
    this.alertsList = new AlertsListPom("alertsList");
  }
}
export default AlertsPom;
