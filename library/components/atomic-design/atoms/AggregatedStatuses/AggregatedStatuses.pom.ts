/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import { StatusIconPom } from "../StatusIcon/StatusIcon.pom";
import { dataCy } from "./AggregatedStatuses";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

export class AggregatedStatusesPom extends CyPom<Selectors> {
  public statusIconPom: StatusIconPom;

  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.statusIconPom = new StatusIconPom();
  }
}
