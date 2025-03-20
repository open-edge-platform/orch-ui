/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { Table, TableColumn } from "@orch-ui/components";
import { assignedHosts } from "@orch-ui/utils";
import React from "react";
import { setupStore } from "../../../../../store";
import ClusterNodesTableBySite from "./ClusterNodesTableBySite";
import ClusterNodesSiteTablePom from "./ClusterNodesTableBySite.pom";

const pom = new ClusterNodesSiteTablePom();

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
      data={[assignedHosts]}
      canSelectRows
      selectedIds={selectedHostIds}
      onSelect={(host, isSelected) => {
        onHostSelect(host, isSelected);
      }}
    />
  );
};

const store = setupStore({
  locations: [
    {
      locationType: "LOCATION_TYPE_REGION_NAME",
      locationInfo: "Oregon",
    },
    {
      locationType: "LOCATION_TYPE_REGION_ID",
      locationInfo: "region-portland",
    },
    {
      locationType: "LOCATION_TYPE_SITE_ID",
      locationInfo: "site-portland",
    },
    {
      locationType: "LOCATION_TYPE_SITE_NAME",
      locationInfo: "Portland",
    },
  ],
});
const mockSite: eim.SiteRead = {
  resourceId: "site-a",
  name: "Site A",
  region: {
    resourceId: "region-a",
    name: "Region A",
    metadata: [{ key: "region", value: "Region a" }],
  },
  inheritedMetadata: {
    location: [{ key: "region", value: "Region a" }],
  },
  metadata: [{ key: "site", value: "Site a" }],
};

describe("<ClusterNodesTableBySite />", () => {
  const LazyHostTableMockRemote: React.LazyExoticComponent<
    React.ComponentType<any>
  > | null = React.lazy(() =>
    Promise.resolve({ default: HostTableRemoteMock }),
  );

  beforeEach(() => {
    cy.mount(
      <ClusterNodesTableBySite
        site={mockSite}
        onNodeSelection={cy.stub().as("storeSelectedHost")}
        HostsTableRemote={LazyHostTableMockRemote}
      />,
      {
        reduxStore: store,
      },
    );
  });

  it("should render component", () => {
    pom.root.should("exist");
  });

  describe("select roles column in table", () => {
    it("should render Role selection component in table column", () => {
      pom.nodeRoleDropdown.root.should("exist");
      //Default selected value will be All
      pom.nodeRoleDropdown.roleDropdownPom
        .getDropdown("roleDropdown")
        .should("have.text", "All");
      // Selecting worker option from dropdown
      pom.nodeRoleDropdown.roleDropdownPom.selectDropdownValue(
        pom.nodeRoleDropdown.root,
        "role",
        "worker",
        "worker",
      );
      pom.nodeRoleDropdown.roleDropdownPom
        .getDropdown("roleDropdown")
        .should("have.text", "Worker");
    });

    it("should see if check box toggle check will enable dropdown selection - not disabled in same node row", () => {
      pom.nodeRoleDropdown.roleDropdownPom.root.should(
        "have.class",
        "spark-dropdown-is-disabled",
      );
      pom.el.rowSelectCheckbox.click();
      pom.nodeRoleDropdown.roleDropdownPom.root.should(
        "not.have.class",
        "spark-dropdown-is-disabled",
      );
    });
    it("should render options in roles dropdown", () => {
      pom.el.rowSelectCheckbox.click();
      pom.nodeRoleDropdown.roleDropdownPom.openDropdown(
        pom.nodeRoleDropdown.root,
      );
      pom.nodeRoleDropdown.roleDropdownPom.selectDropdownValue(
        pom.nodeRoleDropdown.root,
        "role",
        "all",
        "all",
      );

      pom.nodeRoleDropdown.roleDropdownPom.openDropdown(
        pom.nodeRoleDropdown.root,
      );
      pom.nodeRoleDropdown.roleDropdownPom.selectDropdownValue(
        pom.nodeRoleDropdown.root,
        "role",
        "worker",
        "worker",
      );

      pom.nodeRoleDropdown.roleDropdownPom.openDropdown(
        pom.nodeRoleDropdown.root,
      );
      pom.nodeRoleDropdown.roleDropdownPom.selectDropdownValue(
        pom.nodeRoleDropdown.root,
        "role",
        "controlplane",
        "controlplane",
      );

      pom.nodeRoleDropdown.root.should("exist");
    });
  });

  describe("when a host is preselected", () => {
    it("should render preselection", () => {
      const mountConfig = {
        reduxStore: setupStore(),
        routerProps: {
          initialEntries: ["/component?hostId=host-dh38bjw9"],
        },
        routerRule: [
          {
            path: "/component",
            search: "?hostId=host-dh38bjw9",
            element: (
              <ClusterNodesTableBySite
                site={mockSite}
                onNodeSelection={cy.stub().as("storeSelectedHost")}
                HostsTableRemote={LazyHostTableMockRemote}
              />
            ),
          },
        ],
      };

      cy.mount(
        <ClusterNodesTableBySite
          site={mockSite}
          onNodeSelection={cy.stub().as("storeSelectedHost")}
          HostsTableRemote={LazyHostTableMockRemote}
        />,
        mountConfig,
      );

      pom.nodeRoleDropdown.roleDropdownPom.root.should(
        "not.have.class",
        "spark-dropdown-is-disabled",
      );
    });
  });
});
