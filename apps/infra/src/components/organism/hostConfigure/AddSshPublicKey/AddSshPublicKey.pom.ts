/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { infra } from "@orch-ui/apis";
import { TablePom } from "@orch-ui/components";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { InstanceStore } from "@orch-ui/utils";
import { PublicSshKeyDropdownPom } from "../../../atom/PublicSshKeyDropdown/PublicSshKeyDropdown.pom";
const dataCySelectors = ["localAccountsDropdown"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "getLocalAccounts";
const instanceStore = new InstanceStore();

export const endpoints: CyApiDetails<
  ApiAliases,
  infra.LocalAccountServiceListLocalAccountsApiResponse
> = {
  getLocalAccounts: {
    route: "**/localAccounts?*",
    statusCode: 200,
    response: {
      hasNext: false,
      localAccounts: instanceStore.getLocalAccounts(),
      totalElements: instanceStore.getLocalAccounts().length,
    },
  },
};
export class AddSshPublicKeyPom extends CyPom<Selectors, ApiAliases> {
  public tablePom = new TablePom();
  public sshKeyDropdownPom = new PublicSshKeyDropdownPom();
  constructor(public rootCy: string = "addSshPublicKey") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
