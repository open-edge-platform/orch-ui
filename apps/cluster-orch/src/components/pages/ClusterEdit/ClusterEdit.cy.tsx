/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { Table, TableColumn } from "@orch-ui/components";
import {
  clusterOneName,
  IRuntimeConfig,
  provisionedHostTwo,
} from "@orch-ui/utils";
import React from "react";
import ClusterTemplatesDropdownPom from "../../atom/ClusterTemplatesDropdown/ClusterTemplatesDropdown.pom";
import ClusterEdit from "./ClusterEdit";
import ClusterEditPom from "./ClusterEdit.pom";

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
      data={[provisionedHostTwo]}
      canSelectRows
      selectedIds={selectedHostIds}
      onSelect={(host, isSelected) => {
        onHostSelect(host, isSelected);
      }}
    />
  );
};

const pom = new ClusterEditPom();
describe("<ClusterEdit/>", () => {
  describe("When editing a cluster UI should", () => {
    const LazyHostTableMockRemote: React.LazyExoticComponent<
      React.ComponentType<any>
    > | null = React.lazy(() =>
      Promise.resolve({ default: HostTableRemoteMock }),
    );

    const clusterTemplateDropdownPom = new ClusterTemplatesDropdownPom();

    beforeEach(() => {
      const runtimeConfig: IRuntimeConfig = {
        AUTH: "",
        KC_CLIENT_ID: "",
        KC_REALM: "",
        KC_URL: "",
        SESSION_TIMEOUT: 0,
        OBSERVABILITY_URL: "",
        MFE: { CLUSTER_ORCH: "false", APP_ORCH: "false", FM: "false" },
        TITLE: "",
        API: {},
        DOCUMENTATION: [],
        VERSIONS: {},
      };
      pom.interceptApis([
        pom.api.getClusterSuccess,
        pom.api.firstHostSuccess,
        pom.api.siteSuccess,
      ]);
      clusterTemplateDropdownPom.interceptApis([
        clusterTemplateDropdownPom.api.getTemplatesSuccess,
      ]);

      cy.mount(<ClusterEdit HostsTableRemote={LazyHostTableMockRemote} />, {
        routerProps: {
          initialEntries: [`/infrastructure/cluster/${clusterOneName}/edit`],
        },
        routerRule: [
          {
            path: "/infrastructure/cluster/:clusterName/edit",
            element: <ClusterEdit HostsTableRemote={LazyHostTableMockRemote} />,
          },
        ],
        runtimeConfig,
      });
      pom.waitForApis();
      clusterTemplateDropdownPom.waitForApis();
    });

    it("load cluster information", () => {
      pom.root.should("exist");
      // check cluster name
      pom.el.name
        .invoke("attr", "placeholder")
        .should("eq", "restaurant-portland");

      // check cluster template name
      pom.clusterTemplateDropdown.selectDropdownValue(
        pom.clusterTemplateDropdown.root,
        "clusterTemplateDropdown",
        "5G Template1",
        "5G Template1",
      );
      // check cluster template version
      pom.clusterTemplateVersionDropdown.selectDropdownValue(
        pom.clusterTemplateVersionDropdown.root,
        "clusterTemplateVersionDropdown",
        "v1.0.1",
        "v1.0.1",
      );

      // TODO: check additional metadata flow ITEP-22694
      // pom.metadataForm.el.pair
      //   .eq(0)
      //   .children()
      //   .eq(0)
      //   .find("input")
      //   .invoke("attr", "value")
      //   .should("equal", "customer-one");
      // pom.metadataForm.el.pair
      //   .eq(1)
      //   .children()
      //   .eq(1)
      //   .find("input")
      //   .invoke("attr", "value")
      //   .should("equal", "value-two");
      // pom.metadataForm.el.pair.should("have.length", 2);
    });
    // TODO : ITEP-22694 Site information to be updated from labels
    it.skip("update cluster host after adding host", () => {
      // add new host
      pom.el.addHostBtn.click();
      pom.clusterNodeSelectDrawerPom.nodeTablePom.el.rowSelectCheckbox.click();
      pom.el.okBtn.click();

      pom.interceptApis([pom.api.putClusterNodesInClusterByName]);
      pom.el.saveBtn.click();
      pom.waitForApis();

      cy.get(`@${pom.api.putClusterNodesInClusterByName}`)
        .its("request.body")
        .should("deep.include", {
          nodes: [
            {
              id: "4c4c4544-0044-4210-8031-c2c04f305233",
              role: "worker",
            },
            {
              id: "4c4c4544-0056-4810-8053-b8c04f595233",
              role: "worker",
            },
            {
              id: "4c4c4544-0056-4810-8053-b8c04f595238",
              role: "all",
            },
          ],
        });
    });

    // TODO: update metadata
    // TODO: update template
    // TODO: update after removing node. Replace modal with orch-ui/component dialog
    it.skip("trigger remove host from cluster modal", () => {
      pom.el.removeHostBtn.eq(0).click();
      cy.get(".spark-modal-footer").contains("Remove").click();
      pom.confirmationDialog.el.confirmationModal.should("not.exist");
    });
  });
});
