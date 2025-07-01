/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { AddHostsFormPom, RegisterHostsPom } from "@orch-ui/infra-poms";
import { SiDropdown } from "@orch-ui/poms";
import { EIM_USER } from "@orch-ui/tests";
import {
  clusterTemplateOneName,
  clusterTemplateOneV1Info,
} from "@orch-ui/utils";
import ClusterTemplateDropdownPom from "../../../../apps/cluster-orch/src/components/atom/ClusterTemplatesDropdown/ClusterTemplatesDropdown.pom";
import LocationAutocompletePom from "../../../../apps/infra/src/components/molecules/LocationAutocomplete/LocationAutocomplete.pom";
import OsProfileDropdownPom from "../../../../apps/infra/src/components/organism/OsProfileDropdown/OsProfileDropdown.pom";
import HostProvisionPom from "../../../../apps/infra/src/components/pages/HostProvision/HostProvision.pom";
import { NetworkLog } from "../../support/network-logs";
import { createRegionViaAPi, createSiteViaApi } from "../helpers";
import {
  isTestProvisionHostData,
  TestProvisionHostData,
} from "../helpers/eimTestProvisionHostData";
import { sessionKey, sessionValue } from "./test";

describe(`Infra smoke: the ${EIM_USER.username}`, () => {
  const netLog = new NetworkLog();
  const addHostsFormPom = new AddHostsFormPom();
  const registerHostsPom = new RegisterHostsPom();
  const osProfileDropdownPom = new OsProfileDropdownPom();
  const clusterTemplateDropdownPom = new ClusterTemplateDropdownPom();
  const clusterTemplateDropdown = new SiDropdown("clusterTemplateDropdown");
  const clusterTemplateVersionDropdown = new SiDropdown(
    "clusterTemplateVersionDropdown",
  );
  const locationAutocompletePom = new LocationAutocompletePom();
  const hostProvisionPom = new HostProvisionPom();

  let testProvisionHostData: TestProvisionHostData,
    serialNumber: string,
    activeProject: string,
    regionId: string,
    siteId: string,
    provisionedHosts: string[] = [],
    instanceHosts: string[] = [];

  before(() => {
    const provisionHostDataFile =
      "./cypress/e2e/infra/data/provision-host.json";
    cy.readFile(provisionHostDataFile, "utf-8").then((data) => {
      if (!isTestProvisionHostData(data)) {
        throw new Error(
          `Invalid test data in ${provisionHostDataFile}: ${JSON.stringify(data)}`,
        );
      }
      testProvisionHostData = data;

      serialNumber = Cypress.env("EN_SERIAL_NUMBER");
      if (serialNumber) {
        testProvisionHostData.hosts = [testProvisionHostData.hosts[0]];
        testProvisionHostData.hosts[0].serialNumber = serialNumber;
      }
    });
  });

  describe("K3s Provisioning Flow", () => {
    beforeEach(() => {
      netLog.intercept();

      // cy.login(EIM_USER);

      cy.window().then((window) => {
        window.sessionStorage.setItem(sessionKey, sessionValue);
        cy.reload();

        cy.visit("/");
        cy.currentProject().then((p) => (activeProject = p));
      });
    });

    it("should go through the K3s Provisioning Flow", () => {
      cy.viewport(1920, 1080);

      cy.intercept({
        method: "POST",
        url: `/v1/projects/${activeProject}/compute/hosts/register`,
      }).as("registerHost");

      cy.intercept({
        method: "PATCH",
        url: `/v1/projects/${activeProject}/compute/hosts/host-*`,
      }).as("updateHost");

      cy.intercept({
        method: "POST",
        url: `/v1/projects/${activeProject}/compute/instances`,
      }).as("createInstance");

      cy.intercept({
        method: "POST",
        url: `/v2/projects/${activeProject}/clusters`,
      }).as("createCluster");

      cy.intercept({
        method: "GET",
        url: `/v1/projects/${activeProject}/locations`,
      }).as("getLocations");

      osProfileDropdownPom.interceptApis([
        osProfileDropdownPom.api.getOSResources,
      ]);

      clusterTemplateDropdownPom.interceptApis([
        clusterTemplateDropdownPom.api.getTemplatesSuccess,
      ]);

      createRegionViaAPi(activeProject, testProvisionHostData.region).then(
        (rid) => {
          regionId = rid;
          cy.log(
            `Created region ${testProvisionHostData.region} with id ${regionId}`,
          );
          createSiteViaApi(
            activeProject,
            regionId,
            testProvisionHostData.site,
          ).then((sid) => {
            siteId = sid;
            cy.log(
              `Created site ${testProvisionHostData.site} with id ${siteId}`,
            );
          });
        },
      );

      cy.dataCy("header").contains("Infrastructure").click();
      cy.dataCy("aside", { timeout: 10 * 1000 })
        .contains("button", "Hosts")
        .click();
      cy.dataCy("registerHosts").click();

      const host = testProvisionHostData.hosts[0];

      addHostsFormPom.newHostNamePom.root
        .should("be.visible")
        .type(host.name, { force: true });
      addHostsFormPom.newSerialNumberPom.root
        .should("be.visible")
        .type(host.serialNumber);

      registerHostsPom.el.nextButton.click();

      locationAutocompletePom.combobox.type("c");
      cy.wait(1000);
      locationAutocompletePom.combobox.type("y");
      // locationAutocompletePom.combobox.select("California | los angeles");
      cy.get(".spark-popover").contains("California | los angeles").click();

      osProfileDropdownPom.dropdown.openDropdown(osProfileDropdownPom.root);
      osProfileDropdownPom.dropdown.selectFirstListItemValue();

      clusterTemplateDropdown.selectDropdownValue(
        clusterTemplateDropdown.root,
        "clusterTemplateDropdown",
        clusterTemplateOneName,
        clusterTemplateOneName,
      );
      clusterTemplateVersionDropdown.selectDropdownValue(
        clusterTemplateVersionDropdown.root,
        "clusterTemplateVersionDropdown",
        clusterTemplateOneV1Info.version,
        clusterTemplateOneV1Info.version,
      );

      cy.wait(1000);

      hostProvisionPom.el.next.click();

      // click "Provision" without making any changes
      hostProvisionPom.el.next.click();

      cy.wait("@registerHost").then((interception) => {
        expect(interception.response?.statusCode).to.equal(200);
        provisionedHosts.push(interception.response?.body.resourceId);
      });

      cy.wait("@updateHost");

      cy.wait("@createInstance").then((interception) => {
        expect(interception.response?.statusCode).to.equal(200);
        instanceHosts.push(interception.response?.body.resourceId);
      });

      cy.wait("@createCluster").then((interception) => {
        expect(interception.response?.statusCode).to.equal(200);
        instanceHosts.push(interception.response?.body.resourceId);
      });

      cy.url().should("contain", "infrastructure/hosts");
    });
  });
});
