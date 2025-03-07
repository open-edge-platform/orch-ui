/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import SshKeyInUseByHostsCell from "./SshKeyInUseByHostsCell";
import SshKeyInUseByHostsCellPom, {
  fakeSshKey,
} from "./SshKeyInUseByHostsCell.pom";

const pom = new SshKeyInUseByHostsCellPom();
describe("<SshKeyInUseByHostsCell/>", () => {
  const localAccountId = "localaccount-1";
  const sshKeyName = "all-groups-example-user";
  const currentTime = new Date().toISOString();
  const testLocalAccount = {
    localAccountID: localAccountId,
    resourceId: localAccountId,
    username: sshKeyName,
    sshKey: fakeSshKey,
    timestamps: {
      createdAt: currentTime,
      updatedAt: currentTime,
    },
  };

  it("should render Yes without error indication", () => {
    pom.interceptApis([pom.api.getSshInstances]);
    cy.mount(<SshKeyInUseByHostsCell localAccount={testLocalAccount} />);
    pom.root.should("contain.text", "Yes");
    pom.root.find(".spark-icon").should("not.exist");
  });

  it("should render Yes with error indication", () => {
    pom.interceptApis([pom.api.getSshInstancesError]);
    cy.mount(<SshKeyInUseByHostsCell localAccount={testLocalAccount} />);
    pom.root.should("contain.text", "Yes");
    pom.root.find(".spark-icon").should("exist"); // Indicate error
  });

  it("should render No", () => {
    pom.interceptApis([pom.api.getSshInstancesEmpty]);
    cy.mount(<SshKeyInUseByHostsCell localAccount={testLocalAccount} />);
    pom.root.should("have.text", "No");
  });
});
