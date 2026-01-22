/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { aggregateStatuses, ApiErrorPom } from "@orch-ui/components";
import { cyGet } from "@orch-ui/tests";
import {
  ClusterGenericStatuses,
  clusterToStatuses,
  IRuntimeConfig,
} from "@orch-ui/utils";
import moment from "moment";
import ClusterDetail from "./ClusterDetail";
import { ClusterDetailPom } from "./ClusterDetail.pom";

const pom = new ClusterDetailPom();
const apiErrorPom = new ApiErrorPom();

const runtimeConfig: IRuntimeConfig = {
  AUTH: "",
  KC_CLIENT_ID: "",
  KC_REALM: "",
  KC_URL: "",
  SESSION_TIMEOUT: 0,
  OBSERVABILITY_URL: "",
  MFE: { CLUSTER_ORCH: "false", APP_ORCH: "true" },
  TITLE: "",
  API: {},
  DOCUMENTATION: [],
  VERSIONS: {},
};

describe("<ClusterDetail />", () => {
  describe("when the APIs are responding correctly", () => {
    const inheritedMetadataCount =
      (pom.testSite.metadata?.length ?? 0) +
      (pom.testSite.inheritedMetadata?.location?.length ?? 0);

    beforeEach(() => {
      pom.interceptApis([
        pom.api.getClusterSuccess,
        pom.api.getFirstHostData,
        pom.api.getSiteData,
      ]);

      cy.mount(<ClusterDetail />, {
        routerProps: { initialEntries: [`/cluster/${pom.testClusterId}`] },
        routerRule: [
          { path: "/cluster/:clusterName", element: <ClusterDetail /> },
        ],
        runtimeConfig,
      });
      pom.waitForApis();
    });

    it("should render cluster detail heading", () => {
      pom.el.clusterDetailHeading.should("have.text", pom.testCluster.name);
      pom.el.clusterDetailStatus.should(
        "contain.text",
        aggregateStatuses<ClusterGenericStatuses>(
          clusterToStatuses(pom.testCluster),
          "lifecyclePhase",
        ).message,
      );
    });

    it("should render 'Last Change' column when showTimestamp is true", () => {
      const timestamp = pom.testCluster.providerStatus?.timestamp as number;
      const expectedDate = moment(new Date(timestamp * 1000)).format(
        "MMM DD, YYYY",
      );
      cyGet("timestamp-lifecyclePhase").should("contain", expectedDate);
      cyGet("timestamp-lifecyclePhase").should("exist");
      cyGet("last-change").should("exist");
      cyGet("last-change").contains("Last Change");
    });

    it("should delete a cluster", () => {
      pom.el.clusterDetailPopup.click().as("popup");
      cy.get("@popup").contains("Delete").click();

      pom.interceptApis([pom.api.deleteCluster]);
      cy.get(".spark-modal-footer").contains("Delete").click();
      pom.waitForApis();
      cy.get(`@${pom.api.deleteCluster}`)
        .its("request.url")
        .then((url) => {
          const match = url.match(pom.testCluster.name);
          expect(match && match.length > 0).to.eq(true);
        });
    });

    it("should have option download and copy", () => {
      pom.el.clusterDetailPopup.click().as("popup");
      cy.get("@popup").contains("Download Kubeconfig");
      cy.get("@popup").contains("Copy Kubeconfig");
    });

    it("should render cluster general details", () => {
      pom
        .getGeneralInfoValueByKey("Cluster ID")
        .should("have.text", pom.testCluster.name);
      pom
        .getGeneralInfoValueByKey("Kubernetes version")
        .should("have.text", pom.testCluster.kubernetesVersion);
      pom
        .getGeneralInfoValueByKey("Region")
        .should("have.text", "region-portland");
      pom
        .getGeneralInfoValueByKey("Trusted Compute")
        .should("contain.text", "Not compatible");
      pom.getGeneralInfoValueByKey("Site").should("have.text", "Restaurant 01");
    });

    it("should render all deployment metadata", () => {
      pom.deploymentMetadataPom
        .getAll()
        .should("have.length", inheritedMetadataCount + 7); // TODO metadata to filtered in API response
    });

    it("should show Deployment Instances", () => {
      pom.deploymentInstancesTablePom.interceptApis([
        pom.deploymentInstancesTablePom.api.getDeploymentInstances200,
      ]);
      pom.gotoTab("Deployment Instances");
      pom.deploymentInstancesTablePom.root.should("exist");
    });
  });

  describe("when the API are responding error", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getClusterError]);
      cy.mount(<ClusterDetail />, {
        routerProps: { initialEntries: [`/cluster/${pom.testClusterId}`] },
        routerRule: [
          { path: "/cluster/:clusterName", element: <ClusterDetail /> },
        ],
        runtimeConfig,
      });
      pom.waitForApis();
    });
    it("should return the error", () => {
      apiErrorPom.root.should("be.visible");
    });
  });
});
