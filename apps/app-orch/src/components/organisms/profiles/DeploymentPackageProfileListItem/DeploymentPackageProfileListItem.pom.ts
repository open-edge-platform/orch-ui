/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import {
  CyApiDetail,
  CyApiDetails,
  CyPom,
  defaultActiveProject,
} from "@orch-ui/tests";
import ProfileNamePom from "../../../atoms/ProfileName/ProfileName.pom";

const dataCySelectors = ["rowExpander", "rowCollapser"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "getApplication";

const requiredFields: catalog.Application = {
  chartName: "",
  chartVersion: "",
  helmRegistryName: "",
  name: "test-app",
  version: "1.0.0",
};
const project = defaultActiveProject.name;
const getApplication: CyApiDetail<catalog.GetApplicationResponse> = {
  route: `**/v3/projects/${project}/catalog/applications/**/**`,
  response: {
    application: {
      ...requiredFields,
      profiles: [
        {
          name: "profile1",
        },
      ],
    },
  },
};
const apis: CyApiDetails<ApiAliases, catalog.GetApplicationResponse> = {
  getApplication,
};

class DeploymentPackageProfileListItemPom extends CyPom<Selectors, ApiAliases> {
  public profileName: ProfileNamePom;
  public deploymentPackageTablePom: TablePom;
  public deploymentPackageTableUtils: SiTablePom;
  public applicationTablePom: TablePom;
  public applicationTableUtils: SiTablePom;

  constructor(public rootCy: string = "deploymentPackageProfileListItem") {
    super(rootCy, [...dataCySelectors], apis);
    this.profileName = new ProfileNamePom();
    this.deploymentPackageTablePom = new TablePom("packageProfileList");
    this.deploymentPackageTableUtils = new SiTablePom("packageProfileList");
    this.applicationTablePom = new TablePom("applicationProfileList");
    this.applicationTableUtils = new SiTablePom("applicationProfileList");
  }
}
export default DeploymentPackageProfileListItemPom;
