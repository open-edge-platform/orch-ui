/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Cy, CyPom } from "@orch-ui/tests";

import HostsTablePom from "../../organism/_HostsTable/_HostsTable.pom";
import { HostConfigPom } from "../HostConfig/HostConfig.pom";

const dataCySelectors = ["ribbonButtonconfigure"] as const;
type Selectors = (typeof dataCySelectors)[number];

class UnconfiguredHostsPom extends CyPom<Selectors> {
  public tablePom: HostsTablePom;
  public hostConfigPom = new HostConfigPom();
  constructor(public rootCy: string = "unconfiguredHosts") {
    super(rootCy, [...dataCySelectors]);
    this.tablePom = new HostsTablePom();
  }

  public getTableRows(): Cy {
    return this.tablePom.getTableRows();
  }

  public goToConfigureByName(name: string): void {
    const row = this.tablePom.getRowBySearchText(name);
    row.find(":nth-child(5) ").click().contains("Configure").click();
  }
}

export default UnconfiguredHostsPom;
