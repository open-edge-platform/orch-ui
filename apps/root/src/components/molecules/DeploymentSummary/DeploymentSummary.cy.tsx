/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { deploymentOne } from "@orch-ui/utils";
import DeploymentSummary from "./DeploymentSummary";
import DeploymentSummaryPom from "./DeploymentSummary.pom";

const pom = new DeploymentSummaryPom();
describe("<DeploymentSummary/>", () => {
  beforeEach(() => {
    cy.mount(<DeploymentSummary deployment={deploymentOne} />);
  });

  it("should render component", () => {
    pom.root.should("exist");
  });

  it("should render the application package details", () => {
    pom.el.applicationPackageDetails.should("be.visible");
    pom.el.applicationPackageDetails.should(
      "contain.text",
      deploymentOne.appName,
    );
    pom.el.applicationPackageDetails.should(
      "contain.text",
      deploymentOne.appVersion,
    );
    pom.el.caDetailsLink.click();
    pom
      .getPath()
      .should(
        "eq",
        `/applications/package/${deploymentOne.appName}/version/${deploymentOne.appVersion}`,
      );
  });

  xit("should render the metadata", () => {
    pom.el.deploymentMetadata.should("be.visible");
  });
  xit("should render the instances and host status counters", () => {
    pom.el.deploymentCounter.should("be.visible");
    pom.el.hostCounter.should("be.visible");
  });

  xit("should render a list of deployment instances", () => {
    pom.el.instanceList.should("be.visible");
  });
});
