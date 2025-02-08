/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "dashboardStatusTotal",
  "dashboardStatusError",
  "dashboardStatusRunning",
] as const;
type Selectors = (typeof dataCySelectors)[number];

export class DashboardStatusPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "dashboardStatus") {
    super(rootCy, [...dataCySelectors]);
  }
}
