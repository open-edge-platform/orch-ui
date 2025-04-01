/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { CodeSnippet, Dropdown, TextField } from "@spark-design/react";
import { getParameterOverrideType } from "../../organisms/profiles/ParameterOverridesForm/ParameterOverridesForm";
import "./ApplicationDetailsProfilesInfoSubRow.scss";

const dataCy = "applicationDetailsProfilesInfoSubRow";

interface ApplicationDetailsProfilesInfoSubRowProps {
  profile: catalog.ProfileRead;
}

const ApplicationDetailsProfilesInfoSubRow = ({
  profile,
}: ApplicationDetailsProfilesInfoSubRowProps) => {
  const cy = { "data-cy": dataCy };
  return (
    <div {...cy} className="application-details-profiles-info-sub-row">
      <table>
        <tr>
          <td className="label">Created On</td>
          <td data-cy="createdOn">{profile.createTime ?? "N/A"}</td>
        </tr>
        <tr>
          <td className="label">Last Updated</td>
          <td data-cy="updateTime">{profile.updateTime ?? "N/A"}</td>
        </tr>
        <tr>
          <td className="label">Chart Values</td>
          <td className="chart-values" data-cy="chartValues">
            {(profile.chartValues && (
              <CodeSnippet copyIcon={true} variant="multiline">
                {profile.chartValues}
              </CodeSnippet>
            )) || <CodeSnippet>No chart values found</CodeSnippet>}
          </td>
        </tr>
        <tr>
          <br />
        </tr>
        {profile.parameterTemplates &&
          profile.parameterTemplates.length > 0 && (
            <tr>
              <td className="label">Value Overrides</td>
              <td data-cy="valueOverrides">
                <tr>
                  <td className="value-title">Parameter Name</td>
                  <td className="value-title">Values</td>
                  <td className="value-type">Type</td>
                </tr>
                {profile.parameterTemplates.map(
                  (values: catalog.ParameterTemplate) => (
                    <tr
                      className="profile-parameter-templates"
                      key={values.name}
                      data-cy={values.name}
                    >
                      <td>
                        <Dropdown
                          data-cy="parameterName"
                          placeholder={values.displayName ?? values.name ?? ""}
                          isDisabled
                          name="name"
                          label=""
                        />
                      </td>
                      <td>
                        <Dropdown
                          data-cy="values"
                          className="chart-suggest-values"
                          placeholder={String(
                            values.secret
                              ? ""
                              : values.suggestedValues?.join(", "),
                          )}
                          isDisabled
                          name="value"
                          label=""
                        />
                      </td>
                      <td>
                        <TextField
                          className="chart-value-type"
                          aria-label="chart-value-type"
                          data-cy="chartValueType"
                          isDisabled={true}
                          value={getParameterOverrideType(
                            values.mandatory,
                            values.secret,
                          )}
                        />
                      </td>
                    </tr>
                  ),
                )}
              </td>
            </tr>
          )}
      </table>
    </div>
  );
};

export default ApplicationDetailsProfilesInfoSubRow;
