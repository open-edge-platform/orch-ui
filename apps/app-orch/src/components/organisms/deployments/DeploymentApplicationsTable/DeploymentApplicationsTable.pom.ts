/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import ApplicationDetailsPom from "../../../pages/ApplicationDetails/ApplicationDetails.pom";

const dataCySelectors = ["paramName", "paramValue"] as const;

type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "appDetailsWithOverrides" | "appDetailsNoOverrides";

// in this test we only care about the profiles of an application,
// so omit everything else from the response
type MockProfiles = Pick<catalog.Application, "profiles" | "name">;
type ApplicationResponseForProfiles = {
  application: MockProfiles;
};

const project = defaultActiveProject.name;

const apis: CyApiDetails<ApiAliases, ApplicationResponseForProfiles> = {
  appDetailsWithOverrides: {
    route: `/v3/projects/${project}/catalog/applications/postgres/versions/**`,
    response: {
      application: {
        name: "wordpress",
        profiles: [
          {
            name: "profile default",
            description: "An awesome app engage default Profile Description",
            chartValues: "testing",
            parameterTemplates: [
              {
                name: "version",
                type: "",
                default: "value1",
                suggestedValues: ["value1", "value2", "value3"],
              },
              {
                name: "image.containerDisk.pullSecret",
                type: "",
                default: "value2",
                suggestedValues: ["value1", "value2", "value3"],
              },
              {
                name: "a.b.c.d.e",
                type: "",
                default: "value3",
                suggestedValues: ["value1", "value2", "value3"],
              },
              {
                name: "val.zero",
                type: "",
                default: "value0",
                suggestedValues: ["value0", "value1", "value1"],
              },
            ],
          },
        ],
      },
    },
  },
  appDetailsNoOverrides: {
    route: `/v3/projects/${project}/catalog/applications/nginx/versions/**`,
    response: {
      application: {
        name: "nginx",
        profiles: [
          {
            name: "profile a",
          },
        ],
      },
    },
  },
};

class DeploymentApplicationsTablePom extends CyPom<Selectors, ApiAliases> {
  public table: SiTablePom;
  public appDetailPom: ApplicationDetailsPom;

  constructor(public rootCy: string = "deploymentApplicationsTable") {
    super(rootCy, [...dataCySelectors], apis);
    this.table = new SiTablePom(this.rootCy);
    this.appDetailPom = new ApplicationDetailsPom("appDetailsPage");
  }
}
export default DeploymentApplicationsTablePom;
