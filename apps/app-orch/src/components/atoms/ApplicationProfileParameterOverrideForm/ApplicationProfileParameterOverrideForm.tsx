/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { Empty, Table, TableColumn } from "@orch-ui/components";
import { TextField } from "@spark-design/react";
import { TextSize } from "@spark-design/tokens";
import { useMemo } from "react";
import { getParameterOverrideType } from "../../organisms/profiles/ParameterOverridesForm/ParameterOverridesForm";
import ApplicationProfileOverrideValueComboxCell from "../ApplicationProfileOverrideValueComboBoxCell/ApplicationProfileOverrideValueComboBoxCell";
import "./ApplicationProfileParameterOverrideForm.scss";

const dataCy = "applicationProfileParameterOverrideForm";
interface ApplicationProfileParameterOverrideFormProps {
  application: catalog.Application;
  applicationProfile: catalog.Profile;
}
const ApplicationProfileParameterOverrideForm = ({
  application,
  applicationProfile,
}: ApplicationProfileParameterOverrideFormProps) => {
  const cy = { "data-cy": dataCy };

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
        return useMemo(
          () => (
            <ApplicationProfileOverrideValueComboxCell
              application={application}
              parameter={parameter}
            />
          ),
          [application, parameter],
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
