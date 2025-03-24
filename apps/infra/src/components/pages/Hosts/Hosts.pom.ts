/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { ContextSwitcherPom } from "@orch-ui/components";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { assignedWorkloadHostOne as hostOne } from "@orch-ui/utils";
import HostSearchFiltersPom from "../../organism/HostSearchFilters/HostSearchFilters.pom";
import HostsTablePom from "../../organism/HostsTable/HostsTable.pom";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

export const encodeURLQuery = (str: string) =>
  encodeURIComponent(str).replace(/\(/g, "%28").replace(/\)/g, "%29");

type ApiAliases = "getHost";

const generateHosts = (size = 10, hostMock: eim.HostRead = hostOne) =>
  [...Array(size).keys()].map((i) => ({
    ...hostMock,
    name: `Host ${i}`,
    resourceId: `host-${i}`,
  }));

const hostRoute = `**/projects/${defaultActiveProject.name}/compute/hosts*`;
const endpoints: CyApiDetails<
  ApiAliases,
  eim.GetV1ProjectsByProjectNameComputeHostsApiResponse
> = {
  getHost: {
    route: hostRoute,
    statusCode: 200,
    response: {
      hosts: generateHosts(5),
      hasNext: false,
      totalElements: 5,
    },
  },
};

class HostsPom extends CyPom<Selectors, ApiAliases> {
  hostContextSwitcherPom: ContextSwitcherPom;
  hostSearchFilterPom: HostSearchFiltersPom;
  hostTablePom: HostsTablePom;
  constructor(public rootCy: string = "hosts") {
    super(rootCy, [...dataCySelectors], endpoints);
    this.hostContextSwitcherPom = new ContextSwitcherPom();
    this.hostSearchFilterPom = new HostSearchFiltersPom();
    this.hostTablePom = new HostsTablePom();
  }
}
export default HostsPom;
