/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { clusterA, deploymentTwo } from "@orch-ui/utils";
import DeploymentSiteSummary from "./DeploymentSiteSummary";
import DeploymentSiteSummaryPom from "./DeploymentSiteSummary.pom";

const pom = new DeploymentSiteSummaryPom();
describe("<DeploymentSiteSummary/>", () => {
  beforeEach(() => {
    pom.interceptApis([pom.api.clustersList]);
    pom.siteByClusterPom.interceptApis([pom.siteByClusterPom.api.getSiteSalem]);
    cy.mount(<DeploymentSiteSummary deployment={deploymentTwo} />);
    pom.waitForApis();
    pom.siteByClusterPom.waitForApis();
  });
  it("should render the expected number of rows", () => {
    pom.root.should("exist");
    pom.table.getRows().should("have.length", 2);
  });
  it("should navigate to the deployment details page", () => {
    pom.tableUtils.getCellBySearchText("Down").find("a").click();
    pom
      .getPath()
      .should(
        "eq",
        `/applications/deployment/${deploymentTwo.deployId}/cluster/${clusterA.id}`,
      );
  });
  describe("DeploymentClusters table pagination, filter and order should", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.clustersListPage1]);
      cy.mount(<DeploymentSiteSummary deployment={deploymentTwo} />);
      pom.waitForApis();
    });

    it("pass order value to GET request", () => {
      pom.interceptApis([pom.api.clustersListWithOrder]);
      pom.table.getColumnHeaderSortArrows(1).click();
      pom.waitForApis();
      cy.get(`@${pom.api.clustersListWithOrder}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(/orderBy=status.state%20asc/);
          return expect(match && match.length > 0).to.be.true;
        });
    });
    it("pass page value to GET request", () => {
      pom.interceptApis([pom.api.clustersListPage2]);
      pom.table.getPageButton(2).click();
      cy.get(`@${pom.api.clustersListPage2}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(/offset=10/);
          return expect(match && match.length > 0).to.be.true;
        });
    });
  });
});
