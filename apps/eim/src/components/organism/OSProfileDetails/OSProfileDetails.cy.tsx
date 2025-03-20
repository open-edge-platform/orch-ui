/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { osTiber, osUbuntu } from "@orch-ui/utils";
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
    it("should not render installed packages list if empty", () => {
      cy.mount(
        <OSProfileDetails os={{ ...osUbuntu, ...{ installedPackages: "" } }} />,
      );
      pom.root.should("not.contain.text", "Installed Packages");
    });
    it("should render an error message if data format is invalid ", () => {
      cy.mount(
        <OSProfileDetails
          os={{
            ...osUbuntu,
            ...{
              installedPackages:
                '{"Repo":[{"Version":"10.42-3","Architecture":"x86_64"}]}',
            },
          }}
        />,
      );
      pom.root.should("not.contain.text", "Installed Packages");
      pom.root.should(
        "contain.text",
        "Invalid JSON format recieved for Installed packages.",
      );
    });
    it("should render installed packages list", () => {
      cy.mount(<OSProfileDetails os={osTiber} />);

      pom.root.should("contain.text", "Installed Packages");
      pom.root.should("contain.text", "Name");
      pom.root.should("contain.text", "Version");
      pom.root.should("contain.text", "Distribution");
      pom.root.should("contain.text", "libpcre2-32-0");
      pom.root.should("contain.text", "10.42-3");
      pom.root.should("contain.text", "tmv3");
    });
  });
});
