/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import {
  AdvancedSettingsToggle,
  ConfirmationDialog,
  Textarea,
} from "@orch-ui/components";
import { Heading, TextField } from "@spark-design/react";
import { ButtonVariant, InputSize } from "@spark-design/tokens";
import yaml from "js-yaml";
import { useEffect, useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  clearParameterOverrides,
  clearProfile,
  selectProfile,
  setChartValues,
  setDescription,
  setDisplayName,
  setParameterOverrides,
} from "../../../../store/reducers/profile";
import { getDisplayNameValidationErrorMessage } from "../../../../utils/global";
import { ProfileInputs } from "../../../pages/ApplicationCreateEdit/ApplicationCreateEdit";
import ParameterOverridesForm, {
  ChartParameterData,
} from "../ParameterOverridesForm/ParameterOverridesForm";
import "./ApplicationProfileForm.scss";

const dataCy = "applicationProfileForm";

const parseObject = (obj: object, currentPath = ""): ChartParameterData[] => {
  if (currentPath.length > 0) currentPath = `${currentPath}.`;
  return Object.entries(obj).flatMap(([key, value]) => {
    const keyName = key.replaceAll(".", "\\.");

    let type: string;
    if (Array.isArray(value)) {
      type = "array";
    } else {
      type = typeof value;
    }

    switch (type) {
      case "object":
        return parseObject(value, `${currentPath}${key}`);

      default:
        return {
          name: `${currentPath}${keyName}`,
          type,
          defaultValue: value,
          suggestedValue: "",
          displayName: "",
          flags: "Optional",
        };
    }
  });
};

const extractParametersFromChart = (values: string) => {
  if (!values.length || !values.includes(":")) return [];

  try {
    const obj = yaml.load(values) as object;
    return parseObject(obj);
  } catch (e) {
    return false;
  }
};

const isValidYaml = (values: string) => {
  try {
    yaml.load(values);
    return true;
  } catch (e) {
    return false;
  }
};

interface ApplicationProfileFormProps {
  control: Control<ProfileInputs, string>;
  errors: FieldErrors<ProfileInputs>;
  isCreating?: boolean;
  show: boolean;
  yamlHasError: boolean;
  setYamlHasError: (hasError: boolean) => void;
  setParamsOverrideHasError: (hasError: boolean) => void;
}

const ApplicationProfileForm = ({
  control,
  errors,
  isCreating = true,
  show,
  yamlHasError = false,
  setYamlHasError,
  setParamsOverrideHasError,
}: ApplicationProfileFormProps) => {
  const cy = { "data-cy": dataCy };
  const dispatch = useAppDispatch();
  const { displayName, description, chartValues, parameterTemplates } =
    useAppSelector(selectProfile);

  const [chartParameters, setChartParameters] = useState<ChartParameterData[]>(
    [],
  );
  const [advancedSettings, setAdvancedSettings] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<{
    show: boolean;
    input: string;
  }>({
    show: false,
    input: "",
  });

  const profileNameLength = 26;

  const transformChartValuesToParameters = (chartValues: string) => {
    const chartParams = extractParametersFromChart(chartValues);
    if (Array.isArray(chartParams) && chartParams.length > 0) {
      setChartParameters(chartParams);
    }
  };

  useEffect(() => {
    if (!show) {
      setAdvancedSettings(false);
      clearChartParams();
      dispatch(clearProfile());
    } else if (!isCreating) {
      if (parameterTemplates && parameterTemplates.length > 0) {
        setAdvancedSettings(true);
      }
      if (chartValues) {
        transformChartValuesToParameters(chartValues);
      }
    }
  }, [show]);

  const clearChartParams = () => {
    setChartParameters([]);
    dispatch(clearParameterOverrides());
    setParamsOverrideHasError(false);
  };

  const transformToParameterTemplate = ({
    name,
    displayName,
    type,
    defaultValue,
    suggestedValue,
    flags,
  }: ChartParameterData) => {
    let suggestedValues: string[] = [];
    if (Array.isArray(defaultValue)) {
      suggestedValues = suggestedValues.concat(
        ...defaultValue.map((i) => i.toString()),
      );
    } else {
      suggestedValues = suggestedValues.concat(defaultValue.toString());
    }
    suggestedValues = suggestedValues.concat(suggestedValue.split(","));
    const parameterTemplate: catalog.ParameterTemplate = {
      name,
      displayName,
      type,
      validator: "",
      default: defaultValue.toString(),
      suggestedValues: [
        ...new Set(suggestedValues.filter((value) => value !== "")),
      ],
      mandatory: flags.includes("Required"),
      secret: flags.includes("Secret"),
    };
    return parameterTemplate;
  };

  const onParameterOverridesUpdate = (paramData: ChartParameterData[]) => {
    if (
      paramData.every(
        ({ name, displayName }) => !name || displayName.length > 0,
      ) &&
      paramData.length ===
        new Set(paramData.map(({ displayName }) => displayName)).size
    ) {
      dispatch(
        setParameterOverrides(
          paramData
            .filter(({ name }) => name.length > 0) // only rows with selected parameter
            .filter(
              // filter selected duplicate of parameters
              // this filter can be removed if ParameterOverridesForm will allow only unique parameters to be picked
              ({ name }, index, array) =>
                array.map((v) => v.name).indexOf(name) === index,
            )
            .map(transformToParameterTemplate),
        ),
      );
      setParamsOverrideHasError(false);
    } else {
      setParamsOverrideHasError(true);
    }
  };

  return (
    <form className="application-profile-form" {...cy}>
      <Controller
        name="displayName"
        control={control}
        rules={{
          required: isCreating,
          maxLength: profileNameLength,
          pattern: new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9-]{0,24}[a-zA-Z0-9]?$/),
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            value={displayName}
            onInput={(e) => dispatch(setDisplayName(e.currentTarget.value))}
            errorMessage={getDisplayNameValidationErrorMessage(
              errors.displayName?.type,
              profileNameLength,
              {
                space: false,
                slash: false,
              },
            )}
            validationState={
              errors.displayName && Object.keys(errors.displayName).length > 0
                ? "invalid"
                : "valid"
            }
            isDisabled={!isCreating}
            isRequired={true}
            size={InputSize.Large}
            data-cy="nameInput"
          />
        )}
      />
      <Textarea
        label="Description"
        value={description}
        onChange={(e) => dispatch(setDescription(e.currentTarget.value))}
        dataCy="descriptionInput"
      />
      <Controller
        name="chartValues"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            label="Chart values*"
            value={chartValues}
            description="YAML syntax values"
            rows={10}
            onChange={(e) => {
              if (chartParameters.length > 0) {
                setConfirmation({ show: true, input: e.currentTarget.value });
                return;
              }
              dispatch(setChartValues(e.currentTarget.value));
              setYamlHasError(false);
              if (!isValidYaml(e.currentTarget.value)) {
                setYamlHasError(true);
              }
              setAdvancedSettings(false);
              clearChartParams();
            }}
            dataCy="chartValuesInput"
            errorMessage="Invalid chart values"
            validationState={!yamlHasError}
          />
        )}
      />
      <Heading semanticLevel={6}>Advanced Settings</Heading>
      <AdvancedSettingsToggle
        message="Allow users to override selected profile values at deployment time?"
        value={advancedSettings}
        onChange={(value) => {
          setAdvancedSettings(value);
          if (value && chartValues) {
            transformChartValuesToParameters(chartValues);
          }
        }}
      />
      {advancedSettings && (
        <ParameterOverridesForm
          params={chartParameters}
          onUpdate={onParameterOverridesUpdate}
        />
      )}
      {confirmation.show && (
        <ConfirmationDialog
          content="By editing yaml you will lose parameter overrides. Do you want to continue?"
          isOpen={true}
          confirmCb={() => {
            dispatch(setChartValues(confirmation.input));
            setYamlHasError(false);
            if (!isValidYaml(confirmation.input)) {
              setYamlHasError(true);
            }
            setConfirmation({ show: false, input: "" });
            setAdvancedSettings(false);
            clearChartParams();
          }}
          confirmBtnText="OK"
          confirmBtnVariant={ButtonVariant.Action}
          cancelCb={() => setConfirmation({ show: false, input: "" })}
        />
      )}
    </form>
  );
};

export default ApplicationProfileForm;
