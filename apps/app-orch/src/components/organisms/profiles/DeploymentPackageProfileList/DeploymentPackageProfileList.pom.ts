/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import {
  CyApiDetail,
  CyApiDetails,
  CyPom,
  defaultActiveProject,
} from "@orch-ui/tests";
import DeploymentPackageProfileListItemPom from "../DeploymentPackageProfileListItem/DeploymentPackageProfileListItem.pom";
import { dataCy } from "./DeploymentPackageProfileList";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "getApp1" | "getApp2";

const requiredFields: Omit<catalog.Application, "name"> = {
  chartName: "",
  chartVersion: "",
  helmRegistryName: "",
  version: "1.0.0",
};

const project = defaultActiveProject.name;
const getApp1: CyApiDetail<catalog.GetApplicationResponse> = {
  route: `**/v3/projects/${project}/catalog/applications/test-app-1/**`,
  response: {
    application: {
      ...requiredFields,
      name: "test-app-1",
      profiles: [
        {
          name: "profile1",
        },
      ],
    },
  },
};

const getApp2: CyApiDetail<catalog.GetApplicationResponse> = {
  route: `**/v3/projects/${project}/catalog/applications/test-app-2/**`,
  response: {
    application: {
      ...requiredFields,
      name: "test-app-2",
      profiles: [
        {
          name: "profile1",
        },
      ],
    },
  },
};

const apis: CyApiDetails<ApiAliases, catalog.GetApplicationResponse> = {
  getApp1,
  getApp2,
};

class DeploymentPackageProfileListPom extends CyPom<Selectors, ApiAliases> {
  public listItem: DeploymentPackageProfileListItemPom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], apis);
    this.listItem = new DeploymentPackageProfileListItemPom();
  }

  public getProfileEntryByProfileName(profileName: string) {
    // TODO: convert this to below line after opensource is deployable to coder
    // return this.listItem.find(`[data-cy='dpProfileListItem_${profile.name}'] [data-cy='deploymentPackageTableUtils']`).contains(profileName).closest("tr");
    return this.listItem.deploymentPackageTableUtils.getRowBySearchText(
      profileName,
    );
  }
}
export default DeploymentPackageProfileListPom;
