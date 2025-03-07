/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Combobox, Item } from "@spark-design/react";
import { ComboboxSize } from "@spark-design/tokens";
import { useRef } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  Validate,
} from "react-hook-form";

export interface ReactHookFormComboboxProps<T extends FieldValues> {
  control: Control<T>;
  dataCy?: string;
  inputsProperty: Path<T>;
  id: string;
  items: string[];
  label?: string;
  value?: string;
  placeholder?: string;
  size?: ComboboxSize;
  validate?: Record<string, Validate<PathValue<T, Path<T>>, T>>;
  onError?: (message: string) => void;
  onValid?: () => void;
  onChange?: (value: string) => void;
  onSelect?: (value: string) => void;
  onBlur?: (value: string) => void;
  isDisabled: boolean;
}

export const ReactHookFormCombobox = <T extends FieldValues>({
  control,
  dataCy = "reactHookFormCombobox",
  inputsProperty,
  id,
  label,
  value,
  placeholder,
  size = ComboboxSize.Medium,
  items,
  validate,
  onError,
  onValid,
  onChange: onChangeProp,
  onSelect,
  onBlur,
  isDisabled = false,
}: ReactHookFormComboboxProps<T>): JSX.Element => {
  const localValue = useRef(value);
  return (
    <Controller
      name={inputsProperty}
      control={control}
      rules={{
        required: { value: true, message: "Is Required" },
        validate,
        // Example of how to create a validate block, || statement turns into displayed error message
        // validate: {
        //   banana: (value) => value !== "Banana" || "No banana",
        //   apple: (value) => value !== "Apple" || "No apple",
        // },
      }}
      render={({ field: { onChange }, fieldState: { error } }) => {
        const validationState = error ? "invalid" : "valid";
        const message = error?.message;
        if (error && error.message && onError) onError(error.message);
        if (!error && onValid) onValid();

        return (
          <Combobox
            data-cy={dataCy}
            id={id}
            label={label}
            placeholder={placeholder}
            allowsCustomValue={true}
            validationState={validationState as any} //TODO : how to reference ValidationState
            errorMessage={message}
            inputValue={localValue.current}
            isDisabled={isDisabled}
            size={size}
            onInputChange={(value: string) => {
              localValue.current = value;
              onChange(value); //onChange here refers to React-Hook-Form version
              if (onChangeProp) onChangeProp(value);
            }}
            onSelectionChange={(value: any) => {
              if (onSelect) onSelect(value);
            }}
            onBlur={(e) => {
              if (onBlur) onBlur(e.currentTarget.value);
            }}
          >
            {items.map((value: string) => (
              <Item key={value}>{value}</Item>
            ))}
          </Combobox>
        );
      }}
    />
  );
};
