/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cyGet } from "@orch-ui/tests";
import SelectApplicationProfile from "./SelectApplicationProfile";
import SelectApplicationProfilePom from "./SelectApplicationProfile.pom";

const pom = new SelectApplicationProfilePom("advSettings");
describe("<SelectApplicationProfile/>", () => {
  it("should render with profile list", () => {
    pom.interceptApis([pom.api.getApp]);
    cy.mount(
      <SelectApplicationProfile
        applicationReference={{
          name: "application1",
          version: "1.0",
        }}
      />,
    );
    pom.waitForApis();
    cy.contains("name");
  });

  it("should render with profile list", () => {
    pom.interceptApis([pom.api.getApp]);
    cy.mount(
      <SelectApplicationProfile
        applicationReference={{
          name: "application1",
          version: "1.0",
        }}
      />,
    );
    pom.waitForApis();
    cyGet("advSettingsAppProfile").should("be.visible");
  });

  it("should work with empty profile list ", () => {
    pom.interceptApis([pom.api.getAppNoProfiles]);
    cy.mount(
      <SelectApplicationProfile
        applicationReference={{
          name: "application1",
          version: "1.0",
        }}
      />,
    );
    pom.waitForApis();
    cy.get("body").contains("Could Not load Profile for application");
    pom.root.should("not.exist");
  });
});
