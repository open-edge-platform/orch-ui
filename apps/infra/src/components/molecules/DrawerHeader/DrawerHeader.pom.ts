/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";
import { ScheduleMaintenanceStatusTagPom } from "../ScheduleMaintenanceStatusTag/ScheduleMaintenanceStatusTag.pom";

const dataCySelectors = ["crossButton", "backButton"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class DrawerHeaderPom extends CyPom<Selectors> {
  public maintenanceStatusTag: ScheduleMaintenanceStatusTagPom;
  constructor(public rootCy: string = "drawerHeader") {
    super(rootCy, [...dataCySelectors]);
    this.maintenanceStatusTag = new ScheduleMaintenanceStatusTagPom();
  }
}
