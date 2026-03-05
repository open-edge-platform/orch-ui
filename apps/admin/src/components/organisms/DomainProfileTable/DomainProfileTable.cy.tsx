/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApiErrorPom, EmptyPom } from "@orch-ui/components";
import { domain1, domain2, domain3 } from "@orch-ui/utils";
import DomainProfileTable from "./DomainProfileTable";
import DomainProfileTablePom from "./DomainProfileTable.pom";

const pom = new DomainProfileTablePom();
const apiErrorPom = new ApiErrorPom();
const emptyPom = new EmptyPom();

describe("<DomainProfileTable/>", () => {
  it("should render component", () => {
    cy.mount(<DomainProfileTable hasRole={() => true} />);
    pom.root.should("exist");
  });

  it("should show the table when domain data exists", () => {
    pom.interceptApis([pom.api.getAllDomainsMocked]);
    cy.mount(<DomainProfileTable hasRole={() => true} />);
    pom.waitForApis();

    pom.table.getRows().should("have.length", 3);
  });

  it("should show an error when the API fails", () => {
    pom.interceptApis([pom.api.getAllDomainsError]);
    cy.mount(<DomainProfileTable hasRole={() => true} />);
    pom.waitForApis();

    apiErrorPom.root.should("be.visible");
  });

  it("should show empty message when there are no domains", () => {
    pom.interceptApis([pom.api.getAllDomainsEmpty]);
    cy.mount(<DomainProfileTable hasRole={() => true} />);
    pom.waitForApis();

    emptyPom.root.should("be.visible");
  });

  it("should display domain data correctly", () => {
    pom.interceptApis([pom.api.getAllDomainsMocked]);
    cy.mount(<DomainProfileTable hasRole={() => true} />);
    pom.waitForApis();

    // Verify first domain data
    cy.contains(domain1.profileName).should("be.visible");
    cy.contains(domain1.domainSuffix).should("be.visible");

    // Verify second domain data
    cy.contains(domain2.profileName).should("be.visible");
    cy.contains(domain2.domainSuffix).should("be.visible");

    // Verify third domain data
    cy.contains(domain3.profileName).should("be.visible");
    cy.contains(domain3.domainSuffix).should("be.visible");
  });
});
