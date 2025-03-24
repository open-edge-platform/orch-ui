/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";

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
  constructor(public rootCy: string = "deauthorizeHostStandalone") {
    super(rootCy, [...dataCySelectors], deauthorizedEndpoints);
  }
}
export default DeauthorizeHostStandalonePom;
