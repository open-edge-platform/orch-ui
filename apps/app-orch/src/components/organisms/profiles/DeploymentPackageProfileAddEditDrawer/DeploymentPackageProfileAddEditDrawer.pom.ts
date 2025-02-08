/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { ApplicationsStore } from "@orch-ui/utils";
import { dataCy } from "./DeploymentPackageProfileAddEditDrawer";

const dataCySelectors = ["drawerContent"] as const;
type Selectors = (typeof dataCySelectors)[number];

const project = defaultActiveProject.name;
const applicationListStore = new ApplicationsStore();
const app = applicationListStore.resources[1]; // the test clicks on the second app in the list

type ApiAliases = "getApplication";

const apis: CyApiDetails<ApiAliases, catalog.GetApplicationResponse> = {
  getApplication: {
    route: `**/v3/projects/${project}/catalog/applications/**/versions/**`,
    response: {
      application: app,
    },
  },
};

class DeploymentPackageProfileAddEditDrawerPom extends CyPom<
  Selectors,
  ApiAliases
> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], apis);
  }
}
export default DeploymentPackageProfileAddEditDrawerPom;
