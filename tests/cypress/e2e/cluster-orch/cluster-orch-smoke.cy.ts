/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { RibbonPom, TablePom } from "@orch-ui/components";
import { NetworkLog } from "../../support/network-logs";
import InfraPom from "../infra/infraPom";
import ClusterOrchPom from "./cluster-orch.pom";

import {
  configureHostViaAPI,
  createRegionViaAPi,
  createSiteViaApi,
  deleteClusterViaApi,
  deleteRegionViaApi,
  deleteSiteViaApi,
  getHostsViaApi,
  isClusterCreateTestDataPresent,
  unconfigureHostViaApi,
} from "../../e2e/helpers";
import { CLUSTER_ORCH_USER, EIM_USER } from "../../support/utilities";
interface TestData {
  region: string;
  site: string;
  hostName: string;
  clusterName: string;
}

describe("Cluster orch Smoke test:", () => {
  const netLog = new NetworkLog();
  const infraPom = new InfraPom("eim");
  const tablePom = new TablePom();
  const ribbonPom = new RibbonPom("table");
  const clusterOrchPom = new ClusterOrchPom("cluster-orch");

  let activeProject: string;
  let data: TestData = {
    region: "",
    site: "",
    hostName: "",
    clusterName: "",
  };
  let regionId: string, siteId: string, hostId: string;
  let currentHost: infra.HostRead;
  const uuid = Cypress.env("EN_UUID");

  before(() => {
    const dataFile =
      Cypress.env("DATA_FILE") ||
      "./cypress/e2e/cluster-orch/data/cluster-orch-smoke.json";
    cy.readFile(dataFile, "utf-8").then((smokeData) => {
      if (!isClusterCreateTestDataPresent(data)) {
        throw new Error(
          `Invalid test data in ${dataFile}: ${JSON.stringify(data)}`,
        );
      }
      data = smokeData;
    });

    if (!Cypress.env("EN_UUID")) {
      throw new Error(
        "Please set the EN UUID via CYPRESS_EN_UUID environment variable",
      );
    }

    netLog.interceptAll(["**/v1/**", "**/v2/**", "**/v3/**"]);
  });

  afterEach(() => {
    netLog.save();
    netLog.clear();
  });

  describe("Cluster creation", () => {
    it("should setup the pre-requisites", () => {
      // pre-requisites to create cluster
      cy.login(EIM_USER);
      cy.visit("/");
      cy.currentProject().then((p) => {
        activeProject = p;

        createRegionViaAPi(activeProject, data.region).then((rid) => {
          regionId = rid;
          cy.log(`Created region ${data.region} with id ${regionId}`);
          createSiteViaApi(activeProject, regionId, data.site).then((sid) => {
            siteId = sid;
            cy.log(`Created site ${data.site} with id ${siteId}`);
          });
        });

        getHostsViaApi(activeProject).then((hostList) => {
          expect(hostList.length).to.be.greaterThan(0);
          currentHost = hostList.find((host) => host.uuid === uuid);
          hostId = currentHost.resourceId!;
          configureHostViaAPI(activeProject, data.hostName, hostId, siteId);
          cy.log(`Configured host with hostId ${hostId}`);
        });
      });
    });
    it("should create cluster", () => {
      cy.login(CLUSTER_ORCH_USER);
      cy.visit("/");

      cy.dataCy("header").contains("Infrastructure").click();
      cy.dataCy("hostsTable").should("be.visible");

      cy.dataCy("aside").contains("button", "Clusters").click();

      cy.dataCy("clusterList").should("be.visible");

      cy.waitForPageTransition();

      cy.intercept({
        method: "GET",
        url: "**/v2/**/templates?*",
      }).as("getTemplates");

      cy.contains("Create Cluster").should("be.visible").click();

      cy.waitForPageTransition();

      let defaultTemplateInfo = {
        name: "",
        version: "",
      };

      cy.wait("@getTemplates").then((interception) => {
        defaultTemplateInfo = interception.response?.body.defaultTemplateInfo;
        expect(interception.response?.statusCode).to.equal(200);
        expect(interception.response?.body).to.have.property(
          "defaultTemplateInfo",
        );

        clusterOrchPom.clusterCreationPom.fillSpecifyNameAndTemplates(
          data.clusterName,
          defaultTemplateInfo?.name,
          defaultTemplateInfo?.version,
        );

        clusterOrchPom.clusterCreationPom.el.nextBtn.click();
        infraPom.searchPom.el.textField.type(data.site);
        infraPom.regionSiteTreePom.selectSite(data.site);
        clusterOrchPom.clusterCreationPom.el.nextBtn.click();
        clusterOrchPom.clusterNodesSiteTablePom.el.rowSelectCheckbox.click();
        clusterOrchPom.clusterCreationPom.el.nextBtn.click();
        // FIXME: they key is not set resulting in an error while creating the cluster
        //
        // clusterOrchPom.clusterCreationPom.fillMetadata("color", "blue");
        clusterOrchPom.clusterCreationPom.el.nextBtn.click();
        clusterOrchPom.clusterCreationPom.el.nextBtn.click();

        // TODO check that the API response code is 200

        // On successful cluster creation (note that redirection takes 3 seconds)
        cy.url({ timeout: 4000 }).should("not.contain", "create");
        cy.url().should("contain", "infrastructure/clusters");
        ribbonPom.search(data.clusterName);
        tablePom.getCell(1, 1).should("be.visible");
      });
    });

    it("should validate the cluster is running", () => {
      cy.login(CLUSTER_ORCH_USER);
      cy.visit("/infrastructure/clusters");

      tablePom
        .getCell(1, 3, { timeout: 10 * 60 * 1000 }) // it can take up to 10 minutes for the cluster to be running
        .should(($el) => {
          expect($el, "Cluster status message").to.contain.text("active");
        });

      tablePom.getCell(1, 2).contains(data.clusterName).click();
      cy.url().should("contain", `/infrastructure/cluster/${data.clusterName}`);

      // TODO move in a POM
      cy.dataCy("icon-lifecyclePhase").should("contain.text", "active");
      cy.dataCy("icon-providerStatus").should("contain.text", "ready");
      cy.dataCy("icon-controlPlaneReady").should("contain.text", "ready");
      cy.dataCy("icon-nodeHealth").should("contain.text", "nodes are healthy");
    });

    it.skip("should check the cluster extensions are deployed", () => {
      cy.login(CLUSTER_ORCH_USER);
      cy.visit(`/infrastructure/cluster/${data.clusterName}`);

      // TODO move in a POM
      cy.contains("Deployment Instances").click();

      cy.dataCy("deploymentInstancesTable").within(() => {
        tablePom
          .getCell(1, 2, { timeout: 10 * 60 * 1000 }) // it can take up to 10 minutes for the deployment to be running
          .should(($el) => {
            expect($el, "Deployment status message").to.contain.text("ready");
          });
      });
    });

    it("should delete the cluster", () => {
      cy.login(CLUSTER_ORCH_USER);
      cy.visit("/infrastructure/clusters");
      cy.currentProject().then((activeProject) => {
        // TODO use UI to delete cluster
        if (data.clusterName) {
          deleteClusterViaApi(activeProject, data.clusterName);

          // check that the cluster is deleted
        }
      });
    });

    it("should remove the prerequisites", () => {
      // cleanup region and site
      cy.login(EIM_USER);
      cy.visit("/infrastructure/locations");
      cy.currentProject().then((activeProject) => {
        if (hostId) {
          unconfigureHostViaApi(activeProject, hostId);
        }
        if (siteId) {
          deleteSiteViaApi(activeProject, regionId, siteId);
        }
        if (regionId) {
          deleteRegionViaApi(activeProject, regionId);
        }
      });
    });
  });
});
