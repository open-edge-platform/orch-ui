/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { setupStore } from "../../../../store";
import DeploymentPackageProfilesList from "./DeploymentPackageProfileList";
import DeploymentPackageProfilesListPom from "./DeploymentPackageProfileList.pom";

const pom = new DeploymentPackageProfilesListPom();

describe("<DeploymentPackageProfilesList />", () => {
  describe("when the Deployment Package does not have a profile", () => {
    const store = setupStore({
      deploymentPackage: {
        name: "",
        version: "",
        applicationReferences: [
          {
            name: "test-app-1",
            version: "1.0.0",
          },
          {
            name: "test-app-2",
            version: "1.0.0",
          },
        ],
        extensions: [],
        artifacts: [],
      },
    });

    it("should generate a default profile", () => {
      pom.interceptApis([pom.api.getApp1, pom.api.getApp2]);
      cy.mount(<DeploymentPackageProfilesList />, { reduxStore: store });
      pom.waitForApis();
      pom.root.should("exist");
      pom.listItem.el.rowExpander.click();
      pom.listItem.applicationTablePom.root.should(
        "contain.text",
        "test-app-1",
      );
      pom.listItem.applicationTablePom.root.should(
        "contain.text",
        "test-app-2",
      );
      pom.listItem.profileName.root.first().should("have.text", "profile1");
      pom.listItem.profileName.root.last().should("have.text", "profile1");
    });
  });

  describe("when the Deployment Package has a profile", () => {
    it("should render the existing profiles", () => {
      const store = setupStore({
        deploymentPackage: {
          name: "",
          version: "",
          applicationReferences: [],
          profiles: [
            {
              name: "test-profile-1",
              displayName: "Test Profile 1",
              applicationProfiles: {
                "test-app-1": "profile1",
                "test-app-2": "profile1",
              },
            },
            {
              name: "test-profile-2",
              applicationProfiles: {
                "test-app-1": "profile2",
                "test-app-2": "profile2",
              },
            },
          ],
          extensions: [],
          artifacts: [],
        },
      });
      cy.mount(<DeploymentPackageProfilesList />, { reduxStore: store });
      pom.root.should("exist");

      // first profile should use displayName
      pom.listItem.root.first().should("contain.text", "Test Profile 1");

      // second profile should fallback on name
      pom.listItem.root.last().should("contain.text", "test-profile-2");
    });
  });
});
