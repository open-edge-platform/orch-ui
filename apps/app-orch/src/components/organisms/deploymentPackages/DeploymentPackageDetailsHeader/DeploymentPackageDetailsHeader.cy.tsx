/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cyGet } from "@orch-ui/tests";
import { packageOne } from "@orch-ui/utils";
import DeploymentPackageDetailsHeader from "./DeploymentPackageDetailsHeader";
import { DeploymentPackageDetailsHeaderPom } from "./DeploymentPackageDetailsHeader.pom";

const pom = new DeploymentPackageDetailsHeaderPom();

describe("<DeploymentPackageDetailsHeader />", () => {
  beforeEach(() => {
    cy.mount(<DeploymentPackageDetailsHeader deploymentPackage={packageOne} />);
  });
  it("should render the component", () => {
    pom.el.dpTitle.contains(packageOne.displayName ?? "");
  });

  describe("deployment package actions", () => {
    it("should go to edit page", () => {
      pom.clickPopupActionByActionName("Edit");
      pom
        .getPath()
        .should(
          "eq",
          `/packages/edit/${packageOne.name}/version/${packageOne.version}`,
        );
    });
    it("should go to deploy page", () => {
      pom.clickPopupActionByActionName("Deploy");
      pom
        .getPath()
        .should(
          "eq",
          `/applications/package/deploy/${packageOne.name}/version/${packageOne.version}`,
        );
    });
    it("should delete deployment package", () => {
      pom.clickPopupActionByActionName("Delete");
      pom.interceptApis([pom.api.deploymentPackageDelete]);
      cyGet("confirmBtn").click();
      pom.waitForApis();

      cy.get(`@${pom.api.deploymentPackageDelete}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(
            `deployment_packages/${packageOne.name}/versions/${packageOne.version}`,
          );
          return expect(match && match.length > 0).to.be.true;
        });
    });
  });
});
