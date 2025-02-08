/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */
import { applicationOne } from "@orch-ui/utils";
import ApplicationTable from "./ApplicationTable";
import ApplicationTablePom from "./ApplicationTable.pom";

const pom: ApplicationTablePom = new ApplicationTablePom();
const singleApplicationName = applicationOne.displayName || applicationOne.name;

describe("<ApplicationTable />", () => {
  it("should render table with single application", () => {
    pom.interceptApis([pom.api.appSingleList]);
    cy.mount(<ApplicationTable kind="KIND_NORMAL" />);
    pom.waitForApis();
    pom.root.should("contain.text", applicationOne.displayName);
  });
  it("render action column", () => {
    pom.interceptApis([pom.api.appSingleList]);
    cy.mount(
      <ApplicationTable
        actions={[
          {
            text: "Details",
            action: () => {},
          },
          {
            text: "Edit",
            action: () => {},
          },
        ]}
      />,
    );
    pom.waitForApis();
    pom.getActionPopupBySearchText(singleApplicationName).click();
    pom.root.contains("Details");
    pom.root.contains("Edit");
  });

  describe("when the Applications table is empty", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.appEmpty]);
      cy.mount(<div />, {
        routerProps: { initialEntries: ["/applications/applications"] },
        routerRule: [
          {
            path: "/applications/applications",
            element: <ApplicationTable kind={"KIND_NORMAL"} hasPermission />,
          },
        ],
      });
      pom.waitForApis();
      pom.empty.root.should("be.visible");
    });
    describe("the empty component", () => {
      it("No applications message should be printed", () => {
        pom.empty.el.emptyTitle.contains(
          "There are no applications currently available.",
        );
        pom.empty.el.emptySubTitle.contains(
          "To add, and deploy applications, select Add Applications",
        );
      });
      it("should redirect to the correct URL", () => {
        pom.empty.el.emptyActionBtn.click();
        pom.getPath().should("eq", "/applications/applications/add");
      });
    });
    describe("the ribbon component", () => {
      it("should redirect to the correct URL", () => {
        pom.el.newAppRibbonButton.click();
        pom.getPath().should("eq", "/applications/applications/add");
      });
    });
  });

  describe("when the Extensions table is empty", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.appEmpty]);
      cy.mount(<div />, {
        routerProps: { initialEntries: ["/applications/applications"] },
        routerRule: [
          {
            path: "/applications/applications",
            element: <ApplicationTable kind={"KIND_EXTENSION"} hasPermission />,
          },
        ],
      });
      pom.waitForApis();
      pom.empty.root.should("be.visible");
    });
    describe("the empty component", () => {
      it("No Extensions message should be printed", () => {
        pom.empty.el.emptyTitle.contains(
          "There are no extensions currently available.",
        );
      });
    });
  });

  describe("Application Table Ribbon should ", () => {
    it("disable action button when unauthorized", () => {
      pom.interceptApis([pom.api.appMultipleListPage1]);
      cy.mount(<ApplicationTable hasPermission={false} />);
      pom.waitForApis();
      pom.el.newAppRibbonButton.should("have.class", "spark-button-disabled");
    });

    it("enable action button when authorized", () => {
      pom.interceptApis([pom.api.appMultipleListPage1]);
      cy.mount(<ApplicationTable hasPermission />);
      pom.waitForApis();
      pom.el.newAppRibbonButton.should(
        "not.have.class",
        "spark-button-disabled",
      );
    });

    it("add filter to api call", () => {
      pom.interceptApis([pom.api.appMultipleListPage1]);
      cy.mount(<ApplicationTable kind="KIND_NORMAL" />);
      pom.waitForApis();

      pom.interceptApis([pom.api.appMultipleWithFilter]);
      pom.table.el.search.type("test-search");
      pom.waitForApis();

      pom.table.getRows().contains("test-search");
    });
  });

  describe("ApplicationTable with kind type KIND_NORMAL status should ", () => {
    it("handle empty", () => {
      pom.interceptApis([pom.api.appEmpty]);
      cy.mount(<ApplicationTable kind="KIND_NORMAL" hasPermission />);
      pom.waitForApis();
      pom.empty.root.should("be.visible");
      pom.empty.el.emptyActionBtn.click();
      cy.get("#pathname").contains("/add");
    });

    it("handle loading", () => {
      pom.interceptApis([pom.api.appEmpty]);
      cy.mount(<ApplicationTable kind="KIND_NORMAL" />);
      pom.el.squareSpinner.should("exist");
      pom.waitForApis();
      pom.el.squareSpinner.should("not.exist");
    });

    it("handle 500 error", () => {
      pom.interceptApis([pom.api.appError500]);
      cy.mount(<ApplicationTable kind="KIND_NORMAL" />);
      pom.waitForApis();
      pom.apiErrorPom.root.should("be.visible");
    });

    it("display table when data is loaded", () => {
      pom.interceptApis([pom.api.appMultipleListPage1]);
      cy.mount(<ApplicationTable kind="KIND_NORMAL" />);
      pom.waitForApis();
      pom.root.should("be.visible");
    });
  });

  describe("application table row selection", () => {
    it("render table with select column", () => {
      pom.interceptApis([pom.api.appSingleList]);
      cy.mount(<ApplicationTable canSelect />);
      pom.waitForApis();
      pom.getCheckBoxBySearchText(singleApplicationName).should("exist");
    });
  });

  describe("ApplicationTable with kind type KIND_EXTENSION status should ", () => {
    it("handle empty", () => {
      pom.interceptApis([pom.api.appEmpty]);
      cy.mount(<ApplicationTable kind="KIND_EXTENSION" hasPermission />);
      pom.waitForApis();
      pom.empty.root.should("be.visible");
      pom.empty.el.emptyActionBtn.should("not.exist");
    });

    it("handle loading", () => {
      pom.interceptApis([pom.api.appEmpty]);
      cy.mount(<ApplicationTable kind="KIND_EXTENSION" />);
      pom.el.squareSpinner.should("exist");
      pom.waitForApis();
      pom.el.squareSpinner.should("not.exist");
    });

    it("handle 500 error", () => {
      pom.interceptApis([pom.api.appError500]);
      cy.mount(<ApplicationTable kind="KIND_EXTENSION" />);
      pom.waitForApis();
      pom.apiErrorPom.root.should("be.visible");
    });

    it("display table when data is loaded", () => {
      pom.interceptApis([pom.api.appExtensionsMultiple]);
      cy.mount(<ApplicationTable kind="KIND_EXTENSION" />);
      pom.waitForApis();
      pom.root.should("be.visible");
    });
  });
});
