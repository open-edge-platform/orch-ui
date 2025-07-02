/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import ReviewAndCustomize from "./ReviewAndCustomize";
import ReviewAndCustomizePom from "./ReviewAndCustomize.pom";

const pom = new ReviewAndCustomizePom();
describe("<ReviewAndCustomize/>", () => {
  it("should render component", () => {
    cy.mount(<ReviewAndCustomize />);
    pom.root.should("exist");
  });
});
