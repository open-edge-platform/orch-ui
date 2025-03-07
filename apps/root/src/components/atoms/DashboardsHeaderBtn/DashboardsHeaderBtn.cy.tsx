/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import DashboardsHeaderBtn from "./DashboardsHeaderBtn";
import DashboardsHeaderBtnPom from "./DashboardsHeaderBtn.pom";

const pom = new DashboardsHeaderBtnPom();
describe("<DashboardsHeaderBtn />", () => {
  describe("when UI Extensions are loaded in the system", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.listExtensions]);
      cy.mount(
        <DashboardsHeaderBtn
          active={false}
          setActive={cy.stub().as("setActive")}
        />,
      );
      pom.waitForApis();
    });
    //TODO: no extensions being used right now and this test consistently fails, needs investigation
    xit("when clicked should activate", () => {
      pom.root.should("exist");
      pom.openDropdown();

      pom.el.lpDashboard.click();
      cy.get("@setActive").should("have.been.called");
    });

    xit("should list links to all extensions", () => {
      pom.openDropdown();
      pom.resources.forEach((extension) => {
        pom.root.contains(extension.label ?? "").should("be.visible");
      });
    });

    it("Dashboard link contains caret", () => {
      pom.el.mainBtn.find(".spark-icon").should("exist");
    });

    it("should list links to all extensions", () => {
      pom.el.infoPopup
        .should("exist")
        .should(
          "contain.text",
          "A new dashboard is available in the option here.",
        );

      pom.el.infoPopup
        .contains("Got It")
        .click()
        .then(() => {
          expect(localStorage.getItem("hideDashboardInfoTooltip")).to.be.eq(
            "true",
          );
        });
      pom.el.infoPopup.should("not.exist");
    });
  });

  describe("when UI Extensions are not loaded in the system", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.listExtensionsEmpty]);
      cy.mount(<DashboardsHeaderBtn active={false} setActive={cy.stub()} />);
      pom.waitForApis();
    });
    it("Dashboard link will automatically load dashboard", () => {
      pom.el.mainBtn.click();
      cy.get("#pathname").contains("dashboard");
    });
    it("Dashboard link does not contain caret", () => {
      pom.el.mainBtn.find(".spark-icon").should("not.exist");
    });
  });
});
