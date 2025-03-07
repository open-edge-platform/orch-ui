/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { TablePom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./HostConfigReview";

const dataCySelectors = [
  "totalHosts",
  "operatingSystem",
  "security",
  "siteName",
  "expandToggle",
  "hostConfigReviewTable",
] as const;
type Selectors = (typeof dataCySelectors)[number];

export class HostConfigReviewPom extends CyPom<Selectors> {
  public table: TablePom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.table = new TablePom(rootCy);
  }
}
