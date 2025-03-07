/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import ProfilePackageDetails from "./ProfilePackageDetails";
import ProfilePackageDetailsPom from "./ProfilePackageDetails.pom";

const pom = new ProfilePackageDetailsPom();
describe("<ProfilePackageDetails/>", () => {
  it("should show profile data", () => {
    const profile: catalog.DeploymentProfile = {
      name: "test-package",
      displayName: "Test package",
      description: "test description",
      applicationProfiles: {
        appOne: "profileOne",
        appTwo: "profileTwo",
      },
    };
    cy.mount(
      <ProfilePackageDetails
        isOpen={true}
        onCloseDrawer={cy.spy()}
        profile={profile}
        defaultProfileName="test-package"
      />,
    );
    pom.root.should("exist");
    pom.el.nameValue.should("have.text", profile.displayName);
    pom.el.descriptionValue.should("have.text", profile.description);
    pom.el.defaultValue.should("have.text", "Yes");
    cy.get(".spark-input").its("length").should("eq", 4);
  });
});
