/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import StatusCounter from "./StatusCounter";
import StatusCounterPom from "./StatusCounter.pom";

const pom = new StatusCounterPom();
describe("<StatusCounter/>", () => {
  describe("with all down", () => {
    beforeEach(() => {
      cy.mount(<StatusCounter summary={{ down: 0, running: 3, total: 3 }} />);
    });
    it("displays corresponding message", () => {
      pom.getSingleStatusElement().should("contain.text", "All Running");
    });
  });

  describe("with all down", () => {
    beforeEach(() => {
      cy.mount(<StatusCounter summary={{ down: 3, running: 0, total: 3 }} />);
    });
    it("displays corresponding message", () => {
      pom.getSingleStatusElement().should("contain.text", "All Down");
    });
  });

  describe("with specific amount down", () => {
    beforeEach(() => {
      cy.mount(<StatusCounter summary={{ down: 2, running: 3, total: 5 }} />);
    });
    it("displays corresponding message", () => {
      pom.getSingleStatusElement().should("contain.text", "2 Down");
    });
  });

  describe("with all details displayed", () => {
    beforeEach(() => {
      cy.mount(
        <StatusCounter
          summary={{ down: 4, running: 4, total: 8 }}
          showAllStates
          showAllStatesTitle="All States On"
        />,
      );
    });
    it("displays corresponding message", () => {
      pom.el.showAllStatesTitle.contains("All States On");
      pom.getStatusElement(1).should("contain.text", "4 Down");
      pom.getStatusElement(2).should("contain.text", "4 Running");
    });
  });
});
