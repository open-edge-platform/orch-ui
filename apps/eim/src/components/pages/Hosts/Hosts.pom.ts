/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { ContextSwitcherPom } from "@orch-ui/components";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { dataCy } from "./Hosts";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

export const encodeURLQuery = (str: string) =>
  encodeURIComponent(str).replace(/\(/g, "%28").replace(/\)/g, "%29");

type ApiAliases = "getHost";

const hostRoute = `**/projects/${defaultActiveProject.name}/compute/hosts*`;
const endpoints: CyApiDetails<
  ApiAliases,
  eim.GetV1ProjectsByProjectNameComputeHostsApiArg
> = {
  getHost: {
    route: hostRoute,
    statusCode: 200,
  },
};

class HostsPom extends CyPom<Selectors, ApiAliases> {
  hostContextSwitcherPom: ContextSwitcherPom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], endpoints);
    this.hostContextSwitcherPom = new ContextSwitcherPom();
  }
}
export default HostsPom;
