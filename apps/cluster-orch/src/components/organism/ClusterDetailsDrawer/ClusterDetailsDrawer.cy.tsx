/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Table, TableColumn } from "@orch-ui/components";
import { clusterOne, nodeOne, nodeTwo } from "@orch-ui/utils";
import { HostsTableProps } from "apps/infra/src/components/organism/HostsTable/HostsTable";
import React from "react";
import ClusterDetailsDrawer from "./ClusterDetailsDrawer";
import ClusterDetailsDrawerPom from "./ClusterDetailsDrawer.pom";

const HostsTableMock = (props: HostsTableProps) => {
  const columns: TableColumn<infra.HostResourceRead>[] = [
    {
      Header: "Host Name",
      accessor: "name",
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        data={[
          {
            name: "host1",
          },
          {
            name: "host2",
          },
        ]}
      />
      <div data-cy="test-uuid">
        {props.filters?.byUuids?.sort().join(",") || 
         props.filters?.byHostIds?.sort().join(",") || 
         "no-ids"}
      </div>
    </>
  );
};
const LazyHostTableMockRemote: React.LazyExoticComponent<
  React.ComponentType<any>
> | null = React.lazy(() => Promise.resolve({ default: HostsTableMock }));

const pom = new ClusterDetailsDrawerPom();

describe("<ClusterDetailsDrawer />", () => {
  beforeEach(() => {
    pom.interceptApis([pom.api.getClusterDetailSuccess]);
    cy.mount(
      <ClusterDetailsDrawer
        isOpen
        onHide={cy.stub().as("onHide")}
        cluster={clusterOne}
        __HostsTableRemote={LazyHostTableMockRemote}
      />,
    );
    pom.waitForApis();
  });
  it("should render component with basic cluster info", () => {
    pom.root.should("exist");
    pom.el.status.contains("Status");
    //pom.el.statusValue.contains(clusterOne.status!);
    pom.el.id.contains("Cluster ID");
    pom.el.idValue.contains(clusterOne.name!);
  });

  // TODO: skipped due to ITEP-22694, ITEP-22695
  xit("should show cluster's site info", () => {
    pom.el.site.contains("Site");
    // pom.el.siteValue.contains(`${clusterOne.locationList![0].locationInfo};`);
  });

  it("should render Cluster metadata", () => {
    pom.el.labels.contains("Cluster Labels");
    pom.labelsDisplay.root.should("be.exist");
  });

  it("should render host for a cluster", () => {
    pom.el.hosts.contains("Hosts");
    cy.get("[data-cy='test-uuid']").should(
      "have.text",
      [nodeOne.id, nodeTwo.id].sort().join(","),
    );
  });
});
