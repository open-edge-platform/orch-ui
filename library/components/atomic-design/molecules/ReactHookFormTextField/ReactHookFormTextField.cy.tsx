/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { useForm } from "react-hook-form";
import { ReactHookFormTextField } from "./ReactHookFormTextField";
import { ReactHookFormTextFieldPom } from "./ReactHookFormTextField.pom";

type MockField = { field: string };
const defaultFieldValue = "default value";
interface MockReactHookFormTextFieldProps {
  validate?: any;
}
const MockReactHookFormTextField = ({
  validate,
}: MockReactHookFormTextFieldProps) => {
  const { control } = useForm<MockField>({
    defaultValues: { field: defaultFieldValue },
    mode: "onChange",
  });
  return (
    <ReactHookFormTextField
      label="Cy Test"
      control={control}
      id="cyId"
      inputsProperty="field"
      validate={validate}
    />
  );
};

const pom = new ReactHookFormTextFieldPom();
describe("<ReactHookFormTextField/>", () => {
  describe("With basic functionality should", () => {
    beforeEach(() => {
      cy.mount(<MockReactHookFormTextField />);
    });
    it("render component with defaults", () => {
      pom.root.should("exist");
      pom.root.should("have.value", defaultFieldValue);
    });

    it("show is required error on empty", () => {
      pom.root.clear();
      // TODO:  SI is putting the data-cy on the input instead of at the root
      // ideally this should be pom.root.contains(...)
      cy.contains("Is Required");
    });
  });

  describe("With custom validation should", () => {
    const errorMessage = "No 🍌 allowed";
    it("show error on validate", () => {
      cy.mount(
        <MockReactHookFormTextField
          validate={{
            banana: (value: string) => value !== "Banana" || errorMessage,
          }}
        />,
      );
      pom.root.clear();
      pom.root.type("Banana");
      cy.contains(errorMessage);
    });
  });
});
