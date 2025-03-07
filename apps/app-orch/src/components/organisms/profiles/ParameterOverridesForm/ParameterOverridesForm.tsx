/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactHookFormCombobox } from "@orch-ui/components";
import { Button, Icon, Text, TextField } from "@spark-design/react";
import {
  ButtonSize,
  ButtonVariant,
  ComboboxSize,
  InputSize,
} from "@spark-design/tokens";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useAppSelector } from "../../../../store/hooks";
import { selectProfile } from "../../../../store/reducers/profile";
import "./ParameterOverridesForm.scss";

export const dataCy = "parameterOverridesForm";

interface ChartParameterDataFormFields {
  parameterOverrides: ChartParameterData[];
}

export interface ChartParameterData {
  name: string;
  type: string;
  defaultValue: string | number | Array<string | number>;
  suggestedValue: string;
  displayName: string;
  flags: string;
}

export const getParameterOverrideType = (
  mandatory?: boolean,
  secret?: boolean,
) => {
  if (mandatory && secret) {
    return "Secret & Required";
  }

  if (mandatory) {
    return "Required";
  }

  if (secret) {
    return "Secret";
  }

  return "Optional";
};

interface ParameterOverridesFormProps {
  params: ChartParameterData[];
  onUpdate: (paramData: ChartParameterData[]) => void;
}
const ParameterOverridesForm = ({
  params,
  onUpdate,
}: ParameterOverridesFormProps) => {
  const cy = { "data-cy": dataCy };

  const { parameterTemplates } = useAppSelector(selectProfile);

  const { control, getValues, setValue } =
    useForm<ChartParameterDataFormFields>({
      defaultValues: {
        parameterOverrides:
          parameterTemplates && parameterTemplates.length > 0
            ? parameterTemplates.map((pt) => ({
                ...pt,
                defaultValue: pt.default,
                // removing from suggestedValue value that is default value to spread data between fields:
                // default chart value and suggested values
                // if the value is an array it was transformed to comma-separated value then need
                // transform back to array before remove it from suggestedValues
                suggestedValue: pt
                  .suggestedValues!.filter((v) => v !== pt.default)
                  .filter((v) => !pt.default!.split(",").includes(v))
                  .toString(),
                flags: getParameterOverrideType(pt.mandatory, pt.secret),
              }))
            : [
                {
                  name: "",
                  displayName: "",
                  type: "",
                  defaultValue: "",
                  suggestedValue: "",
                  flags: "Optional",
                },
              ],
      },
    });

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "parameterOverrides",
  });

  const allParams = params
    .filter(({ defaultValue }) => {
      if (typeof defaultValue === "string") {
        return !defaultValue.includes("{{");
      }
      return true;
    })
    .map(({ name }) => name);

  const getAllParameterData = () => {
    const fields: ChartParameterDataFormFields = structuredClone(getValues());
    return fields.parameterOverrides;
  };

  const getParameterData = (index: number) => {
    const fields: ChartParameterDataFormFields = structuredClone(getValues());
    return fields.parameterOverrides[index];
  };

  const getChartParametersData = () => {
    const fields: ChartParameterDataFormFields = structuredClone(getValues());
    return onUpdate(fields.parameterOverrides);
  };

  return (
    <form {...cy} autoComplete="off" className="parameter-overrides-form">
      {fields.length > 0 && (
        <div className="parameter-overrides-form__labels">
          <Text>Parameter Name</Text>
          <Text>Display Name*</Text>
          <Text>Chart Value</Text>
          <Text>Suggested Values</Text>
          <Text>Type</Text>
          <Button />
        </div>
      )}
      {fields.map((value, index) => (
        <div key={value.id} className="parameter-overrides-form__entries">
          <ReactHookFormCombobox
            dataCy="paramSelect"
            control={control}
            placeholder="Enter a Value"
            id={`rhf-value-${index}`}
            inputsProperty={`parameterOverrides.${index}.name`}
            items={allParams}
            isDisabled={false}
            value={value.name}
            size={ComboboxSize.Large}
            onSelect={(v) => {
              const param = params.find((p) => p.name === v);
              if (param) {
                update(index, {
                  name: param.name,
                  type: param.type,
                  suggestedValue: "",
                  defaultValue: param.defaultValue,
                  displayName: param.displayName,
                  flags: "Optional",
                });
                getChartParametersData();
              }
            }}
          />
          <Controller
            name={`parameterOverrides.${index}.displayName`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                data-cy="displayName"
                size={InputSize.Large}
                minLength={1}
                validationState={
                  !getParameterData(index) ||
                  !getParameterData(index).name.length ||
                  (getParameterData(index).displayName?.length &&
                    !getAllParameterData().some(
                      (cpd, i) =>
                        i !== index &&
                        cpd.displayName === getParameterData(index).displayName,
                    ))
                    ? "valid"
                    : "invalid"
                }
                errorMessage="Unique name required!"
                onBlur={getChartParametersData}
              />
            )}
          />
          <Controller
            name={`parameterOverrides.${index}.defaultValue`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                data-cy="defaultValue"
                size={InputSize.Large}
                value={getParameterData(index).defaultValue.toString()}
                isDisabled
              />
            )}
          />
          <Controller
            name={`parameterOverrides.${index}.suggestedValue`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                data-cy="suggestedValue"
                size={InputSize.Large}
                onBlur={getChartParametersData}
                isDisabled={getParameterData(index).flags.includes("Secret")}
              />
            )}
          />
          <ReactHookFormCombobox
            dataCy="paramFlagsSelect"
            control={control}
            placeholder="Enter a Value"
            id={`rhf-flags-${index}`}
            inputsProperty={`parameterOverrides.${index}.flags`}
            items={["Optional", "Secret", "Required", "Secret & Required"]}
            isDisabled={false}
            value={value.flags}
            size={ComboboxSize.Large}
            onBlur={() => {
              if (getParameterData(index).flags.includes("Secret")) {
                setValue(`parameterOverrides.${index}.suggestedValue`, "");
              }
              if (["Optional"].includes(getParameterData(index).flags)) {
                const paramName = getValues().parameterOverrides[index].name;
                const chartDefaultValue = params.find(
                  (p) => p.name === paramName,
                )?.defaultValue;

                if (
                  chartDefaultValue &&
                  !getValues().parameterOverrides[index].defaultValue
                ) {
                  setValue(
                    `parameterOverrides.${index}.defaultValue`,
                    chartDefaultValue,
                  );
                }
              } else {
                setValue(`parameterOverrides.${index}.defaultValue`, "");
              }
              getChartParametersData();
            }}
          />
          <Button
            data-cy="delete"
            variant={ButtonVariant.Primary}
            iconOnly
            size={ButtonSize.Large}
            onPress={() => {
              remove(index);
              getChartParametersData();
            }}
          >
            <Icon icon="trash" />
          </Button>
        </div>
      ))}
      <Button
        data-cy="add"
        type="button"
        variant={ButtonVariant.Primary}
        size={ButtonSize.Large}
        onPress={() => {
          append({
            name: "",
            displayName: "",
            type: "",
            defaultValue: "",
            suggestedValue: "",
            flags: "Optional",
          });
        }}
      >
        Add Parameter
      </Button>
    </form>
  );
};

export default ParameterOverridesForm;
