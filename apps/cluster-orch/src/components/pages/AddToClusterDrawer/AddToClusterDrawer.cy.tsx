/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { clusterOne } from "@orch-ui/utils";
import AddToClusterDrawer from "./AddToClusterDrawer";
import AddToClusterDrawerPom, { hostOne } from "./AddToClusterDrawer.pom";

const pom = new AddToClusterDrawerPom();

// TODO: AddToClusterDrawer is to be removed
xdescribe("<AddToClusterDrawer/>", () => {
  it("should render component when api for dropdown fails", () => {
    cy.mount(
      <AddToClusterDrawer
        host={hostOne}
        isDrawerShown
        setHideDrawer={() => {}}
      />,
    );
    pom.waitForApis();
    pom.el.clusterDropdown.should("not.exist");
    pom.root.should("contain.text", "Unable to fetch Cluster List!");
  });

  it("should render component when api for cluster details fails", () => {
    pom.interceptApis([pom.api.getClusters]);
    cy.mount(
      <AddToClusterDrawer
        host={hostOne}
        isDrawerShown
        setHideDrawer={() => {}}
      />,
    );
    pom.waitForApis();
    pom.el.clusterDropdown.find(".spark-button").click();
    cy.get(".spark-list").contains(clusterOne.name!).click();
    pom.root.should("contain.text", "Unfortunately an error occurred");
  });

  it("should render component", () => {
    pom.interceptApis([pom.api.getClusters]);
    cy.mount(
      <AddToClusterDrawer
        host={hostOne}
        isDrawerShown
        setHideDrawer={() => {}}
      />,
    );
    pom.waitForApis();
    pom.el.clusterDropdown.find(".spark-button").click();

    pom.interceptApis([
      pom.api.getClusterById,
      pom.api.getHostById,
      pom.api.getSiteById,
    ]);
    cy.get(".spark-list").contains(clusterOne.name!).click();
    pom.waitForApis();

    pom.interceptApis([pom.api.putCluster]);
    pom.root.find(".spark-drawer-footer").contains("Add").click();
    pom.waitForApis();

    const expectedReqPayload = {
      nodeList: [
        {
          nodeGuid: "4c4c4544-0044-4210-8031-c2c04f305233",
          nodeRole: "worker",
        },
        {
          nodeGuid: "4c4c4544-0056-4810-8053-b8c04f595233",
          nodeRole: "worker",
        },
        {
          nodeGuid: "4c4c4544-0044-4210-8031-c2c04f305239",
          nodeRole: "worker",
        },
      ],
    };

    cy.get(`@${pom.api.putCluster}`)
      .its("request.body")
      .should("deep.equal", expectedReqPayload);
  });
});
