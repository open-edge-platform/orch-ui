/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import DeploymentPackagePopup from "./DeploymentPackagePopup";
import DeploymentPackagePopupPom from "./DeploymentPackagePopup.pom";

const pom = new DeploymentPackagePopupPom();

describe("<DeploymentPackagePopup />", () => {
  beforeEach(() => {
    cy.mount(<></>, {
      routerProps: {
        initialEntries: ["/"],
      },
      routerRule: [
        {
          path: "/",
          element: (
            <DeploymentPackagePopup
              jsx={
                <button data-cy="popup-trigger">
                  <span>Deployment Packages Actions</span>
                </button>
              }
            />
          ),
        },
        {
          path: "/applications/packages/create",
          element: <div id="pathname">/applications/packages/create</div>,
        },
        {
          path: "/applications/packages/import",
          element: <div id="pathname">/applications/packages/import</div>,
        },
        {
          path: "/applications/packages/import-from-helm-chart",
          element: (
            <div id="pathname">
              /applications/packages/import-from-helm-chart
            </div>
          ),
        },
      ],
    });
  });

  it("renders popup trigger", () => {
    pom.trigger
      .should("exist")
      .and("contain.text", "Deployment Packages Actions");
  });

  it("displays all options when opened", () => {
    pom.trigger.click();
    pom.el.Create.should("exist");
    pom.el["Import Helm Chart"].should("exist");
    pom.el["Create"].should("exist");
    pom.el["Import from file"].should("exist");
  });

  it("navigates correctly when Create is clicked", () => {
    pom.trigger.click();
    pom.el.Create.click();
    cy.get("#pathname").should("contain", "/applications/packages/create");
  });

  it("navigates correctly when Import from file is clicked", () => {
    pom.trigger.click();
    pom.el["Import from file"].click();
    cy.get("#pathname").should("contain", "/applications/packages/import");
  });

  it("navigates correctly when Import Helm Chart is clicked", () => {
    pom.trigger.click();
    pom.el["Import Helm Chart"].click();
    cy.get("#pathname").should(
      "contain",
      "/applications/packages/import-from-helm-chart",
    );
  });

  it("closes the popup after clicking an option", () => {
    pom.trigger.click();
    pom.el.Create.click();
    pom.el["Import from file"].should("not.exist");
  });

  it("keeps popup open if no option is clicked", () => {
    pom.trigger.click();
    pom.el["Import Helm Chart"].should("be.visible");
  });

  it("closes popup when clicking outside", () => {
    pom.trigger.click();
    cy.get("body").click(0, 0);
    pom.el.Create.should("not.exist");
  });

  it("should not throw when clicking trigger multiple times", () => {
    pom.trigger.click().click().click();
    pom.el.Create.should("exist");
  });
});
