/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { InfraUIMessageError } from "@orch-ui/utils";
import { Project } from "../../organisms/ProjectSwitch/ProjectSwitch";

const dataCySelectors = [
  "seeAllProjects",
  "projectList",
  "projectSwitchText",
  "projectSwitchModal",
  "projectSwitchModalText",
] as const;
type Selectors = (typeof dataCySelectors)[number];

export const mockProjectLength = 7;
type SuccessApiAliases =
  | "getProjects"
  | "getProjectsEmpty"
  | "getProjectsSampleProject";
type ErrrorApiAliases = "getProjectsMissingOrg";
type ApiAliases = SuccessApiAliases | ErrrorApiAliases;

const successEndpoints: CyApiDetails<SuccessApiAliases, Project[]> = {
  getProjects: {
    route: "*/projects?member-role=true",
    statusCode: 200,
    response: [...Array(mockProjectLength).keys()].map((index) => ({
      name: `project-${index}`,
      spec: {
        description: `Project ${index}`,
      },
      status: {
        projectStatus: {
          statusIndicator: "ACTIVE",
          message: "All Good",
          timeStamp: new Date().getTime(),
          uID: `1111-1111-${index}`,
        },
      },
    })),
  },
  getProjectsEmpty: {
    route: "*/projects?member-role=true",
    statusCode: 200,
    response: [],
  },
  getProjectsSampleProject: {
    route: "*/projects?member-role=true",
    statusCode: 200,
    response: [
      {
        name: "sample-project",
        spec: {
          description: "Sample project",
        },
        status: {
          projectStatus: {
            statusIndicator: "ACTIVE",
            message: "All Good",
            timeStamp: new Date().getTime(),
            uID: "cd630675-5e03-4ffd-9e2e-463bf1a91f83",
          },
        },
      },
    ],
  },
};

const errorEndpoints: CyApiDetails<
  ErrrorApiAliases,
  Partial<InfraUIMessageError>
> = {
  getProjectsMissingOrg: {
    route: "*/projects?member-role=true",
    statusCode: 401,
    response: {
      message: "Unauthorized",
    },
  },
};

export class ProjectSwitchPom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = "projectSwitch") {
    super(rootCy, [...dataCySelectors], {
      ...successEndpoints,
      ...errorEndpoints,
    });
  }

  getProjectListOptions() {
    return this.el.projectList.find(".project-switch__project-options");
  }

  getProjectSelection() {
    return this.el.projectList.find(".project-switch__list-item-selected");
  }
}
