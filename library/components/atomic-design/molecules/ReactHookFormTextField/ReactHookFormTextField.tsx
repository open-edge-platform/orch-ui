/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { TextField } from "@spark-design/react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  Validate,
} from "react-hook-form";

import "./ReactHookFormTextField.scss";

export interface ReactHookFormTextFieldProps<T extends FieldValues> {
  control: Control<T>;
  dataCy?: string;
  inputsProperty: Path<T>;
  id: string;
  label?: string;
  type?: "text" | "search" | "url" | "tel" | "email" | "password";
  isRequired?: boolean;
  maxLength?: number;
  isDisabled?: boolean;
  placeholder?: string;
  validate?: Record<string, Validate<PathValue<T, Path<T>>, T>>;
  className?: string;
  onError?: (message: string) => void;
  onValid?: () => void;
  onChange?: (value: string) => void;
  value?: string;
}

export const ReactHookFormTextField = <T extends FieldValues>({
  control,
  dataCy = "reactHookFormTextField",
  inputsProperty,
  id,
  label,
  type = "text",
  isRequired = true,
  maxLength = undefined,
  placeholder,
  isDisabled,
  validate,
  className,
  onError,
  onValid,

  onChange: onChangeProp,
}: ReactHookFormTextFieldProps<T>): JSX.Element => {
  const rhftf = "react-hook-form-text-field";
  return (
    <Controller
      name={inputsProperty}
      control={control}
      rules={{
        required: { value: isRequired, message: "Is Required" },
        validate,
        // Example of how to create a validate block, || statement turns into displayed error message
        // validate: {
        //   banana: (value) => value !== "Banana" || "No banana",
        //   apple: (value) => value !== "Apple" || "No apple",
        // },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const validationState = error ? "invalid" : "valid";
        const message = error?.message;
        if (error && error.message && onError) onError(error.message);
        if (!error && onValid) onValid();

        return (
          <TextField
            data-cy={dataCy}
            className={`${rhftf} ${className ?? ""}`.trim()}
            id={id}
            type={type}
            label={label}
            isDisabled={isDisabled}
            placeholder={placeholder}
            maxLength={maxLength}
            validationState={validationState as any}
            errorMessage={message}
            value={value}
            onChange={(value: string) => {
              onChange(value);
              if (onChangeProp) onChangeProp(value);
            }}
          />
        );
      }}
    />
  );
};
