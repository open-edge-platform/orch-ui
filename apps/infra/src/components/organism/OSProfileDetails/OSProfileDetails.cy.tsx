/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { osTb, osUbuntu } from "@orch-ui/utils";
import OSProfileDetails from "./OSProfileDetails";
import { OSProfileDetailsPom } from "./OSProfileDetails.pom";

const pom = new OSProfileDetailsPom();

describe("<OSProfileDetails/>", () => {
  describe("OS profile details", () => {
    beforeEach(() => {
      cy.mount(
        <OSProfileDetails
          os={osUbuntu}
          updatePolicy={{
            name: "Ubuntu",
            updateKernelCommand:
              "kvmgt vfio-iommu-type1 vfio-mdev i915.enable_gvt=1",
            updateSources: ["deb https://files.edgeorch.net orchui release"],
          }}
        />,
      );
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
        .should("contain.text", "Profile Name")
        .should("contain.text", "Ubuntu-x86_profile");
      pom.root
        .should("contain.text", "Update Sources")
        .should(
          "contain.text",
          "deb https://files.edgeorch.net orchui release",
        );
      pom.root
        .should("contain.text", "Repository URL")
        .should("contain.text", "http://archive.ubuntu.com/ubuntu");
    });
    it("should render tabs", () => {
      cy.mount(<OSProfileDetails os={osTb} />);

      pom.getTab("Installed Packages").should("exist");
      pom.el.installedPackagesRoot.should("be.visible");

      pom.getTab("Cves").should("exist").click();
      pom.el.cveTabRoot.should("be.visible");
    });
    it("should not render installed packages list if empty", () => {
      cy.mount(
        <OSProfileDetails os={{ ...osUbuntu, ...{ installedPackages: "" } }} />,
      );
      pom.el.installedPackagesRoot.should("not.exist");
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
      pom.el.installedPackagesRoot.should("not.exist");
      pom.root.should(
        "contain.text",
        "Invalid JSON format recieved for Installed packages.",
      );
    });
    it("should render installed packages list", () => {
      cy.mount(<OSProfileDetails os={osTb} />);

      pom.root.should("contain.text", "Installed Packages");
      pom.root.should("contain.text", "Name");
      pom.root.should("contain.text", "Version");
      pom.root.should("contain.text", "Distribution");
      pom.root.should("contain.text", "libpcre2-32-0");
      pom.root.should("contain.text", "10.42-3");
      pom.root.should("contain.text", "tmv3");
    });

    it("should render cve list in table", () => {
      cy.mount(<OSProfileDetails os={osTb} />);
      pom.getTab("Cves").should("exist").click();
      pom.table.root.should("exist");

      pom.table.getColumnHeader(0).contains("Cve Id");
      pom.table.getColumnHeader(1).contains("Priority");
      pom.table.getColumnHeader(2).contains("Affected Packages");

      pom.table.getCell(1, 1).contains("CVE-2016-5180");
      pom.table.getCell(1, 2).contains("critical");
      pom.table.getCell(1, 3).contains("fluent-bit-3.1.9-11.emt3.x86_64");
    });
  });
});
