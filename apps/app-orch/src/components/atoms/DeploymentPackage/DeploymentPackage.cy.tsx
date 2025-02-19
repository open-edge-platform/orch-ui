/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import DeploymentPackage from "./DeploymentPackage";
import DeploymentPackagePom from "./DeploymentPackage.pom";

const pom = new DeploymentPackagePom();
describe("<DeploymentPackage/>", () => {
  it("should render component", () => {
    cy.mount(
      <DeploymentPackage
        name="Test name"
        version="1.0.2"
        description="Test description"
      />,
    );
    pom.root.should("exist");
    pom.el.name.should("contain.text", "Test name");
    pom.el.version.should("contain.text", "1.0.2");
    pom.el.description.should("contain.text", "Test description");
  });
});
