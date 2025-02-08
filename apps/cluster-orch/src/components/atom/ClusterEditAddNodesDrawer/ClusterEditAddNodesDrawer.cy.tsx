/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { Table, TableColumn } from "@orch-ui/components";
import { clusterOne, unassignedHostOne } from "@orch-ui/utils";
import React from "react";
import { store } from "../../../store";
import ClusterEditAddNodesDrawer from "./ClusterEditAddNodesDrawer";
import ClusterEditAddNodesDrawerPom from "./ClusterEditAddNodesDrawer.pom";

/** Remote component mock for Host table.
 * This can be used to test custom columns sent from Clusters to FM
 **/
const HostTableRemoteMock = ({
  columns,
  selectedHostIds = [],
  onHostSelect,
}: {
  columns: TableColumn<eim.HostRead>[];
  selectedHostIds?: string[];
  onHostSelect: (host: eim.Host, isSelected: boolean) => void;
}) => {
  return (
    <Table
      columns={columns}
      data={[unassignedHostOne]}
      canSelectRows
      selectedIds={selectedHostIds}
      onSelect={(host, isSelected) => {
        onHostSelect(host, isSelected);
      }}
    />
  );
};

const pom = new ClusterEditAddNodesDrawerPom();
describe("<ClusterEditNodeDetailsDrawer/>", () => {
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
          cluster={{ ...clusterOne, nodes: { nodeInfoList: [] } }}
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
    it("should click ok button when hosts are selected", () => {
      pom.nodeTablePom.el.rowSelectCheckbox.click();
      pom.el.okBtn.should("not.have.class", "spark-button-disabled");
      pom.el.okBtn.click();
      cy.get("@saveNode").should("be.calledWith", [
        {
          id: "host-unassign1",
          serial: "ec269d77-9b98-bda3-2f68-61fe4428a8da",
          os: "Ubuntu",
          name: "host-unassign1",
          guid: "4c4c4544-0044-4210-8031-c2c04f305239",
          role: "all",
        },
      ]);
    });
  });
});
