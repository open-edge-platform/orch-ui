/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { SparkTableColumn } from "@orch-ui/utils";
import { OrchTable } from "./OrchTable";
import { OrchTablePom } from "./OrchTable.pom";

interface TestData {
  name: string;
}

const pom = new OrchTablePom();
describe("<OrchTable/>", () => {
  const columns: SparkTableColumn<TestData>[] = [
    { Header: "Name", accessor: "name" },
  ];
  const data: TestData[] = [
    { name: "testing-B1" },
    { name: "testing-b2" },
    { name: "Testing-B" },
    { name: "testing-a" },
    { name: "testing-c" },
    { name: "testing-A" },
  ];
  describe("should render component", () => {
    it("with ribbon and table", () => {
      cy.mount(
        <OrchTable
          isSuccess={true}
          tableProps={{ columns: columns, data: data }}
          ribbonProps={{
            onSearchChange: cy.stub(),
            buttons: [
              {
                onPress: cy.stub(),
                text: "Testing ribbon",
              },
            ],
          }}
        />,
      );
      pom.table.root.should("exist");
      pom.ribbon.root.should("exist");
      pom.ribbon.el.button.contains("Testing ribbon");
    });
    it("without ribbon component", () => {
      cy.mount(
        <OrchTable
          isSuccess={true}
          tableProps={{ columns: columns, data: data }}
        />,
      );
      pom.table.root.should("exist");
      pom.ribbon.root.should("not.exist");
    });
    it("with empty component", () => {
      cy.mount(
        <OrchTable
          isEmpty={true}
          tableProps={{ columns: columns, data: data }}
          emptyProps={{
            title: "There are no Applications currently available.",
            subTitle:
              "To add, and deploy Applications, select Add Application.",
          }}
        />,
      );
      pom.table.root.should("not.exist");
      pom.empty.el.emptyTitle.contains(
        "There are no Applications currently available.",
      );
      pom.empty.el.emptySubTitle.contains(
        "To add, and deploy Applications, select Add Application.",
      );
    });
    it("with loader component", () => {
      cy.mount(
        <OrchTable
          isLoading={true}
          tableProps={{ columns: columns, data: data }}
        />,
      );
      pom.table.root.should("not.exist");
      pom.loader.root.should("exist");
    });
    it("with error component", () => {
      cy.mount(
        <OrchTable
          isError={true}
          tableProps={{ columns: columns, data: data }}
          error={{ status: 500, error: "some error" }}
        />,
      );
      pom.table.root.should("not.exist");
      pom.error.root.should("exist");
    });
    it("with Ribbon button when empty case", () => {
      cy.mount(
        <OrchTable
          isEmpty={true}
          tableProps={{ columns: columns, data: data }}
          ribbonProps={{
            buttons: [
              {
                text: "Testing ribbon",
              },
            ],
          }}
        />,
      );
      pom.ribbon.root.should("exist");
    });
    it("with Ribbon button when error case", () => {
      cy.mount(
        <OrchTable
          isEmpty={true}
          tableProps={{ columns: columns, data: data }}
          ribbonProps={{
            buttons: [
              {
                text: "Testing ribbon",
              },
            ],
          }}
        />,
      );
      pom.ribbon.root.should("exist");
    });
    it("with Ribbon button when loading case", () => {
      cy.mount(
        <OrchTable
          isLoading={true}
          tableProps={{ columns: columns, data: data }}
          ribbonProps={{
            buttons: [
              {
                text: "Testing ribbon",
              },
            ],
          }}
        />,
      );
      pom.ribbon.root.should("exist");
    });
  });
  describe("onSort should", () => {
    xit("set value for column and direction in url (with sortableColumnsInit)", () => {
      cy.mount(
        <OrchTable
          isSuccess={true}
          tableProps={{
            columns: columns,
            data: data,
            sort: [0],
            sortableColumnsInit: {
              name: "Name",
            },
          }}
        />,
      );
      pom.clickFirstSortColumn();
      cy.get("#search").contains("column=name&direction=asc");
      pom.table.getRow(1).should("contain", "testing-A");
      pom.table.getRow(data.length).should("contain", "testing-c");
    });
    xit("set value for column and direction in url (without sortableColumnsInit)", () => {
      cy.mount(
        <OrchTable
          isSuccess={true}
          tableProps={{
            columns: columns,
            data: data,
            sort: [0],
          }}
        />,
      );
      pom.clickFirstSortColumn();
      pom.table.getColumns().first().find(".caret-up-select").should("exist");
      cy.get("#search").contains("column=name&direction=asc");
      pom.table.getRow(1).should("contain", "testing-A");
      pom.table.getRow(data.length).should("contain", "testing-c");
    });

    xit("set value for column and DESC direction in url", () => {
      cy.mount(
        <OrchTable
          isSuccess={true}
          tableProps={{
            columns: columns,
            data: data,
            sort: [0],
          }}
        />,
      );
      //click twice to set "desc"
      pom.clickFirstSortColumn();
      pom.clickFirstSortColumn();
      pom.table.getColumns().first().find(".caret-down-select").should("exist");
      cy.get("#search").contains("column=name&direction=desc");
      pom.table.getRow(1).should("contain", "testing-c");
      pom.table.getRow(data.length).should("contain", "testing-A");
    });

    xit("load initial sort from column and direction in url", () => {
      cy.mount(
        <OrchTable
          isSuccess={true}
          tableProps={{
            columns: columns,
            data: data,
            sort: [0],
            sortableColumnsInit: {
              name: "name",
            },
          }}
        />,
        {
          routerProps: { initialEntries: ["/?column=name&direction=desc"] },
        },
      );
      pom.table.getColumns().first().find(".caret-down-select").should("exist");
      pom.table.getRow(1).should("contain", "testing-c");
      pom.table.getRow(data.length).should("contain", "testing-A");
    });

    it("returns to unsorted state", () => {
      cy.mount(
        <OrchTable
          isSuccess={true}
          tableProps={{
            columns: columns,
            data: data,
            sort: [0],
          }}
        />,
      );
      pom.clickFirstSortColumn();
      pom.clickFirstSortColumn();
      pom.clickFirstSortColumn();
      pom.table.getRow(1).should("contain", data[0].name);
      pom.table
        .getRow(data.length)
        .should("contain", data[data.length - 1].name);
    });
  });

  it("onSearchChange should set value for searchTerm in url", () => {
    cy.mount(
      <OrchTable
        isSuccess={true}
        tableProps={{ columns: columns, data: data }}
      />,
      {
        routerProps: { initialEntries: ["/?searchTerm=initial"] },
      },
    );
    pom.ribbon.el.search.should("have.value", "initial");
    pom.ribbon.el.search.clear().type("testing");
    // As we set searchAfterTyping equal to true, need to wait before searchTerm is set
    cy.wait(2000);
    console.log(cy.location());
    cy.get("#search").contains("searchTerm=testing");
  });
  it("pageSize should be loaded to the table", () => {
    const multipleData = [
      { name: "testing1" },
      { name: "testing2" },
      { name: "testing3" },
      { name: "testing4" },
      { name: "testing5" },
      { name: "testing6" },
      { name: "testing7" },
      { name: "testing8" },
    ];
    cy.mount(
      <OrchTable
        isSuccess={true}
        tableProps={{ columns: columns, data: multipleData }}
      />,
      {
        routerProps: { initialEntries: ["/?pageSize=3&offset=3"] },
      },
    );
    pom.table.getPagination().contains(`${multipleData.length} items found`);
    pom.table
      .getPaginationButton(2)
      .should("have.class", "spark-button-active")
      .contains("2");
    pom.table.getPaginationButton(3).click();
    cy.get("#search").contains("pageSize=3&offset=6");
    pom.table.selectPageSize(1);
    cy.get("#search").contains("pageSize=10&offset=0");
  });
  describe("should disable and enable previous and next button correctly", () => {
    const multipleData = [
      { name: "testing1" },
      { name: "testing2" },
      { name: "testing3" },
      { name: "testing4" },
      { name: "testing5" },
      { name: "testing6" },
      { name: "testing7" },
    ];
    it("previous button enable", () => {
      cy.mount(
        <OrchTable
          isSuccess={true}
          tableProps={{ columns: columns, data: multipleData }}
        />,
        {
          routerProps: { initialEntries: ["/?pageSize=3&offset=6"] },
        },
      );
      pom.table
        .getPaginationButton(-1)
        .should("not.have.class", "spark-button-disabled");
      pom.table
        .getPaginationButton(0)
        .should("not.have.class", "spark-button-disabled");
    });
    it("next button disable", () => {
      cy.mount(
        <OrchTable
          isSuccess={true}
          tableProps={{ columns: columns, data: multipleData }}
        />,
        {
          routerProps: { initialEntries: ["/?pageSize=3&offset=0"] },
        },
      );
      pom.table.getPaginationButton(5).click();
      pom.table
        .getPaginationButton(4)
        .should("have.class", "spark-button-disabled");
      pom.table
        .getPaginationButton(5)
        .should("have.class", "spark-button-disabled");
    });
    it("previous button disable, next button enable", () => {
      cy.mount(
        <OrchTable
          isSuccess={true}
          tableProps={{ columns: columns, data: multipleData }}
        />,
        {
          routerProps: { initialEntries: ["/?pageSize=3&offset=0"] },
        },
      );
      pom.table
        .getPaginationButton(-1)
        .should("have.class", "spark-button-disabled");
      pom.table
        .getPaginationButton(0)
        .should("have.class", "spark-button-disabled");
      pom.table
        .getPaginationButton(4)
        .should("not.have.class", "spark-button-disabled");
      pom.table
        .getPaginationButton(5)
        .should("not.have.class", "spark-button-disabled");
    });
  });

  describe("with pagination", () => {
    const mountComponent = (
      data: TestData[],
      totalEntries: number,
      pageSize: number,
      offset: number,
    ) => {
      cy.mount(
        <OrchTable
          isSuccess={true}
          tableProps={{ columns: columns, data, totalItem: totalEntries }}
        />,
        {
          routerProps: {
            initialEntries: [`/?pageSize=${pageSize}&offset=${offset}`],
          },
        },
      );
    };
    const data = [
      { name: "testing1" },
      { name: "testing2" },
      { name: "testing3" },
      { name: "testing4" },
      { name: "testing5" },
    ];
    describe("when the total items are less than the page size", () => {
      beforeEach(() => {
        mountComponent(data, data.length, data.length * 2, 0);
      });
      it("should not be shown", () => {
        pom.table.getPagination().should("not.exist");
      });
    });
    describe("when the total items are more than the page size", () => {
      it("should disable prev and first button on first page", () => {
        mountComponent(data, 20, 5, 0);
        pom.table.getPagination().should("be.visible");
        pom.table.getFirstBtn().should("have.class", "spark-button-disabled");
        pom.table.getPrevBtn().should("have.class", "spark-button-disabled");
        pom.table
          .getNextBtn()
          .should("not.have.class", "spark-button-disabled");
        pom.table
          .getLastBtn()
          .should("not.have.class", "spark-button-disabled");
      });
      it("should disable next and last button on last page", () => {
        mountComponent(data, 20, 5, 15);
        pom.table.getPagination().should("be.visible");
        pom.table
          .getFirstBtn()
          .should("not.have.class", "spark-button-disabled");
        pom.table
          .getPrevBtn()
          .should("not.have.class", "spark-button-disabled");
        pom.table.getNextBtn().should("have.class", "spark-button-disabled");
        pom.table.getLastBtn().should("have.class", "spark-button-disabled");
      });
      it("should enable first, prex, next and last button on other pages", () => {
        mountComponent(data, 20, 5, 10);
        pom.table.getPagination().should("be.visible");
        pom.table
          .getFirstBtn()
          .should("not.have.class", "spark-button-disabled");
        pom.table
          .getPrevBtn()
          .should("not.have.class", "spark-button-disabled");
        pom.table
          .getNextBtn()
          .should("not.have.class", "spark-button-disabled");
        pom.table
          .getLastBtn()
          .should("not.have.class", "spark-button-disabled");
      });
      describe("when the total number is divisible by the page size [LPUUH-1973]", () => {
        it("should disable the next button on the last page", () => {
          // we replicate the case that lead to LPUUH-1973
          // were the totalItam number is divisible by the page size
          mountComponent(data, 10, 5, 5);
          pom.table.getNextBtn().should("have.class", "spark-button-disabled");
          pom.table.getLastBtn().should("have.class", "spark-button-disabled");
        });
      });
    });
  });
});
