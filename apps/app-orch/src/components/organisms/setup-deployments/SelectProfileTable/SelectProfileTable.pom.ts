/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { EmptyPom, TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import {
  deploymentProfileOne,
  deploymentProfileTwo,
  packageWithParameterTemplates,
} from "@orch-ui/utils";
import { dataCy } from "./SelectProfileTable";

const dataCySelectors = ["empty", "radioButtonCy", "errorMessage"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "getApplication"
  | "getApplicationError"
  | "getApplicationEmpty";

// in this test we only care about the profiles of an application,
// so omit everything else from the response
type MockProfiles = Pick<catalog.DeploymentPackage, "profiles">;
type DpResponseForProfiles = {
  deploymentPackage: MockProfiles;
};

const project = defaultActiveProject.name;
const route = `**/v3/projects/${project}/catalog/deployment_packages/**/versions/**`;
const apis: CyApiDetails<ApiAliases, DpResponseForProfiles> = {
  getApplication: {
    route,
    statusCode: 200,
    response: {
      deploymentPackage: {
        profiles: [
          deploymentProfileOne,
          deploymentProfileTwo,
          ...packageWithParameterTemplates.profiles!,
        ],
      },
    },
  },
  getApplicationEmpty: {
    route,
    statusCode: 200,
    response: {
      deploymentPackage: {
        profiles: [],
      },
    },
  },
  getApplicationError: {
    route,
    statusCode: 404,
  },
};

export class SelectProfileTablePom extends CyPom<Selectors, ApiAliases> {
  public tablePom: TablePom;
  public tableUtils: SiTablePom;
  public emptyPom: EmptyPom;
  constructor(rootCy = dataCy) {
    super(rootCy, [...dataCySelectors], { ...apis });
    this.tablePom = new TablePom();
    this.tableUtils = new SiTablePom();
    this.emptyPom = new EmptyPom("emptyProfileTable");
  }

  public getMessageBannerTitle() {
    return cy.get(
      ".spark-message-banner .spark-message-banner-grid-column-message-column-content-message-title",
    );
  }

  public getMessageBannerDescription() {
    return cy.get(
      ".spark-message-banner .spark-message-banner-grid-column-message-column-content-message-description",
    );
  }
}
