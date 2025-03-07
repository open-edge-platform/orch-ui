/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "sshKeyUsername",
  "sshPublicKey",
  "sshInputErrorMessage",
  "addEditBtn",
  "cancelFooterBtn",
] as const;
type Selectors = (typeof dataCySelectors)[number];
export const fakeIncorrectFormatSshKey =
  "ssh-rsa AAAAB3NzaC1yc2EgQDf0nWRbXNe7UsO5PPUWWO8GAAAADAQABAAAB/950VwqkUgp851EEhNISCGKY/XVLB/sgVr9nKKoP4p0XP2v3ijAKB5dxSPGe7C0vtNLHA5fA6PAXg/IVjeZBkMFvWN6nT8OWauFzbvZwQHJNb9zL+Uoy82i8x88gEFRN7E8B8rOjmiszLIcHTrWq6E1c5w82rlNbmaozIIj7Nm6v2lQXujXJdpQTvUg7wyTuSUpnzUUV20eORF8ooDdXFCpTDBXa32RJUcgH84bVE4jttxmiYiKorTt43p428zhap3z6JthwLP4xAole6DrACwWuLQp+YPu7Ik8WmZpX/OW5q05DsYwt5YXQjE9Mze3XJnwI8HHGrn5nOWo8jmtJZMR/S4Yiv8Zvzl01c8GMcJmmr+wbWV+l14NJOgRgVmAuK+ZYte7SH6MC+MJQciqyVeNM+CVoxQh1ZueAsKgUnONTvGr2yModM0x9j4JnzUa7ZvRd01PHNZp6hcupM+zodO1UE724phNUNi5cXVOFl1= amr\fakeuser@fake-key";
export const fakeSshKey =
  "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBNVFtW7BtSKrG9peh0pOdcwsDo8LtFdpFPSJUmCFQlg your_email@example.com";
class SshKeysAddEditDrawerPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "sshKeysAddEditDrawer") {
    super(rootCy, [...dataCySelectors]);
  }

  getDrawerBase() {
    return this.root.find(".spark-drawer-base");
  }

  getHeaderCloseButton() {
    return this.root.find("[data-testid='drawer-header-close-btn']");
  }

  fillSshForm(localAccounts: eim.LocalAccount) {
    this.el.sshKeyUsername.clear().type(localAccounts.username);
    this.el.sshPublicKey.clear().type(localAccounts.sshKey);
  }
}
export default SshKeysAddEditDrawerPom;
