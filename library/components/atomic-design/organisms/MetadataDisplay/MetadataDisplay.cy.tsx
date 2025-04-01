/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { MetadataDisplay } from "./MetadataDisplay";
import { MetadataDisplayPom } from "./MetadataDisplay.pom";

const pom = new MetadataDisplayPom();
describe("<MetadataDisplay/>", () => {
  it("should render component", () => {
    cy.mount(<MetadataDisplay metadata={[]} />);
    pom.root.should("exist");
  });

  it("should render all the provided metadata", () => {
    const metadata = [
      { key: "customer", value: "intel" },
      { key: "region", value: "us" },
      { key: "state", value: "california" },
    ];
    cy.mount(<MetadataDisplay metadata={metadata} />);
    metadata.forEach((m) => {
      pom.getByKey(m.key).should("contain.text", `${m.key} = ${m.value}`);
    });
  });
});
