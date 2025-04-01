/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModalPom } from "@orch-ui/components";
import { CyApiDetails, CyPom } from "@orch-ui/tests";

const dataCySelectors = ["confirmationMessage"] as const;
type Selectors = (typeof dataCySelectors)[number];

const sshByIdRoute = "**/localAccounts/**";

type SuccessApiAliases = "deleteSsh";
type ErrorApiAliases = "deleteSshError";
type ApiAliases = SuccessApiAliases | ErrorApiAliases;

const successEndpoints: CyApiDetails<SuccessApiAliases> = {
  deleteSsh: {
    route: sshByIdRoute,
    method: "DELETE",
    statusCode: 200,
  },
};

const errorEndpoints: CyApiDetails<ErrorApiAliases> = {
  deleteSshError: {
    route: sshByIdRoute,
    method: "DELETE",
    statusCode: 401,
    response: {
      message: "Unauthorized",
    },
  },
};

class DeleteSSHDialogPom extends CyPom<Selectors, ApiAliases> {
  modalPom: ModalPom;
  constructor(public rootCy: string = "deleteSSHDialog") {
    super(rootCy, [...dataCySelectors], {
      ...successEndpoints,
      ...errorEndpoints,
    });
    this.modalPom = new ModalPom();
  }
}
export default DeleteSSHDialogPom;
