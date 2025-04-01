/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";
import { StatusIconPom } from "../StatusIcon/StatusIcon.pom";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

export class AggregatedStatusesPom extends CyPom<Selectors> {
  public statusIconPom: StatusIconPom;

  constructor(public rootCy: string = "aggregatedStatuses") {
    super(rootCy, [...dataCySelectors]);
    this.statusIconPom = new StatusIconPom();
  }
}
