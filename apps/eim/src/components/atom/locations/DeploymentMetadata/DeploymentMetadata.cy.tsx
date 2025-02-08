/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { siteRestaurantTwo } from "@orch-ui/utils";
import { DeploymentMetadata } from "./DeploymentMetadata";
import { DeploymentMetadataPom } from "./DeploymentMetadata.pom";

const pom = new DeploymentMetadataPom();
describe("<DeploymentMetadata/>", () => {
  it("should render component", () => {
    cy.mount(<DeploymentMetadata site={siteRestaurantTwo} />);
    pom.root.should("exist");
  });

  it("should render the keys and values if metadata is present", () => {
    cy.mount(<DeploymentMetadata site={siteRestaurantTwo} />);
    siteRestaurantTwo.metadata?.forEach((metadata) => {
      pom.root.should("contain.text", metadata.key);
      pom.root.should("contain.text", metadata.value);
    });
  });

  it("should show a message when there is no metadata available", () => {
    cy.mount(<DeploymentMetadata />);
    pom.el.noMetadataText.should("exist");
  });
});
