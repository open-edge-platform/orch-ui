/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ApiErrorPom } from "@orch-ui/components";
import { cyGet } from "@orch-ui/tests";
import AvailableRegistriesTable from "./AvailableRegistriesTable";
import AvailableRegistriesTablePom, {
  totalMockElements,
} from "./AvailableRegistriesTable.pom";
const apiErrorPom = new ApiErrorPom();

const pom = new AvailableRegistriesTablePom();
describe("<AvailableRegistriesTable/>", () => {
  describe("with mock data should", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.registriesMock]);
      cy.mount(<AvailableRegistriesTable onAdd={cy.stub().as("onAddStub")} />);
      pom.waitForApis();
    });

    it("have correct amount of rows displayed on page 1", () => {
      pom.table.getRows().should("have.length", 10); //10 is default view per page
    });

    //TODO: page2 test that intercepts something like [pom.api.registriesMockPage2]

    it("have pagination enabled", () => {
      cy.get(".spark-pagination").contains(`${totalMockElements} items found`);
      cy.get(".spark-pagination-list .spark-button:nth-child(3)").should(
        "have.class",
        "spark-button-active",
      );
    });

    it("updates offset when going to next page", () => {
      pom.table.getPageButton(2).click();
      cy.get("#search").contains("offset=10");
    });
  });

  describe("with empty data should", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.registriesEmpty]);
      cy.mount(
        <AvailableRegistriesTable
          hasPermission={true}
          onAdd={cy.stub().as("onAddStub")}
        />,
      );
      pom.waitForApis();
    });

    it("not have the table displayed", () => {
      pom.table.root.should("not.exist");
      pom.empty.root.should("be.visible");
    });

    it("allow new registry action trigger", () => {
      pom.empty.el.emptyActionBtn.click();
      cy.get("@onAddStub").should("have.been.calledOnce");
    });
  });

  describe("Registry Table Ribbon should ", () => {
    it("disable action button when unauthorized", () => {
      pom.interceptApis([pom.api.registriesMock]);
      cy.mount(<AvailableRegistriesTable hasPermission={false} />);
      pom.waitForApis();
      pom.root.should("exist");
      pom.el.ribbonButton.should("have.class", "spark-button-disabled");
    });

    it("enable action button when authorized", () => {
      pom.interceptApis([pom.api.registriesMock]);
      cy.mount(<AvailableRegistriesTable hasPermission={true} />);
      pom.waitForApis();
      pom.root.should("exist");
      pom.el.ribbonButton.should("not.have.class", "spark-button-disabled");
    });
  });

  describe("Registry Table Action should ", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.registriesMock]);
      cy.mount(<AvailableRegistriesTable hasPermission={false} />);
      pom.waitForApis();
    });

    it("disable edit button when unauthorized", () => {
      pom.tableUtils
        .getRowBySearchText("orch-harbor")
        .find("[data-cy='appRegistryPopup']")
        .click()
        .contains("Edit")
        .should("have.class", "popup__option-item-disable");
    });

    it("disable delete button when unauthorized", () => {
      pom.tableUtils
        .getRowBySearchText("orch-harbor")
        .find("[data-cy='appRegistryPopup']")
        .click()
        .contains("Delete")
        .should("have.class", "popup__option-item-disable");
    });
  });

  describe("Registry Table status should ", () => {
    it("handle loading", () => {
      pom.interceptApis([pom.api.registriesWithDelay]);
      cy.mount(<AvailableRegistriesTable />);
      cyGet("squareSpinner").should("be.visible");

      cyGet("squareSpinner").should("exist");
      pom.waitForApis();
      cyGet("squareSpinner").should("not.exist");
    });

    it("handle 500 error", () => {
      pom.interceptApis([pom.api.registries500]);
      cy.mount(<AvailableRegistriesTable />);
      pom.waitForApis();
      apiErrorPom.root.should("be.visible");
    });
  });
});
