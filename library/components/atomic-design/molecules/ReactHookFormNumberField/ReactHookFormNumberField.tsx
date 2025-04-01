/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { NumberField } from "@spark-design/react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  Validate,
} from "react-hook-form";
import "./ReactHookFormNumberField.scss";
export interface ReactHookFormNumberFieldProps<T extends FieldValues> {
  dataCy?: string;
  control: Control<T>;
  inputsProperty: Path<T>;
  id: string;
  className?: string;
  validate?: Record<string, Validate<PathValue<T, Path<T>>, T>>;
  label: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  placeholder?: number;
  minValue?: number;
  maxValue?: number;
  units?: string;
  onError?: (message: string) => void;
  onValid?: () => void;
  onChange?: (value: number) => void;
}
export const ReactHookFormNumberField = <T extends FieldValues>({
  dataCy = "reactHookFormNumberField",
  control,
  id,
  className,
  label,
  isRequired = true,
  isDisabled,
  validate,
  inputsProperty,
  minValue,
  maxValue,
  units,
  onError,
  onValid,
  onChange: onChangeProp,
}: ReactHookFormNumberFieldProps<T>) => {
  const rhfnf = "react-hook-form-number-field";
  return (
    <Controller
      name={inputsProperty}
      control={control}
      rules={{
        required: { value: isRequired, message: "Is Required" },
        validate: isRequired ? validate : undefined,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const validationState = error ? "invalid" : "valid";
        const message = error?.message;
        if (error && error.message && onError) onError(error.message);
        if (!error && onValid) onValid();

        return (
          <NumberField
            data-cy={dataCy}
            className={`${rhfnf} ${className ?? ""}`.trim()}
            id={id}
            label={label}
            isDisabled={isDisabled}
            validationState={validationState as any}
            errorMessage={message}
            value={value}
            numberUnit={units}
            minValue={minValue}
            maxValue={maxValue}
            onInput={(evt) => {
              const {
                currentTarget: { value },
              } = evt;
              onChange(value);
              if (onChangeProp) onChangeProp(Number(value));
            }}
            onChange={(value: number) => {
              onChange(value);
              if (onChangeProp) onChangeProp(value);
            }}
          />
        );
      }}
    />
  );
};
