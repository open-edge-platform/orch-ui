/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { ApiErrorPom, TablePom } from "@orch-ui/components";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { OsUpdatePolicyStore } from "@orch-ui/utils";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

const osUpdatePolicyStore = new OsUpdatePolicyStore();

type ApiAliases = "getOsUpdatePolicy";

const endpoints: CyApiDetails<
  ApiAliases,
  infra.OsUpdatePolicyListOsUpdatePolicyApiResponse
> = {
  getOsUpdatePolicy: {
    route: `**/v1/projects/${defaultActiveProject.name}/os-update-policies*`,
    response: {
      osUpdatePolicies: osUpdatePolicyStore.list(),
      totalElements: osUpdatePolicyStore.resources.length,
      hasNext: false,
    },
  },
  // getOSResourcesError500: {
  //   route: route,
  //   statusCode: 500,
  //   response: {},
  // },
};

class OsUpdatePolicyPom extends CyPom<Selectors> {
  public osProfilesTablePom = new TablePom("osUpdatePolicy");
  public apiErrorPom = new ApiErrorPom();
  constructor(public rootCy: string = "osUpdatePolicy") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
export default OsUpdatePolicyPom;
