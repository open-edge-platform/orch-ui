/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Slider } from "./Slider";
import { SliderPom } from "./Slider.pom";

const pom = new SliderPom("slider");
describe("<Slider/>", () => {
  it("should render component", () => {
    cy.mount(<Slider defaultValue={30} />);
    pom.root.should("exist");
    pom.el.rangeInput.should("have.value", 30);
    pom.el.numberInput.should("have.value", 30);
  });
  it("should be able to change value manually", () => {
    cy.mount(<Slider defaultValue={30} />);
    pom.root.should("exist");
    pom.el.numberInput.clear().type("60");
    pom.el.numberInput.should("have.value", 60);
    pom.el.rangeInput.invoke("val", 60).trigger("change");
    pom.el.rangeInput.should("have.value", 60);
  });
  it("should load min and max value", () => {
    cy.mount(<Slider defaultValue={100} min={10} max={60} />);
    pom.root.should("exist");
    pom.el.rangeInput.should("have.value", 60);
  });
  it("should load min and max value", () => {
    cy.mount(<Slider defaultValue={0} min={10} max={60} />);
    pom.root.should("exist");
    pom.el.rangeInput.should("have.value", 10);
  });
});
