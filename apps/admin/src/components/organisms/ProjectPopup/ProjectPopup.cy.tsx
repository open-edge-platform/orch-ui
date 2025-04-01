/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import ProjectPopup from "./ProjectPopup";
import ProjectPopupPom from "./ProjectPopup.pom";

const pom = new ProjectPopupPom();
const projectData = {
  name: "project-a",
  spec: {},
  status: {
    projectStatus: {
      statusIndicator: "STATUS_INDICATION_IDLE",
      message: "Project is active",
      timeStamp: new Date().getTime(),
      uID: "project-uid-a",
    },
  },
};

describe("<ProjectPopup/>", () => {
  describe("when project is idle", () => {
    beforeEach(() => {
      cy.mount(
        <ProjectPopup
          project={projectData}
          onRename={cy.stub().as("onRename")}
          onDelete={cy.stub().as("onDelete")}
          hasRole={cy
            .stub()
            .as("hasRoleStub")
            .callsFake(() => true)}
        />,
      );
    });

    it("render Rename and Delete option", () => {
      pom.root.click();
      pom.root.should("contain.text", "Rename");
      pom.root.should("contain.text", "Delete");
    });

    it("should execute onRename", () => {
      pom.root.click();
      pom.el.Rename.click();
      cy.get("@onRename").should("be.called");
    });

    it("should execute onDelete", () => {
      pom.root.click();
      pom.el.Delete.click();
      cy.get("@onDelete").should("be.called");
    });
  });
  describe("when project is IN_PROGRESS", () => {
    it("render Rename as disabled and Delete option as enabled", () => {
      cy.mount(
        <ProjectPopup
          project={{
            ...projectData,
            ...{
              status: {
                projectStatus: {
                  statusIndicator: "STATUS_INDICATION_IN_PROGRESS",
                },
              },
            },
          }}
          hasRole={cy
            .stub()
            .as("hasRoleStub")
            .callsFake(() => true)}
          onRename={cy.stub().as("onRename")}
          onDelete={cy.stub().as("onDelete")}
        />,
      );
      pom.root.click();
      pom.el.Rename.should("have.class", "popup__option-item-disable");
      pom.el.Delete.should("not.have.class", "popup__option-item-disable");
    });
  });
});
