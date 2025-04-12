/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["osProfile"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class HostsDetailsPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "hostsDetails") {
    super(rootCy, [...dataCySelectors]);
  }

  getHostDetailsRow(n: number) {
    return this.root.find(".host-details").eq(n);
  }

  public setHostName(n: number, name: string) {
    this.getHostDetailsRow(n).within(() => {
      cy.dataCy("name").clear();
      cy.dataCy("name").type(name);
    });
  }
}
