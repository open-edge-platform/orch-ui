/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { mergeRecursive } from "@orch-ui/utils";
import { Combobox, Item, TextField } from "@spark-design/react";
import { ComboboxSize, ComboboxVariant, TextSize } from "@spark-design/tokens";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  profileParameterOverridesSelector,
  setProfileParameterOverrides,
  updateMandatoryParam,
} from "../../../store/reducers/setupDeployment";

/** Converts dot-separated key/value pairs to a JSON format, eg:
 * - "foo = bar" -> {foo: bar}
 * - "nested.foo = bar" -> {nested: {foo: bar}}
 * - "nested.escaped\.dot.foo = bar" -> {nested: {"escaped.dot": {foo: bar}}}
 *
 * This is an encoder. it has a equivalent decoder `parseOverrideValue()`.
 */
export const createOverrideValue = (
  parameter: catalog.ParameterTemplate,
  value: string,
) => {
  const obj: ParameterOverrideValuePair = {};
  const path = parameter.name.replaceAll("\\.", ":");
  const elements = path.split(".");

  /** JSON part from root level */
  let newPart: ParameterOverrideValuePair = obj;

  // Top to bottom approach
  elements.forEach((part, i) => {
    const unescapedPart = part.replaceAll(":", ".");
    if (i < elements.length - 1) {
      // save current element level
      newPart[unescapedPart] = newPart[unescapedPart] || {};
      // focus on next inner element level
      newPart = newPart[unescapedPart];
    } else {
      // save last element obtained for override combobox
      // this will go within previous element level from last `if block` above
      newPart[unescapedPart] = value;
    }
  });

  return obj;
};

/** parse for `override-value` of current `parameter` from
 * `parameterOverrideList` of `override-value` settings.
 *
 * This is an decoder. It has a equivalent encoder `createOverrideValue()`.
 */
export const parseOverrideValue = (
  parameterOverrideList: ParameterOverrideValuePair,
  parameter: catalog.ParameterTemplate,
) => {
  const path = parameter.name.replaceAll("\\.", ":");
  const elements = path.split(".");
  const parameterParts = elements.map((part) => part.replaceAll(":", "."));

  let partValue = parameterOverrideList;
  for (const part of parameterParts) {
    if (part in partValue) {
      if (part !== parameterParts[parameterParts.length - 1]) {
        // if not the last part
        partValue = partValue[part]; // move downward in path recursively
      } else {
        // if last part then this is our value
        return partValue[part] as string; // set value found
      }
    } else {
      break;
    }
  }
  return "";
};

export const removeEmptyValues = (values: ParameterOverrideValuePair) => {
  Object.keys(values).forEach((key) => {
    if (typeof values[key] === "object") removeEmptyValues(values[key]);
    if (values[key] === "") delete values[key];
  });
};

const removeEmptyObjects = (
  values: ParameterOverrideValuePair,
): ParameterOverrideValuePair => {
  const objectNonEmptyKeys: ParameterOverrideValuePair = {};
  const keys = Object.keys(values);
  if (keys.length === 0) {
    return {};
  } else {
    Object.keys(values).forEach((key) => {
      if (typeof values[key] === "object") {
        const partNonEmptyKeys = removeEmptyObjects(values[key]);
        if (Object.keys(partNonEmptyKeys).length > 0) {
          objectNonEmptyKeys[key] = partNonEmptyKeys;
        }
      } else {
        objectNonEmptyKeys[key] = values[key];
      }
    });
    return objectNonEmptyKeys;
  }
};

/** `OverrideValues.values` type */
export interface ParameterOverrideValuePair {
  [key: string]: any;
}

const dataCy = "applicationProfileOverrideValueComboBoxCell";

interface ApplicationProfileOverrideValueComboBoxCellProps {
  application: catalog.Application;
  parameter: catalog.ParameterTemplate;
}

const ApplicationProfileOverrideValueComboBoxCell = ({
  application,
  parameter,
}: ApplicationProfileOverrideValueComboBoxCellProps) => {
  const cy = { "data-cy": dataCy };
  const dispatch = useAppDispatch();
  const overrideValues = useAppSelector(profileParameterOverridesSelector);

  /** stored override values belonging specifically to the application */
  const overrides = overrideValues[application.name] ?? {
    appName: application.name,
  };
  const selectedValues: ParameterOverrideValuePair = overrides.values ?? {};

  const overrideValue = parseOverrideValue(selectedValues, parameter);

  const [valid, setValid] = useState<boolean>(true);
  const [secretValue, setSecretValue] = useState<string>("");

  const checkValidation = (value: string) => {
    setValid(value.length === 0 || value.trim().length !== 0);
  };

  // Moved overrideHandler from parent component
  const handleOverride = (value: ParameterOverrideValuePair) => {
    let updatedParameterOverrides: ParameterOverrideValuePair = mergeRecursive(
      structuredClone(selectedValues),
      value,
    );

    removeEmptyValues(updatedParameterOverrides);
    updatedParameterOverrides = removeEmptyObjects(updatedParameterOverrides);

    dispatch(
      setProfileParameterOverrides({
        profileParameterOverrides: {
          [application.name]: {
            appName: overrides.appName,
            values: { ...updatedParameterOverrides },
          },
        },
        clear: false,
      }),
    );
  };

  useEffect(() => {
    if (parameter.secret && overrideValue) {
      setSecretValue(overrideValue);
    }
    if (parameter.mandatory && !overrideValue) {
      setValid(false);
    }
  }, [parameter, overrideValue]);

  return (
    <div {...cy} className="application-profile-override-value-combox-cell">
      {parameter.secret ? (
        <TextField
          type="password"
          autoComplete="off"
          value={secretValue}
          onChange={(value) => {
            setSecretValue(value);
            checkValidation(value);
          }}
          onBlur={() => {
            handleOverride(createOverrideValue(parameter, secretValue));
            if (parameter.mandatory) {
              dispatch(
                updateMandatoryParam({
                  param: `${application.name}.${parameter.name}`,
                  value: secretValue,
                }),
              );
            }
          }}
          size={TextSize.Large}
          isRequired={parameter.mandatory}
          validationState={valid ? "valid" : "invalid"}
          errorMessage="This field cannot be empty."
        />
      ) : (
        <Combobox
          className="override-value"
          data-cy="comboxParams"
          aria-label="override-values"
          variant={ComboboxVariant.Primary}
          defaultInputValue={overrideValue}
          onInputChange={(value: string) => checkValidation(value)}
          onBlur={(e) => {
            handleOverride(createOverrideValue(parameter, e.target.value));
            if (parameter.mandatory) {
              dispatch(
                updateMandatoryParam({
                  param: `${application.name}.${parameter.name}`,
                  value: e.target.value,
                }),
              );
            }
          }}
          validationState={valid ? "valid" : "invalid"}
          allowsCustomValue
          placeholder="Type or select from the list"
          errorMessage="This field cannot be empty."
          size={ComboboxSize.Large}
          isRequired={parameter.mandatory}
        >
          {parameter.suggestedValues?.map((value) => (
            <Item key={value}>{value}</Item>
          )) ?? []}
        </Combobox>
      )}
    </div>
  );
};

export default ApplicationProfileOverrideValueComboBoxCell;
