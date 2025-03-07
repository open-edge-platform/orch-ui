/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import { SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Text, ToggleSwitch } from "@spark-design/react";
import "./AlertDefinitionEnable.scss";
export const dataCy = "alertDefinitionEnable";
interface AlertDefinitionEnableProps {
  alertDefinition: omApi.AlertDefinition;
  onChange: (value: string) => void;
}
const AlertDefinitionEnable = ({
  alertDefinition,
  onChange,
}: AlertDefinitionEnableProps) => {
  const cy = { "data-cy": dataCy };
  const {
    data: alertDefinitionTemplate,
    isSuccess,
    isError,
  } = omApi.useGetProjectAlertDefinitionRuleQuery(
    {
      alertDefinitionId: alertDefinition.id!,
      projectName: SharedStorage.project?.name ?? "",
    },
    {
      skip:
        !alertDefinition || !alertDefinition.id || !SharedStorage.project?.name,
    },
  );
  return (
    <div {...cy} className="alert-definition-enable">
      {isSuccess && alertDefinitionTemplate ? (
        <ToggleSwitch
          isSelected={
            alertDefinition.values?.enabled === "true" ||
            (alertDefinition.values?.enabled !== "false" &&
              alertDefinitionTemplate.annotations?.am_enabled === "true")
          }
          onChange={(value: boolean) => {
            onChange(value ? "true" : "false");
          }}
          children={undefined}
        />
      ) : isError ? (
        <Text size="m">no enable info</Text>
      ) : (
        <SquareSpinner />
      )}
    </div>
  );
};

export default AlertDefinitionEnable;
