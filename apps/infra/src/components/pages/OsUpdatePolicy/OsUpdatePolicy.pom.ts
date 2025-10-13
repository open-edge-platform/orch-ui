/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApiErrorPom, TablePom } from "@orch-ui/components";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { OsUpdatePolicyStore } from "@orch-ui/utils";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

const osUpdatePolicyStore = new OsUpdatePolicyStore();

type ApiAliases =
  | "getOsUpdatePolicy"
  | "getOsUpdatePolicyEmpty"
  | "getOsUpdatePolicyError"
  | "deleteOsUpdatePolicy"
  | "deleteOsUpdatePolicyError"
  | "createOsUpdatePolicy"
  | "createOsUpdatePolicyError";

const endpoints: CyApiDetails<ApiAliases> = {
  getOsUpdatePolicy: {
    route: `**/v1/projects/${defaultActiveProject.name}/os-update-policies*`,
    response: {
      osUpdatePolicies: osUpdatePolicyStore.list(),
      totalElements: osUpdatePolicyStore.resources.length,
      hasNext: false,
    },
  },
  getOsUpdatePolicyEmpty: {
    route: `**/v1/projects/${defaultActiveProject.name}/os-update-policies*`,
    response: {
      osUpdatePolicies: [],
      totalElements: 0,
      hasNext: false,
    },
  },
  getOsUpdatePolicyError: {
    route: `**/v1/projects/${defaultActiveProject.name}/os-update-policies*`,
    statusCode: 500,
  },
  deleteOsUpdatePolicy: {
    method: "DELETE",
    route: `**/v1/projects/${defaultActiveProject.name}/os-update-policies/*`,
    statusCode: 200,
  },
  deleteOsUpdatePolicyError: {
    method: "DELETE",
    route: `**/v1/projects/${defaultActiveProject.name}/os-update-policies/*`,
    statusCode: 500,
  },
  createOsUpdatePolicy: {
    method: "POST",
    route: `**/v1/projects/${defaultActiveProject.name}/os-update-policies`,
    statusCode: 200,
    response: (req: any) => {
      const newPolicy = osUpdatePolicyStore.convert(req.body);
      return newPolicy;
    },
  },
  createOsUpdatePolicyError: {
    method: "POST",
    route: `**/v1/projects/${defaultActiveProject.name}/os-update-policies`,
    statusCode: 400,
  },
};

class OsUpdatePolicyPom extends CyPom<Selectors, ApiAliases> {
  public osProfilesTablePom = new TablePom("osUpdatePolicy");
  public apiErrorPom = new ApiErrorPom();
  constructor(public rootCy: string = "osUpdatePolicy") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
export default OsUpdatePolicyPom;
