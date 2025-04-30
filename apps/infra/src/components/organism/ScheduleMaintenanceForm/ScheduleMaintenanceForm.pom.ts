/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { enhancedInfraSlice } from "@orch-ui/apis";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { Timezone } from "../../../utils/worldTimezones";
import { RepeatedScheduleMaintenanceFormPom } from "../RepeatedScheduleMaintenanceForm/RepeatedScheduleMaintenanceForm.pom";
import { SingleScheduleMaintenanceFormPom } from "../SingleScheduleMaintenanceForm/SingleScheduleMaintenanceForm.pom";

export type ScheduleMaintenanceBasicFill = Partial<
  Pick<
    enhancedInfraSlice.ScheduleMaintenance,
    "name" | "scheduleStatus" | "type"
  >
> & {
  timezone?: Timezone;
};

const dataCySelectors = [
  "name",
  "status",
  "type",
  "timezone",
  "isOpenEndedSwitch",
  "footerButtons",
  "closeButton",
  "saveButton",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type CrudMaintenanceApiAliases =
  | "postSingleMaintenance"
  | "putSingleMaintenance"
  | "postRepeatedMaintenance"
  | "putRepeatedMaintenance";
type ApiAliases = CrudMaintenanceApiAliases;
const crudMaintenanceIntercepts: CyApiDetails<CrudMaintenanceApiAliases> = {
  postSingleMaintenance: {
    route: `**/v1/projects/${defaultActiveProject.name}/schedules/single**`,
    method: "POST",
    statusCode: 200,
  },
  putSingleMaintenance: {
    route: `**/v1/projects/${defaultActiveProject.name}/schedules/single/**`,
    method: "PUT",
    statusCode: 200,
  },
  postRepeatedMaintenance: {
    route: `**/v1/projects/${defaultActiveProject.name}/schedules/repeated**`,
    method: "POST",
    statusCode: 200,
  },
  putRepeatedMaintenance: {
    route: `**/v1/projects/${defaultActiveProject.name}/schedules/repeated/**`,
    method: "PUT",
    statusCode: 200,
  },
};

export class ScheduleMaintenanceFormPom extends CyPom<Selectors, ApiAliases> {
  singleSchedulePom: SingleScheduleMaintenanceFormPom;
  repeatedSchedulePom: RepeatedScheduleMaintenanceFormPom;
  constructor(public rootCy: string = "newScheduleMaintenanceForm") {
    super(rootCy, [...dataCySelectors], crudMaintenanceIntercepts);
    this.singleSchedulePom = new SingleScheduleMaintenanceFormPom();
    this.repeatedSchedulePom = new RepeatedScheduleMaintenanceFormPom();
  }

  get nameTextField() {
    return this.el.name.parentsUntil(".spark-text-field-container");
  }
  get nameTextFieldInvalidIndicator() {
    return this.nameTextField.find(".spark-fieldtext-wrapper-is-invalid");
  }
  get timezoneList() {
    return cy.get(".spark-popover .spark-scrollbar li");
  }
  get timezoneInputBox() {
    return this.el.timezone.find("input");
  }

  selectFromDropdown(childCy: string, dataKey: string, label: string) {
    this.root
      .find(`.spark-button[data-cy='${childCy}']`)
      .click({ multiple: true });
    cy.get(`.spark-popover .spark-scrollbar li[data-key='${dataKey}']`)
      .contains(label)
      .click();
  }

  selectTimezone(dataKey: string, label: string) {
    this.el.timezone
      .find(".spark-combobox-arrow-button")
      .click({ multiple: true });
    cy.get(`.spark-popover .spark-scrollbar li[data-key='${dataKey}']`)
      .contains(label)
      .click();
  }

  clickOpenEndedSwitch() {
    this.root.find(".open-ended-switch .spark-toggle-switch-selector").click();
  }

  fillBasicMaintenanceForm = (
    fillMaintenance: ScheduleMaintenanceBasicFill,
  ) => {
    if (fillMaintenance.name) {
      this.el.name.clear().type(fillMaintenance.name);
    }

    if (fillMaintenance.scheduleStatus) {
      const selectStatus = {
        OS_UPDATE: "OS Update",
        MAINTENANCE: "Maintenance",
      }[fillMaintenance.scheduleStatus.replace("SCHEDULE_STATUS_", "")];

      this.selectFromDropdown(
        "status",
        fillMaintenance.scheduleStatus,
        selectStatus ?? "Maintenance",
      );
    }

    if (fillMaintenance.type) {
      if (fillMaintenance.type === "repeat-weekly") {
        this.selectFromDropdown(
          "type",
          "repeat-weekly",
          "Repeat by day of week",
        );
      } else if (fillMaintenance.type === "repeat-monthly") {
        this.selectFromDropdown(
          "type",
          "repeat-monthly",
          "Repeat by day of month",
        );
      } else {
        this.selectFromDropdown("type", "no-repeat", "Does not repeat");
      }
    }

    if (fillMaintenance.timezone) {
      this.selectTimezone(
        fillMaintenance.timezone.tzCode,
        fillMaintenance.timezone.label,
      );
    }
  };
}
