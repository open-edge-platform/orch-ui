/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import DeleteSSHDialog from "./DeleteSSHDialog";
import DeleteSSHDialogPom from "./DeleteSSHDialog.pom";

const pom = new DeleteSSHDialogPom();
describe("<DeleteSSHDialog />", () => {
  beforeEach(() => {
    cy.mount(
      <DeleteSSHDialog
        ssh={{
          sshKey: "johnsmith_qa",
          username: "sat",
        }}
        onCancel={cy.stub().as("onCancel")}
        onDelete={cy.stub().as("onDelete")}
        onError={cy.stub().as("onError")}
      />,
    );
  });
  it("should render component", () => {
    pom.root.should("exist");
    pom.modalPom.el.modalTitle.should("have.text", "Delete sat?");
  });

  it("should call onDelete", () => {
    pom.interceptApis([pom.api.deleteSsh]);
    pom.modalPom.el.primaryBtn.click();
    pom.waitForApis();
    // Check if the api is called with right request
    cy.get(`@${pom.api.deleteSsh}`)
      .its("request.url")
      .then(() => {
        cy.get("@onDelete").should("have.been.called");
      });
  });
  it("should call onCancel", () => {
    pom.modalPom.el.secondaryBtn.click();
    cy.get("@onDelete").should("not.have.been.called");
    cy.get("@onCancel").should("have.been.called");
  });
});
