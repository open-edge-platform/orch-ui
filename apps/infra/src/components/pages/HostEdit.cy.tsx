/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import {
  assignedWorkloadHostTwo as hostTwo,
  regionSalemId,
  siteMinimartTwo,
  siteMinimartTwoName,
} from "@orch-ui/utils";
import { store } from "../../store/store";
import HostsTable from "../organism/HostsTable/HostsTable";
import HostEdit from "./HostEdit";
import { HostEditPom } from "./HostEdit.pom";

const mockHost = HostEditPom.testHost;
const pom = new HostEditPom();
const newHostName = "Host name updated";

describe("<HostEdit />", () => {
  beforeEach(() => {
    pom.interceptApis([
      pom.api.getInstances,
      pom.api.hostSuccess,
      pom.api.siteByIdSuccess,
      pom.api.regionsSuccess,
      pom.api.sitesSuccess,
    ]);
    cy.mount(<HostEdit />, {
      routerProps: { initialEntries: [`/host/${mockHost.resourceId}/edit`] },
      routerRule: [
        { path: "/host/:id/edit", element: <HostEdit /> },
        { path: "/hosts", element: <HostsTable /> },
      ],
      reduxStore: store,
    });
    pom.waitForApis();
  });

  describe("View Host Details", () => {
    it("should render with the correct Host name", () => {
      pom.el.nameInput.should("contain.value", mockHost.name);
    });

    it("should display metadata when available", () => {
      if (!mockHost.metadata)
        throw new Error("Test data missing required metadata information");
      pom.hostMetadata.el.pair.should("have.length", mockHost.metadata.length);
    });

    it("should disable Save button when there is metadata error with capital case", () => {
      // Enter a capital-case invalid metadata key
      pom.hostMetadata.rhfComboboxKeyPom.getInput().type("fake-Value");

      // Assert that the Save button is disabled
      pom.el.updateHostButton.should("have.attr", "aria-disabled", "true");
    });

    it("should render with empty when metadata is not available", () => {
      pom.interceptApis([pom.api.hostWithoutMetadata]);
      cy.mount(<HostEdit />, {
        routerProps: { initialEntries: [`/host/${hostTwo.resourceId}/edit`] },
        routerRule: [{ path: "/host/:id/edit", element: <HostEdit /> }],
      });
      pom.waitForApis();
      pom.hostMetadata.root.should("exist");
    });
  });

  describe("Update host details", () => {
    it("should validate empty Host name", () => {
      pom.el.nameInput.clear();
      pom.el.nameInput
        .parentsUntil(".spark-text-field-container")
        .should("contain.text", "Host name is required");
    });
    it("should validate on invalid name with special symbol", () => {
      pom.el.nameInput.clear().type("host name@");
      pom.el.nameInput
        .parentsUntil(".spark-text-field-container")
        .should(
          "contain.text",
          "Host name must contain alphanumeric and symbols (. / :) only",
        );
    });

    it("should limit Host name to 20 characters", () => {
      pom.el.nameInput.clear().type("host-0123456789123456789");
      pom.el.nameInput.should("have.value", "host-012345678912345");
    });

    it("should update Host name", () => {
      // we're making sure all the existing properties are sent
      const expectedReq: infra.HostResourceWrite = {
        name: newHostName,
        siteId: mockHost.site?.resourceId,
        inheritedMetadata: mockHost.inheritedMetadata,
        metadata: mockHost.metadata,
      };
      if (expectedReq.site?.region?.parentRegion?.parentRegion === undefined)
        delete expectedReq.site?.region?.parentRegion?.parentRegion;

      pom.el.nameInput.clear().type(newHostName);
      pom.interceptApis([
        pom.api.updateHostSuccess,
        pom.api.hostUpdatedSuccess,
      ]);
      pom.el.updateHostButton.click();
      cy.get(`@${pom.api.updateHostSuccess}`)
        .its("request.body")
        .should("deep.equal", expectedReq);
      pom.waitForApis();
      pom.el.nameInput.should("contain.value", newHostName);
    });

    //TODO: needs updating
    xit("should rewrite name and metadata", () => {
      const expectedMetadata = [
        ...(mockHost.metadata ? mockHost.metadata : []),
        {
          key: "environment",
          value: "production",
        },
      ];
      const expectedReq: infra.HostResource = {
        uuid: mockHost.uuid,
        inheritedMetadata: mockHost.inheritedMetadata,
        name: newHostName,
        metadata: expectedMetadata,
      };

      pom.el.nameInput.clear().type(newHostName);

      // if loader is disappeared then metadata is editable properly via cypress
      pom.hostMetadata.getNewEntryInput("Key").clear().type("environment");
      pom.hostMetadata.getNewEntryInput("Value").clear().type("production");
      pom.hostMetadata.el.add.click();

      pom.interceptApis([
        pom.api.updateHostSuccess,
        pom.api.hostUpdatedSuccess,
        //pom.api.updateMetadataSuccess,
      ]);
      pom.el.updateHostButton.click();
      cy.get(`@${pom.api.updateHostSuccess}`)
        .its("request.body")
        .should("deep.equal", expectedReq);
      pom.waitForApis();

      pom.el.nameInput.should("contain.value", newHostName);
    });

    it("should redirect to Hosts table after saving", () => {
      pom.interceptApis([
        pom.api.updateHostSuccess,
        pom.api.hostUpdatedSuccess,
        pom.api.updateMetadataSuccess,
      ]);
      pom.el.updateHostButton.click();
      pom.waitForApis();
      cy.get("#pathname").contains("hosts");
    });
  });

  describe("Region & Site Dropdown Behavior", () => {
    it("should enable dropdowns when API responds with instances/workloads", () => {
      pom.el.regionCombobox.should("not.be.disabled");
      pom.el.siteCombobox.should("not.be.disabled");
    });

    it("should have the correct region ID in the sitesSuccess request URL", () => {
      const expectedRegionId = regionSalemId;

      cy.get(`@${pom.api.sitesSuccess}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(
            `region.resourceId%3D%27${expectedRegionId}%27`,
          );
          expect(match && match.length > 0).to.be.eq(true);
        });
    });

    it("should not contain 'None' in the Site dropdown", () => {
      pom.el.siteCombobox.find("button").click();
      cy.should("not.contain", "None");
    });

    it("should update the selected Site", () => {
      pom.el.siteCombobox.find("button").click();
      cy.contains(siteMinimartTwoName).click();

      const expectedReq: infra.HostResourceWrite = {
        name: mockHost.name,
        siteId: siteMinimartTwo.resourceId,
        inheritedMetadata: mockHost.inheritedMetadata,
        metadata: mockHost.metadata,
      };
      if (expectedReq.site?.region?.parentRegion?.parentRegion === undefined)
        delete expectedReq.site?.region?.parentRegion?.parentRegion;

      pom.interceptApis([
        pom.api.updateHostSuccess,
        pom.api.hostUpdatedSuccess,
      ]);
      pom.el.updateHostButton.click();
      cy.get(`@${pom.api.updateHostSuccess}`)
        .its("request.body")
        .should("deep.equal", expectedReq);
      pom.waitForApis();

      pom.el.siteCombobox
        .find("input")
        .should("contain.value", siteMinimartTwo.name);
    });

    it("should disable dropdowns when no instances/workloads are available", () => {
      pom.interceptApis([
        pom.api.getInstancesEmpty,
        pom.api.hostSuccess,
        pom.api.siteByIdSuccess,
        pom.api.regionsSuccess,
        pom.api.sitesSuccess,
      ]);
      cy.mount(<HostEdit />, {
        routerProps: { initialEntries: [`/host/${mockHost.resourceId}/edit`] },
        routerRule: [{ path: "/host/:id/edit", element: <HostEdit /> }],
        reduxStore: store,
      });
      pom.waitForApis();

      pom.el.regionCombobox.should("be.disabled");
      pom.el.siteCombobox.should("be.disabled");
    });

    it("should disable dropdowns when instance API fails", () => {
      pom.interceptApis([
        pom.api.getInstances500,
        pom.api.hostSuccess,
        pom.api.siteByIdSuccess,
        pom.api.regionsSuccess,
        pom.api.sitesSuccess,
      ]);
      cy.mount(<HostEdit />, {
        routerProps: { initialEntries: [`/host/${mockHost.resourceId}/edit`] },
        routerRule: [{ path: "/host/:id/edit", element: <HostEdit /> }],
        reduxStore: store,
      });
      pom.waitForApis();

      pom.el.regionCombobox.should("be.disabled");
      pom.el.siteCombobox.should("be.disabled");
    });
  });
});
