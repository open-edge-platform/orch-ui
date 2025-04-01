/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckboxSelectionList } from "./CheckboxSelectionList";
import { CheckboxSelectionListPom } from "./CheckboxSelectionList.pom";

const pom = new CheckboxSelectionListPom();
describe("<CheckboxSelectionList/>", () => {
  beforeEach(() => {
    cy.mount(
      <CheckboxSelectionList
        label={""}
        options={[
          {
            id: "item-1",
            name: "Item 1",
            isSelected: true,
          },
          {
            id: "item-2",
            name: "Item 2",
            isSelected: false,
          },
          {
            id: "item-3",
            name: "Item 3",
            isSelected: false,
          },
        ]}
        onSelectionChange={cy.stub().as("onSelect")}
      />,
    );
  });

  it("should select a checkbox", () => {
    pom.getCheckbox("item-2").should("have.class", "spark-checkbox-un-checked");
    pom.getCheckbox("item-2").click();
    pom.getCheckbox("item-2").should("have.class", "spark-checkbox-checked");
  });

  it("should show selection", () => {
    pom.getCheckbox("item-1").should("have.class", "spark-checkbox-checked");
  });

  it("should select by checkbox label", () => {
    pom.getCheckbox("item-3").should("have.class", "spark-checkbox-un-checked");
    pom.getLabel("item-3").click();
    pom.getCheckbox("item-3").should("have.class", "spark-checkbox-checked");
  });

  it("should call onSelectionChange on selection", () => {
    pom.getLabel("item-3").click();
    cy.get("@onSelect").should("be.calledWith", "item-3", true);
  });

  it("should call onSelectionChange on deselection", () => {
    pom.getLabel("item-1").click();
    cy.get("@onSelect").should("be.calledWith", "item-1", false);
  });
});
