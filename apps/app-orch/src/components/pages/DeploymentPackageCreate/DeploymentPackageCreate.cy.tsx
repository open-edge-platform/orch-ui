/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import DeploymentPackageCreate from "./DeploymentPackageCreate";
import DeploymentPackageCreatePom from "./DeploymentPackageCreate.pom";

const pom = new DeploymentPackageCreatePom();
describe("<DeploymentPackageCreate />", () => {
  beforeEach(() => {
    cy.mount(<DeploymentPackageCreate />);
  });

  it("should see deployment create or edit form", () => {
    pom.deploymentPackageCreateEditPom.root.should("exist");
  });
});
