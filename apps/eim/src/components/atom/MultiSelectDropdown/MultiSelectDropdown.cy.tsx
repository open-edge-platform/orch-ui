/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import MultiSelectDropdown, {
  MultiDropdownOption,
} from "./MultiSelectDropdown";
import { MultiSelectDropdownPom } from "./MultiSelectDropdown.pom";

const pom = new MultiSelectDropdownPom();
describe("<MultiSelectDropdown/>", () => {
  const TestingComponent = () => {
    const [optionState, setOptionState] = useState<MultiDropdownOption[]>(
      ["Option1", "Option2", "Option3", "Option4"].map((option) => ({
        id: option,
        isSelected: false,
        text: option,
      })),
    );

    return (
      <>
        <MultiSelectDropdown
          label="Dropdown"
          onSelectionChange={setOptionState}
          selectOptions={optionState}
        />
        <div data-cy="testResult">
          {optionState
            .filter((opt) => opt.isSelected)
            .map((opt) => opt.text)
            .join(",")}
        </div>
      </>
    );
  };
  it("should select options", () => {
    cy.mount(<TestingComponent />);
    pom.selectFromMultiDropdown(["Option1", "Option3"]);
    pom.root.click();
    cy.get("[data-cy='testResult']").should("have.text", "Option1,Option3");
  });

  it("should select all", () => {
    cy.mount(<TestingComponent />);

    // Select all
    pom.selectFromMultiDropdown(["Select All"]);
    pom.root.click();
    cy.get("[data-cy='testResult']").should(
      "have.text",
      "Option1,Option2,Option3,Option4",
    );

    // Deselect all
    pom.selectFromMultiDropdown(["Select All"]);
    pom.root.click();
    cy.get("[data-cy='testResult']").should("have.text", "");
  });
});
