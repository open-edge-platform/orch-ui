/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { TablePom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["empty"] as const;
type Selectors = (typeof dataCySelectors)[number];

class ApplicationDetailsPodDetailsPom extends CyPom<Selectors> {
  public table: TablePom;
  constructor(public rootCy: string = "applicationDetailsPodDetails") {
    super(rootCy, [...dataCySelectors]);
    this.table = new TablePom("pods");
  }
}
export default ApplicationDetailsPodDetailsPom;
