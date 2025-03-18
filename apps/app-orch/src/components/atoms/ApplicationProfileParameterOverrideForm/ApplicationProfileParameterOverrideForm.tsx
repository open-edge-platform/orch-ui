/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm, catalog } from "@orch-ui/apis";
import { Empty, Table, TableColumn } from "@orch-ui/components";
import { mergeRecursive } from "@orch-ui/utils";
import { TextField } from "@spark-design/react";
import { TextSize } from "@spark-design/tokens";
import { getParameterOverrideType } from "../../organisms/profiles/ParameterOverridesForm/ParameterOverridesForm";
import ApplicationProfileOverrideValueComboxCell, {
  ParameterOverrideValuePair,
  parseOverrideValue,
} from "../ApplicationProfileOverrideValueComboBoxCell/ApplicationProfileOverrideValueComboBoxCell";
import "./ApplicationProfileParameterOverrideForm.scss";

const dataCy = "applicationProfileParameterOverrideForm";

export const removeEmptyValues = (values: ParameterOverrideValuePair) => {
  Object.keys(values).forEach((key) => {
    if (typeof values[key] === "object") removeEmptyValues(values[key]);
    if (values[key] === "") delete values[key];
  });
};

export const removeEmptyObjects = (
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

interface ApplicationProfileParameterOverrideFormProps {
  application: catalog.Application;
  applicationProfile: catalog.Profile;
  parameterOverrides: adm.OverrideValues;
  onParameterUpdate?: (value: adm.OverrideValues) => void;
}
const ApplicationProfileParameterOverrideForm = ({
  application,
  applicationProfile,
  parameterOverrides,
  onParameterUpdate,
}: ApplicationProfileParameterOverrideFormProps) => {
  const cy = { "data-cy": dataCy };

  /** `parameter: overrideValue` pair for the `app` belonging to `applicationProfile` */
  const selectedValues: ParameterOverrideValuePair =
    parameterOverrides.values ?? {};

  const overrideHandler = (value: ParameterOverrideValuePair) => {
    let updatedParameterOverrides: ParameterOverrideValuePair = mergeRecursive(
      selectedValues,
      value,
    );
    removeEmptyValues(updatedParameterOverrides);
    updatedParameterOverrides = removeEmptyObjects(updatedParameterOverrides);
    if (onParameterUpdate) {
      onParameterUpdate({
        appName: parameterOverrides.appName,
        values: { ...updatedParameterOverrides },
      });
    }
  };

  const columns: TableColumn<catalog.ParameterTemplate>[] = [
    {
      Header: " ",
      accessor: (parameter) => parameter.displayName || parameter.name,
    },
    {
      Header: "Chart Value",
      accessor: (parameter) => parameter.default,
      Cell: (table: { row: { original: catalog.ParameterTemplate } }) => {
        const parameter = table.row.original;
        return (
          <TextField
            className="chart-value"
            aria-label="chart-value"
            data-cy="chartValue"
            isDisabled={true}
            value={parameter.default}
            size={TextSize.Large}
          />
        );
      },
    },
    {
      Header: "Override Value",
      accessor: (parameter) => parameter.default,
      Cell: (table: { row: { original: catalog.ParameterTemplate } }) => {
        const parameter = table.row.original;
        const parsedParameterOverrideValue = parseOverrideValue(
          selectedValues,
          parameter,
        );
        return (
          <ApplicationProfileOverrideValueComboxCell
            application={application}
            parameter={parameter}
            overrideValue={parsedParameterOverrideValue}
            onUpdate={overrideHandler}
          />
        );
      },
    },
    {
      Header: "Type",
      accessor: (parameter) => parameter.default,
      Cell: (table: { row: { original: catalog.ParameterTemplate } }) => {
        const parameter = table.row.original;
        return (
          <TextField
            className="chart-value-type"
            aria-label="chart-value-type"
            data-cy="chartValueType"
            isDisabled={true}
            value={getParameterOverrideType(
              parameter.mandatory,
              parameter.secret,
            )}
            size={TextSize.Large}
          />
        );
      },
    },
  ];

  return (
    <div {...cy} className="parameter-override-form">
      {/* If parameter templates are available then show the parameter override table form */}
      {applicationProfile.parameterTemplates &&
        applicationProfile.parameterTemplates.length > 0 && (
          <div data-cy="formTable" className="parameter-override-form__table">
            <Table
              columns={columns}
              data={applicationProfile.parameterTemplates}
            />
          </div>
        )}

      {/* If parameter template is not available show the message */}
      {(!applicationProfile.parameterTemplates ||
        applicationProfile.parameterTemplates.length === 0) && (
        <Empty icon="list" title="No parameter templates available" />
      )}
    </div>
  );
};

export default ApplicationProfileParameterOverrideForm;
