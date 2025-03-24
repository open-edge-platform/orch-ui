/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "startDate",
  "startTime",
  "endDate",
  "endTime",
] as const;
type Selectors = (typeof dataCySelectors)[number];

export class SingleScheduleMaintenanceFormPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "singleScheduleMaintenanceForm") {
    super(rootCy, [...dataCySelectors]);
  }

  fillSingleScheduleStartDate(date: string, time: string) {
    this.el.startDate.type(date);
    this.el.startTime.type(time);
  }
  fillSingleScheduleEndDate(date: string, time: string) {
    this.el.endDate.type(date);
    this.el.endTime.type(time);
  }
}
