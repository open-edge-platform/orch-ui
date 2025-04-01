/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { DeploymentType } from "../../../pages/SetupDeployment/SetupDeployment";
import SelectDeploymentType from "./SelectDeploymentType";
import SelectDeploymentTypePom from "./SelectDeploymentType.pom";

const pom = new SelectDeploymentTypePom();
describe("<SelectDeploymentType/>", () => {
  it("should render component", () => {
    cy.mount(
      <SelectDeploymentType type={DeploymentType.MANUAL} setType={() => {}} />,
    );
    pom.root.should("exist");
    pom.radioCardAutomatic.el.description.contains(
      "Deploy to clusters with metadata that matches the package's deployment metadata.",
    );
    pom.radioCardAutomatic.el.description.contains(
      "As new clusters are added, the package will automatically deploy to any that meet the criteria.",
    );
    pom.radioCardAutomatic.root
      .find(".spark-radio-button")
      .contains("Automatic");
    pom.radioCardManual.root.find(".spark-radio-button").contains("Manual");
    pom.radioCardManual.el.description.contains(
      "Select clusters to deploy the package to.",
    );
  });
});
