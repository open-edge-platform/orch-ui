/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm } from "@orch-ui/apis";
import {
  aggregateStatuses,
  ApiErrorPom,
  EmptyPom,
  RibbonPom,
} from "@orch-ui/components";
import {
  ClusterGenericStatuses,
  clusterToStatuses,
  IRuntimeConfig,
} from "@orch-ui/utils";
import { ClusterDetailPom } from "../../pages/ClusterDetail/ClusterDetail.pom";
import ClusterList from "./ClusterList";
import { ClusterListPom } from "./ClusterList.pom";

const runtimeConfig: IRuntimeConfig = {
  DOCUMENTATION: [],
  VERSIONS: {},
  AUTH: "",
  KC_CLIENT_ID: "",
  KC_REALM: "",
  KC_URL: "",
  SESSION_TIMEOUT: 0,
  OBSERVABILITY_URL: "",
  TITLE: "",
  MFE: { CLUSTER_ORCH: "false", APP_ORCH: "false", FM: "false" },
  API: {},
};

describe("<ClusterList />", () => {
  const pom = new ClusterListPom("clusterList");
  const apiErrorPom = new ApiErrorPom();
  const emptyPom = new EmptyPom();
  const clusterDetailPom = new ClusterDetailPom();
  const ribbonPom = new RibbonPom("table");
  const clusterList: ecm.GetV1ProjectsByProjectNameClustersApiResponse =
    pom.getDetailOfApi(pom.api.clusterListSuccess, "response");
  const clusterListNoLocationInfo: ecm.GetV1ProjectsByProjectNameClustersApiResponse =
    pom.getDetailOfApi(pom.api.clusterListNoLocationInfo, "response");
  describe("when the API are responding correctly should", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.clusterListSuccess]);
      cy.mount(<ClusterList hasPermission={true} />, { runtimeConfig });
      pom.waitForApis();
      pom.table
        .getRows()
        .should("have.length", clusterList.clusterInfoList!.length);
    });
    it("render a list of clusters", () => {
      clusterList.clusterInfoList!.forEach((c) => {
        pom.root.contains(c.name!);
        // Check Status
        const statusMessage = aggregateStatuses<ClusterGenericStatuses>(
          clusterToStatuses(c),
          "lifecyclePhase",
        ).message;
        pom.root.contains(statusMessage);

        // Check Node Quantity
        if (c.nodeQuantity && c.nodeQuantity === 1) {
          pom.root.contains("1 Host");
        } else {
          pom.root.contains(`${c.nodeQuantity} Hosts`);
        }

        // Check Site
        if (
          c.locationList &&
          c.locationList[0].locationType === "LOCATION_TYPE_SITE_NAME"
        ) {
          pom.root.contains("restaurant-one");
        }
      });
      // Check popup action
      pom.selectPopupOption(
        clusterList.clusterInfoList![0].name!,
        "View Details",
      );
      cy.get("#pathname").contains(
        `/cluster/${clusterList.clusterInfoList![0].name}`,
      );
    });
    it("delete a cluster", () => {
      pom.selectPopupOption(clusterList.clusterInfoList![0].name!, "Delete");
      pom.interceptApis([pom.api.deleteCluster]);
      cy.get(".spark-modal-footer").contains("Delete").click();
      pom.waitForApis();
      cy.get(`@${pom.api.deleteCluster}`)
        .its("request.url")
        .then((url) => {
          const match = url.match(clusterList.clusterInfoList![0].name);
          expect(match && match.length > 0).to.eq(true);
        });
    });
    describe("page size ", () => {
      it("should load default page size 10", () => {
        cy.get(`@${pom.api.clusterListSuccess}`)
          .its("request.url")
          .then((url: string) => {
            const match = url.match(/pageSize=10/);
            // eslint-disable-next-line no-unused-expressions
            expect(match && match.length > 0).to.be.true;
          });
      });
      it("should change page size to 100", () => {
        // Change Page
        pom.interceptApis([pom.api.clusterListSuccess]);
        pom.table.root
          .find("[data-testid='pagination-control-pagesize']")
          .find(".spark-icon-chevron-down")
          .click();
        cy.get(".spark-popover .spark-list-item").contains("100").click();
        pom.waitForApis();
        cy.get(`@${pom.api.clusterListSuccess}`)
          .its("request.url")
          .then((url: string) => {
            const match = url.match(/pageSize=100/);
            // eslint-disable-next-line no-unused-expressions
            expect(match && match.length > 0).to.be.true;
          });
      });
    });
  });
  describe("when the API are responding error should", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.clusterListEmpty]);
    });
    it("return the error", () => {
      pom.interceptApis([pom.api.clusterListError500]);
      cy.mount(<ClusterList />);
      pom.waitForApis();
      apiErrorPom.root.should("be.visible");
    });
  });
  describe("when the API responds with no locationInfo", () => {
    it("renders", () => {
      pom.interceptApis([pom.api.clusterListNoLocationInfo]);
      cy.mount(<ClusterList />, { runtimeConfig });
      pom.waitForApis();
      pom.table
        .getRows()
        .should(
          "have.length",
          clusterListNoLocationInfo.clusterInfoList!.length,
        );
    });
  });
  describe("ClusterList exapandable list should", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.clusterListSuccess]);
      clusterDetailPom.interceptApis([clusterDetailPom.api.getClusterSuccess]);
    });
    it("should open and close row", () => {
      cy.mount(<ClusterList />, { runtimeConfig });
      pom.waitForApi([pom.api.clusterListSuccess]);
      pom.table.getRows().should("have.length", 2);
      pom.table.expandRow(0);
      clusterDetailPom.waitForApi([clusterDetailPom.api.getClusterSuccess]);
      pom.root.should("contain", "Operating System");
      pom.root.should("contain", "Readiness");
      pom.table.expandRow(0);
      cy.get(".cluster-nodes-table .table-row").should("have.length", 2);
    });
  });

  describe("ClusterListTable status should ", () => {
    it("handle empty", () => {
      pom.interceptApis([pom.api.clusterListEmpty]);
      cy.mount(<ClusterList />);
      pom.waitForApis();
      emptyPom.root.should("be.visible");
      emptyPom.el.emptyTitle.should(
        "have.text",
        "Create a cluster using one or more configured hosts.",
      );
      emptyPom.el.emptyIcon
        .should("have.attr", "class")
        .and("contain", "document-gear");
    });

    it("handle loading", () => {
      pom.interceptApis([pom.api.clusterListEmpty]);
      cy.mount(<ClusterList />);
      cy.get(".spark-shimmer").should("be.visible");

      cy.get(".spark-shimmer").should("exist");
      pom.waitForApis();
      cy.get(".spark-shimmer").should("not.exist");
    });

    it("handle 500 error", () => {
      pom.interceptApis([pom.api.clusterListError500]);
      cy.mount(<ClusterList />);
      pom.waitForApis();
      apiErrorPom.root.should("be.visible");
    });

    it("display table when data is loaded", () => {
      pom.interceptApis([pom.api.clusterListSuccess]);
      cy.mount(<ClusterList />);
      pom.waitForApis();
      pom.root.should("be.visible");
    });
  });

  describe("pagination and filter should", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.clusterListSuccess]);
      cy.mount(<ClusterList />);
      pom.waitForApis();
    });
    it("check default sorting as cluster name", () => {
      cy.get(".caret-up-select")
        .parents(".table-header-cell")
        .should("contain.text", "Cluster Name");
    });
    it("pass search value to GET request", () => {
      pom.interceptApis([pom.api.clusterListWithFilter]);
      ribbonPom.el.search.type("testing");
      pom.waitForApis();
    });
    it("pass page value to GET request", () => {
      pom.interceptApis([pom.api.clusterListWithOffset]);
      cy.get(".spark-pagination-list").contains(2).click();
      pom.waitForApis();
    });
  });
});
