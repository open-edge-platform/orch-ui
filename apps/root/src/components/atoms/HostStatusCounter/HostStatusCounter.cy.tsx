/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import { AppDispatch } from "../../../store/store";
import { IHostStatusCounter } from "../../../utils/helpers";
import HostStatusCounter from "./HostStatusCounter";
import { HostStatusCounterPom } from "./HostStatusCounter.pom";

describe("<HostStatusCounter />", () => {
  const pom: HostStatusCounterPom = new HostStatusCounterPom();

  const deployment: adm.DeploymentRead = {
    appName: "test-ca",
    appVersion: "1.2.3",
    profileName: "default",
    publisherName: "intel",
    targetClusters: [],
    deployId: "testing",
  };

  let ghl: (
      dispatch: AppDispatch,
      clusterNames?: string[],
    ) => Promise<string[]>,
    ghs: (
      dispatch: AppDispatch,
      uniqueHosts: string[],
    ) => Promise<IHostStatusCounter>;

  const mockGetHostsList: string[] = [];

  describe("<getHostsList />", () => {
    describe("when getHostsList throws an error", () => {
      beforeEach(() => {
        ghl = cy
          .stub()
          .as("getHostsList")
          .rejects({
            status: 500,
            data: { detail: "Some List error", status: 500 },
          });
        pom.interceptApis([pom.api.clustersList]);
        cy.mount(
          <HostStatusCounter
            deployment={deployment}
            getHostsList={ghl}
            getHostStatus={ghs}
          />,
        );
        pom.waitForApis();
      });

      it("should render an error message", () => {
        pom.root.should("be.visible");
        cy.get("@getHostsList").should("have.been.called");
        pom.el.error.should("be.visible");
      });
    });

    describe("when getHostStatus throws an error", () => {
      beforeEach(() => {
        ghl = cy
          .stub()
          .as("getHostsList")
          .resolves({
            status: 200,
            data: {
              total: 5,
              error: 2,
              running: 2,
              notRunning: 1,
            },
          });
        ghs = cy
          .stub()
          .as("getHostsStatus")
          .rejects({
            status: 500,
            data: { detail: "Some Status error", status: 500 },
          });
        pom.interceptApis([pom.api.clustersList]);
        cy.mount(
          <HostStatusCounter
            deployment={deployment}
            getHostsList={ghl}
            getHostStatus={ghs}
          />,
        );
        pom.waitForApis();
      });

      it("should render an error message", () => {
        pom.root.should("be.visible");
        cy.get("@getHostsStatus").should("have.been.called");
        pom.el.error.should("be.visible");
      });
    });

    describe("when getHostsList responds successfully", () => {
      beforeEach(() => {
        ghl = cy.stub().as("getHostsList").resolves(mockGetHostsList);
      });

      describe("when there are no deployment instances and thus no Hosts are used", () => {
        beforeEach(() => {
          ghs = cy.stub().as("getHostStatus").resolves({
            error: 0,
            notRunning: 0,
            running: 0,
            total: 0,
          });
          pom.interceptApis([pom.api.clustersList]);
          cy.mount(
            <HostStatusCounter
              deployment={deployment}
              getHostsList={ghl}
              getHostStatus={ghs}
            />,
          );
          pom.waitForApis();
        });
        it("should have a grey chart", () => {
          pom.root.should("be.visible");
          cy.get("@getHostsList").should("have.been.called");
          cy.get("@getHostStatus").should("have.been.called");
          pom.el.chart.should("be.visible");
          pom.el.chart.get("path").should("have.attr", "fill", "#D1D5DB");
          pom.root.contains("No associated hosts");
        });
      });

      describe("when some hosts are down", () => {
        beforeEach(() => {
          ghs = cy.stub().as("getHostStatus").resolves({
            error: 2,
            notRunning: 6,
            running: 12,
            total: 20,
          });
        });
        it("should render the number of hosts down", () => {
          pom.interceptApis([pom.api.clustersList]);
          cy.mount(
            <HostStatusCounter
              deployment={deployment}
              getHostsList={ghl}
              getHostStatus={ghs}
            />,
          );
          pom.waitForApis();
          pom.root.should("be.visible");
          cy.get("@getHostsList").should("have.been.called");
          cy.get("@getHostStatus").should("have.been.called");
          pom.root.should("not.contain.text", "12 Running");
          pom.root.should("have.text", "8 Down");
        });

        describe("when the detailed prop is set to true", () => {
          it("both message", () => {
            pom.interceptApis([pom.api.clustersList]);
            cy.mount(
              <HostStatusCounter
                deployment={deployment}
                getHostsList={ghl}
                getHostStatus={ghs}
                showAllStates
              />,
            );
            pom.waitForApis();
            pom.root.should("be.visible");
            cy.get("@getHostsList").should("have.been.called");
            cy.get("@getHostStatus").should("have.been.called");
            pom.getStatusElement(1).contains("8 Down");
            pom.getStatusElement(2).contains("12 Running");
          });
        });
      });

      describe("when all hosts are down", () => {
        beforeEach(() => {
          ghs = cy.stub().as("getHostStatus").resolves({
            error: 2,
            notRunning: 18,
            running: 0,
            total: 20,
          });
          pom.interceptApis([pom.api.clustersList]);
          cy.mount(
            <HostStatusCounter
              deployment={deployment}
              getHostsList={ghl}
              getHostStatus={ghs}
            />,
          );
          pom.waitForApis();
        });
        it("should render the number of hosts down", () => {
          pom.root.should("be.visible");
          cy.get("@getHostStatus").should("have.been.called");
          pom.root.contains("All Down");
        });
      });

      describe("when all hosts are running", () => {
        beforeEach(() => {
          ghs = cy.stub().as("getHostStatus").resolves({
            error: 0,
            notRunning: 0,
            running: 20,
            total: 20,
          });
          pom.interceptApis([pom.api.clustersList]);
          cy.mount(
            <HostStatusCounter
              deployment={deployment}
              getHostsList={ghl}
              getHostStatus={ghs}
            />,
          );
          pom.waitForApis();
        });
        it("should render the number of hosts running", () => {
          pom.root.should("be.visible");
          cy.get("@getHostStatus").should("have.been.called");
          pom.root.contains("All Running");
        });
      });
    });
  });
});
