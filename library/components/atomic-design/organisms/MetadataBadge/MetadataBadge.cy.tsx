/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { TypedMetadata } from "../MetadataDisplay/MetadataDisplay";
import { MetadataBadge } from "./MetadataBadge";
import { MetadataBadgePom } from "./MetadataBadge.pom";

const pom = new MetadataBadgePom();
describe("<MetadataBadge/>", () => {
  it("should render component", () => {
    const metadata: TypedMetadata = { key: "customer", value: "intel" };
    cy.mount(<MetadataBadge metadata={metadata} />);
    pom.root.should("contain.text", `${metadata.key} = ${metadata.value}`);
    pom.el.metadataTag.should("not.exist");
  });

  it("should render component for site", () => {
    const metadata: TypedMetadata = {
      key: "customer",
      value: "intel",
      type: "site",
    };
    cy.mount(<MetadataBadge metadata={metadata} />);
    pom.root.should("contain.text", `${metadata.key} = ${metadata.value}`);
    pom.el.metadataTag.should("contain.text", "S");
  });

  it("should render component for region", () => {
    const metadata: TypedMetadata = {
      key: "customer",
      value: "intel",
      type: "region",
    };
    cy.mount(<MetadataBadge metadata={metadata} />);
    pom.root.should("contain.text", `${metadata.key} = ${metadata.value}`);
    pom.el.metadataTag.should("contain.text", "R");
  });
});
