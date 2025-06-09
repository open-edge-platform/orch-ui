/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { infra } from "@orch-ui/apis";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { mockHost } from "../../pages/HostDetails/HostDetails.pom";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "getHostByUUID" | "getHostById";

const endpoints: CyApiDetails<ApiAliases> = {
  getHostByUUID: {
    route: "**/compute/hosts?filter*",
    statusCode: 200,
    response: {
      hasNext: false,
      hosts: [mockHost],
      totalElements: 1,
    } as infra.HostServiceListHostsApiResponse,
  },
  getHostById: {
    route: "**/compute/hosts/*",
    statusCode: 200,
    response: mockHost,
  },
};

export class HostLinkPom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = "hostLink") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
