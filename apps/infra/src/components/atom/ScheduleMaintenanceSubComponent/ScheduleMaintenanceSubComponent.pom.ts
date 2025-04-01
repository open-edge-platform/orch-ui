/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "scheduleType",
  "timezone",
  "startTime",
  "startDate",
  "endTime",
  "endDate",
  "duration",
  "month",
  "dayOfMonth",
  "dayOfWeek",
] as const;
type Selectors = (typeof dataCySelectors)[number];

export class ScheduleMaintenanceSubComponentPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "maintenanceTableDecription") {
    super(rootCy, [...dataCySelectors]);
  }
}
