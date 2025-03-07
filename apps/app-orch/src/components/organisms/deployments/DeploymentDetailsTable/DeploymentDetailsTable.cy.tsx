/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { deploymentOne } from "@orch-ui/utils";
import DeploymentDetailsTable from "./DeploymentDetailsTable";
import DeploymentDetailsTablePom from "./DeploymentDetailsTable.pom";

const pom = new DeploymentDetailsTablePom();

describe("<DeploymentDetailsTable />", () => {
  const testTHead = (expectedTheadTitles: string[]) => {
    expectedTheadTitles.forEach((matchHeadingCell, headerIndex) => {
      pom.table
        .getColumnHeader(headerIndex)
        .should("have.text", matchHeadingCell);
    });
  };

  const testTableRow = (rowIndex: number, matchCellValues: string[]) => {
    matchCellValues.forEach((cellValue, columnIndex) => {
      pom.table
        .getCell(rowIndex + 1, columnIndex + 1)
        .should("have.text", cellValue);
    });
  };

  describe("basic functionality", () => {
    it("when no rows are present", () => {
      pom.interceptApis([pom.api.getClustersEmpty]);
      cy.mount(
        <DeploymentDetailsTable hideColumns={[]} deployment={deploymentOne} />,
      );
      pom.waitForApis();
      cy.contains("There are no Clusters available within this deployment.");
    });

    it("should hide columns", () => {
      pom.interceptApis([pom.api.getClustersListPage1Size10]);
      cy.mount(
        <DeploymentDetailsTable
          deployment={deploymentOne}
          hideColumns={["Application", "Status"]}
        />,
      );
      pom.waitForApis();
      testTHead(["Cluster ID", "Cluster Name", "Actions"]);
    });

    it("should accept empty/undefined value on hideColumn", () => {
      pom.interceptApis([pom.api.getClustersListPage1Size10]);
      cy.mount(
        <DeploymentDetailsTable
          deployment={deploymentOne}
          hideColumns={undefined}
        />,
      );
      pom.waitForApis();
      testTHead([
        "Cluster ID",
        "Cluster Name",
        "Status",
        "Application",
        "Actions",
      ]);
    });

    it("when click on Cluster ID link", () => {
      pom.interceptApis([pom.api.getClustersListPage1Size10]);
      cy.mount(
        <DeploymentDetailsTable
          deployment={deploymentOne}
          columnAction={cy.stub().as("columnAction")}
        />,
      );
      pom.waitForApis();
      pom.table.root.contains("cluster-5").click();
      cy.get("#pathname").should("have.text", "pathname: /cluster/cluster-5/");
    });
  });

  describe("with pagination", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getClustersListPage1Size18]);
      cy.mount(<DeploymentDetailsTable deployment={deploymentOne} />);
      pom.waitForApis();
    });
    it("renders page 1", () => {
      [...Array(10).keys()].map((index) => {
        testTableRow(index, [
          `cluster-${index}`,
          `Cluster ${index}`,
          "Running",
          "6/6",
        ]);
      });
      pom.table
        .getPreviousPageButton()
        .should("have.class", "spark-button-disabled");
      pom.table
        .getNextPageButton()
        .should("not.have.class", "spark-button-disabled");
    });
    it("renders page 2", () => {
      pom.interceptApis([pom.api.getClustersListPage2Size18]);
      pom.table.getPageButton(2).click();
      pom.waitForApis();

      [...Array(8).keys()].map((index, rowIndex) => {
        testTableRow(rowIndex, [
          `cluster-${index + 10}`,
          `Cluster ${index + 10}`,
          "Running",
          "6/6",
        ]);
      });

      pom.table
        .getPreviousPageButton()
        .should("not.have.class", "spark-button-disabled");
      pom.table
        .getNextPageButton()
        .should("have.class", "spark-button-disabled");
    });
  });

  describe("with sorting", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getClustersListOrderByNameAsc]);
      cy.mount(<DeploymentDetailsTable deployment={deploymentOne} />);
      pom.waitForApis();
    });
    it("should render table (orderBy `id` asc by default)", () => {
      [...Array(10).keys()].map((index) => {
        testTableRow(index, [
          `cluster-${index}`,
          `Cluster ${index}`,
          "Running",
          "6/6",
        ]);
      });
    });
    it("should orderBy `id` desc", () => {
      pom.interceptApis([pom.api.getClustersListOrderByNameDesc]);
      pom.table.getColumnHeaderSortArrows(0).click();
      pom.waitForApis();

      [...Array(10).keys()].reverse().map((nameIndex, rowIndex) => {
        testTableRow(rowIndex, [
          `cluster-${nameIndex}`,
          `Cluster ${nameIndex}`,
          "Running",
          "6/6",
        ]);
      });
    });
  });

  describe("on searching", () => {
    it("should send search value to GET request", () => {
      pom.interceptApis([pom.api.getClustersListPage1Size10]);
      cy.mount(<DeploymentDetailsTable deployment={deploymentOne} />);
      pom.waitForApis();

      pom.interceptApis([pom.api.getClustersListWithSearchFilter]);
      pom.table.root.find("[data-cy='search']").type("testing");
      pom.waitForApis();
      pom.table.root.find("td:contains(testing)").should("have.length", 3);
    });
  });
});
