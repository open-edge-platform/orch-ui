/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ConfirmationDialogPom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";
import { DrawerHeaderPom } from "../../../components/molecules/DrawerHeader/DrawerHeader.pom";
import { ScheduleMaintenanceFormPom } from "../ScheduleMaintenanceForm/ScheduleMaintenanceForm.pom";
import { ScheduleMaintenanceListPom } from "../ScheduleMaintenanceList/ScheduleMaintenanceList.pom";

const dataCySelectors = [
  "maintenanceDrawerContent",
  "crossButton",
  "backButton",
] as const;
type Selectors = (typeof dataCySelectors)[number];

export class ScheduleMaintenanceDrawerPom extends CyPom<Selectors> {
  drawerHeaderPom: DrawerHeaderPom;
  maintenanceFormPom: ScheduleMaintenanceFormPom;
  maintenanceListPom: ScheduleMaintenanceListPom;
  deleteConfirmationPom: ConfirmationDialogPom;
  constructor(public rootCy: string = "scheduleMaintenanceDrawer") {
    super(rootCy, [...dataCySelectors]);
    this.maintenanceFormPom = new ScheduleMaintenanceFormPom();
    this.maintenanceListPom = new ScheduleMaintenanceListPom();
    this.deleteConfirmationPom = new ConfirmationDialogPom();
    this.drawerHeaderPom = new DrawerHeaderPom();
  }

  selectTab(tabName: string) {
    this.root
      .find(".spark-tabs button.spark-tabs-tab")
      .contains(tabName)
      .click();
  }
}
