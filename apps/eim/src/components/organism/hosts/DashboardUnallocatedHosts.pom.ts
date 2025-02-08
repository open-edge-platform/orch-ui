/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { CounterWheelPom } from "@orch-ui/components";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { unconfiguredHostOne, unconfiguredHostTwo } from "@orch-ui/utils";
const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

// TODO: After api change
type ApiAliases =
  | "unmockedAPI"
  | "unallocatedHostsListSuccess"
  | "hostsListError500"
  | "hostsListError400";

const route = `**/v1/projects/${defaultActiveProject.name}/compute/host*`;

const endpoints: CyApiDetails<ApiAliases> = {
  unmockedAPI: {
    route,
  },
  unallocatedHostsListSuccess: {
    route,
    statusCode: 200,
    response: {
      hosts: [unconfiguredHostOne, unconfiguredHostTwo],
    } as eim.GetV1ProjectsByProjectNameComputeHostsApiResponse,
  },
  hostsListError400: {
    route,
    statusCode: 400,
    networkError: true,
  },
  hostsListError500: {
    route,
    statusCode: 500,
  },
};

class DashboardUnallocatedHostsPom extends CyPom<Selectors, ApiAliases> {
  public wheelStat: CounterWheelPom;
  constructor(public rootCy: string = "dashboardUnallocatedHosts") {
    super(rootCy, [...dataCySelectors], endpoints);
    this.wheelStat = new CounterWheelPom();
  }
}

export default DashboardUnallocatedHostsPom;
