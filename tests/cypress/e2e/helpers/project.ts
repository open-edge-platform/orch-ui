import { cyGet } from "tests/cypress/support/cyBase";
import AdminPom from "../admin/admin.pom";
let pom = new AdminPom("admin");

export interface ProjectTestData {
  description: string;
}
export const isProjectTestData = (arg: any): arg is ProjectTestData => {
  if (!arg.description) return false;
  //more checks can be added in future
  return true;
};
/**
 * Create a project with provided name
 **/
export const createProject = (name: string = "") => {
  cy.contains("Create Project").should("be.visible");
  pom.projectsPom.projectsTablePom.tablePom.el.actions.click();
  pom.projectsPom.projectsTablePom.createRenameProjectPom.el.projectName.type(
    name,
  );
  pom.projectsPom.projectsTablePom.createRenameProjectPom.el.submitProject.click();
};

/**
 * Rename an existing project with a new name
 **/
export const reanameProject = (
  existingName: string = "",
  newName: string = "",
) => {
  cy.contains("Project Name").should("be.visible");
  pom.projectsPom.projectsTablePom.tablePom.el.search.type(existingName);
  cy.wait(2000);
  pom.projectsPom.projectsTablePom.renameProjectPopup(0, newName);
  pom.projectsPom.projectsTablePom.createRenameProjectPom.el.submitProject.click();
  cy.contains(newName).should("exist");
};

/**
 * Delete an existing project with confirmation
 **/
export const deleteProjectViaUI = (name: string = "") => {
  cy.contains("Project Name").should("be.visible");
  pom.projectsPom.projectsTablePom.tablePom.el.search.type(name);
  cy.wait(2000);
  pom.projectsPom.projectsTablePom.deleteProjectPopup(0, name);
  pom.projectsPom.projectsTablePom.deleteProjectPom.modalPom.el.primaryBtn.click();
  cy.contains("Deletion in process").should("be.visible");
};

/**
 * Validate a default project is selected
 **/
export const validateDefaultProject = () => {
  cy.currentProject().then((activeProject: string) => {
    cy.contains(activeProject).should("be.visible");
  });
  cyGet("projectSwitch").click();
  cy.contains("Manage Projects").should("not.exist");
};

/**
 * Validate user doesnot have access to manage projects
 **/
export const validateNoAccessToProjectTab = () => {
  cyGet("menuSettings").click();
  cy.contains("Projects").should("not.exist");
  cy.contains("About").should("be.visible");
};

// call API to delete the project {projectData} directly from service
export const deleteProjectViaApi = (name: string = "") => {
  cy.authenticatedRequest({
    method: "DELETE",
    url: `/v1/projects/${name}`,
  }).then((response) => {
    // we only care that the created region is  not there,
    // if the test failed before creating it we're fine with a 400, 404
    const success =
      response.status === 200 ||
      response.status === 204 ||
      response.status === 400 ||
      response.status === 404;
    expect(success).to.be.true;
  });
};
