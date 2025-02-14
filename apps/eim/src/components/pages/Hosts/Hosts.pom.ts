/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { ContextSwitcherPom } from "@orch-ui/components";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { hostOne } from "@orch-ui/utils";
import { HostRead } from "library/apis/eim/eim";
import HostSearchFiltersPom from "../../organism/HostSearchFilters/HostSearchFilters.pom";
import { dataCy } from "./Hosts";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

export const encodeURLQuery = (str: string) =>
  encodeURIComponent(str).replace(/\(/g, "%28").replace(/\)/g, "%29");

type ApiAliases = "getHost";

const generateHosts = (size = 10, hostMock: HostRead = hostOne) =>
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
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], endpoints);
    this.hostContextSwitcherPom = new ContextSwitcherPom();
    this.hostSearchFilterPom = new HostSearchFiltersPom();
  }
}
export default HostsPom;
