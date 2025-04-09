/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { setupStore } from "../../../../../store";
import Review from "./Review";
import ReviewPom from "./Review.pom";

const pom = new ReviewPom();
describe("<Review/>", () => {
  beforeEach(() => {
    const store = setupStore({
      cluster: { name: "name", template: "template-v1.3.4" },
    });
    // @ts-ignore
    window.store = store;

    cy.mount(<Review accumulatedMeta={[{ key: "key", value: "value" }]} />, {
      reduxStore: store,
    });
  });

  it("should render component", () => {
    pom.root.should("exist");
    pom.el.clusterName.should("have.text", "name");
    pom.el.clusterTemplateName.should("have.text", "template-v1.3.4");
    pom.el.trustedCompute.should("contain.text", "Not compatible");
    pom.el.metadataBadge.should("have.text", "key = value");
  });
});
