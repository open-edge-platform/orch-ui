/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import Projects from "./Projects";
import ProjectsPom from "./Projects.pom";

const pom = new ProjectsPom();
describe("<Projects/>", () => {
  describe("when the user is not a Project admin", () => {
    beforeEach(() => {
      cy.mount(
        <Projects
          hasRealmRole={cy
            .stub()
            .as("hasRoleStub")
            .callsFake(() => false)}
        />,
      );
    });
    it("should render component with no projects dialog", () => {
      pom.noProjectsDialogPom.root.should("exist");
    });
  });

  // TODO: OPEN SOURCE MIGRATION TEST FAIL
  xdescribe("when the user is a Project admin", () => {
    beforeEach(() => {
      pom.projectsTablePom.interceptApis([
        pom.projectsTablePom.api.getProjects,
      ]);
      cy.mount(
        <Projects
          hasRealmRole={cy
            .stub()
            .as("hasRoleStub")
            .callsFake(() => true)}
        />,
      );
      pom.projectsTablePom.waitForApis();
    });
    it("should render component with project table", () => {
      pom.projectsTablePom.root.should("exist");
    });
  });
});
