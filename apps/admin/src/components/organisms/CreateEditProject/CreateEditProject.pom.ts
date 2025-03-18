/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { tm } from "@orch-ui/apis";
import { ModalPom } from "@orch-ui/components";
import { CyApiDetails, CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "projectNameLabel",
  "projectName",
  "submitProject",
  "cancel",
] as const;
type Selectors = (typeof dataCySelectors)[number];

const projectByIdRoute = "*/projects/*";

type SuccessApiAliases = "createProject" | "renameProject";
type ErrorApiAliases = "createProjectError" | "renameProjectError";
type ApiAliases = SuccessApiAliases | ErrorApiAliases;

const successEndpoints: CyApiDetails<SuccessApiAliases, tm.ProjectProjectPost> =
  {
    createProject: {
      route: projectByIdRoute,
      method: "PUT",
      statusCode: 200,
    },
    renameProject: {
      route: projectByIdRoute,
      method: "PUT",
      statusCode: 200,
    },
  };

const errorEndpoints: CyApiDetails<ErrorApiAliases> = {
  createProjectError: {
    route: projectByIdRoute,
    method: "PUT",
    statusCode: 500,
    networkError: true,
  },
  renameProjectError: {
    route: projectByIdRoute,
    method: "PUT",
    statusCode: 401,
    response: {
      message: "Unauthorized",
    },
    networkError: true,
  },
};

export class CreateEditProjectPom extends CyPom<Selectors, ApiAliases> {
  public modalPom: ModalPom;

  constructor(public rootCy: string = "createEditProject") {
    super(rootCy, [...dataCySelectors], {
      ...successEndpoints,
      ...errorEndpoints,
    });
    this.modalPom = new ModalPom();
  }
}
