/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { RibbonPom, TablePom } from "@orch-ui/components";
import { NetworkLog } from "../../support/network-logs";
import EimPom from "../eim/eimPom";
import ClusterOrchPom from "./cluster-orch.pom";

import { eim } from "@orch-ui/apis";
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
  const eimPom = new EimPom("eim");
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
  let currentHost: eim.HostRead;
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
  });

  beforeEach(() => {
    netLog.intercept("**/v1/**");
  });

  afterEach(() => {
    netLog.save();
    netLog.clear();
  });

  describe(`${EIM_USER.username}`, () => {
    beforeEach(() => {
      cy.login(EIM_USER);
      cy.visit("/");
      cy.currentProject().then((p) => (activeProject = p));
    });

    it("should create region/site and configure a host", () => {
      // pre-requisites to create cluster
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

  describe(`${CLUSTER_ORCH_USER.username}`, () => {
    beforeEach(() => {
      cy.login(CLUSTER_ORCH_USER);
      cy.visit("/");
      cy.currentProject().then((p) => (activeProject = p));
    });

    it("should create cluster", () => {
      cy.dataCy("header").contains("Infrastructure").click();
      cy.dataCy("hostsTable").should("be.visible");

      cy.dataCy("aside").contains("button", "Clusters").click();

      cy.dataCy("clusterList").should("be.visible");

      cy.dataCy("emptyActionBtn")
        .contains("Create Cluster")
        .should("be.visible")
        .click();

      cy.intercept({
        method: "GET",
        url: "**/v1/**/templates?*",
      }).as("getTemplates");

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
        eimPom.searchPom.el.textField.type(data.site);
        eimPom.regionSiteTreePom.selectSite(data.site);
        clusterOrchPom.clusterCreationPom.el.nextBtn.click();
        clusterOrchPom.clusterNodesTableBySitePom.el.rowSelectCheckbox.click();
        clusterOrchPom.clusterCreationPom.el.nextBtn.click();
        clusterOrchPom.clusterCreationPom.fillMetadata("key", "test-value");
        clusterOrchPom.clusterCreationPom.el.nextBtn.click();
        clusterOrchPom.clusterCreationPom.el.nextBtn.click();

        // On successful cluster creation
        cy.url().should("contain", "infrastructure/clusters");
        ribbonPom.el.search.type(data.clusterName);
        cy.contains(data.clusterName).should("be.visible");
        tablePom.getCell(1, 5).should("contain.text", data.site);
      });
    });

    after(() => {
      if (data.clusterName) {
        deleteClusterViaApi(activeProject, data.clusterName);
      }
    });
  });

  describe(`${EIM_USER.username}`, () => {
    before(() => {
      cy.login(EIM_USER);
      cy.visit("/");
      cy.currentProject().then((p) => (activeProject = p));
    });

    after(() => {
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

    it("should cleanup locations test data", () => {
      cy.dataCy("header").contains("Infrastructure").click();
    });
  });
});
