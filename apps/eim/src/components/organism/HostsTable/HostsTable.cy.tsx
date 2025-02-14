/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ApiErrorPom, EmptyPom, RibbonPom } from "@orch-ui/components";
import { LifeCycleState } from "../../../store/hostFilterBuilder";
import HostsTable from "./HostsTable";
import HostsTablePom from "./HostsTable.pom";

const pom = new HostsTablePom();
const ribbonPom = new RibbonPom("table");
const emptyPom = new EmptyPom();
const apiErrorPom = new ApiErrorPom();
describe("<HostsTable/>", () => {
  describe("when the API return a list of hosts", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getHostsListSuccessPage1Total10]);
      cy.mount(<HostsTable lifecycleState={LifeCycleState.All} />);
      pom.waitForApis();
    });
    it("should render the hosts correctly", () => {
      const expectedLength = 10;
      // The `10` comes from generateHostResponse(10) in the Pom mock
      pom.table.getRows().should("have.length", expectedLength);

      pom.table
        .getTotalItemCount()
        .should("contain.text", `${expectedLength} items found`);
      pom.table
        .getNextPageButton()
        .should("have.class", "spark-button-disabled");
      pom.table
        .getPreviousPageButton()
        .should("have.class", "spark-button-disabled");

      [...Array(10).keys()].forEach((i) => {
        pom.table.root.contains(`Host ${i}`);
      });
    });

    it("should render the provided actions", () => {
      pom.table.getColumnHeader(7).contains("Action").should("have.length", 1);
      //TODO: table behavior is more dynamic on the action options, need to re-visit this
      // pom.table
      //   .getRows()
      //   .find(`td:contains(${renderedActionCol})`)
      //   .should("have.length", 10); // This `10` comes from current mocked intercept api
    });

    it("should expand a row and show details", () => {
      pom.table.getCell(1, 1).click();
      pom.hostRowDetails.root.should("be.visible");
    });
  });

  it("handle empty", () => {
    pom.interceptApis([pom.api.getHostsListEmpty]);
    cy.mount(<HostsTable />);
    pom.waitForApis();
    emptyPom.root.should("be.visible");
  });

  it("handle 500 error", () => {
    pom.interceptApis([pom.api.getHostsListError500]);
    cy.mount(<HostsTable />);
    pom.waitForApis();
    apiErrorPom.root.should("be.visible");
  });

  describe("search filter test", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getHostsListSuccessPage1Total18]);
      cy.mount(<HostsTable />);
      pom.waitForApis();
    });

    //TODO: needs modifications for the way the new table works
    xit("pass search value to GET request", () => {
      pom.table.getTotalItemCount().should("contain.text", "18 items found");

      pom.interceptApis([pom.api.getHostsListSuccessWithSearchFilter]);
      ribbonPom.el.search.type("testingSearch");
      pom.waitForApis();

      pom.table.getTotalItemCount().should("contain.text", "5 items found");
      pom.table.root
        .find("td:contains(testingSearch)")
        .should("have.length", 5);
    });
  });

  describe("pagination tests", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getHostsListSuccessPage1Total18]);
      cy.mount(<HostsTable selectable />);
      pom.waitForApis();
    });

    it("should show all rows on page1 and page2", () => {
      pom.table.getRows().should("have.length", 10);

      pom.interceptApis([pom.api.getHostsListSuccessPage2]);
      pom.table.getPageButton(2).click();
      pom.waitForApis();

      pom.table.getRows().should("have.length", 8);
    });

    it("should select 2nd row of page 1", () => {
      pom.getHostCheckboxByName("Host 1").click();
      pom.getHostCheckboxByName("Host 1").should("be.checked");

      pom.interceptApis([pom.api.getHostsListSuccessPage2]);
      pom.table.getPageButton(2).click();
      pom.waitForApis();

      pom.getHostCheckboxByName("Host 1").should("not.be.checked");
    });

    it("should select 2nd row of page 2", () => {
      pom.interceptApis([
        pom.api.getHostsListSuccessPage1Total18,
        pom.api.getHostsListSuccessPage2,
      ]);
      pom.table.getPageButton(2).click();

      pom.getHostCheckboxByName("Host 11").click();
      pom.getHostCheckboxByName("Host 11").should("be.checked");

      pom.table.getPageButton(1).click();

      pom.getHostCheckboxByName("Host 1").should("not.be.checked");
    });
  });

  describe("when the onDataLoad prop is provided", () => {
    let onDataLoad;
    beforeEach(() => {
      onDataLoad = cy.stub().as("onDataLoad");
      pom.interceptApis([pom.api.getHostsListSuccessPage1Total10]);
      cy.mount(<HostsTable onDataLoad={onDataLoad} />);
      pom.waitForApis();
    });
    it("should invoke the callback", () => {
      cy.get("@onDataLoad").should("have.been.calledOnce");
    });
  });
});
