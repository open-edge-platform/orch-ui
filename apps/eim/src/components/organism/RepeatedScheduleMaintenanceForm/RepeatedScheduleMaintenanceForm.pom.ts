/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import { MultiSelectDropdownPom } from "../../../components/atom/MultiSelectDropdown/MultiSelectDropdown.pom";
import { dataCy } from "./RepeatedScheduleMaintenanceForm";

const dataCySelectors = [
  "startTime",
  "duration",
  "weekday",
  "dayNumber",
  "month",
] as const;
type Selectors = (typeof dataCySelectors)[number];

export class RepeatedScheduleMaintenanceFormPom extends CyPom<Selectors> {
  weekdaysMultiDropdown: MultiSelectDropdownPom;
  monthsMultiDropdown: MultiSelectDropdownPom;
  dayNumbersMultiDropdown: MultiSelectDropdownPom;

  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.weekdaysMultiDropdown = new MultiSelectDropdownPom("weekday");
    this.monthsMultiDropdown = new MultiSelectDropdownPom("month");
    this.dayNumbersMultiDropdown = new MultiSelectDropdownPom("dayNumber");
  }
}
