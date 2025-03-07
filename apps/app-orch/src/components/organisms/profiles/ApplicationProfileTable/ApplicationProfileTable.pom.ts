/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { EmptyPom, TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { Cy, CyPom } from "@orch-ui/tests";
import { dataCy } from "./ApplicationProfileTable";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class ApplicationProfileTablePom extends CyPom<Selectors> {
  tablePom: TablePom;
  tableUtils: SiTablePom;
  emptyPom: EmptyPom;
  constructor(public rootCy = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.tablePom = new TablePom();
    this.tableUtils = new SiTablePom();
    this.emptyPom = new EmptyPom();
  }

  public openActionPopup(name: string): Cy {
    return this.tableUtils
      .getRowBySearchText(name)
      .find("[data-cy='profilePopup']")
      .click();
  }
}

export default ApplicationProfileTablePom;
