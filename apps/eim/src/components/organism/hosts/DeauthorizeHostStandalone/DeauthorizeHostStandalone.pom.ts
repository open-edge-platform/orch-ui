/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import _HostsTablePom from "../../HostsTable/HostsTable.pom";
import { dataCy } from "./DeauthorizeHostStandalone";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "postDeauthorizeHost";

const deauthorizedEndpoints: CyApiDetails<ApiAliases> = {
  postDeauthorizeHost: {
    route: `**/v1/projects/${defaultActiveProject.name}/compute/hosts/**/invalidate`,
    method: "PUT",
    statusCode: 200,
    response: undefined,
  },
};

class DeauthorizeHostStandalonePom extends CyPom<Selectors, ApiAliases> {
  public hostsTablePom: _HostsTablePom;

  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], deauthorizedEndpoints);
    this.hostsTablePom = new _HostsTablePom();
  }
}
export default DeauthorizeHostStandalonePom;
