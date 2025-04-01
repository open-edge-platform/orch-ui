/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModalPom } from "@orch-ui/components";
import { CyApiDetails, CyPom } from "@orch-ui/tests";

const dataCySelectors = ["projectName", "confirmationMessage"] as const;
type Selectors = (typeof dataCySelectors)[number];

const projectByIdRoute = "*/projects/*";

type SuccessApiAliases = "deleteProject";
type ErrorApiAliases = "deleteProjectError";
type ApiAliases = SuccessApiAliases | ErrorApiAliases;

const successEndpoints: CyApiDetails<SuccessApiAliases> = {
  deleteProject: {
    route: projectByIdRoute,
    method: "DELETE",
    statusCode: 200,
  },
};

const errorEndpoints: CyApiDetails<ErrorApiAliases> = {
  deleteProjectError: {
    route: projectByIdRoute,
    method: "DELETE",
    statusCode: 401,
    response: {
      message: "Unauthorized",
    },
  },
};

class DeleteProjectDialogPom extends CyPom<Selectors, ApiAliases> {
  modalPom: ModalPom;
  constructor(public rootCy: string = "deleteProjectDialog") {
    super(rootCy, [...dataCySelectors], {
      ...successEndpoints,
      ...errorEndpoints,
    });
    this.modalPom = new ModalPom();
  }
}
export default DeleteProjectDialogPom;
