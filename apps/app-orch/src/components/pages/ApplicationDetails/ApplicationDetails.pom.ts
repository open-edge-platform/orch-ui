/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { EmptyPom } from "@orch-ui/components";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { applicationDetailsResponse } from "@orch-ui/utils";
import ApplicationDetailsMainPom from "../../organisms/applications/ApplicationDetailsMain/ApplicationDetailsMain.pom";

const dataCySelectors = ["loading", "backAppsBtnBottom"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "appDetailsError" | "appDetails";

const project = defaultActiveProject.name;
const applicationApiUrl = `/v3/projects/${project}/catalog/applications/*/versions/**`;

const apis: CyApiDetails<ApiAliases> = {
  appDetailsError: { route: applicationApiUrl, statusCode: 404 },
  appDetails: {
    route: applicationApiUrl,
    response: applicationDetailsResponse,
  },
};

class ApplicationDetailsPom extends CyPom<Selectors, ApiAliases> {
  public detailsMain: ApplicationDetailsMainPom;
  public empty: EmptyPom;
  constructor(public rootCy: string = "appDetailsPage") {
    super(rootCy, [...dataCySelectors], apis);
    this.detailsMain = new ApplicationDetailsMainPom("applicationDetailsMain");
    this.empty = new EmptyPom();
  }

  public gotoAppDetailsPage(): void {
    cy.get("table tbody tr a").first().click();
  }

  public gotoAppDetailsPageWithDataLoaded(api: ApiAliases): void {
    this.interceptApis([api]);
    this.gotoAppDetailsPage();
    this.waitForApis();
  }
}

export default ApplicationDetailsPom;
