/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog, eim } from "@orch-ui/apis";
import { DeploymentDetailsPom } from "@orch-ui/app-orch-poms";
import { RibbonPom, TablePom } from "@orch-ui/components";
import {
  APP_ORCH_READWRITE_USER,
  EIM_USER,
} from "tests/cypress/support/utilities";
import { NetworkLog } from "../../support/network-logs";
import {
  createApplicationViaApi,
  createDeploymentPackageViaApi,
  createRegistryViaApi,
  deleteApplicationViaApi,
  deleteDeploymentPackageViaApi,
  deleteRegistryViaApi,
  getDeploymentsMFETab,
  getSidebarTabByName,
  isApplicationProfileTestDataPresent,
  isApplicationTestDataPresent,
  isClusterCreateTestDataPresent,
  isDeploymentPackageTestDataPresent,
  isDeploymentTestDataPresent,
  isRegistryChartTestDataPresent,
  isRegistryTestDataPresent,
  TestData,
} from "../helpers/app-orch";
import {
  createClusterViaApi,
  deleteClusterViaApi,
  getClusterTemplatesViaApi,
} from "../helpers/cluster-orch";
import {
  configureHostViaAPI,
  createRegionViaAPi,
  createSiteViaApi,
  deleteRegionViaApi,
  deleteSiteViaApi,
  getHostsViaApi,
  unconfigureHostViaApi,
} from "../helpers/eim";
import AppOrchPom from "./app-orch-smoke.pom";

const pom = new AppOrchPom("appOrchLayout");
const deploymentDetailsPom = new DeploymentDetailsPom();
const tablePom = new TablePom();
const ribbonPom = new RibbonPom("table");
describe("APP_ORCH E2E: Deployments Smoke tests", () => {
  const netLog = new NetworkLog();
  let testData: TestData;
  let registry: Partial<catalog.Registry>;
  let application: catalog.Application;
  let deploymentPackage: catalog.DeploymentPackage;
  let deploymentPackageDisplayName: string;
  let deploymentDisplayName: string;
  let regionId: string, siteId: string, hostId: string;
  let currentHost: eim.HostRead;
  let uuid: string;

  /** Get to Applications SidebarTab */
  const initPageByUser = (user = APP_ORCH_READWRITE_USER) => {
    netLog.interceptAll(["**/v1/**", "**/v3/**"]);
    cy.login(user);
    cy.visit("/");
    getDeploymentsMFETab().click();
  };

  before(() => {
    const dataFile =
      Cypress.env("DATA_FILE") ||
      "./cypress/e2e/app-orch/data/app-orch-smoke.json";
    cy.readFile(dataFile, "utf-8").then((data) => {
      if (
        // Registry related test-data
        !isRegistryTestDataPresent(data) ||
        !isRegistryChartTestDataPresent(data) ||
        // Application related test-data
        !isApplicationTestDataPresent(data) ||
        !isApplicationProfileTestDataPresent(data) ||
        // Deployment Package related test-data
        !isDeploymentPackageTestDataPresent(data) ||
        // Deployment related test-data
        !isDeploymentTestDataPresent(data) ||
        !isClusterCreateTestDataPresent(data)
      ) {
        throw new Error(
          "Require valid: registry, registryChart, application, deploymentPackage & deployments\n" +
            `Invalid test data in ${dataFile}: ${JSON.stringify(data)}`,
        );
      }
      testData = data;
      deploymentPackageDisplayName = testData.deploymentPackage.displayName!;
      deploymentDisplayName = testData.deployments.displayName!;
    });

    uuid = Cypress.env("EN_UUID");
    if (!Cypress.env("EN_UUID")) {
      throw new Error(
        "Please set the EN UUID via CYPRESS_EN_UUID environment variable",
      );
    }
  });

  afterEach(() => {
    netLog.save();
    netLog.clear();
  });

  describe(`the ${EIM_USER.username}`, () => {
    it("should setup the Infra pre-requisites", () => {
      // pre-requisites to create cluster
      cy.login(EIM_USER);
      cy.visit("/");
      cy.currentProject().then((activeProject) => {
        // creating region
        createRegionViaAPi(activeProject, testData.region).then(
          (regionResourceId) => {
            regionId = regionResourceId;
            cy.log(`ResourceId of the region created ${regionId}`);
            // Creating site
            createSiteViaApi(activeProject, regionId, testData.site).then(
              (siteResourceId) => {
                siteId = siteResourceId;
                cy.log(`ResourceId of the region created ${siteId}`);
              },
            );
          },
        );

        // configuring the host with previosly created region and site
        getHostsViaApi(activeProject, uuid).then((hostList) => {
          expect(hostList.length).to.be.greaterThan(0);
          currentHost = hostList[0]; // as the host is fetched by uuid, there can be only 1 host
          hostId = currentHost.resourceId!;
          configureHostViaAPI(activeProject, testData.hostName, hostId, siteId);
          cy.log(`Configured host with hostId ${hostId}`);
        });
      });
    });
  });

  describe(`the ${APP_ORCH_READWRITE_USER.username}`, () => {
    beforeEach(() => {
      initPageByUser();
      getSidebarTabByName("Deployments").click();
    });

    it("should setup edge manager pre-requisites", () => {
      cy.currentProject().then((activeProject) => {
        const testRegistry = testData.registry;
        const testApp = testData.application;

        if (testRegistry) {
          createRegistryViaApi(activeProject, testRegistry).then((reg) => {
            registry = reg;
            cy.log(`Registry created with registry name ${registry.name}`);
          });
        }

        // Creating application
        createApplicationViaApi(activeProject, testApp).then((app) => {
          application = app;
          cy.log(
            `Application created with application name ${application.name}`,
          );
        });

        // Creating deployment package
        createDeploymentPackageViaApi(
          activeProject,
          testData.deploymentPackage,
        ).then((app) => {
          deploymentPackage = app;
          cy.log(
            `Deployment package created with  name ${deploymentPackage.name}`,
          );
        });

        getClusterTemplatesViaApi(activeProject).then((templates) => {
          let defaultTemplateInfo = {
            name: "",
            version: "",
          };
          expect(templates).to.have.property("defaultTemplateInfo");
          defaultTemplateInfo = templates.defaultTemplateInfo;
          // creating cluster
          const cluster = testData.cluster;
          cluster.template = `${defaultTemplateInfo.name}-${defaultTemplateInfo.version}`;
          cluster.nodes.push({
            id: uuid,
            role: "all",
          });
          createClusterViaApi(activeProject, cluster).then(() => {
            cy.log(`Cluster is created with cluster name ${cluster.name}`);
        });
      });
    });

    it("should create a deployment", () => {
      pom.navigateToAddDeployment();

      // Fill Setup Deployment Flow
      pom.addDeployment(testData.deployments, deploymentPackageDisplayName);
    });

    it("should validate the deployment is created", () => {
      pom.deploymentsPom.deploymentTablePom.tablePom
        .getRows()
        .contains(deploymentPackageDisplayName);

      // should display status `Deploying` initially
      pom.deploymentsPom.deploymentTablePom.tableUtils
        .getRowBySearchText(deploymentDisplayName)
        .find(".table-row-cell")
        .eq(1)
        .contains("Deploying", { timeout: 2 * 60 * 1000 })
        .should("contain.text", "Deploying");

      // should display status `Running` once the deployment is successully running
      pom.deploymentsPom.deploymentTablePom.tableUtils
        .getRowBySearchText(deploymentDisplayName)
        .find(".table-row-cell")
        .eq(1)
        .contains("Running", { timeout: 10 * 60 * 1000 }) // waiting for status change to Running
        .should("contain.text", "Running");

      // As 1 host is part of the cluster its expected to be 1/1 when deployment is running
      pom.deploymentsPom.deploymentTablePom.tableUtils
        .getRowBySearchText(deploymentDisplayName)
        .find(".table-row-cell")
        .eq(2)
        .should("contain.text", "1/1");

      pom.deploymentsPom.deploymentTablePom.tableUtils
        .getRowBySearchText(deploymentDisplayName)
        .find(".table-row-cell")
        .eq(3)
        .should("contain.text", deploymentPackageDisplayName);

      pom.deploymentsPom.deploymentTablePom.tableUtils
        .getRowBySearchText(deploymentDisplayName)
        .find(".table-row-cell")
        .eq(4)
        .should("contain.text", testData.deploymentPackage.version);

      pom.deploymentsPom.deploymentTablePom.tableUtils
        .getRowBySearchText(deploymentDisplayName)
        .find("a")
        .click();

      cy.url({ timeout: 5000 }).should("contain", "applications/deployment/");
      deploymentDetailsPom.el.deploymentDetailsHeader.should("exist", {
        timeout: 2 * 60 * 1000,
      });
      deploymentDetailsPom.el.deploymentDetailsHeader.should(
        "contain.text",
        deploymentDisplayName,
      );

      deploymentDetailsPom.el.deploymentDetailsHeader.should(
        "contain.text",
        deploymentDisplayName,
      );
    });

    it("should see delete entry", () => {
      pom.removeDeployment(deploymentDisplayName);
      pom.deploymentsPom.root.should("not.contain.text", deploymentDisplayName);
    });

    // cleanup
    it("should delete edge manager pre-requisites", () => {
      cy.currentProject().then((project) => {
        if (registry.name) {
          deleteRegistryViaApi(project, registry.name);
        }
        if (testData.cluster.name) {
          deleteClusterViaApi(project, testData.cluster.name);
        }
        if (
          deploymentPackageDisplayName &&
          testData.deploymentPackage.version
        ) {
          deleteDeploymentPackageViaApi(
            project,
            deploymentPackageDisplayName,
            testData.deploymentPackage.version,
          );
        }
        if (testData.application.displayName && testData.application.version) {
          deleteApplicationViaApi(
            project,
            testData.application.displayName!,
            testData.application.version!,
          );
        }
      });
    });
  });

  // cleanup
  describe(`the ${EIM_USER.username}`, () => {
    it("should delete infra pre-requisites", () => {
      cy.login(EIM_USER);
      cy.visit("/");
      cy.currentProject().then((project) => {
        if (hostId) {
          unconfigureHostViaApi(project, hostId);
        }

        if (regionId && siteId) {
          deleteSiteViaApi(project, regionId, siteId);
        }

        if (regionId) {
          deleteRegionViaApi(project, regionId);
        }
      });
    });
  });
});
