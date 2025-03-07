/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { fakeSshKey } from "../../organisms/SshKeysAddEditDrawer/SshKeysAddEditDrawer.pom";
import SshHostsTable from "./SshHostsTable";
import SshHostsTablePom from "./SshHostsTable.pom";

const pom = new SshHostsTablePom();
describe("<SshHostsTable/>", () => {
  const testLocalAccount = {
    resourceId: "ssh-12kjjk1",
    sshKey: fakeSshKey,
    username: "all-group-example-user",
  };

  const TestStatusComponent = () => <div>Status</div>;

  const LazyAggregateMockRemote: React.LazyExoticComponent<
    React.ComponentType<any>
  > | null = React.lazy(() =>
    Promise.resolve({ default: TestStatusComponent }),
  );
  it("should render component", () => {
    pom.interceptApis([pom.api.getInstance]);
    cy.mount(
      <SshHostsTable
        localAccount={testLocalAccount}
        AggregateHostStatusRemote={LazyAggregateMockRemote}
      />,
    );
    pom.waitForApis();

    pom.root.should("exist");
    pom.tablePom.root.should("exist");
  });
  it("should render empty", () => {
    pom.interceptApis([pom.api.getInstanceEmpty]);
    cy.mount(<SshHostsTable localAccount={testLocalAccount} />);
    pom.waitForApis();

    pom.emptyPom.root.should("exist");
  });

  it("should render error", () => {
    pom.interceptApis([pom.api.getInstanceError]);
    cy.mount(<SshHostsTable localAccount={testLocalAccount} />);
    pom.waitForApis();

    pom.apiErrorPom.root.should("exist");
  });
});
