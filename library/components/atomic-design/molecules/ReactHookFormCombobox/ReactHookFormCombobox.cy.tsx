/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { useForm } from "react-hook-form";
import { ReactHookFormCombobox } from "./ReactHookFormCombobox";
import { ReactHookFormComboboxPom } from "./ReactHookFormCombobox.pom";

type MockField = { field: string };
const defaultFieldValue = "default value";
const comboboxItems = ["Apple", "Banana", "Carrot"];
interface MockReactHookFormTextFieldProps {
  validate?: any;
  isDisabled?: boolean;
}
const MockReactHookFormCombobox = ({
  validate,
  isDisabled = false,
}: MockReactHookFormTextFieldProps) => {
  const { control, getValues } = useForm<MockField>({
    defaultValues: { field: defaultFieldValue },
    mode: "onChange",
  });
  return (
    <ReactHookFormCombobox
      isDisabled={isDisabled}
      label="Cy Test"
      control={control}
      id="cyId"
      inputsProperty="field"
      validate={validate}
      value={getValues().field}
      items={comboboxItems}
    />
  );
};

const pom = new ReactHookFormComboboxPom();
describe("<ReactHookFormCombobox/>", () => {
  describe("With basic functionality should", () => {
    beforeEach(() => {
      cy.mount(<MockReactHookFormCombobox />);
    });

    it("should render component with defaults", () => {
      pom.root.should("exist");
      pom.getInput().should("have.value", defaultFieldValue);
    });

    it("select value via the provided options", () => {
      pom.selectComboboxItem(comboboxItems.length - 1);
      pom
        .getInput(false)
        .should("have.value", comboboxItems[comboboxItems.length - 1]);
    });

    it("show is required error on empty", () => {
      pom.getInput().clear();
      pom.root.contains("Is Required");
    });
  });

  describe("With custom validation should", () => {
    const errorMessage = "No 🍌 allowed";
    it("show error on validate when typed", () => {
      cy.mount(
        <MockReactHookFormCombobox
          validate={{
            banana: (value: string) => value !== "Banana" || errorMessage,
          }}
        />,
      );
      pom.getInput().clear().type("Banana");
      cy.contains(errorMessage);
    });
  });

  describe("when disabled", () => {
    it("should not be editable", () => {
      cy.mount(<MockReactHookFormCombobox isDisabled={true} />);
      pom.getInput(false).should("be.disabled");
    });
  });
});
