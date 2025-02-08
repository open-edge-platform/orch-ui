/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import DeleteProjectDialog from "./DeleteProjectDialog";
import DeleteProjectDialogPom from "./DeleteProjectDialog.pom";

const pom = new DeleteProjectDialogPom();
describe("<DeleteProjectDialog />", () => {
  describe("basic functionality", () => {
    it("should render component", () => {
      cy.mount(
        <DeleteProjectDialog
          project={{
            name: "Project0",
          }}
          onCancel={() => {}}
          onDelete={() => {}}
        />,
      );

      pom.root.should("exist");
      pom.modalPom.el.modalTitle.should("have.text", "Delete Project0?");
      pom.el.confirmationMessage.should("contain.text", "delete Project0");
    });
    it("should render component when project name not specified", () => {
      cy.mount(
        <DeleteProjectDialog
          project={{
            name: "",
          }}
          onCancel={() => {}}
          onDelete={() => {}}
        />,
      );
      pom.modalPom.el.modalTitle.should("have.text", "Delete project?");
      pom.el.confirmationMessage.should("contain.text", "delete this project");
    });
  });

  describe("perform delete operation on project", () => {
    const projectName = "Project1";
    beforeEach(() => {
      cy.mount(
        <DeleteProjectDialog
          project={{
            name: projectName,
          }}
          onCancel={cy.stub().as("onCancel")}
          onDelete={cy.stub().as("onDelete")}
          onError={cy.stub().as("onError")}
        />,
      );
    });

    it("should see the delete button disabled when no name is entered", () => {
      pom.el.projectName.should("have.attr", "placeholder", projectName);
      pom.modalPom.el.primaryBtn.should("have.class", "spark-button-disabled");
    });
    it("should see the delete button disabled when the input name doesnot match delete project name", () => {
      pom.el.projectName.type("delete-project-name");
      pom.modalPom.el.primaryBtn.should("have.class", "spark-button-disabled");
    });
    it("should see the delete button enabled when the input name matches the delete project name", () => {
      pom.el.projectName.type(projectName);
      pom.modalPom.el.primaryBtn.should(
        "not.have.class",
        "spark-button-disabled",
      );
    });

    it("should delete when project name matches", () => {
      pom.el.projectName.clear().type(projectName);

      pom.interceptApis([pom.api.deleteProject]);
      pom.modalPom.el.primaryBtn.click();
      pom.waitForApis();

      // Check if the api is called with right request params/body
      cy.get(`@${pom.api.deleteProject}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(`/projects/${projectName}`);
          expect(match && match.length > 0).to.be.equal(true);

          cy.get("@onDelete").should("have.been.called");
        });
    });
    it("should call onCancel", () => {
      pom.modalPom.el.secondaryBtn.click();

      cy.get("@onDelete").should("not.have.been.called");
      cy.get("@onCancel").should("have.been.called");
    });
    // TODO: OPEN SOURCE MIGRATION TEST FAIL
    xit("Should display api error message on delete of the project", () => {
      pom.el.projectName.type("edit-project-name");
      pom.interceptApis([pom.api.deleteProjectError]);
      pom.el.projectName.clear().type(projectName);
      pom.modalPom.el.primaryBtn.click();
      pom.waitForApis();
      cy.get("@onError").should("have.been.calledWith", "Unauthorized");
    });
  });
});
