/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import DeploymentPackageProfileForm from "./DeploymentPackageProfileForm";
import DeploymentPackageProfileFormPom from "./DeploymentPackageProfileForm.pom";

const pom = new DeploymentPackageProfileFormPom();

describe("<DeploymentPackageProfileForm />", () => {
  it("should render the component", () => {
    cy.mount(<DeploymentPackageProfileForm />);

    pom.root.should("contain.text", "Deployment Package Profile");
  });

  // TODO: Add tests to addEditDrawer and profilesList
});
