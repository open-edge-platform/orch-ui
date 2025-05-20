/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import { RadioGroup } from "@spark-design/react";
import { RadioCard } from "./RadioCard";
import { RadioCardPom } from "./RadioCard.pom";

const pom = new RadioCardPom();
describe("<RadioCard/>", () => {
  beforeEach(() => {
    cy.mount(
      <RadioGroup onChange={() => {}}>
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
  it("should have default data-cy on the root element", () => {
    pom.root.should("have.attr", "data-cy", "radioCard");
  });
  it("should accept custom data-cy", () => {
    cy.mount(
      <RadioGroup onChange={() => {}}>
        <RadioCard
          value="test"
          label="Test"
          description="description of radio button"
          dataCy="customRadioCard"
        />
      </RadioGroup>,
    );
    cyGet("customRadioCard").should("exist");
  });
  it("should assign correct value to the RadioButton", () => {
    cy.mount(
      <RadioGroup onChange={() => {}}>
        <RadioCard value="expected-value" label="label" description="desc" />
      </RadioGroup>,
    );
    cyGet("radioBtn").should("have.attr", "value", "expected-value");
  });
  it("should have the correct root CSS class", () => {
    cyGet("radioCard").should("have.class", "radio-card");
  });
});
