/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { TablePom } from "@orch-ui/components";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { appWithParameterTemplates } from "@orch-ui/utils";
import ParameterOverrideDeploymentFormPom from "../../../atoms/ApplicationProfileParameterOverrideForm/ApplicationProfileParameterOverrideForm.pom";

const dataCySelectors = ["applicationProfileParameterOverrideForm"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "appError500" | "appSingle" | "appSingleDelayed";

const project = defaultActiveProject.name;
const applicationApiUrl = `/v3/projects/${project}/catalog/applications/*/versions/*`;

const apis: CyApiDetails<
  ApiAliases,
  catalog.CatalogServiceGetApplicationApiResponse
> = {
  appError500: { route: applicationApiUrl, statusCode: 500 },
  appSingle: {
    route: applicationApiUrl,
    statusCode: 200,
    response: {
      application: appWithParameterTemplates,
    },
  },
  appSingleDelayed: {
    route: applicationApiUrl,
    statusCode: 200,
    response: {
      application: appWithParameterTemplates,
    },
    delay: 1000,
  },
};

export class OverrideProfileTablePom extends CyPom<Selectors, ApiAliases> {
  public table: TablePom;

  /** Expand row component */
  public overrideForm: ParameterOverrideDeploymentFormPom;

  constructor(public rootCy: string = "overrideProfileTable") {
    super(rootCy, [...dataCySelectors], apis);

    this.table = new TablePom("table");
    this.overrideForm = new ParameterOverrideDeploymentFormPom();
  }
}

export default OverrideProfileTablePom;
