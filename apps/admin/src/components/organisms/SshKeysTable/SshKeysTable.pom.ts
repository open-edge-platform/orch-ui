/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { ApiErrorPom, EmptyPom, TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import DeleteSSHDialogPom from "../DeleteSSHDialog/DeleteSSHDialog.pom";
import SshKeysAddEditDrawerPom, {
  fakeSshKey,
} from "../SshKeysAddEditDrawer/SshKeysAddEditDrawer.pom";
import SshKeysViewDrawerPom from "../SshKeysViewDrawer/SshKeysViewDrawer.pom";

const dataCySelectors = ["ribbonButtonSshAddButton"] as const;
type Selectors = (typeof dataCySelectors)[number];

type SafeApiAliases = "getSshList" | "getEmptySshList" | "getSshListError";
type SshMutationApiAliases = "postSsh";
type ApiAliases = SafeApiAliases | SshMutationApiAliases;

const sshListUrl = "**/localAccounts*";

const mockSsh: eim.LocalAccountRead = {
  resourceId: "ssh-abcd81",
  username: "test-key-name",
  sshKey: fakeSshKey,
};

const generateSshMocks = (size = 10, offset = 0, mock = mockSsh) =>
  [...Array(size).keys()].map((index) => ({
    ...mock,
    sshKey: `${mock.sshKey}-${index + offset}`,
    resourceId: `ssh-mock-${index + offset}`,
  }));

const safeEndpoints: CyApiDetails<
  SafeApiAliases,
  eim.GetV1ProjectsByProjectNameLocalAccountsApiResponse
> = {
  getSshList: {
    route: sshListUrl,
    response: {
      localAccounts: generateSshMocks(8, 0),
      totalElements: 8,
      hasNext: false,
    },
  },
  getEmptySshList: {
    route: sshListUrl,
    response: {
      localAccounts: [],
      totalElements: 0,
      hasNext: false,
    },
  },
  getSshListError: {
    route: sshListUrl,
    statusCode: 500,
  },
};

const mutationEndpoints: CyApiDetails<
  SshMutationApiAliases,
  | eim.PostV1ProjectsByProjectNameLocalAccountsApiResponse
  | eim.DeleteV1ProjectsByProjectNameLocalAccountsAndLocalAccountIdApiResponse
> = {
  postSsh: {
    method: "POST",
    route: "**/localAccounts",
    statusCode: 200,
  },
};

class SshKeysTablePom extends CyPom<Selectors, ApiAliases> {
  tablePom: TablePom;
  tableUtilsPom: SiTablePom;
  apiErrorPom: ApiErrorPom;
  emptyPom: EmptyPom;
  addSshDrawerPom: SshKeysAddEditDrawerPom;
  viewSshDrawerPom: SshKeysViewDrawerPom;
  deleteSshModalPom: DeleteSSHDialogPom;

  constructor(public rootCy: string = "sshKeysTable") {
    super(rootCy, [...dataCySelectors], {
      ...safeEndpoints,
      ...mutationEndpoints,
    });
    this.tablePom = new TablePom("sshTableList");
    this.tableUtilsPom = new SiTablePom("sshTableList");
    this.apiErrorPom = new ApiErrorPom();
    this.emptyPom = new EmptyPom();
    this.addSshDrawerPom = new SshKeysAddEditDrawerPom();
    this.viewSshDrawerPom = new SshKeysViewDrawerPom();
    this.deleteSshModalPom = new DeleteSSHDialogPom();
  }

  public getActionPopupBySearchText(search: string) {
    return this.tableUtilsPom
      .getRowBySearchText(search)
      .find("[data-cy='popup']")
      .first();
  }
}
export default SshKeysTablePom;
