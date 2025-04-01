/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import { Button } from "@spark-design/react";
import { ButtonVariant, ModalSize } from "@spark-design/tokens";
import { useState } from "react";
import { Modal } from "./Modal";
import { ModalPom } from "./Modal.pom";

const pom = new ModalPom();

const TestComponent = ({
  passiveModal,
  footerContent,
  isDimissable,
  onRequestSubmit,
  onSecondarySubmit,
}: any) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button data-cy="testOpen" onClick={() => setOpen(!open)}>
        Open
      </button>
      <Modal
        open={open}
        modalHeading="Create Project"
        modalLabel="project"
        buttonPlacement="left"
        primaryButtonText="Create"
        secondaryButtonText="Cancel"
        size={ModalSize.Large}
        passiveModal={passiveModal}
        footerContent={footerContent}
        isDimissable={isDimissable}
        onRequestClose={() => setOpen(!open)}
        onSecondarySubmit={onSecondarySubmit}
        onRequestSubmit={onRequestSubmit}
      >
        <p
          style={{
            marginBottom: "1rem",
          }}
        ></p>
        <div>Children Content</div>
      </Modal>
    </>
  );
};

describe("<Modal/>", () => {
  it("should render component with basic props", () => {
    cy.mount(<TestComponent />);
    cyGet("testOpen").click();
    pom.root.should("exist");
    pom.el.modalTitle.should("exist").contains("Create Project");
    pom.el.modalLabel.should("exist").contains("project");
    pom.el.closeDialog.should("exist").click();
    pom.root.should("not.exist");
  });

  it("should not display close icon to close the dialog when isDimissable is false", () => {
    cy.mount(<TestComponent isDimissable={false} />);
    cyGet("testOpen").click();
    pom.el.closeDialog.should("not.exist");
  });

  it("should render primary/secondary buttons in footer by default", () => {
    cy.mount(
      <TestComponent
        onSecondarySubmit={cy.stub().as("onSecondarySubmit")}
        onRequestSubmit={cy.stub().as("onRequestSubmit")}
      />,
    );
    cyGet("testOpen").click();
    pom.el.footerBtnGroup.should("exist");
    pom.el.primaryBtn.should("exist").click();
    cy.get("@onRequestSubmit").should("have.been.called");
    pom.el.secondaryBtn.should("exist").click();
    cy.get("@onSecondarySubmit").should("have.been.called");
  });

  it("should not render default primary/secondary buttons in footer when passiveModal is true", () => {
    cy.mount(<TestComponent passiveModal />);
    cyGet("testOpen").click();
    pom.el.footerBtnGroup.should("not.exist");
  });

  it("should render footer content passed as prop", () => {
    cy.mount(
      <TestComponent
        passiveModal
        isDimissable={false}
        footerContent={
          <div>
            <Button
              variant={ButtonVariant.Secondary}
              onPress={() => {}}
              data-cy="actionButton"
            >
              submit
            </Button>
          </div>
        }
      />,
    );
    cyGet("testOpen").click();
    pom.el.footerBtnGroup.should("not.exist");
    cyGet("actionButton").should("exist");
  });
});
