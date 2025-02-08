/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { EmptyPom, TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { CyPom } from "@orch-ui/tests";
import { dataCy } from "../DeploymentPackageDetailsAppProfileList/DeploymentPackageDetailsAppProfileList";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentPackageDetailsAppProfileListPom extends CyPom<Selectors> {
  emptyPom: EmptyPom;
  appProfileTablePom: TablePom;
  appProfileTableUtils: SiTablePom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);

    this.emptyPom = new EmptyPom();
    this.appProfileTablePom = new TablePom("dpAppProfileTable");
    this.appProfileTableUtils = new SiTablePom("dpAppProfileTable");
  }
}
export default DeploymentPackageDetailsAppProfileListPom;
