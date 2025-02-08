/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { RadioGroup } from "@spark-design/react";
import { RadioCard } from "./RadioCard";
import { RadioCardPom } from "./RadioCard.pom";

const pom = new RadioCardPom();
describe("<RadioCard/>", () => {
  beforeEach(() => {
    cy.mount(
      <RadioGroup onChange={(value) => {}}>
        <RadioCard
          value="test"
          label="Test"
          description="description of radio button"
        />
      </RadioGroup>,
    );
  });
  it("should render component", () => {
    pom.root.should("exist");
    pom.root.contains("Test");
    pom.el.description.contains("description of radio button");
  });
});
