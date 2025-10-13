/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { CyApiDetails, CyPom } from "@orch-ui/tests";

const dataCySelectors = ["reason"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "putClusterNode" | "patchHost";

const endpoints: CyApiDetails<
  ApiAliases,
  cm.PutV2ProjectsByProjectNameClustersAndNameNodesApiResponse
> = {
  putClusterNode: {
    route: "**/clusters/*/nodes",
    method: "PUT",
    statusCode: 200,
    response: undefined,
  },
  patchHost: {
    route: "**/hosts/*",
    method: "PATCH",
    statusCode: 200,
    response: undefined,
  },
};

class DeauthorizeNodeConfirmationDialogPom extends CyPom<
  Selectors,
  ApiAliases
> {
  constructor(public rootCy: string = "deauthorizeNodeConfirmationDialog") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
export default DeauthorizeNodeConfirmationDialogPom;
