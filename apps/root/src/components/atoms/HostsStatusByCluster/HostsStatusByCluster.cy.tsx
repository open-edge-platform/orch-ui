/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { AppDispatch } from "../../../store/store";
import HostsStatusByCluster from "./HostsStatusByCluster";
import HostsStatusByClusterPom from "./HostsStatusByCluster.pom";

const createMockHost = (status: {
  indicator?: infra.StatusIndicatorRead;
  message?: string;
  timestamp?: number;
}): infra.HostRead => {
  return {
    resourceId: "test-host",
    name: "Test Host",
    hostStatus: status.message,
    hostStatusIndicator: status.indicator,
    hostStatusTimestamp: status.timestamp,
  };
};

const pom = new HostsStatusByClusterPom();

describe("<HostsStatusByCluster/>", () => {
  let ghl: (
      dispatch: AppDispatch,
      clusterNames?: string[],
    ) => Promise<string[]>,
    gh: (dispatch: AppDispatch, uuids: string[]) => Promise<infra.HostRead[]>;

  beforeEach(() => {
    ghl = cy
      .stub()
      .as("getHostsList")
      .returns(
        new Promise((resolve) => {
          resolve([]);
        }),
      );
  });

  describe("when a single host is returned", () => {
    const host = createMockHost({
      indicator: "STATUS_INDICATION_IDLE",
      message: "Running",
      timestamp: 123,
    });

    beforeEach(() => {
      gh = cy
        .stub()
        .as("getHosts")
        .returns(
          new Promise((resolve) => {
            resolve([host]);
          }),
        );
      cy.mount(
        <HostsStatusByCluster
          clusterName="test-cluster"
          getHostsList={ghl}
          getHosts={gh}
        />,
      );
    });
    it("should render the status", () => {
      pom.root.should("exist");
      cy.get("@getHostsList").should("have.been.called");
      cy.get("@getHosts").should("have.been.called");
      pom.el.hostStatus.should("have.length", 1);
    });
    describe("when clicked", () => {
      it("should navigate to the Host details page", () => {
        pom.el.hostStatus.click();
        pom.getPath().should("eq", `/infrastructure/host/${host.resourceId}`);
      });
    });
  });

  describe("when multiple hosts are returned", () => {
    beforeEach(() => {
      gh = cy
        .stub()
        .as("getHosts")
        .returns(
          new Promise((resolve) => {
            resolve([
              createMockHost({
                indicator: "STATUS_INDICATION_IDLE",
                message: "Running",
                timestamp: 123,
              }),
              createMockHost({
                indicator: "STATUS_INDICATION_ERROR",
                message: "Error",
                timestamp: 123,
              }),
            ]);
          }),
        );
      cy.mount(
        <HostsStatusByCluster
          clusterName="test-cluster"
          getHostsList={ghl}
          getHosts={gh}
        />,
      );
    });
    it("should render multiple status icon", () => {
      pom.root.should("exist");
      cy.get("@getHostsList").should("have.been.called");
      cy.get("@getHosts").should("have.been.called");
      pom.el.hostStatus.first().find(".icon-ready").should("exist");
      pom.el.hostStatus.eq(1).find(".icon-error").should("exist");
    });
  });
});
