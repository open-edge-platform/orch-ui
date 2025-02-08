/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { ApiErrorPom, TablePom } from "@orch-ui/components";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { OsResourceStore } from "@orch-ui/utils";
import { dataCy } from "./OSProfiles";

const dataCySelectors = ["osProfilesPopup", "osProfileDrawerContent"] as const;
type Selectors = (typeof dataCySelectors)[number];

const osResourceStore = new OsResourceStore();

type ApiAliases = "getOSResources" | "getOSResourcesError500";
const route = `**/v1/projects/${defaultActiveProject.name}/compute/os?*`;

const endpoints: CyApiDetails<
  ApiAliases,
  eim.GetV1ProjectsByProjectNameComputeOsApiResponse | eim.ProblemDetailsRead
> = {
  getOSResources: {
    route: `**/v1/projects/${defaultActiveProject.name}/compute/os?pageSize=*`,
    response: {
      OperatingSystemResources: osResourceStore.list(),
      totalElements: osResourceStore.resources.length,
      hasNext: false,
    },
  },
  getOSResourcesError500: {
    route: route,
    statusCode: 500,
    response: {},
  },
};

export class OSProfilesPom extends CyPom<Selectors, ApiAliases> {
  public osProfilesTablePom = new TablePom("oSProfiles");
  public apiErrorPom = new ApiErrorPom();

  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
