/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { packageOne } from "@orch-ui/utils";
import DeploymentPackageDetailsProfileList from "./DeploymentPackageDetailsProfileList";
import DeploymentPackageDetailsProfileListPom from "./DeploymentPackageDetailsProfileList.pom";

const pom = new DeploymentPackageDetailsProfileListPom();

describe("<DeploymentPackageDetailsProfileList/>", () => {
  it("should show only empty when no profile is found", () => {
    cy.mount(
      <DeploymentPackageDetailsProfileList
        deploymentPackage={{
          ...packageOne,
          profiles: undefined,
        }}
      />,
    );
    pom.emptyPom.root.should("exist");
    pom.profileTable.root.should("not.exist");
  });

  it("should show only empty when profile list is empty", () => {
    cy.mount(
      <DeploymentPackageDetailsProfileList
        deploymentPackage={{
          ...packageOne,
          profiles: [],
        }}
      />,
    );
    pom.emptyPom.root.should("exist");
    pom.profileTable.root.should("not.exist");
  });

  it("should render component with atleast one profile", () => {
    const pkgProfileName = "Deployment package profile name";
    cy.mount(
      <DeploymentPackageDetailsProfileList
        deploymentPackage={{
          ...packageOne,
          defaultProfileName: "default-pkg-profile",
          profiles: [
            {
              name: "default-pkg-profile",
              displayName: pkgProfileName,
              description: "general description for default profile",
              applicationProfiles: {},
            },
          ],
        }}
      />,
    );
    pom.emptyPom.root.should("not.exist");
    pom.profileTable.root.should("exist");
    pom.profileTableUtils
      .getRowBySearchText(pkgProfileName)
      .should("contain.text", "general description for default profile");
    pom.getBadgeByProfileName(pkgProfileName).should("contain.text", "Default");
  });

  describe("on application profile table in a deployment package profile", () => {
    beforeEach(() => {
      cy.mount(
        <DeploymentPackageDetailsProfileList
          deploymentPackage={{
            ...packageOne,
            defaultProfileName: "default-pkg-profile",
            applicationReferences: [{ name: "app1", version: "1.0.1" }],
            profiles: [
              {
                name: "default-pkg-profile",
                displayName: "Default Profile",
                description: "general description for default profile",
                applicationProfiles: { app1: "appProfile1" },
              },
            ],
          }}
        />,
      );
    });
    it("should show application profile table", () => {
      pom.profileTable.expandRow(0);
      pom.appProfileList.root.should("exist");
    });

    it("should click on application name to redirect to application details page", () => {
      pom.profileTable.expandRow(0);
      pom.appProfileList.appProfileTableUtils
        .getCellBySearchText("app1")
        .contains("app1")
        .click();
      pom
        .getPath()
        .should("eq", "/applications/application/app1/version/1.0.1");
    });
  });

  describe("check default on multiple deployment package profiles", () => {
    const pkgProfile2Name = "Deployment package profile name";
    beforeEach(() => {
      cy.mount(
        <DeploymentPackageDetailsProfileList
          deploymentPackage={{
            ...packageOne,
            defaultProfileName: "default-pkg-profile",
            profiles: [
              {
                name: "default-pkg-profile",
                description: "general description for default profile",
                applicationProfiles: {},
              },
              {
                name: "profile-2",
                displayName: pkgProfile2Name,
                description: "general description for profile 2",
                applicationProfiles: {},
              },
            ],
          }}
        />,
      );
    });
    it("should show component when profile without default", () => {
      pom.profileTableUtils
        .getRowBySearchText(pkgProfile2Name)
        .should("not.contain.text", "Default");
    });
    it("should show component when profile with default", () => {
      pom
        .getBadgeByProfileName("default-pkg-profile")
        .should("contain.text", "Default");
    });
  });
});
