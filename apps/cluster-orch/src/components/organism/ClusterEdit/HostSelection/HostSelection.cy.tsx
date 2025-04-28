/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm, eim } from "@orch-ui/apis";
import { Table, TableColumn } from "@orch-ui/components";
import { clusterOne, provisionedHostTwo } from "@orch-ui/utils";
import React from "react";
import HostSelection from "./HostSelection";
import HostSelectionPom from "./HostSelection.pom";

/** Remote component mock for Host table.
 * This can be used to test custom columns sent from Clusters to Infra
 **/
const HostTableRemoteMock = ({
  columns,
  selectedHostIds = [],
  onHostSelect,
}: {
  columns: TableColumn<infra.HostRead>[];
  selectedHostIds?: string[];
  onHostSelect: (host: infra.Host, isSelected: boolean) => void;
}) => {
  return (
    <Table
      columns={columns}
      data={[provisionedHostTwo]}
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
    cluster: cm.ClusterDetailInfo & cm.ClusterInfo;
    configuredClusterNodes?: cm.NodeInfo[] | undefined;
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
            nodes: [
              {
                id: "host-dh38bjw9",
                name: "host-dh38bjw9",
                status: {
                  condition: "STATUS_CONDITION_READY",
                },
              },
            ],
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
                    nodes: [
                      {
                        id: "host-dh38bjw9",
                        name: "host-dh38bjw9",
                        status: {
                          condition: "STATUS_CONDITION_READY",
                        },
                      },
                    ],
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

    xit("should open drawer", () => {
      pom.clusterSelectedNodeReviewTablePom.el.addHostBtn.click();
      pom.clusterAddNodeDrawerPom.root.should("exist");
    });

    xit("should open and close drawer by cancel", () => {
      pom.clusterSelectedNodeReviewTablePom.el.addHostBtn.click();
      pom.getAddNodeDrawerBase().should("have.class", "spark-drawer-show");
      pom.clusterAddNodeDrawerPom.el.cancelBtn.click();
      pom.getAddNodeDrawerBase().should("have.class", "spark-drawer-hide");
    });

    xit("should open and close drawer from header", () => {
      pom.clusterSelectedNodeReviewTablePom.el.addHostBtn.click();
      pom.getAddNodeDrawerBase().should("have.class", "spark-drawer-show");
      pom.clusterAddNodeDrawerPom.root
        .find(".spark-drawer-header .spark-icon-cross")
        .click();
      pom.getAddNodeDrawerBase().should("have.class", "spark-drawer-hide");
    });

    xdescribe("should see host selection from drawer to review table", () => {
      beforeEach(() => {
        pom.clusterSelectedNodeReviewTablePom.el.addHostBtn.click();
        pom.clusterAddNodeDrawerPom.nodeTablePom.el.rowSelectCheckbox.click();
      });
      // TODO : 22694 Site information to be updated from labels
      it.skip("should get the host from the drawer", () => {
        pom.clusterAddNodeDrawerPom.el.okBtn.click();
        cy.get("@saveSelectedNodes").should("be.calledWith", [
          {
            id: "host-dh38bjw9",
            name: "host-dh38bjw9",
            status: {
              condition: "STATUS_CONDITION_READY",
            },
          },
          {
            id: provisionedHostTwo.resourceId,
            serial: provisionedHostTwo.serialNumber,
            os: provisionedHostTwo.instance?.os?.name,
            name: provisionedHostTwo.name,
            guid: provisionedHostTwo.uuid,
            role: "all",
          },
        ]);
      });

      it.skip("should update role of selected host in the drawer", () => {
        pom.clusterAddNodeDrawerPom.setNodeDropdownValueByName(
          provisionedHostTwo.name ?? provisionedHostTwo.resourceId,
          "Control Plane",
        );
        pom.clusterAddNodeDrawerPom.el.okBtn.click();
        cy.get("@saveSelectedNodes").should("be.calledWith", [
          {
            id: "host-dh38bjw9",
            name: "host-dh38bjw9",
            status: {
              condition: "STATUS_CONDITION_READY",
            },
          },
          {
            id: provisionedHostTwo.resourceId,
            serial: provisionedHostTwo.serialNumber,
            os: provisionedHostTwo.instance?.os?.name,
            name: provisionedHostTwo.name,
            guid: provisionedHostTwo.uuid,
            role: "controlplane",
          },
        ]);
      });
    });

    xit("will remove host from cluster", () => {
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
          nodes: [
            {
              id: "host-dh38bjw9",
              name: "host-dh38bjw9",
              status: {
                condition: "STATUS_CONDITION_READY",
              },
            },
          ],
        }}
        configuredClusterNodes={[
          {
            id: "host-dh38bjw9",
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
                  nodes: [
                    {
                      id: "host-dh38bjw9",
                      name: "host-dh38bjw9",
                      status: {
                        condition: "STATUS_CONDITION_READY",
                      },
                    },
                  ],
                }}
                configuredClusterNodes={[
                  {
                    id: "host-dh38bjw9",
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
