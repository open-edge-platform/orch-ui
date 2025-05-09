/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import ClusterList from "./ClusterList";
import ClusterListPom from "./ClusterList.pom";

const pom = new ClusterListPom();
describe("<ClusterList/>", () => {
  beforeEach(() => {
    pom.interceptApis([pom.api.clusterMocked]);
    cy.mount(
      <ClusterList
        onSelect={cy.stub().as("onSelectStub")}
        onShowDetails={cy.stub().as("onShowDetailsStub")}
        isForm={true}
      />,
    );
    pom.waitForApis();
  });
  it("should render component", () => {
    pom.root.should("exist");
  });
  it("can select a cluster", () => {
    pom.table.getCell(1, 1).find("input").click();
    cy.get("@onSelectStub").should("have.been.called");
  });
  it("can trigger cluster detail view", () => {
    pom.table.getCell(1, 2).find("a").click();
    cy.get("@onShowDetailsStub").should("have.been.called");
  });
  it("pass page value to GET request", () => {
    pom.interceptApis([pom.api.clusterMockedWithOffset]);
    cy.get(".spark-pagination-list").contains(2).click();
    pom.waitForApis();
  });

  it("changes page size when onChangePageSize is called", () => {
    // Intercept API call with different page size
    pom.interceptApis([pom.api.clusterMockedWithPageSize]);
    pom.table.root
      .find("[data-testid='pagination-control-pagesize']")
      .find(".spark-icon-chevron-down")
      .click();
    cy.get(".spark-popover .spark-list-item").contains("100").click();
    pom.waitForApis();

    // Check api response
    cy.get(`@${pom.api.clusterMockedWithPageSize}`)
      .its("request.url")
      .then((url: string) => {
        const match = url.match(/pageSize=100/);
        return expect(match && match.length > 0).to.be.true;
      });
  });
});
