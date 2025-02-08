/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { TablePom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./ApplicationDetailsPodDetails";

const dataCySelectors = ["empty"] as const;
type Selectors = (typeof dataCySelectors)[number];

class ApplicationDetailsPodDetailsPom extends CyPom<Selectors> {
  public table: TablePom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.table = new TablePom("pods");
  }
}
export default ApplicationDetailsPodDetailsPom;
