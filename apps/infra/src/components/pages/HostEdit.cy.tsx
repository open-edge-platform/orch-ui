/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import {
  assignedWorkloadHostTwo as hostTwo,
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

describe("HostEdit", () => {
  beforeEach(() => {
    pom.interceptApis([
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

  describe("should view host details", () => {
    it("should render with Host name", () => {
      pom.el.nameInput.should("contain.value", mockHost.name);
    });

    describe("host metadata", () => {
      it("should render metadata", () => {
        if (!mockHost.metadata)
          throw new Error("Test data missing required metadata information");
        pom.hostMetadata.el.pair.should(
          "have.length",
          mockHost.metadata.length,
        );
      });

      it("should disable Save button when there is metadata error", () => {
        pom.hostMetadata.rhfComboboxKeyPom.getInput().type("fake-Value");
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
  });

  describe("update host details", () => {
    it("should validate on invalid name with special symbol", () => {
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

    it("take name only upto 20 characters", () => {
      pom.el.nameInput.clear().type("host-0123456789123456789");
      pom.el.nameInput.should("have.value", "host-012345678912345");
    });

    it("should rewrite name", () => {
      // we're making sure all the existing properties are sent
      const expectedReq: eim.HostWrite = {
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
      const expectedReq: eim.Host = {
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

    it("should redirect after save", () => {
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
});

describe("Host Edit: Region & site dropdown", () => {
  it("should be enabled when api responds at least one instance having no workload", () => {
    pom.interceptApis([
      pom.api.getInstances,
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
    pom.el.regionCombobox.should("not.be.disabled");
    pom.el.siteCombobox.should("not.be.disabled");
  });

  it("should not contain None", () => {
    pom.interceptApis([
      pom.api.getInstances,
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

    pom.el.regionCombobox.should("not.be.disabled");
    pom.el.siteCombobox.should("not.be.disabled");

    pom.el.siteCombobox.find("button").click();
    cy.should("not.contain", "None");
  });

  it("should update site", () => {
    pom.interceptApis([
      pom.api.getInstances,
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

    pom.el.regionCombobox.should("not.be.disabled");
    pom.el.siteCombobox.should("not.be.disabled");

    pom.el.siteCombobox.find("button").click();
    cy.contains(siteMinimartTwoName).click();

    const expectedReq: eim.HostWrite = {
      name: mockHost.name,
      siteId: siteMinimartTwo.resourceId,
      inheritedMetadata: mockHost.inheritedMetadata,
      metadata: mockHost.metadata,
    };
    if (expectedReq.site?.region?.parentRegion?.parentRegion === undefined)
      delete expectedReq.site?.region?.parentRegion?.parentRegion;

    pom.interceptApis([pom.api.updateHostSuccess, pom.api.hostUpdatedSuccess]);
    pom.el.updateHostButton.click();
    cy.get(`@${pom.api.updateHostSuccess}`)
      .its("request.body")
      .should("deep.equal", expectedReq);
    pom.waitForApis();

    pom.el.siteCombobox
      .find("input")
      .should("contain.value", siteMinimartTwo.name);
  });

  it("should disabled on empty instance list having no workload", () => {
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

  it("should disabled on instance list failed to fetch", () => {
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
