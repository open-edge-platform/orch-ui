/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { SiDropdown } from "@orch-ui/poms";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { clusterOne } from "@orch-ui/utils";
import ClusterTemplatesDropdownPom from "../../../atom/ClusterTemplatesDropdown/ClusterTemplatesDropdown.pom";

const dataCySelectors = [
  "name",
  "clusterTemplateDropdown",
  "versionsDropdown",
] as const;
type Selectors = (typeof dataCySelectors)[number];
type SuccessClusterApiAlias = "getClusterSuccess";

type ApiAliases = SuccessClusterApiAlias;

const route = "**/v1/**/clusters/**";

const successClusterEndpoint: CyApiDetails<
  SuccessClusterApiAlias,
  cm.GetV2ProjectsByProjectNameClustersAndNameApiResponse
> = {
  getClusterSuccess: {
    route: route,
    statusCode: 200,
    response: clusterOne,
  },
};

class NameInfoPom extends CyPom<Selectors, ApiAliases> {
  public clusterTemplateDropdownPom = new ClusterTemplatesDropdownPom();
  public clusterTemplateDropdown = new SiDropdown("clusterTemplateDropdown");
  public clusterTemplateVersionDropdown = new SiDropdown(
    "clusterTemplateVersionDropdown",
  );

  constructor(public rootCy: string = "nameInfo") {
    super(rootCy, [...dataCySelectors], {
      ...successClusterEndpoint,
    });
  }

  public getTempalteName(value: string) {
    cy.get(
      '[data-cy="clusterTemplateDropdown"] > .spark-button-content',
    ).should("have.text", value);
  }

  public getVersion(value: string) {
    cy.get(
      '[data-cy="clusterTemplateVersionDropdown"] > .spark-button-content',
    ).should("have.text", value);
  }
}
export default NameInfoPom;
