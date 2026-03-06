/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { rps } from "@orch-ui/apis";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { domain1, domain2 } from "@orch-ui/utils";

const dataCySelectors = [
  "domainName",
  "domainSuffix",
  "certificateUpload",
  "certificateFileName",
  "certificatePassword",
  "cancel",
  "submitDomain",
  "uploadInput",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type CreateEditDomainSuccessApiAliases =
  | "createDomainSuccess"
  | "updateDomainSuccess";
type CreateEditDomainErrorApiAliases =
  | "createDomainError"
  | "updateDomainError";

type ApiAliases =
  | CreateEditDomainSuccessApiAliases
  | CreateEditDomainErrorApiAliases;

const route = `**/v1/projects/${defaultActiveProject.name}/dm/amt/admin/domains`;

const successEndpoints: CyApiDetails<
  CreateEditDomainSuccessApiAliases,
  rps.DomainResponse
> = {
  createDomainSuccess: {
    route: route,
    method: "POST",
    statusCode: 201,
    response: domain1,
  },
  updateDomainSuccess: {
    route: `${route}/*`,
    method: "PATCH",
    statusCode: 200,
    response: domain2,
  },
};

const errorEndpoints: CyApiDetails<CreateEditDomainErrorApiAliases> = {
  createDomainError: {
    route: route,
    method: "POST",
    statusCode: 500,
  },
  updateDomainError: {
    route: `${route}/*`,
    method: "PATCH",
    statusCode: 500,
  },
};

class CreateEditDomainProfilePom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = "createEditDomain") {
    super(rootCy, [...dataCySelectors], {
      ...successEndpoints,
      ...errorEndpoints,
    });
  }
}

export default CreateEditDomainProfilePom;
