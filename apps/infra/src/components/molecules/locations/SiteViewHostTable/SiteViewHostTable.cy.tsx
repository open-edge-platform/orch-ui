/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApiErrorPom, EmptyPom } from "@orch-ui/components";
import { siteBoston } from "@orch-ui/utils";
import HostsTablePom from "../../../../components/organism/HostsTable/HostsTable.pom";
import { SiteViewHostTable } from "./SiteViewHostTable";
import { SiteViewHostTablePom } from "./SiteViewHostTable.pom";

const pom = new SiteViewHostTablePom();
const hostsTablePom = new HostsTablePom();
const apiErrorPom = new ApiErrorPom();
const emptyPom = new EmptyPom();

describe("<SiteViewHostTable/>", () => {
  it("should render component", () => {
    cy.mount(<SiteViewHostTable />);
    pom.root.should("exist");
  });

  it("should show the table when hosts data exists", () => {
    hostsTablePom.interceptApis([
      hostsTablePom.api.getHostsListSuccessPage1Total10,
    ]);

    cy.mount(<SiteViewHostTable site={siteBoston} />);
    pom.waitForApis();

    hostsTablePom.table.getRows().should("have.length", 10);
  });

  it("should show an error when the hosts api fails", () => {
    hostsTablePom.interceptApis([hostsTablePom.api.getHostsListError500]);

    cy.mount(<SiteViewHostTable site={siteBoston} />);
    pom.waitForApis();

    apiErrorPom.root.should("be.visible");
  });

  it("should show empty message when there are no hosts", () => {
    hostsTablePom.interceptApis([hostsTablePom.api.getHostsListEmpty]);

    cy.mount(<SiteViewHostTable site={siteBoston} />);
    pom.waitForApis();

    emptyPom.root.should("be.visible");
  });
});
