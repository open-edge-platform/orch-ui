/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";

const dataCySelectors = ["advSettingsAppProfile"] as const;
type Selectors = (typeof dataCySelectors)[number];

const project = defaultActiveProject.name;
const route = `/v3/projects/${project}/catalog/applications/*/versions/**`;
type ApiAliases = "getApp" | "getAppNoProfiles";

// in this test we only care about the profiles of an application,
// so omit everything else from the response
type MockProfiles = Pick<catalog.Application, "profiles">;
type ApplicationResponseForProfiles = {
  application: MockProfiles;
};

export const endpoints: CyApiDetails<
  ApiAliases,
  ApplicationResponseForProfiles
> = {
  getApp: {
    route: `${route}*`,
    statusCode: 200,
    response: {
      application: {
        profiles: [{ name: "profile1" }],
      },
    },
  },
  getAppNoProfiles: {
    route: `${route}*`,
    statusCode: 200,
    response: {
      application: { profiles: [] },
    },
  },
};

class SelectApplicationProfilePom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = "") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
  public clickProfilesDropDown(n: number) {
    this.el.advSettingsAppProfile
      .find("button")
      .eq(n - 1)
      .click();
  }
  public selectProfile(n: number, profileName: string) {
    this.clickProfilesDropDown(n);
    cy.get(".spark-popover").contains(`${profileName}`).click();
  }
}

export default SelectApplicationProfilePom;
