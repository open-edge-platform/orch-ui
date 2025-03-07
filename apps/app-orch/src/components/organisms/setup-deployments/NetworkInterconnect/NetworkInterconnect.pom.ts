/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { TablePom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./NetworkInterconnect";

const dataCySelectors = [
  "networkInterconnectCombobox",
  "interconnectMessage",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class NetworkInterconnectPom extends CyPom<Selectors> {
  public table: TablePom;

  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.table = new TablePom("table");
  }

  public clickNetworksDropDown() {
    this.el.networkInterconnectCombobox.find("button").click();
  }

  public selectNetwork(networkName: string) {
    this.clickNetworksDropDown();
    cy.get(".spark-popover").contains(`${networkName}`).click();
  }
}
export default NetworkInterconnectPom;
