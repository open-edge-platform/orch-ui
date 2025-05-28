/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { SiDropdown } from "@orch-ui/poms";
import { CyApiDetails, CyPom } from "@orch-ui/tests";

const dataCySelectors = ["localAccountsDropdown"] as const;
type Selectors = (typeof dataCySelectors)[number];

export const localAccountMocks = [
  {
    resourceId: "1",
    localAccountID: "1",
    sshKey: "ssh-key1",
    username: "username1",
  },
  {
    resourceId: "2",
    localAccountID: "2",
    sshKey: "ssh-key2",
    username: "username2",
  },
];

type ApiAliases = "getLocalAccounts";

const endpoints: CyApiDetails<
  ApiAliases,
  infra.GetV1ProjectsByProjectNameLocalAccountsApiResponse
> = {
  getLocalAccounts: {
    route: "**/localAccounts*",
    statusCode: 200,
    response: {
      hasNext: false,
      localAccounts: localAccountMocks,
      totalElements: localAccountMocks.length,
    },
  },
};

export class PublicSshKeyDropdownPom extends CyPom<Selectors, ApiAliases> {
  public sshKeyDropdown = new SiDropdown("localAccountsDropdown");
  constructor(public rootCy: string = "publicSshKeyDropdown") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
