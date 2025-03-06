/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { ApiErrorPom, EmptyPom, TablePom } from "@orch-ui/components";
import { CyApiDetails, CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "getSshList" | "getEmptySshList" | "getSshListError";
const sshListUrl = "**/localAccounts*";

const mockSsh: eim.LocalAccountRead = {
  resourceId: "ssh-abcd81",
  username: "all-groups-example-user",
  sshKey:
    "ssh-rsa AAAAB3NzaC1yc2EgQDf0nWRbXNe7UsO5PPUWWO8GAAAADAQABAAAB/950VwqkUgp851EEhNISCGKY/XVLB/sgVr9nKKoP4p0XP2v3ijAKB5dxSPGe7C0vtNLHA5fA6PAXg/IVjeZBkMFvWN6nT8OWauFzbvZwQHJNb9zL+Uoy82i8x88gEFRN7E8B8rOjmiszLIcHTrWq6E1c5w82rlNbmaozIIj7Nm6v2lQXujXJdpQTvUg7wyTuSUpnzUUV20eORF8ooDdXFCpTDBXa32RJUcgH84bVE4jttxmiYiKorTt43p428zhap3z6JthwLP4xAole6DrACwWuLQp+YPu7Ik8WmZpX/OW5q05DsYwt5YXQjE9Mze3XJnwI8HHGrn5nOWo8jmtJZMR/S4Yiv8Zvzl01c8GMcJmmr+wbWV+l14NJOgRgVmAuK+ZYte7SH6MC+MJQciqyVeNM+CVoxQh1ZueAsKgUnONTvGr2yModM0x9j4JnzUa7ZvRd01PHNZp6hcupM+zodO1UE724phNUNi5cXVOFl1= amr\fakeuser@fake-key",
};

const generateSshMocks = (size = 10, offset = 0, mock = mockSsh) =>
  [...Array(size).keys()].map((index) => ({
    ...mock,
    sshKey: `${mock.sshKey}-${index + offset}`,
    resourceId: `ssh-mock-${index + offset}`,
  }));

const endpoints: CyApiDetails<
  ApiAliases,
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

class SshKeysTablePom extends CyPom<Selectors, ApiAliases> {
  tablePom: TablePom;
  apiErrorPom: ApiErrorPom;
  emptyPom: EmptyPom;
  // TODO: Add SSH Drawer POM (in next PR)

  constructor(public rootCy: string = "sshKeysTable") {
    super(rootCy, [...dataCySelectors], endpoints);
    this.tablePom = new TablePom("projectsTableList");
    this.apiErrorPom = new ApiErrorPom();
    this.emptyPom = new EmptyPom();
  }
}
export default SshKeysTablePom;
