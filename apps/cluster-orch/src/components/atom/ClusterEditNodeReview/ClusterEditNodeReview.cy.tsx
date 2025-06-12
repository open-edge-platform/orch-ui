/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import ClusterEditNodeReview from "./ClusterEditNodeReview";
import ClusterEditNodeReviewPom from "./ClusterEditNodeReview.pom";

const pom = new ClusterEditNodeReviewPom();
describe("<ClusterEditNodeReview/>", () => {
  describe("when no nodes/hosts are available", () => {
    beforeEach(() => {
      cy.mount(
        <ClusterEditNodeReview
          clusterNodeList={[]}
          onAddNode={cy.stub().as("addNode")}
          onNodeUpdate={cy.stub().as("updateNode")}
          onRemoveNode={cy.stub().as("removeNode")}
        />,
      );
    });
    it("should render component", () => {
      pom.root.should("exist");
      pom.root.should("contain.text", "No hosts available.");
    });
  });

  describe("when node/host are available", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getHost]);
      cy.mount(
        <ClusterEditNodeReview
          clusterNodeList={[
            {
              id: "host-provisioned-1",
              role: "all",
              status: {
                condition: "STATUS_CONDITION_READY",
                reason: "Running",
              },
            },
          ]}
          onNodeUpdate={cy.stub()}
        />,
      );
    });
    it("should render component with host details", () => {
      pom.root.should("exist");
      pom.waitForApis();
      pom.table.getCell(1, 1).contains("host-provisioned-1"); // host name fetched from host api response
      pom.table.getCell(1, 2).contains("Running"); // from node status
      pom.table.getCell(1, 3).contains("Ubuntu"); // os name etched from host api response
    });
  });

  describe("when nodes/hosts are available", () => {
    beforeEach(() => {
      cy.mount(
        <ClusterEditNodeReview
          clusterNodeList={[
            {
              id: "host-unassign1",
              role: "all",
            },
            {
              id: "host-unassign2",
              role: "controlplane",
            },
            {
              id: "host-unassign3",
              role: "worker",
            },
            {
              id: "host-unassign4",
              role: "",
            },
            {
              id: "host-noname",
            },
            {
              id: "host-unknown",
              role: "unknown",
            },
          ]}
          onAddNode={cy.stub().as("addNode")}
          onNodeUpdate={cy.stub().as("updateNode")}
          onRemoveNode={cy.stub().as("removeNode")}
        />,
      );
    });
    it("should show cluster with no name", () => {
      pom.table.getRowBySearchText("host-noname").should("contain.text", "All");
    });
    it("should show cluster with `all` node role", () => {
      pom
        .getNodeDropdownValueByName("host-unassign1")
        .should("contain.text", "All");
    });
    it("should show cluster with `worker` node role", () => {
      pom
        .getNodeDropdownValueByName("host-unassign2")
        .should("contain.text", "Control Plane");
    });
    it("should show cluster with `controlplane` node role", () => {
      pom
        .getNodeDropdownValueByName("host-unassign3")
        .should("contain.text", "Worker");
    });
    it("should show cluster with unspecified node role (i.e, default: all)", () => {
      pom
        .getNodeDropdownValueByName("host-unknown")
        .should("contain.text", "All");
    });
    it("should call function when node role is changed", () => {
      pom
        .getNodeDropdownValueByName("host-unknown")
        .should("contain.text", "All");

      pom.setNodeDropdownValueByName("host-unknown", "Worker");

      pom
        .getNodeDropdownValueByName("host-unknown")
        .should("contain.text", "Worker");
      cy.get("@updateNode").should(
        "be.calledWith",
        {
          id: "host-unknown",
          role: "unknown",
        },
        "worker",
      );
    });
  });
});
