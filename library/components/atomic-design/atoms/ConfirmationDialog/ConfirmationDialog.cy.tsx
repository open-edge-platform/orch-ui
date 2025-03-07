/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import {
  Button,
  Dialog,
  DialogTrigger,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@spark-design/react";
import { ButtonVariant } from "@spark-design/tokens";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { ConfirmationDialogPom } from "./ConfirmationDialog.pom";

const pom = new ConfirmationDialogPom();
describe("<ConfirmationDialog/>", () => {
  describe("SI example", () => {
    it("Demonstrates basic example", () => {
      cy.mount(
        <DialogTrigger size="s" isDismissible>
          <Button data-cy="open">Open Modal size s</Button>
          <Dialog data-cy="dialog">
            <ModalHeader title="Modal Title" subTitle="Modal Sub Title" />
            <ModalBody content="Content for modal" />
            <ModalFooter>
              <Button size="m" variant="action">
                Confirm
              </Button>
            </ModalFooter>
          </Dialog>
        </DialogTrigger>,
      );
      cyGet("open").click();
      cyGet("dialog").should("exist").should("be.visible");
    });
  });
  describe("basic functionality should", () => {
    beforeEach(() => {
      cy.mount(
        <>
          <ConfirmationDialog
            showTriggerButton
            isOpen={false}
            confirmCb={cy.stub().as("confirmCb")}
            cancelCb={cy.stub().as("cancelCb")}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            subTitle="subtitle"
            title="Delete Item"
            confirmBtnVariant={ButtonVariant.Action}
            cancelBtnVariant={ButtonVariant.Secondary}
            content={
              <>
                <p>Are you sure you want to proceed ?</p>
                <input placeholder="Reason for proceeding" />
              </>
            }
          />
        </>,
      );
    });
    it("render component with modal closed", () => {
      pom.el.dialog.should("not.exist");
    });
    it("open dialog when trigger clicked", () => {
      pom.el.open.click();
      cyGet("dialog").should("exist").should("be.visible");
    });
    it("should invoke the confirmCb ", () => {
      pom.el.open.click();
      cyGet("confirmBtn").click();
      cy.get("@confirmCb").should("have.been.calledOnce");
    });
    it("should invoke the cancelCb ", () => {
      pom.el.open.click();
      cyGet("cancelBtn").click();
      cy.get("@cancelCb").should("have.been.calledOnce");
    });
    it("should close via the 'X' button", () => {
      pom.el.open.click();
      cy.get(".spark-icon-cross").click();
      pom.el.dialog.should("not.exist");
    });
    it("should close via the confirm button", () => {
      pom.el.open.click();
      cyGet("confirmBtn").click();
      pom.el.dialog.should("not.exist");
    });
    it("should close via the cancel button", () => {
      pom.el.open.click();
      cyGet("cancelBtn").click();
      pom.el.dialog.should("not.exist");
    });
  });

  describe("with a custom configuration", () => {
    const text = "main-text";
    const confirmBtnText = "confirm-text";
    const cancelBtnText = "cancel-text";
    beforeEach(() => {
      cy.mount(
        <ConfirmationDialog
          showTriggerButton
          isOpen={true}
          confirmCb={cy.stub().as("confirmCb")}
          cancelCb={cy.stub().as("cancelCb")}
          confirmBtnText={confirmBtnText}
          cancelBtnText={cancelBtnText}
          confirmBtnVariant={ButtonVariant.AlertGhost}
          cancelBtnVariant={ButtonVariant.Ghost}
          content={text}
          title="Main Title"
        />,
      );
    });
    it("should correctly apply it", () => {
      cyGet("content").should("have.text", text);
      cyGet("confirmBtn").should("have.text", confirmBtnText);
      cyGet("cancelBtn").should("have.text", cancelBtnText);

      cyGet("confirmBtn").should("have.class", "spark-button-alert-ghost");
      cyGet("cancelBtn").should("have.class", "spark-button-ghost");
      cy.get(".spark-icon-cross").click();
    });
  });

  const WithTrigger = () => {
    return (
      <>
        <Button
          onPress={() => {
            const x = document.getElementById("open-confirmation-dialog");
            x?.click();
          }}
        >
          Open
        </Button>
        <ConfirmationDialog
          confirmCb={cy.stub().as("confirmCb")}
          cancelCb={cy.stub().as("cancelCb")}
          confirmBtnText="OK"
          cancelBtnText="Cancel"
          content="content"
          title="Title"
        />
      </>
    );
  };

  describe("with an outside trigger", () => {
    beforeEach(() => {
      cy.mount(<WithTrigger />);
    });
    it("will open dialog", () => {
      cy.get("#open-confirmation-dialog").click({ force: true });
      cyGet("dialog").should("exist").should("be.visible");
    });
  });
});
