/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { deploymentOne, deploymentOneId } from "@orch-ui/utils";
import { DeploymentLink } from "./DeploymentLink";
import { DeploymentLinkPom } from "./DeploymentLink.pom";

const pom = new DeploymentLinkPom();
describe("<DeplymentLink/>", () => {
  it("should render link passing uuid", () => {
    pom.interceptApis([pom.api.getDeploymentById]);
    cy.mount(<DeploymentLink deplId={deploymentOneId} />);
    pom.waitForApis();
    pom.root.should("contain.text", deploymentOne.displayName);
  });
});
