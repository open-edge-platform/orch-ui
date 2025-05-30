/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Table, TableColumn } from "@orch-ui/components";
import { clusterOne, provisionedHostOne } from "@orch-ui/utils";
import React from "react";
import { store } from "../../../store";
import ClusterEditAddNodesDrawer from "./ClusterEditAddNodesDrawer";
import ClusterEditAddNodesDrawerPom from "./ClusterEditAddNodesDrawer.pom";

/** Remote component mock for Host table.
 * This can be used to test custom columns sent from Clusters to INFRA
 **/
const HostTableRemoteMock = ({
  columns,
  selectedHostIds = [],
  onHostSelect,
}: {
  columns: TableColumn<infra.HostResourceRead>[];
  selectedHostIds?: string[];
  onHostSelect: (host: infra.Host, isSelected: boolean) => void;
}) => {
  return (
    <Table
      columns={columns}
      data={[provisionedHostOne]}
      canSelectRows
      selectedIds={selectedHostIds}
      onSelect={(host, isSelected) => {
        onHostSelect(host, isSelected);
      }}
    />
  );
};

const pom = new ClusterEditAddNodesDrawerPom();
describe("<ClusterEditAddNodeDetailsDrawer/>", () => {
  const LazyHostTableMockRemote: React.LazyExoticComponent<
    React.ComponentType<any>
  > | null = React.lazy(() =>
    Promise.resolve({ default: HostTableRemoteMock }),
  );

  describe("when no hosts are seen pre-selected in cluster", () => {
    beforeEach(() => {
      const reduxStore = store;
      cy.mount(
        <ClusterEditAddNodesDrawer
          cluster={{ ...clusterOne, nodes: [] }}
          isOpen
          onAddNodeSave={cy.stub().as("saveNode")}
          onCancel={cy.stub().as("closeDrawer")}
          HostsTableRemote={LazyHostTableMockRemote}
        />,
        {
          reduxStore,
        },
      );
    });
    it("should render component", () => {
      pom.root.should("exist");
    });
    it("should click cancel button", () => {
      pom.el.cancelBtn.click();
      cy.get("@closeDrawer").should("have.been.called");
    });
    it("should see ok button disable when no hosts are selected", () => {
      pom.el.okBtn.should("have.class", "spark-button-disabled");
    });
    // TODO : 22694 Site information to be updated from labels
    it.skip("should click ok button when hosts are selected", () => {
      pom.nodeTablePom.el.rowSelectCheckbox.click();
      pom.el.okBtn.should("not.have.class", "spark-button-disabled");
      pom.el.okBtn.click();
      cy.get("@saveNode").should("be.calledWith", [
        {
          guid: "4c4c4544-0044-4210-8031-c2c04f3052pa",
          id: "host-provisioned-1",
          name: "host-provisioned-1",
          os: "Ubuntu",
          role: "all",
          serial: "CYTDAA",
        },
      ]);
    });
  });
});
