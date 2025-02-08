/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm, eim } from "@orch-ui/apis";
import { Table, TableColumn } from "@orch-ui/components";
import { clusterOne, unassignedHostTwo } from "@orch-ui/utils";
import React from "react";
import HostSelection from "./HostSelection";
import HostSelectionPom from "./HostSelection.pom";

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
      data={[unassignedHostTwo]}
      canSelectRows
      selectedIds={selectedHostIds}
      onSelect={(host, isSelected) => {
        onHostSelect(host, isSelected);
      }}
    />
  );
};

const pom = new HostSelectionPom();
describe("<HostSelection/>", () => {
  const LazyHostTableMockRemote: React.LazyExoticComponent<
    React.ComponentType<any>
  > | null = React.lazy(() =>
    Promise.resolve({ default: HostTableRemoteMock }),
  );

  const TestComponent = ({
    cluster,
    configuredClusterNodes,
  }: {
    cluster: ecm.ClusterDetailInfo & ecm.ClusterInfo;
    configuredClusterNodes?: ecm.NodeInfo[] | undefined;
  }) => (
    <HostSelection
      cluster={cluster}
      configuredClusterNodes={configuredClusterNodes}
      onNodesSave={cy.stub().as("saveSelectedNodes")}
      onRemoveLastNode={cy.stub().as("removeLastNode")}
      HostsTableRemote={LazyHostTableMockRemote}
    />
  );
  const mountConfig = {
    routerProps: {
      initialEntries: [`/infrastructure/cluster/${clusterOne.name}/edit`],
    },
  };

  describe("when the cluster contains atleast one pre-selected node", () => {
    beforeEach(() => {
      cy.mount(
        <TestComponent
          cluster={{
            ...clusterOne,
            nodes: {
              nodeInfoList: [
                {
                  id: "host-dh38bjw9",
                  guid: "4c4c4544-0044-4210-8031-c2c04f305233",
                  name: "host-dh38bjw9",
                  status: {
                    condition: "STATUS_CONDITION_READY",
                  },
                },
              ],
            },
          }}
        />,
        {
          ...mountConfig,
          routerRule: [
            {
              path: "/infrastructure/cluster/:clusterName/edit",
              element: (
                <TestComponent
                  cluster={{
                    ...clusterOne,
                    nodes: {
                      nodeInfoList: [
                        {
                          id: "host-dh38bjw9",
                          guid: "4c4c4544-0044-4210-8031-c2c04f305233",
                          name: "host-dh38bjw9",
                          status: {
                            condition: "STATUS_CONDITION_READY",
                          },
                        },
                      ],
                    },
                  }}
                />
              ),
            },
          ],
        },
      );
    });

    it("render component", () => {
      pom.root.should("exist");
    });

    it("should open drawer", () => {
      pom.clusterSelectedNodeReviewTablePom.el.addHostBtn.click();
      pom.clusterAddNodeDrawerPom.root.should("exist");
    });

    it("should open and close drawer by cancel", () => {
      pom.clusterSelectedNodeReviewTablePom.el.addHostBtn.click();
      pom.getAddNodeDrawerBase().should("have.class", "spark-drawer-show");
      pom.clusterAddNodeDrawerPom.el.cancelBtn.click();
      pom.getAddNodeDrawerBase().should("have.class", "spark-drawer-hide");
    });

    it("should open and close drawer from header", () => {
      pom.clusterSelectedNodeReviewTablePom.el.addHostBtn.click();
      pom.getAddNodeDrawerBase().should("have.class", "spark-drawer-show");
      pom.clusterAddNodeDrawerPom.root
        .find(".spark-drawer-header .spark-icon-cross")
        .click();
      pom.getAddNodeDrawerBase().should("have.class", "spark-drawer-hide");
    });

    describe("should see host selection from drawer to review table", () => {
      beforeEach(() => {
        pom.clusterSelectedNodeReviewTablePom.el.addHostBtn.click();
        pom.clusterAddNodeDrawerPom.nodeTablePom.el.rowSelectCheckbox.click();
      });
      it("should get the host from the drawer", () => {
        pom.clusterAddNodeDrawerPom.el.okBtn.click();
        cy.get("@saveSelectedNodes").should("be.calledWith", [
          {
            id: "host-dh38bjw9",
            guid: "4c4c4544-0044-4210-8031-c2c04f305233",
            name: "host-dh38bjw9",
            status: {
              condition: "STATUS_CONDITION_READY",
            },
          },
          {
            id: unassignedHostTwo.resourceId,
            serial: unassignedHostTwo.serialNumber,
            os: unassignedHostTwo.instance?.os?.name,
            name: unassignedHostTwo.name,
            guid: unassignedHostTwo.uuid,
            role: "all",
          },
        ]);
      });

      it("should update role of selected host in the drawer", () => {
        pom.clusterAddNodeDrawerPom.setNodeDropdownValueByName(
          unassignedHostTwo.name ?? unassignedHostTwo.resourceId,
          "Control Plane",
        );
        pom.clusterAddNodeDrawerPom.el.okBtn.click();
        cy.get("@saveSelectedNodes").should("be.calledWith", [
          {
            id: "host-dh38bjw9",
            guid: "4c4c4544-0044-4210-8031-c2c04f305233",
            name: "host-dh38bjw9",
            status: {
              condition: "STATUS_CONDITION_READY",
            },
          },
          {
            id: unassignedHostTwo.resourceId,
            serial: unassignedHostTwo.serialNumber,
            os: unassignedHostTwo.instance?.os?.name,
            name: unassignedHostTwo.name,
            guid: unassignedHostTwo.uuid,
            role: "controlplane",
          },
        ]);
      });
    });

    it("will remove host from cluster", () => {
      pom.clusterSelectedNodeReviewTablePom.table
        .getRowBySearchText("host-dh38bjw9")
        .find("[data-cy='removeHostBtn']")
        .click();

      cy.get("@removeLastNode").should("be.called");
    });
  });

  it("should see pre-existing cluster nodes disable in review table", () => {
    cy.mount(
      <TestComponent
        cluster={{
          ...clusterOne,
          nodes: {
            nodeInfoList: [
              {
                id: "host-dh38bjw9",
                guid: "4c4c4544-0044-4210-8031-c2c04f305233",
                name: "host-dh38bjw9",
                status: {
                  condition: "STATUS_CONDITION_READY",
                },
              },
            ],
          },
        }}
        configuredClusterNodes={[
          {
            id: "host-dh38bjw9",
            guid: "4c4c4544-0044-4210-8031-c2c04f305233",
            name: "host-dh38bjw9",
            status: {
              condition: "STATUS_CONDITION_READY",
            },
          },
        ]}
      />,
      {
        ...mountConfig,
        routerRule: [
          {
            path: "/infrastructure/cluster/:clusterName/edit",
            element: (
              <TestComponent
                cluster={{
                  ...clusterOne,
                  nodes: {
                    nodeInfoList: [
                      {
                        id: "host-dh38bjw9",
                        guid: "4c4c4544-0044-4210-8031-c2c04f305233",
                        name: "host-dh38bjw9",
                        status: {
                          condition: "STATUS_CONDITION_READY",
                        },
                      },
                    ],
                  },
                }}
                configuredClusterNodes={[
                  {
                    id: "host-dh38bjw9",
                    guid: "4c4c4544-0044-4210-8031-c2c04f305233",
                    name: "host-dh38bjw9",
                    status: {
                      condition: "STATUS_CONDITION_READY",
                    },
                  },
                ]}
              />
            ),
          },
        ],
      },
    );
    pom.clusterSelectedNodeReviewTablePom
      .getNodeDropdownByName("host-dh38bjw9")
      .should("have.class", "spark-dropdown-is-disabled");
  });
});
