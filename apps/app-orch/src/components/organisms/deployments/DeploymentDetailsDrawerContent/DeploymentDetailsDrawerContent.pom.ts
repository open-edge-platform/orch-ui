/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import {
  applicationOne,
  applicationThree,
  applicationTwo,
  deploymentOne,
  packageOne,
  profileOne,
} from "@orch-ui/utils";
import SelectApplicationProfilePom from "../../profiles/SelectApplicationProfile/SelectApplicationProfile.pom";

const dataCySelectors = [
  "drawerCaEmpty",
  "drawerCaVersion",
  "drawerCaDescription",
  "drawerAdvancedSettings",
] as const;
export type Selectors = (typeof dataCySelectors)[number];

type CompositeAppApiAliases =
  | "completeDeploymentPackageResponse"
  | "minimumDeploymentPackageResponse"
  | "errorDeploymentPackageResponse";

type ApplicationApisAliases =
  | "wordpressApp"
  | "postgreApp"
  | "nginxApp"
  | "unknownApp";
type ProfileApiAliases = "profile";

const project = defaultActiveProject.name;
const compositeAppApiURL = `**/v3/projects/${project}/catalog/deployment_packages/${deploymentOne.appName}/versions/${deploymentOne.appVersion}*`;
const applicationApiURL = (appName: string, appVersion: string) =>
  `**/v3/projects/${project}/catalog/applications/${appName}/versions/${appVersion}`;

const compositeAppApis: CyApiDetails<CompositeAppApiAliases> = {
  completeDeploymentPackageResponse: {
    route: compositeAppApiURL,
    response: {
      deploymentPackage: packageOne,
    },
  },
  minimumDeploymentPackageResponse: {
    route: compositeAppApiURL,
    response: {
      deploymentPackage: { ...packageOne, applicationReferences: [] },
    },
  },
  errorDeploymentPackageResponse: {
    route: compositeAppApiURL,
    statusCode: 400,
  },
};

const applicationApis: CyApiDetails<ApplicationApisAliases> = {
  wordpressApp: {
    route: applicationApiURL(applicationOne.name, applicationOne.version),
    response: {
      application: applicationOne,
    },
  },
  postgreApp: {
    route: applicationApiURL(applicationTwo.name, applicationTwo.version),
    response: {
      application: applicationTwo,
    },
  },
  nginxApp: {
    route: applicationApiURL(applicationThree.name, applicationThree.version),
    response: {
      application: applicationThree,
    },
  },
  unknownApp: {
    route: applicationApiURL("unknownApp", "1.0.0"),
    statusCode: 404,
  },
};
const profileApi: CyApiDetails<ProfileApiAliases> = {
  profile: {
    route: "**/profiles?*",
    response: {
      profiles: [profileOne],
    },
  },
};

class DeploymentDetailsDrawerContentPom extends CyPom<
  Selectors,
  CompositeAppApiAliases | ApplicationApisAliases | ProfileApiAliases
> {
  public deploymentViewDetailsAppTablePom: SiTablePom;
  public selectApplicationProfilePom: SelectApplicationProfilePom;

  constructor(public rootCy: string = "viewDetailsContent") {
    super(rootCy, [...dataCySelectors], {
      ...compositeAppApis,
      ...applicationApis,
      ...profileApi,
    });
    this.deploymentViewDetailsAppTablePom = new SiTablePom(
      "drawerApplicationsTable",
    );
    this.selectApplicationProfilePom = new SelectApplicationProfilePom(
      "advSettings",
    );
  }
}

export default DeploymentDetailsDrawerContentPom;
