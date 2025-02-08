/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { deploymentOne } from "@orch-ui/utils";
import DeploymentDrawerContent from "./DeploymentDrawerContent";
import DeploymentDrawerContentPom from "./DeploymentDrawerContent.pom";

const pom = new DeploymentDrawerContentPom();
describe("<DeploymentDrawerContent/>", () => {
  it("should render component", () => {
    cy.mount(<DeploymentDrawerContent deployment={deploymentOne} />);
    pom.root.should("exist");
  });

  xit("should render the Deployment Summary component");

  xit("should render the Deployment Instance Detailds component");
});
