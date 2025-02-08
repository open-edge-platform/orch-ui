/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import { Combobox, Item, TextField } from "@spark-design/react";
import { ComboboxSize, ComboboxVariant, TextSize } from "@spark-design/tokens";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { updateMandatoryParam } from "../../../store/reducers/setupDeployment";

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

/** `OverrideValues.values` type */
export interface ParameterOverrideValuePair {
  [key: string]: any;
}

export const dataCy = "applicationProfileOverrideValueComboBoxCell";

interface ApplicationProfileOverrideValueComboBoxCellProps {
  application: catalog.Application;
  parameter: catalog.ParameterTemplate;
  overrideValue?: string;
  onUpdate: (obj: ParameterOverrideValuePair) => void;
}

const ApplicationProfileOverrideValueComboBoxCell = ({
  application,
  parameter,
  overrideValue,
  onUpdate,
}: ApplicationProfileOverrideValueComboBoxCellProps) => {
  const cy = { "data-cy": dataCy };
  const dispatch = useAppDispatch();

  const [valid, setValid] = useState<boolean>(true);
  const [secretValue, setSecretValue] = useState<string>("");

  const checkValidation = (value: string) => {
    setValid(value.length === 0 || value.trim().length !== 0);
  };

  useEffect(() => {
    if (parameter.secret && overrideValue) {
      setSecretValue(overrideValue);
    }
    if (parameter.mandatory && !overrideValue) {
      setValid(false);
    }
  }, [parameter]);

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
            onUpdate(createOverrideValue(parameter, secretValue));
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
            onUpdate(createOverrideValue(parameter, e.target.value));
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
