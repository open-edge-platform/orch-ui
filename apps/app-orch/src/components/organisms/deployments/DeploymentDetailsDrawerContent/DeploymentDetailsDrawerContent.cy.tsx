/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { applicationTwo, deploymentOne, packageOne } from "@orch-ui/utils";
import DeploymentDetailsDrawerContent from "./DeploymentDetailsDrawerContent";
import DeploymentDetailsDrawerContentPom from "./DeploymentDetailsDrawerContent.pom";

const drawerPom = new DeploymentDetailsDrawerContentPom();

describe("<DeploymenDetailsDrawerContent />", () => {
  it("should render drawer with a deployment", () => {
    drawerPom.interceptApis([
      drawerPom.api.completeDeploymentPackageResponse,
      drawerPom.api.postgreApp,
      drawerPom.api.unknownApp,
    ]);
    cy.mount(<DeploymentDetailsDrawerContent deployment={deploymentOne} />);
    drawerPom.waitForApis();

    drawerPom.el.drawerCaVersion.should("have.text", packageOne.version);
    drawerPom.el.drawerCaDescription.should(
      "have.text",
      packageOne.description,
    );
    drawerPom.root.should("contain", applicationTwo.name);
    drawerPom.root.should("contain", applicationTwo.version);
    drawerPom.root.should("contain", applicationTwo.helmRegistryName);

    it("should render empty components", () => {
      drawerPom.interceptApis([drawerPom.api.errorDeploymentPackageResponse]);
      cy.mount(<DeploymentDetailsDrawerContent deployment={deploymentOne} />);
      drawerPom.waitForApis();

      drawerPom.el.drawerCaEmpty.should(
        "contain.text",
        "Error in fetching Deployment Package data!",
      );
    });
  });
});
