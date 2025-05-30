/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { infra } from "@orch-ui/apis";
import { SiDropdown } from "@orch-ui/poms";
import {
  CyApiDetail,
  CyApiDetails,
  CyPom,
  defaultActiveProject,
} from "@orch-ui/tests";
import { OsResourceStore } from "@orch-ui/utils";

const dataCySelectors = [
  "emptyMessage",
  "preselectedOsProfile",
  "osProfile",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "getOSResources"
  | "getOSResourcesError500"
  | "getOSResourcesEmpty";
const route = `**/v1/projects/${defaultActiveProject.name}/compute/os?*`;

const osResourceStore = new OsResourceStore();

export const getOsResources: CyApiDetail<infra.OperatingSystemServiceListOperatingSystemsApiResponse> =
  {
    route: `**/v1/projects/${defaultActiveProject.name}/compute/os?pageSize=*`,
    response: {
      OperatingSystemResources: osResourceStore.list(),
      totalElements: osResourceStore.resources.length,
      hasNext: false,
    },
  };

const endpoints: CyApiDetails<
  ApiAliases,
  | infra.OperatingSystemServiceListOperatingSystemsApiResponse
  | infra.ProblemDetailsRead
> = {
  getOSResources: getOsResources,
  getOSResourcesError500: {
    route: route,
    statusCode: 500,
    response: {},
  },
  getOSResourcesEmpty: {
    route: route,
    statusCode: 200,
    response: {
      OperatingSystemResources: [],
      totalElements: 0,
      hasNext: false,
    },
  },
};

class OsProfileDropdownPom extends CyPom<Selectors, ApiAliases> {
  public dropdown = new SiDropdown("osProfileDropdown");
  constructor(public rootCy: string = "osProfileDropdown") {
    super(rootCy, [...dataCySelectors], endpoints);
  }

  public getValue() {
    return this.dropdown.root.find("button");
  }
}
export default OsProfileDropdownPom;
