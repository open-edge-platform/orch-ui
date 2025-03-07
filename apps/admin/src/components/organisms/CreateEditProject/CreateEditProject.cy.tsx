/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import { AdminProject } from "@orch-ui/utils";
import { useState } from "react";
import { CreateEditProject } from "./CreateEditProject";
import { CreateEditProjectPom } from "./CreateEditProject.pom";

const pom = new CreateEditProjectPom();

interface TestComponentProps {
  project?: AdminProject;
  isDimissable: boolean;
  onError?: (err: string) => void;
}

const TestComponent = ({
  project,
  isDimissable,
  onError,
}: TestComponentProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <button data-cy="testOpen" onClick={() => setIsOpen(!isOpen)}>
        Open
      </button>
      <CreateEditProject
        isOpen={isOpen}
        onClose={() => setIsOpen(!open)}
        existingProject={project}
        isDimissable={isDimissable}
        onError={onError}
      />
    </>
  );
};

describe("<CreateEditProject />", () => {
  beforeEach(() => {
    cy.mount(<TestComponent isDimissable={false} />);
    cyGet("testOpen").click();
  });

  describe("should render ui", () => {
    it("should render component", () => {
      pom.root.should("exist");
    });
    it("should show project inputs", () => {
      pom.el.projectNameLabel.contains("Project Name");
      pom.el.submitProject.should("exist");
    });
    it("should show error message when text field is out focussed", () => {
      pom.el.projectName.type("p");
      pom.el.projectName.clear();
      pom.root.contains("Project name is required");
    });
  });

  describe("to create a project", () => {
    it("should show create project modal", () => {
      pom.modalPom.el.modalTitle.contains("Create New Project");
      pom.el.submitProject.contains("Create");
    });
    it("should not allow user to close the modal when isDimissable is false", () => {
      pom.el.projectName.should(
        "have.attr",
        "placeholder",
        "Enter new project name",
      );
      pom.el.cancel.should("not.exist");
      pom.modalPom.el.closeDialog.should("not.exist");
    });
  });

  describe("to rename the project", () => {
    const projectName = "project-a";
    beforeEach(() => {
      cy.mount(
        <TestComponent
          project={{
            name: projectName,
          }}
          isDimissable
        />,
      );
      cyGet("testOpen").click();
    });
    it("should show rename modal", () => {
      pom.modalPom.el.modalTitle.contains("Rename Project");
      pom.el.projectNameLabel.contains("Project Name");
      pom.el.submitProject.should("exist").contains("Save");
      pom.el.cancel.should("exist").contains("Cancel");
    });
    it("should show placeholder project name text upon rename", () => {
      pom.el.projectName.should("have.attr", "placeholder", projectName);
    });
    it("should see the save button disabled when no name is entered in rename input box", () => {
      // then disable save button
      pom.el.submitProject.should("have.class", "spark-button-disabled");
    });
    it("should show rename project inputs", () => {
      pom.el.projectName.type("project-a-new");
      pom.el.projectName.should("have.value", "project-a-new");
    });
    it("should see save button enabled when a name is entered in rename input box", () => {
      // If the name is entered in the rename input
      pom.el.projectName.type("edit-project-name");
      // then donot disable save button
      pom.el.submitProject.should("not.have.class", "spark-button-disabled");
    });
    it("should allow user to close the modal when isDimissable is true", () => {
      pom.modalPom.el.closeDialog.should("exist");
    });

    it("perform a rename on the project", () => {
      pom.el.projectName.type("edit-project-name");
      pom.interceptApis([pom.api.renameProject]);
      pom.el.submitProject.click();
      pom.waitForApis();

      // Check if the api is called with right request params/body
      cy.get(`@${pom.api.renameProject}`)
        .its("request.url")
        .then((url: string) => {
          // This name should not match entered name, instead it will be the old name
          const match = url.match(`/projects/${projectName}`);
          expect(match && match.length > 0).to.be.equal(true);
        });
    });
    // TODO: OPEN SOURCE MIGRATION TEST FAIL
    xit("Should display api error message on rename of the project", () => {
      const onErrorSpy = cy.spy().as("onErrorSpy");
      cy.mount(
        <TestComponent
          project={{
            name: projectName,
          }}
          onError={onErrorSpy}
          isDimissable
        />,
      );
      cyGet("testOpen").click();
      pom.el.projectName.type("edit-project-name");
      pom.interceptApis([pom.api.renameProjectError]);
      pom.el.submitProject.click();
      pom.waitForApis();
      cy.get("@onErrorSpy").should("have.been.calledWith", "Unauthorized");
    });
  });
});
