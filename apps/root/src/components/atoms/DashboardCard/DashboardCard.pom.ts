/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./DashboardCard";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class DashboardCardPom extends CyPom<Selectors> {
  constructor(public rootCy = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}

export default DashboardCardPom;
