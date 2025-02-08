/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { SiTablePom } from "@orch-ui/poms";
import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./ClusterEditNodeReview";

const dataCySelectors = ["addHostBtn"] as const;
type Selectors = (typeof dataCySelectors)[number];

class ClusterEditNodeReviewPom extends CyPom<Selectors> {
  table: SiTablePom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.table = new SiTablePom("reviewTable");
  }

  getNodeDropdownByName(name: string) {
    return this.table.getRowBySearchText(name).find("[data-cy='roleDropdown']");
  }
  getNodeDropdownValueByName(name: string) {
    return this.getNodeDropdownByName(name).find(
      ".spark-dropdown-button-label",
    );
  }
  setNodeDropdownValueByName(name: string, value: string) {
    this.getNodeDropdownByName(name).find("button").click();
    cy.get(".spark-dropdown-list-box").contains(value).click();
  }
}
export default ClusterEditNodeReviewPom;
