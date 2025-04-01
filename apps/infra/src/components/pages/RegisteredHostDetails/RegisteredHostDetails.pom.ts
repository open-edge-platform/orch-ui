/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { registeredHostOne } from "@orch-ui/utils";

const dataCySelectors = [
  "serialNumber",
  "uuid",
  "autoOnboard",
  "timestamp",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "getRegisteredHost200";

const endpoints: CyApiDetails<
  ApiAliases,
  eim.GetV1ProjectsByProjectNameComputeHostsAndHostIdApiResponse
> = {
  getRegisteredHost200: {
    route: "**/compute/hosts/registered-host-1",
    statusCode: 200,
    response: registeredHostOne,
  },
};

export class RegisteredHostDetailsPom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = "registeredHostDetails") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
