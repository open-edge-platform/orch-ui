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
    it("should click `Add Host` to call @addNode handler function for opening drawer", () => {
      pom.el.addHostBtn.click();
      cy.get("@addNode").should("be.called");
    });
  });

  describe("when nodes/hosts are available", () => {
    beforeEach(() => {
      cy.mount(
        <ClusterEditNodeReview
          clusterNodeList={[
            {
              id: "host-unassign1",
              os: "Ubuntu",
              name: "host-unassign1",
              role: "all",
            },
            {
              id: "host-unassign2",
              os: "Ubuntu",
              name: "host-unassign2",
              role: "controlplane",
            },
            {
              id: "host-unassign3",
              os: "Ubuntu",
              name: "host-unassign3",
              role: "worker",
            },
            {
              id: "host-unassign4",
              os: "Ubuntu",
              name: "host-unassign4",
              role: "",
            },
            {
              id: "host-noname",
              os: "Ubuntu",
            },
            {
              id: "host-unknown",
              os: "Ubuntu",
              name: "host-unknown",
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
          os: "Ubuntu",
          name: "host-unknown",
          role: "unknown",
        },
        "worker",
      );
    });
  });
});
