/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { NetworkLog } from "../../support/network-logs";
import { ADMIN_USER } from "../../support/utilities";
import AdminPom from "./admin.pom";

interface ProjectTestData {
  description: string;
  updatedDescription: string;
}

const isProjectTestData = (arg: any): arg is ProjectTestData => {
  if (!arg.description) return false;
  if (!arg.updatedDescription) return false;
  return true;
};

describe("Org Admin Smoke", () => {
  const netLog = new NetworkLog();
  const pom = new AdminPom("admin");
  let testData: ProjectTestData;

  before(() => {
    const dataFile =
      Cypress.env("DATA_FILE") || "./cypress/e2e/admin/data/admin-smoke.json";
    cy.readFile(dataFile, "utf-8").then((data) => {
      if (!isProjectTestData(data)) {
        throw new Error(
          `Invalid test data in ${dataFile}: ${JSON.stringify(data)}`,
        );
      }
      testData = data;
    });
  });
  beforeEach(() => {
    netLog.intercept();
  });

  describe(`the ${ADMIN_USER.username}`, () => {
    beforeEach(() => {
      cy.login(ADMIN_USER);
      cy.visit("/");
      cy.dataCy("menuSettings").click();
    });
    it("should create a project", () => {
      cy.contains("Create Project").should("be.visible");

      cy.intercept({
        method: "PUT",
        url: "/v1/projects/*",
        times: 1,
      }).as("createProject");

      // we select by text so it supports both the empty and full table
      cy.contains("Create Project").click();

      pom.projectsPom.projectsTablePom.createRenameProjectPom.el.projectName.type(
        testData.description,
      );
      pom.projectsPom.projectsTablePom.createRenameProjectPom.el.submitProject.click();

      // wait for the modal to close and the page to reload
      cy.wait("@createProject");
      cy.contains("Create Project").should("be.visible");

      cy.dataCy("squareSpinner").should("not.exist");

      // search for the project so we only have one entry in the table
      // pom.projectsPom.projectsTablePom.tablePom.search(
      //   testData.description,
      //   false,
      // );
      // pom.projectsPom.projectsTablePom.tablePom
      //   .getRows()
      //   .should("have.length", 1);

      // wait for the project to be ready is not working as project is getting stuck in create mode for sometime
      // pom.projectsPom.projectsTablePom.tablePom
      //   .getCell(1, 3, { timeout: 5 * 60 * 1000 }) // allow 5 minutes for the project to be created
      //   .should(($el) => {
      //     expect($el, "Project status").to.contain.text("CREATE is complete");
      //   });
    });
    // TODO: once search type issue is addressed we need to uncomment it
    // it.skip("should rename the project", () => {
    //   cy.contains("Project Name").should("be.visible");
    //   pom.projectsPom.projectsTablePom.tablePom.search(
    //     testData.description,
    //     false,
    //   );
    //   // wait for search to complete
    //   pom.projectsPom.projectsTablePom.tablePom
    //     .getRows()
    //     .should("have.length", 1);

    //   pom.projectsPom.projectsTablePom.renameProjectPopup(
    //     0,
    //     testData.updatedDescription,
    //   );
    //   pom.projectsPom.projectsTablePom.createRenameProjectPom.el.submitProject.click();
    //   cy.contains(testData.updatedDescription).should("exist");
    // });

    // it.skip("should delete the project", () => {
    //   cy.contains("Project Name").should("be.visible");
    //   pom.projectsPom.projectsTablePom.tablePom.search(
    //     testData.description,
    //     false,
    //   );
    //   // wait for search to complete
    //   pom.projectsPom.projectsTablePom.tablePom
    //     .getRows()
    //     .should("have.length", 1);

    //   pom.projectsPom.projectsTablePom.deleteProjectPopup(
    //     0,
    //     testData.updatedDescription,
    //   );
    //   pom.projectsPom.projectsTablePom.deleteProjectPom.modalPom.el.primaryBtn.click();
    //   cy.contains("Deletion in process").should("be.visible");
    // });
  });

  afterEach(() => {
    netLog.save();
    netLog.clear();
  });
  after(() => {
    // Cleanup all the new entries created
    cy.authenticatedRequest({
      method: "DELETE",
      url: `/v1/projects/${testData.description}`,
    }).then((response) => {
      // we only care that the created project is not there,
      // if the test failed before creating it we're fine with a 400, 404
      const success =
        response.status === 200 ||
        response.status === 204 ||
        response.status === 400 ||
        response.status === 404;
      expect(
        success,
        `Unexpected HTTP status: ${response.status}. Valid values are (200, 204, 400, 404)`,
      ).to.be.true;
    });
    netLog.save("org_admin_smoke_after");
    netLog.clear();
  });
});
