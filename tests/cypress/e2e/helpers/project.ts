import { cyGet } from "tests/cypress/support/cyBase";

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
  cy.contains("About").should("be.visible");
  cy.contains("Projects").should("not.exist");
};
