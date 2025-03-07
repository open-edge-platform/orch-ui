/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { profileOneDisplayName, profileOneName } from "@orch-ui/utils";
import ProfileName from "./ProfileName";
import ProfileNamePom from "./ProfileName.pom";

const profileNamePom = new ProfileNamePom();

describe("<ProfileName/>", () => {
  const appRef: catalog.ApplicationReference = {
    name: "app-name",
    version: "0.0.0",
  };
  it("should render the name", () => {
    profileNamePom.interceptApis([profileNamePom.api.getApplication]);
    cy.mount(
      <ProfileName
        profileName={profileOneName}
        applicationReference={appRef}
      />,
    );
    profileNamePom.waitForApis();
    profileNamePom.root.should("contain.text", profileOneDisplayName);
  });

  it("should render an error message", () => {
    profileNamePom.interceptApis([profileNamePom.api.getApplicationError]);
    cy.mount(<ProfileName profileName="test" applicationReference={appRef} />);
    profileNamePom.waitForApis();
    profileNamePom.root.should(
      "contain.text",
      `Could Not load Profile for ${appRef.name}`,
    );
  });
});
