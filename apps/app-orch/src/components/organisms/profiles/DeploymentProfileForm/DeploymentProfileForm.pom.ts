/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import { TablePom } from "@orch-ui/components";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { appWithParameterTemplates } from "@orch-ui/utils";
import OverrideProfileTablePom from "../../setup-deployments/OverrideProfileValues/OverrideProfileTable.pom";

const dataCySelectors = ["DeploymentProfileFormError"] as const;
type Selectors = (typeof dataCySelectors)[number];
type ApiAliases = "appError500" | "appSingle" | "appEmpty";

const project = defaultActiveProject.name;
const applicationApiUrl = `/v3/projects/${project}/catalog/applications/*/versions/*`;

export const apis: CyApiDetails<
  ApiAliases,
  catalog.CatalogServiceGetApplicationApiResponse
> = {
  appError500: { route: applicationApiUrl, statusCode: 500 },
  appSingle: {
    route: applicationApiUrl,
    response: {
      application: appWithParameterTemplates,
    },
  },
  appEmpty: {
    route: applicationApiUrl,
    statusCode: 404,
  },
};

class DeploymentProfileFormPom extends CyPom<Selectors, ApiAliases> {
  public table: TablePom;
  public overrideTable: OverrideProfileTablePom;
  constructor(public rootCy: string = "DeploymentProfileForm") {
    super(rootCy, [...dataCySelectors], apis);
    this.table = new TablePom();
    this.overrideTable = new OverrideProfileTablePom();
  }
}
export default DeploymentProfileFormPom;
