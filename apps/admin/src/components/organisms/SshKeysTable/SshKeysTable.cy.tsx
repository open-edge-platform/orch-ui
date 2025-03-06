/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import SshKeysTable from "./SshKeysTable";
import SshKeysTablePom from "./SshKeysTable.pom";

const pom = new SshKeysTablePom();
describe("<SshKeysTable/>", () => {
  it("should render component", () => {
    pom.interceptApis([pom.api.getSshList]);
    cy.mount(<SshKeysTable />);
    pom.waitForApis();
    pom.tablePom.root.should("exist");
  });
  it("should render error", () => {
    pom.interceptApis([pom.api.getSshListError]);
    cy.mount(<SshKeysTable />);
    pom.waitForApis();
    pom.apiErrorPom.root.should("exist");
  });
  it("should render empty component", () => {
    pom.interceptApis([pom.api.getEmptySshList]);
    cy.mount(<SshKeysTable />);
    pom.waitForApis();
    pom.emptyPom.root.should("exist");
  });
});
