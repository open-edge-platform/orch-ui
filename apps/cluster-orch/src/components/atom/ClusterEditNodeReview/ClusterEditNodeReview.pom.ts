/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { provisionedHostOne } from "@orch-ui/utils";

const dataCySelectors = ["addHostBtn"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "getHost";

const hostRoute = `**/projects/${defaultActiveProject.name}/compute/hosts**`;
const endpoints: CyApiDetails<
  ApiAliases,
  infra.HostServiceListHostsApiResponse
> = {
  getHost: {
    route: hostRoute,
    statusCode: 200,
    response: {
      hosts: [provisionedHostOne],
      hasNext: false,
      totalElements: 1,
    },
  },
};

class ClusterEditNodeReviewPom extends CyPom<Selectors, ApiAliases> {
  table: SiTablePom;
  constructor(public rootCy: string = "clusterEditNodeReview") {
    super(rootCy, [...dataCySelectors], endpoints);
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
