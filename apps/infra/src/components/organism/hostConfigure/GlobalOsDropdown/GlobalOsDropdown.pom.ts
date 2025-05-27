/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { infra } from "@orch-ui/apis";
import { SiDropdown } from "@orch-ui/poms";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { OsResourceStore } from "@orch-ui/utils";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "getOSResources" | "getOSResourcesError500";
const route = `**/v1/projects/${defaultActiveProject.name}/compute/os?*`;

const osResourceStore = new OsResourceStore();

const endpoints: CyApiDetails<
  ApiAliases,
  | infra.GetV1ProjectsByProjectNameComputeOsApiResponse
  | infra.ProblemDetailsRead
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

export class GlobalOsDropdownPom extends CyPom<Selectors, ApiAliases> {
  public dropdown = new SiDropdown("globalOsDropdown");
  constructor(public rootCy: string = "globalOsDropdown") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
