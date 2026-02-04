/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import { useState } from "react";
import { CreateEditProject } from "./CreateEditProject";
import { CreateEditProjectPom } from "./CreateEditProject.pom";

const pom = new CreateEditProjectPom();

interface TestComponentProps {
  isDimissable: boolean;
  onError?: (err: string) => void;
}

const TestComponent = ({ isDimissable, onError }: TestComponentProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <button data-cy="testOpen" onClick={() => setIsOpen(!isOpen)}>
        Open
      </button>
      <CreateEditProject
        isOpen={isOpen}
        onClose={() => setIsOpen(!open)}
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
    it("should show project description field", () => {
      pom.el.projectDescriptionLabel.contains("Project Description (optional)");
      pom.el.projectDescription.should("exist");
    });
    it("should allow user to close the modal when isDimissable is true", () => {
      cy.mount(<TestComponent isDimissable />);
      cyGet("testOpen").click();
      pom.modalPom.el.closeDialog.should("exist");
    });
  });
});
