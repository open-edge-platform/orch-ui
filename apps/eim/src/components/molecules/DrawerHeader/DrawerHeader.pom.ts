/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import { ScheduleMaintenanceStatusTagPom } from "../ScheduleMaintenanceStatusTag/ScheduleMaintenanceStatusTag.pom";
import { dataCy } from "./DrawerHeader";

const dataCySelectors = ["crossButton", "backButton"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class DrawerHeaderPom extends CyPom<Selectors> {
  public maintenanceStatusTag: ScheduleMaintenanceStatusTagPom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.maintenanceStatusTag = new ScheduleMaintenanceStatusTagPom();
  }
}
