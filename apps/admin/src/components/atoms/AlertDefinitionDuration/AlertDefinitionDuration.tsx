/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { omApi } from "@orch-ui/apis";
import { SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import {
  Dropdown,
  Item,
  NumberField,
  Text,
  Tooltip,
} from "@spark-design/react";
import { useMemo } from "react";
import { maxValue, minValue, updateValue } from "../../../utils/global";
import "./AlertDefinitionDuration.scss";
export const dataCy = "alertDefinitionDuration";

const units = {
  s: "sec",
  m: "min",
  h: "hour",
};

export type UnitType = keyof typeof units;

interface AlertDefinitionDurationProps {
  alertDefinition: omApi.AlertDefinition;
  onChange: (value: string, unit: UnitType) => void;
}
const AlertDefinitionDuration = ({
  alertDefinition,
  onChange,
}: AlertDefinitionDurationProps) => {
  const cy = { "data-cy": dataCy };
  const getUnit = (duration: string | undefined) => {
    return duration ? (duration.charAt(duration.length - 1) as UnitType) : "s";
  };
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
  const getTooltipMsg = (adt: omApi.AlertDefinitionTemplate) => {
    return `Minimum duration ${
      adt.annotations?.am_duration_min ?? "0s"
    }; Maximum duration  ${adt.annotations?.am_duration_max ?? "0s"};`;
  };

  const unitsForSelect = useMemo(
    () => getDurationUnits(alertDefinitionTemplate),
    [isSuccess],
  );

  return (
    <div {...cy} className="alert-definition-duration">
      {isSuccess && alertDefinitionTemplate ? (
        <Tooltip content={getTooltipMsg(alertDefinitionTemplate)} size="s">
          <div className="inputs-container">
            <NumberField
              defaultValue={parseInt(
                alertDefinitionTemplate.labels?.duration?.slice(0, -1) ?? "0",
              )}
              value={parseInt(
                alertDefinition.values?.duration.slice(0, -1) ?? "0",
              )}
              onChange={(value: number) => {
                onChange(
                  value.toString(),
                  getUnit(alertDefinition.values?.duration),
                );
              }}
              minValue={minValue(
                alertDefinitionTemplate.annotations?.am_duration_min ?? "0s",
                getUnit(
                  alertDefinition.values?.duration ||
                    alertDefinitionTemplate.labels?.duration ||
                    "0s",
                ),
              )}
              maxValue={maxValue(
                alertDefinitionTemplate.annotations?.am_duration_max ?? "0s",
                getUnit(
                  alertDefinition.values?.duration ||
                    alertDefinitionTemplate.labels?.duration ||
                    "0s",
                ),
              )}
            />
            <Dropdown
              size="l"
              data-cy="durationUnitDropdown"
              name="durationUnitDropdown"
              onSelectionChange={(selected) => {
                const updatedValue = updateValue(
                  parseInt(
                    alertDefinition.values?.duration.slice(0, -1) ||
                      alertDefinitionTemplate.labels?.duration?.slice(0, -1) ||
                      "0",
                  ),
                  minValue(
                    alertDefinitionTemplate.annotations?.am_duration_min ??
                      "0s",
                    selected as UnitType,
                  ),
                  maxValue(
                    alertDefinitionTemplate.annotations?.am_duration_max ??
                      "0s",
                    selected as UnitType,
                  ),
                );
                onChange(updatedValue.toString(), selected as UnitType);
              }}
              defaultSelectedKey={getUnit(
                alertDefinitionTemplate.labels?.duration ?? "0s",
              )}
              selectedKey={getUnit(alertDefinition.values?.duration ?? "0s")}
              label=""
              placeholder=""
            >
              {Object.keys(unitsForSelect).map((key: string) => (
                <Item key={key}>{units[key]}</Item>
              ))}
            </Dropdown>
          </div>
        </Tooltip>
      ) : isError ? (
        <Text size="m">no duration</Text>
      ) : (
        <SquareSpinner />
      )}
    </div>
  );
};
//TODO: this needs a more consistent type to be returned instead of 4 possible objects
const getDurationUnits = (adt?: omApi.AlertDefinitionTemplate) => {
  if (!adt) {
    return {};
  }

  const amDurationMaxSeconds = maxValue(
    adt.annotations?.am_duration_max ?? "0s",
    "s",
  );

  if (amDurationMaxSeconds <= 60) {
    return { s: units.s };
  } else if (amDurationMaxSeconds <= 3600) {
    return {
      s: units.s,
      m: units.m,
    };
  } else {
    return { ...units };
  }
};

export default AlertDefinitionDuration;
