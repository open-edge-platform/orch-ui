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
          onDelete={cy.stub().as("onDelete")}
          hasRole={cy
            .stub()
            .as("hasRoleStub")
            .callsFake(() => true)}
        />,
      );
    });

    it("render Delete option", () => {
      pom.root.click();
      pom.root.should("contain.text", "Delete");
    });

    it("should execute onDelete", () => {
      pom.root.click();
      pom.el.Delete.click();
      cy.get("@onDelete").should("be.called");
    });
  });
});
