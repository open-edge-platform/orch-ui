/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { MetadataDisplay } from "../../organisms/MetadataDisplay/MetadataDisplay";
import { CardContainer } from "./CardContainer";
import { CardContainerPom } from "./CardContainer.pom";

const cardContainerPom = new CardContainerPom();

describe("<CardContainer/>", () => {
  it("should render component", () => {
    cy.mount(
      <CardContainer cardTitle="Heading Title" titleSemanticLevel={6}>
        <div>Content</div>
      </CardContainer>,
    );
    cardContainerPom.root.should("exist");
    cardContainerPom.root.find("h6").should("contain.text", "Heading Title");
  });

  it("should render component with metadata", () => {
    cy.mount(
      <CardContainer cardTitle="Deployment Metadata" titleSemanticLevel={6}>
        <MetadataDisplay
          metadata={[
            { key: "customer", value: "culvers", type: "region" },
            { key: "state", value: "california", type: "site" },
            { key: "department", value: "test" },
          ]}
        />
      </CardContainer>,
    );
    cardContainerPom.root.should("exist");
    cardContainerPom.root
      .find("h6")
      .should("contain.text", "Deployment Metadata");
    cardContainerPom.root.should("contain.text", "customer = culvers");
  });
});
