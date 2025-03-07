/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { setupStore } from "../../../../store";
import DeploymentPackageProfileListItemPom from "./DeploymentPackageProfileListItem.pom";
import DeploymentPackageProfileListItem from "./DeploymentPackageProflieListItem";

const pom = new DeploymentPackageProfileListItemPom();

const profile: catalog.DeploymentProfile = {
  name: "test",
  applicationProfiles: {
    "test-app": "profile1",
  },
};
describe("<DeploymentPackageProfileListItem/>", () => {
  const store = setupStore({
    deploymentPackage: {
      name: "",
      version: "",
      applicationReferences: [
        {
          name: "test-app",
          version: "1.0.0",
        },
      ],
      extensions: [],
      artifacts: [],
    },
  });
  it("should render component", () => {
    cy.mount(<DeploymentPackageProfileListItem profile={profile} />);
    pom.root.should("exist");
    pom.deploymentPackageTablePom.root.should("exist");
  });

  it("should expand", () => {
    pom.interceptApis([pom.api.getApplication]);
    cy.mount(<DeploymentPackageProfileListItem profile={profile} />, {
      reduxStore: store,
    });
    pom.el.rowExpander.click();
    pom.waitForApis();
    pom.deploymentPackageTablePom.root.should("exist");
    pom.profileName.root.should("have.text", "profile1");
  });
});
