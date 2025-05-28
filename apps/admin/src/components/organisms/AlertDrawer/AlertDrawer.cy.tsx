/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { alertDefinitionMocks } from "library/utils/mocks_new/admin/data/alert-definitions";
import { alertMocks } from "library/utils/mocks_new/admin/data/alerts";
import AlertDrawer from "./AlertDrawer";
import AlertDrawerPom from "./AlertDrawer.pom";

const pom = new AlertDrawerPom();
describe("<AlertDrawer/>", () => {
  it("should render component", () => {
    cy.mount(
      <AlertDrawer
        isOpen={true}
        setIsOpen={() => {}}
        alert={alertMocks.hostConnectionLostAlert}
        alertDefinition={alertDefinitionMocks.hostConnectionLostAlertDefinition}
      />,
    );
    pom.el.alertDrawerBody.should("be.visible");
    pom.el.alertLabel.should("contain", "Alert:");
    pom.el.alertValue.should(
      "contain",
      alertDefinitionMocks.hostConnectionLostAlertDefinition.name,
    );
    pom.el.statusLabel.should("contain", "Status:");
    pom.el.statusValue.should(
      "contain",
      alertMocks.hostConnectionLostAlert.status?.state,
    );
    pom.el.sourceLabel.should("contain", "Source:");
    pom.el.categoryLabel.should("contain", "Category:");
    pom.el.categoryValue.should(
      "contain",
      alertMocks.hostConnectionLostAlert.labels?.alert_category,
    );
    pom.el.startLabel.should("contain", "Start time:");
    pom.el.startValue.should(
      "contain",
      alertMocks.hostConnectionLostAlert.startsAt,
    );
    pom.el.modifiedLabel.should("contain", "Modified time:");
    pom.el.modifiedValue.should(
      "contain",
      alertMocks.hostConnectionLostAlert.updatedAt,
    );
    pom.el.modifiedLabel.should("contain", "Modified time:");
    pom.el.modifiedValue.should(
      "contain",
      alertMocks.hostConnectionLostAlert.updatedAt,
    );
    pom.el.descriptionLabel.should("contain", "Description:");
    pom.el.descriptionValue.should(
      "contain",
      alertMocks.hostConnectionLostAlert.annotations?.description,
    );
  });
});
