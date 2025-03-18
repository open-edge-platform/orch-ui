/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import { Slider, SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Text } from "@spark-design/react";
import "./AlertDefinitionThreshold.scss";
const dataCy = "alertDefinitionThreshold";
interface AlertDefinitionThresholdProps {
  alertDefinition: omApi.AlertDefinition;
  onChange: (value: number) => void;
}
const AlertDefinitionThreshold = ({
  alertDefinition,
  onChange,
}: AlertDefinitionThresholdProps) => {
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
    <div {...cy} className="alert-definition-threshold">
      {isSuccess && alertDefinitionTemplate ? (
        alertDefinitionTemplate.annotations?.am_definition_type !==
        "boolean" ? (
          <Slider
            defaultValue={parseInt(alertDefinition.values?.threshold ?? "0")}
            onChange={onChange}
            min={parseInt(
              alertDefinitionTemplate.annotations?.am_threshold_min ?? "0",
            )}
            max={parseInt(
              alertDefinitionTemplate.annotations?.am_threshold_max ?? "0",
            )}
            unit={alertDefinitionTemplate.annotations?.am_threshold_unit ?? ""}
          />
        ) : (
          ""
        )
      ) : isError ? (
        <Text size="m">no threshold</Text>
      ) : (
        <SquareSpinner />
      )}
    </div>
  );
};

export default AlertDefinitionThreshold;
