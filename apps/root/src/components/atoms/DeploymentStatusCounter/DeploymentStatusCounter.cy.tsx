/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import DeploymentStatusCounter from "./DeploymentStatusCounter";
import { DeploymentStatusCounterPom } from "./DeploymentStatusCounter.pom";

describe("<DeploymentStatusCounter />", () => {
  const pom: DeploymentStatusCounterPom = new DeploymentStatusCounterPom();

  describe("if no status summary is provided", () => {
    beforeEach(() => {
      cy.mount(<DeploymentStatusCounter summary={{}} />);
    });

    it("should render a message", () => {
      pom.root.should("be.visible");
      pom.root.should("have.text", "Status summary not provided");
    });
  });

  describe("when no deployments are reported", () => {
    beforeEach(() => {
      cy.mount(
        <DeploymentStatusCounter summary={{ total: 0, running: 0, down: 0 }} />,
      );
    });

    it("should render the a grey chart'", () => {
      pom.root.should("be.visible");
      pom.el.chart.should("be.visible");
      pom.el.chart.get("path").should("have.attr", "fill", "#D1D5DB");
    });
  });

  describe("when all deployments are running", () => {
    beforeEach(() => {
      cy.mount(
        <DeploymentStatusCounter summary={{ total: 3, running: 3, down: 0 }} />,
      );
    });

    it("should render the correct message'", () => {
      pom.root.should("be.visible");
      pom.root.contains("All Running");
    });
  });

  describe("when all deployments are down", () => {
    beforeEach(() => {
      cy.mount(
        <DeploymentStatusCounter summary={{ total: 3, running: 0, down: 3 }} />,
      );
    });

    it("should render the correct message'", () => {
      pom.root.should("be.visible");
      pom.root.contains("All Down");
    });
  });

  describe("when some deployments are down", () => {
    it("should render the correct message'", () => {
      cy.mount(
        <DeploymentStatusCounter summary={{ total: 3, running: 2, down: 1 }} />,
      );
      pom.root.should("be.visible");
      pom.root.contains("1 Down");
      pom.root.should("not.contain.text", "2 Running");
    });

    describe("when all states are shown", () => {
      it("should render both messages'", () => {
        cy.mount(
          <DeploymentStatusCounter
            summary={{ total: 3, running: 2, down: 1 }}
            showAllStates
          />,
        );
        pom.root.should("be.visible");
        pom.getStatusElement(1).should("contain.text", "1 Down");
        pom.getStatusElement(2).should("contain.text", "2 Running");
      });
    });
  });
});
