/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import { projectStore } from "@orch-ui/utils";
import { useAppSelector } from "../../../store/hooks";
import ProjectsTable from "./ProjectsTable";
import ProjectsTablePom from "./ProjectsTable.pom";

const pom = new ProjectsTablePom();
describe("<ProjectsTable/>", () => {
  describe("when api is returning data successfully", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getProjects]);
      cy.mount(
        <ProjectsTable
          hasRole={cy
            .stub()
            .as("hasRoleStub")
            .callsFake(() => true)}
        />,
      );
      pom.waitForApis();
    });

    it("should render component", () => {
      pom.tablePom.getRows().should("have.length", projectStore.list().length);
    });

    it("should see project status", () => {
      pom.interceptApis([pom.api.getProjectsWithErrorStatus]);
      cy.mount(
        <ProjectsTable
          hasRole={cy
            .stub()
            .as("hasRoleStub")
            .callsFake(() => true)}
        />,
      );
      pom.waitForApis();
      pom.tablePom.getCell(1, 4).contains("Error in Deleting Project");
    });
    it("should see project status that is not an error", () => {
      pom.tablePom.getCell(2, 4).should("contain.text", "Project is active");
    });

    it("should see delete project modal", () => {
      pom.getPopupOptionsByRowIndex(2).click().as("popup");
      cy.get("@popup").contains("Delete").click();
      pom.deleteProjectPom.root.should("exist");
    });
  });

  describe("on varying api response", () => {
    it("should render empty component with create button", () => {
      pom.interceptApis([pom.api.getProjectsEmpty]);
      cy.mount(
        <ProjectsTable
          hasRole={cy
            .stub()
            .as("hasRoleStub")
            .callsFake(() => true)}
        />,
      );
      pom.waitForApis();
      pom.waitForApis();
      pom.emptyPom.root.should("exist");
      cy.get("button").contains("Create Project");
    });

    it("should render error", () => {
      pom.interceptApis([pom.api.getProjectsError]);
      cy.mount(
        <ProjectsTable
          hasRole={cy
            .stub()
            .as("hasRoleStub")
            .callsFake(() => true)}
        />,
      );
      pom.waitForApis();
      pom.apiErrorPom.root.should("exist");
    });
  });

  describe("message banner state behavior by different modal actions", () => {
    const TestComponent = () => {
      const { messageState } = useAppSelector(
        (state) => state.notificationStatusList,
      );

      return (
        <>
          <p data-cy="testMessage">{messageState.messageBody}</p>
          <ProjectsTable
            hasRole={cy
              .stub()
              .as("hasRoleStub")
              .callsFake(() => true)}
          />
        </>
      );
    };

    beforeEach(() => {
      pom.interceptApis([pom.api.getProjects]);
      cy.mount(<TestComponent />);
      pom.waitForApis();
    });

    describe("delete option", () => {
      beforeEach(() => {
        pom.deleteProjectPopup(2, "Project 1");
      });
      it("should show message on successful delete", () => {
        pom.deleteProjectPom.interceptApis([
          pom.deleteProjectPom.api.deleteProject,
        ]);
        pom.deleteProjectPom.modalPom.el.primaryBtn.click();
        pom.deleteProjectPom.waitForApis();

        cyGet("testMessage").should(
          "contain.text",
          "Project project-1 is being deleted.",
        );
      });

      it("should show message on Delete error", () => {
        pom.deleteProjectPom.interceptApis([
          pom.deleteProjectPom.api.deleteProjectError,
        ]);
        pom.deleteProjectPom.modalPom.el.primaryBtn.click();
        pom.deleteProjectPom.waitForApis();

        cyGet("testMessage").should(
          "contain.text",
          "Error in deleting project project-1. Unauthorized",
        );
      });
    });
  });
});
