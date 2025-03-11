/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { fakeSshKey } from "../SshKeysAddEditDrawer/SshKeysAddEditDrawer.pom";
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
  it("should add ssh", () => {
    const testLocalAccount = { username: "test-user", sshKey: fakeSshKey };
    pom.interceptApis([pom.api.getEmptySshList]);
    cy.mount(<SshKeysTable hasPermission />);
    pom.waitForApis();

    pom.el.ribbonButtonSshAddButton.click();
    pom.addSshDrawerPom.root.should("exist");
    pom.addSshDrawerPom.fillSshForm(testLocalAccount);

    pom.addSshDrawerPom
      .getDrawerBase()
      .should("have.class", "spark-drawer-show");

    pom.interceptApis([pom.api.postSsh]);
    pom.addSshDrawerPom.el.addEditBtn.click();
    pom.waitForApis();

    cy.get(`@${pom.api.postSsh}`)
      .its("request.body")
      .should("deep.include", testLocalAccount);
    pom.addSshDrawerPom
      .getDrawerBase()
      .should("have.class", "spark-drawer-hide");
  });
  it("should open view details drawer", () => {
    pom.interceptApis([pom.api.getSshList]);
    cy.mount(<SshKeysTable hasPermission />);
    pom.waitForApis();
    pom.getActionPopupBySearchText("test-key-name").click().as("popup");
    cy.get("@popup").contains("View Details").click();

    pom.viewSshDrawerPom.root.should("exist");
  });

  it("should see delete disabled for the ssh in use", () => {
    pom.interceptApis([pom.api.getSshList]);
    pom.viewSshDrawerPom.sshHostTablePom.interceptApis([
      pom.viewSshDrawerPom.sshHostTablePom.api.getInstance,
    ]);
    cy.mount(<SshKeysTable hasPermission />);
    pom.viewSshDrawerPom.sshHostTablePom.waitForApis();
    pom.getActionPopupBySearchText("test-key-name").click().as("popup");
    cy.get("@popup")
      .contains("Delete")
      .should("have.class", "popup__option-item-disable");
  });

  it("should see delete modal for the ssh when it's not in use", () => {
    pom.interceptApis([pom.api.getSshList]);
    pom.viewSshDrawerPom.sshHostTablePom.interceptApis([
      pom.viewSshDrawerPom.sshHostTablePom.api.getInstanceEmpty,
    ]);
    cy.mount(<SshKeysTable hasPermission />);
    pom.viewSshDrawerPom.sshHostTablePom.waitForApis();
    pom.waitForApis();

    pom.deleteSshModalPom.root.should("not.exist");
    pom.getActionPopupBySearchText("test-key-name").click().as("popup");
    cy.get("@popup").contains("Delete").click();
    pom.deleteSshModalPom.root.should("exist");
  });
});
