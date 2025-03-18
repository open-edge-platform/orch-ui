/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { CyPom } from "@orch-ui/tests";

export const applicationReferenceHeaders = ["Name", "Version"];

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class ApplicationReferenceTablePom extends CyPom<Selectors> {
  table: TablePom;
  tableUtils: SiTablePom;
  constructor(public rootCy = "applicationReferenceTable") {
    super(rootCy, [...dataCySelectors]);
    this.table = new TablePom();
    this.tableUtils = new SiTablePom();
  }
}

export default ApplicationReferenceTablePom;
