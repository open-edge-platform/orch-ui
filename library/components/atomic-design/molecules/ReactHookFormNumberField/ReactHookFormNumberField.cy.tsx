/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { useForm } from "react-hook-form";
import { ReactHookFormNumberField } from "./ReactHookFormNumberField";
import { ReactHookFormNumberFieldPom } from "./ReactHookFormNumberField.pom";

type MockField = { field: number };
const defaultFieldValue = 0;
interface MockReactHookFormNumberFieldProps {
  validate?: any;
}
const MockReactHookFormNumberField = ({
  validate,
}: MockReactHookFormNumberFieldProps) => {
  const { control, getValues } = useForm<MockField>({
    defaultValues: { field: defaultFieldValue },
    mode: "onChange",
  });
  return (
    <ReactHookFormNumberField
      label="Cy Test"
      control={control}
      id="cyId"
      inputsProperty="field"
      validate={validate}
    />
  );
};

const pom = new ReactHookFormNumberFieldPom();
describe("<ReactHookFormNumberField/>", () => {
  it("should render component", () => {
    cy.mount(<MockReactHookFormNumberField />);
    pom.root.should("exist");
  });
});
