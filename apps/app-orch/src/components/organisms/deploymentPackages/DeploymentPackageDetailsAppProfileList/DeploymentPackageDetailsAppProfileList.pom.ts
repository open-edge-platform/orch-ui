/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { EmptyPom, TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentPackageDetailsAppProfileListPom extends CyPom<Selectors> {
  emptyPom: EmptyPom;
  appProfileTablePom: TablePom;
  appProfileTableUtils: SiTablePom;
  constructor(
    public rootCy: string = "deploymentPackageDetailsAppProfileList",
  ) {
    super(rootCy, [...dataCySelectors]);

    this.emptyPom = new EmptyPom();
    this.appProfileTablePom = new TablePom("dpAppProfileTable");
    this.appProfileTableUtils = new SiTablePom("dpAppProfileTable");
  }
}
export default DeploymentPackageDetailsAppProfileListPom;
