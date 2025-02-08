/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */
import { alertDefinitionOne, alertOne } from "@orch-ui/utils";
import AlertDrawer from "./AlertDrawer";
import AlertDrawerPom from "./AlertDrawer.pom";

const pom = new AlertDrawerPom();
describe("<AlertDrawer/>", () => {
  it("should render component", () => {
    cy.mount(
      <AlertDrawer
        isOpen={true}
        setIsOpen={() => {}}
        alert={alertOne}
        alertDefinition={alertDefinitionOne}
      />,
    );
    pom.el.alertDrawerBody.should("be.visible");
    pom.el.alertLabel.should("contain", "Alert:");
    pom.el.alertValue.should("contain", alertDefinitionOne.name);
    pom.el.statusLabel.should("contain", "Status:");
    pom.el.statusValue.should("contain", alertOne.status?.state);
    pom.el.sourceLabel.should("contain", "Source:");
    pom.el.categoryLabel.should("contain", "Category:");
    pom.el.categoryValue.should("contain", alertOne.labels?.alert_category);
    pom.el.startLabel.should("contain", "Start time:");
    pom.el.startValue.should("contain", alertOne.startsAt);
    pom.el.modifiedLabel.should("contain", "Modified time:");
    pom.el.modifiedValue.should("contain", alertOne.updatedAt);
    pom.el.modifiedLabel.should("contain", "Modified time:");
    pom.el.modifiedValue.should("contain", alertOne.updatedAt);
    pom.el.descriptionLabel.should("contain", "Description:");
    pom.el.descriptionValue.should(
      "contain",
      alertOne.annotations?.description,
    );
  });
});
