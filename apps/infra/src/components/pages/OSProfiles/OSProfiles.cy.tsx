/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import { OsResourceStore } from "@orch-ui/utils";
import { OSProfileSecurityFeatures } from "../../organism/OSProfileDetails/OSProfileDetails";
import OSProfiles from "./OSProfiles";
import { OSProfilesPom } from "./OSProfiles.pom";

const pom = new OSProfilesPom();
const osResourceStore = new OsResourceStore();

describe("<OSProfiles/>", () => {
  it("should render all rows in the table", () => {
    pom.interceptApis([pom.api.getOSResources]);
    cy.mount(<OSProfiles />);
    pom.waitForApis();
    pom.osProfilesTablePom
      .getRows()
      .should("have.length", osResourceStore.resources.length);
  });

  it("should render an api error message when GET OS Profiles api fails", () => {
    pom.interceptApis([pom.api.getOSResourcesError500]);
    cy.mount(<OSProfiles />);
    pom.waitForApis();
    pom.apiErrorPom.root.should("be.visible");
  });

  it("should render the UI version of the security feature value", () => {
    pom.interceptApis([pom.api.getOSResources]);
    cy.mount(<OSProfiles />);
    pom.waitForApis();
    pom.osProfilesTablePom
      .getCell(1, 3)
      .contains(
        OSProfileSecurityFeatures[
          "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION"
        ],
      );
  });

  describe("OS profile drawer", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getOSResources]);
      cy.mount(<OSProfiles />);
      pom.waitForApis();
      pom.el.osProfilesPopup.eq(0).click();
      cyGet("View Details").click();
    });
    it("should be rendered", () => {
      pom.el.osProfileDrawerContent.should("exist");
    });
  });
});
