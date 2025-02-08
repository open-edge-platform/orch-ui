/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cyGet } from "@orch-ui/tests";
import { OsResourceStore } from "@orch-ui/utils";
import OSProfiles, { OSProfileSecurityFeatures } from "./OSProfiles";
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

    it("should contain titles", () => {
      pom.el.osProfileDrawerContent
        .should("contain.text", "Details")
        .should("contain.text", "Advanced Settings");
    });

    it("should render selected OS profile details", () => {
      pom.el.osProfileDrawerContent
        .should("contain.text", "Name")
        .should("contain.text", "Ubuntu");
      pom.el.osProfileDrawerContent
        .should("contain.text", "Architecture")
        .should("contain.text", "x86_64");
      pom.el.osProfileDrawerContent
        .should("contain.text", "Security Features")
        .should("contain.text", "Secure Boot / FDE");
      pom.el.osProfileDrawerContent
        .should("contain.text", "Kernel Command")
        .should(
          "contain.text",
          "kvmgt vfio-iommu-type1 vfio-mdev i915.enable_gvt=1",
        );
      pom.el.osProfileDrawerContent
        .should("contain.text", "Profile Name")
        .should("contain.text", "Ubuntu-x86_profile");
      pom.el.osProfileDrawerContent
        .should("contain.text", "Update Sources")
        .should(
          "contain.text",
          "deb https://files.edgeorch.net orchui release",
        );
    });
  });
});
