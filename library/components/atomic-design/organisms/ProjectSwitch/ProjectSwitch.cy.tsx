/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import { IRuntimeConfig, SharedStorage, StorageItems } from "@orch-ui/utils";
import { ProjectSwitch } from "./ProjectSwitch";
import { mockProjectLength, ProjectSwitchPom } from "./ProjectSwitch.pom";

const pom = new ProjectSwitchPom();
describe("<ProjectSwitch />", () => {
  it("should not show project switch when token is not available", () => {
    cy.mount(
      <ProjectSwitch
        isTokenAvailable={false}
        padding="1.85rem 0"
        topMargin="5rem"
      />,
    );
    pom.el.projectSwitchText.should("not.exist");
  });

  describe("when token is available", () => {
    describe("when projects are available", () => {
      beforeEach(() => {
        pom.interceptApis([pom.api.getProjects]);
        cy.mount(
          <ProjectSwitch
            isTokenAvailable={true}
            padding="1.85rem 0"
            topMargin="5rem"
          />,
        );
        pom.waitForApis();
      });

      it("should render component", () => {
        pom.root.should("exist");
        pom.el.projectSwitchText.should("exist");
      });

      it("should render all projects", () => {
        pom.root.click();
        pom.getProjectListOptions().should("have.length", mockProjectLength);
      });

      //TODO: this one is failing on CI ?
      xit("should show the Manage Projects button", () => {
        pom.root.click();
        pom.el.seeAllProjects.should("contain.text", "Manage Projects");
      });

      describe("Shared Storage", () => {
        const runtimeConfig: IRuntimeConfig = {
          KC_CLIENT_ID: "",
          KC_REALM: "",
          KC_URL: "",
          AUTH: "true",
          SESSION_TIMEOUT: 0,
          OBSERVABILITY_URL: "",
          MFE: {},
          TITLE: "",
          API: {},
          DOCUMENTATION: [],
          VERSIONS: {},
          DOCUMENTATION_URL: "",
        };

        it("should render the first project available from the api list when no project is selected", () => {
          SharedStorage.setStorageItem(StorageItems.PROJECT, undefined);

          pom.interceptApis([pom.api.getProjects]);
          cy.mount(
            <ProjectSwitch
              isTokenAvailable
              padding="1.85rem 0"
              topMargin="5rem"
            />,
          );
          pom.waitForApis();

          pom.root.should("contain.text", "Project 0");
        });

        it("should show selected project", () => {
          SharedStorage.setStorageItem(StorageItems.PROJECT, undefined);

          pom.interceptApis([pom.api.getProjects]);
          cy.mount(
            <ProjectSwitch
              isTokenAvailable
              padding="1.85rem 0"
              topMargin="5rem"
            />,
          );
          pom.waitForApis();
          pom.root.should("contain.text", "Project 0");
        });

        it("should redirect to project page when no project is selected and api list is empty in standalone mode", () => {
          const runtimeConfigAdminOnly = {
            ...runtimeConfig,
            MFE: {
              APP_ORCH: "false",
              INFRA: "false",
              CLUSTER_ORCH: "false",
              ADMIN: "true",
            },
          };

          SharedStorage.setStorageItem(StorageItems.PROJECT, undefined);

          pom.interceptApis([pom.api.getProjectsEmpty]);
          cy.mount(
            <ProjectSwitch
              isTokenAvailable
              padding="1.85rem 0"
              topMargin="5rem"
            />,
            {
              runtimeConfig: runtimeConfigAdminOnly,
            },
          );
          pom.waitForApis();

          pom.getPath().should("eq", "/projects");
        });

        // TODO: Need to see why the runtime config is not substituted to cy.mount
        xit("should redirect to project page when no project is selected, api list is empty and not in standalone mode", () => {
          const runtimeConfigAll = {
            ...runtimeConfig,
            MFE: {
              APP_ORCH: "true",
              INFRA: "true",
              CLUSTER_ORCH: "true",
              ADMIN: "true",
            },
          };

          SharedStorage.setStorageItem(StorageItems.PROJECT, undefined);

          pom.interceptApis([pom.api.getProjectsEmpty]);
          cy.mount(
            <ProjectSwitch
              isTokenAvailable
              padding="1.85rem 0"
              topMargin="5rem"
            />,
            {
              runtimeConfig: runtimeConfigAll,
            },
          );
          pom.waitForApis();

          pom.getPath().should("eq", "/admin/projects");
        });

        it("should remove the shared storage project if there is no project available to be selected", () => {
          SharedStorage.setStorageItem(StorageItems.PROJECT, {
            name: "pepsi-scotland",
            uID: "c00a23aa-4c83-44cb-861e-3af7cf765d5d",
          });

          pom.interceptApis([pom.api.getProjectsEmpty]);
          cy.mount(
            <ProjectSwitch
              isTokenAvailable
              padding="1.85rem 0"
              topMargin="5rem"
            />,
          );
          pom.waitForApis();

          cy.wrap(SharedStorage).its("project").should("be.undefined");
        });

        it("should remove the shared storage project if the user is not associated with any project", () => {
          SharedStorage.setStorageItem(StorageItems.PROJECT, {
            name: "pepsi-scotland",
            uID: "c00a23aa-4c83-44cb-861e-3af7cf765d5d",
          });

          pom.interceptApis([pom.api.getProjectsMissingOrg]);
          cy.mount(
            <ProjectSwitch
              isTokenAvailable
              padding="1.85rem 0"
              topMargin="5rem"
            />,
          );
          pom.waitForApis();

          cy.wrap(SharedStorage).its("project").should("be.undefined");
        });

        it("should change the shared storage project if it's name matches with a project list option but the uid doesn't", () => {
          SharedStorage.setStorageItem(StorageItems.PROJECT, {
            name: "sample-project",
            uID: "c00a23aa-4c83-44cb-861e-3af7cf765d5d",
          });

          pom.interceptApis([pom.api.getProjectsSampleProject]);
          cy.mount(
            <ProjectSwitch
              isTokenAvailable
              padding="1.85rem 0"
              topMargin="5rem"
            />,
          );
          pom.waitForApis();

          cy.wrap(SharedStorage).its("project").should("deep.equal", {
            name: "sample-project",
            uID: "cd630675-5e03-4ffd-9e2e-463bf1a91f83",
          });
        });
      });
      describe("Project switch modal", () => {
        beforeEach(() => {
          pom.root.click();
          pom.getProjectListOptions().eq(5).click();
        });
        it("should render project switch modal", () => {
          cyGet("projectSwitchModal").should("exist");
          cyGet("projectSwitchModalText").should("exist");
          cyGet("modalTitle").should("contain.text", "Project switching");
        });
        it("should able to close modal", () => {
          cyGet("closeDialog").click();
          cyGet("projectSwitchModal").should("not.exist");
          pom.el.projectSwitchText.should("contain.text", "Project 0");
        });
        it("should able to cancel selection", () => {
          cyGet("secondaryBtn").should("contain.text", "Cancel").click();
          cyGet("projectSwitchModal").should("not.exist");
          pom.el.projectSwitchText.should("contain.text", "Project 0");
        });
        it("should able to update the project selection", () => {
          cyGet("primaryBtn").should("contain.text", "Continue").click();
          cyGet("projectSwitchModal").should("not.exist");
          pom.el.projectSwitchText.should("contain.text", "Project 5");
        });
      });
    });

    describe("when the user cannot list projects", () => {
      beforeEach(() => {
        pom.interceptApis([pom.api.getProjectsMissingOrg]);
        cy.mount(
          <ProjectSwitch
            isTokenAvailable
            padding="1.85rem 0"
            topMargin="5rem"
          />,
        );
        pom.waitForApis();
      });
      it("should redirect to the project page", () => {
        pom.getPath().should("eq", "/projects");
      });
    });
  });
});
