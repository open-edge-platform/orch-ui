/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cyGet } from "@orch-ui/tests";
import { Icon } from "@spark-design/react";
import { useEffect, useState } from "react";
import {
  clientSideTotalOverallRowsCountErrorMessage,
  specifyPaginationTypeMessage,
  Table,
  TableProps,
} from "./Table";
import {
  CustomRow,
  CyTableRow,
  data,
  getMultiColumnKeyIdFromRow,
  getRandomEmoji,
  page1Data,
  page2Data,
  TablePom,
} from "./Table.pom";
import { TableColumn } from "./TableColumn";

// Mock React code
const columns: TableColumn<CyTableRow>[] = [
  {
    Header: "Capital",
    accessor: "col1",
    Cell: (table: { row: { original: any } }) => {
      return <a href="#">{table.row.original.col1}</a>;
    },
  },
  {
    Header: "Lower",
    accessor: "col2",
  },
  {
    Header: "Number",
    textAlign: "right",
    accessor: (item: CyTableRow) => item.col3,
    Cell: (item) => (
      <h6>
        <Icon icon="add-user" />
        {item.cell.value}
      </h6>
    ),
  },
  {
    Header: "Exception",
    accessor: (item) => <h1>{item.col4}</h1>,
    Cell: (table: { row: { original: CyTableRow } }) => {
      return (
        <h6>
          {table.row.original.col4} {getRandomEmoji()}
        </h6>
      );
    },
  },
  {
    Header: "Accessor Function",
    accessor: (item) => `${item.col5}-z`,
  },
];

const customColumns: TableColumn<CustomRow>[] = [
  {
    Header: "Name",
    accessor: "name",
    Cell: (table: { row: { original: CustomRow } }) => {
      return <a href="#">{table.row.original.name}</a>;
    },
  },
  {
    Header: "Version",
    accessor: "ver",
  },
  {
    Header: "Description",
    accessor: (item: CustomRow) => item.description,
  },
];

/*
  - This is a Test component only to reproduce expandable/collapsible scenario when data update happens.
  - This TestComponents mocks the data update scenario, and re-renders table component
    to replicated expand/collapse behaviour of table
  - `autoResetExpanded` prop passed to table defaults to false.
*/
const TestComponentExpandable = ({
  autoResetExpanded,
}: {
  autoResetExpanded: boolean;
}) => {
  const [customData, setCustomData] = useState<CustomRow[]>(page1Data);

  const resetData = (): Promise<CustomRow[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(structuredClone(customData)), 1000);
    });
  };

  useEffect(() => {
    async function mockUpdateData() {
      const response = await resetData();
      setCustomData(response);
    }
    mockUpdateData();
  }, []);

  return (
    <Table
      data={customData}
      columns={customColumns}
      autoResetExpanded={autoResetExpanded} // Prop to keep layout open/closed on data update
      subRow={() => <div>Edge</div>}
    />
  );
};

const TestComponent = ({
  preselectedRows = [],
  getRowId,
}: {
  preselectedRows?: string[];
  getRowId?: (row: CustomRow) => string;
}) => {
  const [customData, setCustomData] = useState<CustomRow[]>(page1Data);
  const [selectedIds, setSelectedIds] = useState<string[]>(preselectedRows);

  return (
    <>
      <span data-cy="testSelectedList">
        Selected: {JSON.stringify(selectedIds)}
      </span>
      <Table
        data={customData}
        columns={customColumns}
        canPaginate
        isServerSidePaginated
        totalOverallRowsCount={18}
        onChangePage={(pageIndex) => {
          if (pageIndex === 0) {
            setCustomData(page1Data);
          } else {
            setCustomData(page2Data);
          }
        }}
        // Selection Test related
        canSelectRows
        onSelect={(row: CustomRow, isSelected: boolean, rowIndex?: number) => {
          const rowId = getRowId ? getRowId(row) : rowIndex!.toString();
          setSelectedIds((prev) => {
            if (isSelected) {
              return prev.concat(rowId);
            }
            return prev.filter((id) => id !== rowId);
          });
        }}
        selectedIds={selectedIds}
        getRowId={getRowId}
      />
    </>
  );
};

const defaultProps: TableProps<CyTableRow> = {
  columns: columns,
  data: data,
};

// Unit Tests
const pom = new TablePom();
describe("<Table/>", () => {
  describe("basic functionality", () => {
    it("should render component", () => {
      cy.mount(
        <Table
          columns={columns}
          data={data.slice(1, 4)}
          canSelectRows={true}
          isServerSidePaginated={true}
          totalOverallRowsCount={100}
          canSearch
          canExpandRows={true}
          canPaginate={true}
          sortColumns={[1, 2, 3]}
          subRow={(row) => {
            console.log("Row", row.values);
            return <h1>Zano</h1>;
          }}
          onSort={(column: string, direction: "asc" | "desc" | null) => {
            console.log("stuff", column, direction);
          }}
          onSelect={(data) => {
            console.log("onSelecting", data);
          }}
          initialState={{ pageSize: 4 }}
        />,
      );
      pom.root.should("exist");
      pom.getCell(2, 4).contains("Y");
    });

    it("with basic props", () => {
      cy.mount(<Table {...defaultProps} />);
      pom.el.rowSelectCheckbox.should("not.exist");
      pom.el.allRowsCollapser.should("not.exist");
      pom.el.allRowsExpander.should("not.exist");
      pom.el.rowCollapser.should("not.exist");
      pom.el.rowExpander.should("not.exist");
    });

    it("Expand All Rows should not be visible on the header", () => {
      cy.mount(<Table {...defaultProps} subRow={() => <h1>Sub Row</h1>} />);
      pom
        .getColumnHeader(0)
        .find(".toggle-expand-all-rows")
        .should("exist")
        .should("not.be.visible");
      pom.el.allRowsExpander.should("not.be.visible");
      pom.el.allRowsCollapser.should("not.exist"); // As its conditionally rendered
    });

    it("enables row selection", () => {
      cy.mount(<Table {...defaultProps} canSelectRows={true} />);
      pom.el.rowSelectCheckbox.should("exist");
    });

    it("enables row expansion", () => {
      cy.mount(<Table {...defaultProps} subRow={() => <p>Sub row</p>} />);
      pom.el.rowExpander.should("exist").should("be.visible");
    });

    it("show all rows when pagination is not enabled", () => {
      cy.mount(<Table columns={columns} data={data.slice(0, 12)} />);
      pom.el.pagination.should("not.exist");
      pom.getRows().should("have.length", 12);
    });

    it("shows 'No information to display' for empty data", () => {
      cy.mount(<Table columns={columns} data={[]} />);
      pom.root.contains("No information to display");
    });

    it("handles undefined data", () => {
      cy.mount(<Table columns={columns} data={undefined} />);
      pom.root.contains("No information to display");
    });

    it("disables next/last page buttons while on last page", () => {});

    it("shows table loader when loading", () => {
      cy.mount(<Table {...defaultProps} isLoading />);
      cyGet("tableLoader").should("be.visible");
    });

    it("shows ribbon when enabled", () => {
      cy.mount(<Table {...defaultProps} canSearch />);
      pom.el.search.should("be.visible");
    });

    it("handles undefined data when pagination enabled ", () => {
      cy.mount(
        <Table
          columns={columns}
          canPaginate
          isLoading={false}
          isServerSidePaginated
          totalOverallRowsCount={0}
          data={[]}
        />,
      );
      pom.root.contains("No information to display");
    });

    it("With AutoResetExpanded set to true, On data update Expanded layout should Collapse", () => {
      cy.mount(<TestComponentExpandable autoResetExpanded={true} />);
      pom.el.rowExpander.eq(1).click();
      pom.el.rowCollapser.should("exist");
      pom.el.rowCollapser.should("not.exist"); // Opened expandable layout is closed
    });

    it("With AutoResetExpanded set to false, On data update Expanded layout should Not Collapse, Instead should remain open", () => {
      cy.mount(<TestComponentExpandable autoResetExpanded={false} />);
      pom.el.rowExpander.eq(1).click();
      pom.el.rowCollapser.should("exist");
      pom.el.rowCollapser.should("exist"); // Opened expandable layout is still open
    });
  });

  describe("with varying sort definitions", () => {
    it("has no default sort  if sortable colums is not provided", () => {
      cy.mount(<Table {...defaultProps} />);
      cy.contains(".caret-up-select").should("not.exist");
      pom.getRow(1).find("a").contains(data[0].col1);
    });

    it("has an default sort on first sortable column", () => {
      cy.mount(<Table {...defaultProps} sortColumns={[1, 2]} />);

      pom
        .getColumnHeaderSortArrows(1)
        .find(".caret-up-select")
        .should("exist")
        .should("be.visible");
      pom.getRow(1).find("a").contains(data[17].col1);
    });

    it("has an initial ascending sort", () => {
      cy.mount(
        <Table
          {...defaultProps}
          initialSort={{ column: "col1", direction: "asc" }}
          sortColumns={[0]}
        />,
      );

      pom
        .getColumnHeaderSortArrows(0)
        .find(".caret-up-select")
        .should("exist")
        .should("be.visible");
    });

    it("has an initial ascending sort when server side paginated", () => {
      cy.mount(
        <Table
          columns={columns}
          data={data.slice(0, 5)}
          canPaginate
          isServerSidePaginated
          totalOverallRowsCount={data.length}
          initialState={{ pageIndex: 0, pageSize: 5 }}
          initialSort={{ column: "col1", direction: null }}
          sortColumns={[0, 1]}
        />,
      );

      pom
        .getColumnHeaderSortArrows(0)
        .find(".caret-up-select")
        .should("exist")
        .should("be.visible");
    });

    it("has an initial descending sort", () => {
      cy.mount(
        <Table
          {...defaultProps}
          initialSort={{ column: "col1", direction: "desc" }}
          sortColumns={[0]}
        />,
      );

      pom
        .getColumnHeaderSortArrows(0)
        .find(".caret-down-select")
        .should("exist")
        .should("be.visible");
    });
  });

  describe("with varying column definitions", () => {
    it("throws error if accessor is returning non-primitive", () => {
      cy.on("uncaught:exception", (error) => {
        if (error.message.includes("accessor value to column")) {
          return false;
        }
        return true;
      });
      cy.mount(<Table columns={columns} data={data} sortColumns={[1, 3]} />);
      pom.getColumnHeader(3).click();
    });

    it("uses values array when accessor is function-calculated", () => {
      cy.mount(<Table columns={columns} data={data} sortColumns={[4]} />);
      pom.getColumnHeader(4).click();
      //assert that direction is asc
    });

    it("doesn't sort column with no accessor", () => {});
  });

  describe("without pagination enabled", () => {
    it("displays the correct amount of rows", () => {
      cy.mount(<Table {...defaultProps} />);
      pom.getRows().should("have.length", data.length);
    });
  });

  describe("with pagination enabled", () => {
    it("catches error when isServerSidePaginated is not specified", () => {
      cy.on("uncaught:exception", (error) => {
        if (error.message.includes(specifyPaginationTypeMessage)) {
          return false;
        }
        return true;
      });
      cy.mount(<Table {...defaultProps} canPaginate />);
    });

    describe("server-side", () => {
      it("disable next/last page button on last page", () => {
        const pageSize = 5;
        cy.mount(
          <Table
            data={data.slice(0, 5)}
            columns={columns}
            canPaginate={true}
            isServerSidePaginated={true}
            totalOverallRowsCount={data.length + 2}
            initialState={{ pageIndex: 3, pageSize }}
          />,
        );
        pom.getPageButton(5).click();
        pom.getNextPageButton().should("have.class", "spark-button-disabled");
        pom.getLastPageButton().should("have.class", "spark-button-disabled");
      });

      it("disable previous/first page button on first page", () => {
        const pageSize = 5;
        cy.mount(
          <Table
            data={data.slice(0, 5)}
            columns={columns}
            canPaginate={true}
            isServerSidePaginated={true}
            totalOverallRowsCount={data.length + 2}
            initialState={{ pageIndex: 3, pageSize }}
          />,
        );
        pom.getPageButton(1).click();
        pom
          .getPreviousPageButton()
          .should("have.class", "spark-button-disabled");
        pom.getFirstPageButton().should("have.class", "spark-button-disabled");
      });

      it("catches netagive pageIndex", () => {
        cy.on("uncaught:exception", (error) => {
          if (error.message.includes("Negative pageIndex value not allowed")) {
            return false;
          }
          return true;
        });
        cy.mount(<Table {...defaultProps} initialState={{ pageIndex: -1 }} />);
      });

      it("catches negative pageSize", () => {
        cy.on("uncaught:exception", (error) => {
          if (error.message.includes("Negative pageSize value not allowed")) {
            console.log("Application Error Javascript Token");
            return false;
          }
          return true;
        });
        cy.mount(
          <Table
            {...defaultProps}
            canPaginate={true}
            initialState={{ pageSize: -1 }}
          />,
        );
      });

      it("displays the correct amount of rows for pageSize of 5", () => {
        const pageSize = 5;
        cy.mount(
          <Table
            {...defaultProps}
            canPaginate={true}
            isServerSidePaginated={false}
            initialState={{ pageIndex: 2, pageSize }}
          />,
        );
        pom.getRows().should("have.length", pageSize);
      });

      // TODO:
      // it("catches error if returned rows > pageSize", () => {});

      it("displays the correct amount of rows with no pageSize defined", () => {
        cy.mount(
          <Table
            {...defaultProps}
            canPaginate={true}
            isServerSidePaginated={false}
            initialState={{ pageIndex: 2 }}
          />,
        );
        pom.getRows().should("have.length", 10);
      });

      it("displays the correct total Item count", () => {
        cy.mount(
          <Table
            {...defaultProps}
            canPaginate={true}
            isServerSidePaginated={false}
          />,
        );
        pom.getTotalItemCount().contains(`${data.length}`);
      });

      it("shows the correct maximum page value", () => {
        cy.mount(
          <Table
            columns={columns}
            data={data.slice(0, 5)}
            canPaginate={true}
            isServerSidePaginated={true}
            totalOverallRowsCount={data.length} //20
            initialState={{ pageIndex: 2, pageSize: 5 }} //only twenty items in data, max page is 4
            // if you had pageIndex: 3, pageSize:5 = page 3 button selected.
          />,
        );

        pom.getPageButton(5).should("not.exist");
        pom.getPageButton(4).should("exist").should("be.visible");
      });

      it("shows the correct minimum page value", () => {
        cy.mount(
          <Table
            columns={columns}
            data={data.slice(0, 10)}
            canPaginate={true}
            isServerSidePaginated={true}
            totalOverallRowsCount={data.length} //20
            initialState={{ pageIndex: 2, pageSize: data.length }}
          />,
        );

        pom.getPageButton(2).should("not.exist");
        pom.getPageButton(1).should("exist").should("be.visible");
      });
    });

    describe("client-side", () => {
      it("catches error when suppling total overall row count", () => {
        cy.on("uncaught:exception", (error) => {
          if (
            error.message.includes(clientSideTotalOverallRowsCountErrorMessage)
          ) {
            console.log("Caught the error");
            return false;
          }
          return true;
        });
        cy.mount(
          <Table
            {...defaultProps}
            canPaginate={true}
            totalOverallRowsCount={data.length}
            initialState={{ pageSize: 10 }}
          />,
        );
      });
      it("shows the correct maximum page value", () => {
        cy.mount(
          <Table
            columns={columns}
            data={data}
            canPaginate={true}
            isServerSidePaginated={false}
            initialState={{ pageSize: 10 }}
          />,
        );

        pom.getPageButton(5).should("not.exist");
        pom.getPageButton(2).should("exist").should("be.visible");
        pom.getPageButton(1).should("have.class", "spark-button-active");
      });

      it("shows the correct minimum page value", () => {
        cy.mount(
          <Table
            columns={columns}
            data={data.slice(0, 10)}
            canPaginate={true}
            isServerSidePaginated={true}
            totalOverallRowsCount={data.length} //20
            initialState={{ pageIndex: 2, pageSize: data.length }}
          />,
        );

        pom.getPageButton(2).should("not.exist");
        pom.getPageButton(1).should("exist").should("be.visible");
      });
    });
  });

  describe("with searching", () => {
    it("returns empty results on search term that doesnt yield rows", () => {
      const onSearchStub = cy.stub().as("onSearch");
      const searchTerm = "abc";
      cy.mount(<Table {...defaultProps} canSearch onSearch={onSearchStub} />);
      pom.el.search.type(searchTerm);

      cy.get("@onSearch").should("have.been.calledWith", searchTerm);
      pom.el.noInformation.should("be.visible");
    });

    it("returns correct rows on search term that does yield rows", () => {
      const onSearchStub = cy.stub().as("onSearch");
      const searchTerm = "site";
      cy.mount(<Table {...defaultProps} canSearch onSearch={onSearchStub} />);
      pom.el.search.type(searchTerm);

      cy.get("@onSearch").should("have.been.calledWith", searchTerm);
      pom.el.noInformation.should("not.exist");
      pom.getRows().should("have.length", 6);
    });

    it("displays actions when they are present", () => {
      cy.mount(
        <Table
          {...defaultProps}
          canSearch
          actionsJsx={<button>Hello</button>}
        />,
      );
    });

    it("does not fire internal search when using search field if isServerSidePaginated=true", () => {
      const onSearchStub = cy.stub().as("onSearch");
      const searchTerm = "xyz";
      const rowCount = 10;
      cy.mount(
        <Table
          data={data.slice(0, rowCount)}
          columns={columns}
          canSearch
          canPaginate
          totalOverallRowsCount={data.length}
          isServerSidePaginated
          onSearch={onSearchStub}
        />,
      );
      pom.el.search.type(searchTerm);
      cy.get("@onSearch").should("not.be.called");
      pom.getRows().should("have.length", rowCount);
    });

    it("does not fire internal search on init if isServerSidePaginated=true and searchTerm exists", () => {
      const searchTerm = "xyz";
      const rowCount = 10;
      cy.mount(
        <Table
          data={data.slice(0, rowCount)}
          columns={columns}
          canSearch
          canPaginate
          searchTerm={searchTerm}
          totalOverallRowsCount={data.length}
          isServerSidePaginated
        />,
      );
      pom.getRows().should("have.length", rowCount);
    });

    it("does fire internal search on init if isServerSidePaginated=false and searchTerm exists", () => {
      const searchTerm = "xyz";
      const rowCount = 10;
      cy.mount(
        <Table
          data={data.slice(0, rowCount)}
          columns={columns}
          canSearch
          canPaginate
          searchTerm={searchTerm}
          isServerSidePaginated={false}
        />,
      );
      pom.getRows().should("have.length", 1);
    });
  });

  describe("when multiple rows are selectable", () => {
    it("when the row doesnot have a custom identifiers for `getRowId`", () => {
      /** for index based selection only */
      cy.mount(<TestComponent preselectedRows={["0", "9"]} />);

      // Make page selection
      pom.el.rowSelectCheckbox.eq(5).click();
      pom.el.rowSelectCheckbox.eq(3).click();

      // Verify selection accross pages
      pom.el.rowSelectCheckbox.eq(0).should("be.checked");
      pom.el.rowSelectCheckbox.eq(3).should("be.checked");
      pom.el.rowSelectCheckbox.eq(5).should("be.checked");
      pom.el.rowSelectCheckbox.eq(9).should("be.checked");

      // Test with proper Parent onSelect handler setting
      cyGet("testSelectedList").should(
        "have.text",
        'Selected: ["0","9","5","3"]',
      );
    });

    describe("when the custom identifiers for `getRowId` is provided to retain selections on page changes", () => {
      it("should perform selections without preselected row", () => {
        cy.mount(<TestComponent getRowId={getMultiColumnKeyIdFromRow} />);

        // Make page selection
        pom.el.rowSelectCheckbox.eq(3).click();
        pom.el.rowSelectCheckbox.eq(5).click();
        pom.getPageButton(2).click();
        pom.el.rowSelectCheckbox.eq(6).click();
        pom.el.rowSelectCheckbox.eq(2).click();

        // Verify selection accross pages
        pom.getPageButton(1).click();
        pom.el.rowSelectCheckbox.eq(3).should("be.checked");
        pom.el.rowSelectCheckbox.eq(5).should("be.checked");
        pom.getPageButton(2).click();
        pom.el.rowSelectCheckbox.eq(6).should("be.checked");
        pom.el.rowSelectCheckbox.eq(2).should("be.checked");

        // Test with proper Parent onSelect handler setting
        cyGet("testSelectedList").should(
          "have.text",
          'Selected: ["Data 3,1.0.0","Data 5,1.0.0","Data 16,1.0.0","Data 12,1.0.0"]',
        );
      });

      it("should perform selections with preselected row", () => {
        cy.mount(
          <TestComponent
            preselectedRows={["Data 1,1.0.0", "Data 14,1.0.0"]}
            getRowId={getMultiColumnKeyIdFromRow}
          />,
        );

        // Make page selection
        pom.el.rowSelectCheckbox.eq(3).click();
        pom.el.rowSelectCheckbox.eq(5).click();
        pom.getPageButton(2).click();
        pom.el.rowSelectCheckbox.eq(6).click();
        pom.el.rowSelectCheckbox.eq(2).click();

        // Verify selection accross pages
        pom.getPageButton(1).click();
        pom.el.rowSelectCheckbox.eq(3).should("be.checked");
        pom.el.rowSelectCheckbox.eq(5).should("be.checked");
        pom.getPageButton(2).click();
        pom.el.rowSelectCheckbox.eq(6).should("be.checked");
        pom.el.rowSelectCheckbox.eq(2).should("be.checked");

        // Test with proper Parent onSelect handler setting
        cyGet("testSelectedList").should(
          "have.text",
          'Selected: ["Data 1,1.0.0","Data 14,1.0.0","Data 3,1.0.0","Data 5,1.0.0","Data 16,1.0.0","Data 12,1.0.0"]',
        );
      });

      it("should perform deselections", () => {
        cy.mount(
          <TestComponent
            preselectedRows={[
              "Data 1,1.0.0",
              "Data 4,1.0.0",
              "Data 11,1.0.0",
              "Data 14,1.0.0",
              "Data 15,1.0.0",
            ]}
            getRowId={getMultiColumnKeyIdFromRow}
          />,
        );

        // Make page selection
        pom.el.rowSelectCheckbox.eq(1).click();
        pom.el.rowSelectCheckbox.eq(4).click();
        pom.getPageButton(2).click();
        pom.el.rowSelectCheckbox.eq(5).click();
        pom.el.rowSelectCheckbox.eq(2).click();
        pom.getPageButton(1).click();
        pom.el.rowSelectCheckbox.eq(5).click();

        // Verify selection accross pages
        pom.getPageButton(1).click();
        pom.el.rowSelectCheckbox.eq(1).should("not.be.checked");
        pom.el.rowSelectCheckbox.eq(2).should("not.be.checked");
        pom.el.rowSelectCheckbox.eq(4).should("not.be.checked");
        pom.el.rowSelectCheckbox.eq(5).should("be.checked");
        pom.getPageButton(2).click();
        pom.el.rowSelectCheckbox.eq(1).should("be.checked");
        pom.el.rowSelectCheckbox.eq(2).should("be.checked");
        pom.el.rowSelectCheckbox.eq(4).should("be.checked");
        pom.el.rowSelectCheckbox.eq(5).should("not.be.checked");

        // Test with proper Parent onSelect handler setting
        cyGet("testSelectedList").should(
          "have.text",
          'Selected: ["Data 11,1.0.0","Data 14,1.0.0","Data 12,1.0.0","Data 5,1.0.0"]',
        );
      });
    });
  });
});
