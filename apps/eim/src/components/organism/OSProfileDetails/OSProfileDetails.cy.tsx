/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { osUbuntu } from "@orch-ui/utils";
import OSProfileDetails from "./OSProfileDetails";
import { OSProfileDetailsPom } from "./OSProfileDetails.pom";

const pom = new OSProfileDetailsPom();

describe("<OSProfileDetails/>", () => {
  describe("OS profile details", () => {
    beforeEach(() => {
      cy.mount(<OSProfileDetails os={osUbuntu} />);
    });

    it("should contain titles", () => {
      pom.root
        .should("contain.text", "Details")
        .should("contain.text", "Advanced Settings");
    });

    it("should render selected OS profile details", () => {
      pom.root.should("contain.text", "Name").should("contain.text", "Ubuntu");
      pom.root
        .should("contain.text", "Architecture")
        .should("contain.text", "x86_64");
      pom.root
        .should("contain.text", "Security Features")
        .should("contain.text", "Secure Boot / FDE");
      pom.root
        .should("contain.text", "Kernel Command")
        .should(
          "contain.text",
          "kvmgt vfio-iommu-type1 vfio-mdev i915.enable_gvt=1",
        );
      pom.root
        .should("contain.text", "Profile Name")
        .should("contain.text", "Ubuntu-x86_profile");
      pom.root
        .should("contain.text", "Update Sources")
        .should(
          "contain.text",
          "deb https://files.edgeorch.net orchui release",
        );
    });
  });
});
