/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./ApplicationReferenceTable";

export const applicationReferenceHeaders = ["Name", "Version"];

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class ApplicationReferenceTablePom extends CyPom<Selectors> {
  table: TablePom;
  tableUtils: SiTablePom;
  constructor(rootCy = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.table = new TablePom();
    this.tableUtils = new SiTablePom();
  }
}

export default ApplicationReferenceTablePom;
