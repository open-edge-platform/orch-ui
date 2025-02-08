/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { appPackageOneNameExtension } from "@orch-ui/utils";
import SelectPackage, { SelectPackageProps } from "./SelectPackage";
import { SelectPackagePom } from "./SelectPackage.pom";
const defaultProps: SelectPackageProps = {
  onSelect: () => {},
};

const pom = new SelectPackagePom();
describe("<SelectPackage />", () => {
  beforeEach(() => {
    pom.table.interceptApis([pom.table.api.packageListPage1]);
    cy.mount(<SelectPackage {...defaultProps} />);
    pom.table.waitForApis();
  });

  it("Should show the deployment packages table with mock data", () => {
    pom.table.root.should("be.visible").should("not.contain", "Actions");
  });
  it("should render packages and extensions tabs", () => {
    pom.root.find(".spark-tabs-tab").contains("Packages");
    pom.root.find(".spark-tabs-tab").contains("Extensions");

    pom.el.packagesTabContent.should("be.visible");
    pom.table.root.should("exist");
    pom.el.extensionsTabContent.should("not.exist");

    pom.root.find(".spark-tabs-tab").contains("Extensions").click();
    pom.el.extensionsTabContent.should("be.visible");
    pom.table.root.should("exist");
    pom.el.packagesTabContent.should("not.exist");
  });
  it("Should reset selection on tab change ", () => {
    pom.selectDeploymentPackageByName("package-0");
    pom.table.interceptApis([pom.table.api.packageExtensionsList]);
    pom.root.find(".spark-tabs-tab").contains("Extensions").click();
    pom.waitForApis();

    pom.table
      .getFieldByName(appPackageOneNameExtension)
      .should("not.be.checked");
  });
  it("should work on searching", () => {
    pom.table.interceptApis([pom.table.api.packageEmpty]);
    pom.ribbonPom.el.search.type("testing");
    pom.waitForApis();
    cy.get(`@${pom.table.api.packageEmpty}`)
      .its("request.url")
      .then((url: string) => {
        const match = url.match(/testing/);
        return expect(match && match.length > 0).to.be.true;
      });
    pom.root.should("contain.text", "No information to display");
  });
});
