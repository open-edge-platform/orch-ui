/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { CheckboxSelectionListPom } from "@orch-ui/components";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { osRedHat } from "@orch-ui/utils";
import { dataCy } from "./HostSearchFilters";

const dataCySelectors = [
  "filterButton",
  "applyFiltersBtn",
  "removeFiltersBtn",
] as const;
type Selectors = (typeof dataCySelectors)[number];
type ApiAliases = "getOperatingSystems";

const generateOperatingSystems = (size = 10, osMock = osRedHat) =>
  [...Array(size).keys()].map((index) => ({
    ...osMock,
    name: `OS ${index}`,
    resourceId: `os-${index}`,
    profileName: `os-${index}`,
  }));

const endpoints: CyApiDetails<
  ApiAliases,
  eim.GetV1ProjectsByProjectNameComputeOsApiResponse
> = {
  getOperatingSystems: {
    route: `**/projects/${defaultActiveProject.name}/compute/os*`,
    statusCode: 200,
    response: {
      OperatingSystemResources: generateOperatingSystems(5),
      hasNext: false,
      totalElements: 5,
    },
  },
};

class HostSearchFiltersPom extends CyPom<Selectors, ApiAliases> {
  statusCheckboxListPom: CheckboxSelectionListPom;
  osProfileCheckboxListPom: CheckboxSelectionListPom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], endpoints);
    this.statusCheckboxListPom = new CheckboxSelectionListPom(
      "statusCheckboxList",
    );
    this.osProfileCheckboxListPom = new CheckboxSelectionListPom(
      "osProfilesCheckboxList",
    );
  }
}
export default HostSearchFiltersPom;
