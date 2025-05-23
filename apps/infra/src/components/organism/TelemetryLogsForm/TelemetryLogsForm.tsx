/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Button, Dropdown, Icon, Item, Text } from "@spark-design/react";
import { ButtonSize, ButtonVariant } from "@spark-design/tokens";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { SharedStorage, TelemetryLogLevel } from "@orch-ui/utils";
import "./TelemetryLogsForm.scss";
const dataCy = "telemetryLogsForm";

export type TelemetryLogsProfile = {
  targetInstance?: string;
  targetSite?: string;
  targetRegion?: string;
  logLevel: TelemetryLogLevel;
  logsGroupId: string;
  logsGroup?: infra.TelemetryMetricsGroupResourceRead;
};

export type SystemLogPair = {
  profileId: string;
  logSource: string;
  logLevel: string;
};

export type SystemLogPairs = {
  systemLogPairs: SystemLogPair[];
};

export enum ErrorMessages {
  LogSourceRequired = "Log Source is Required",
  KeyExists = "Log Source already exists",
}

interface TelemetryLogsFormProps {
  onUpdate: (systemLogPairs: SystemLogPair[]) => void;
  pairs?: SystemLogPair[];
  //getLogObjects: (logObj: infra.TelemetryLogsProfile | undefined) => void;
}

const TelemetryLogsForm = ({
  onUpdate,
  pairs = [],
}: TelemetryLogsFormProps) => {
  const cy = { "data-cy": dataCy };
  const { data: logsResponse } =
    infra.useTelemetryLogsGroupServiceListTelemetryLogsGroupsQuery({
      projectName: SharedStorage.project?.name ?? "",
    }); //how to use isLoading and isSuccess in both calls
  const [valid, setValid] = useState<boolean>(true);
  const [, setSourceExists] = useState<boolean>(false);
  const [logLevelExists, setLogLevelExists] = useState<boolean>(false);
  const newEntryPair: SystemLogPair = {
    profileId: "",
    logSource: "",
    logLevel: "",
  };
  const [, setSelectedLogLevel] = useState<TelemetryLogLevel>(
    "" as TelemetryLogLevel,
  );

  const logTypesCount = logsResponse
    ? logsResponse.telemetryLogsGroups.length
    : 0;

  const { control, getValues, setValue, trigger } = useForm<SystemLogPairs>({
    mode: "all",
    defaultValues: {
      systemLogPairs:
        pairs.length > 0 ? [...pairs, newEntryPair] : [newEntryPair],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "systemLogPairs",
  });

  const checkValidation = (index: number, value: string) => {
    // check blank value
    const pairs = [...getValues().systemLogPairs];
    pairs.splice(index, 1);
    const hasDuplicate = pairs
      .map((pair: SystemLogPair) => pair.logSource)
      .some((logSource: string) => logSource === value);
    if (hasDuplicate) setValid(false);
    else setValid(true);
    return !hasDuplicate || ErrorMessages.KeyExists;
  };
  const getSystemLogPairs = (): SystemLogPair[] => {
    const LogPairs: SystemLogPairs = structuredClone(getValues());
    const { systemLogPairs } = LogPairs;
    if (systemLogPairs.length === 0) return [];

    const isLastPairEmpty =
      systemLogPairs[systemLogPairs.length - 1].logSource === "" &&
      systemLogPairs[systemLogPairs.length - 1].logLevel === "";
    if (isLastPairEmpty) systemLogPairs.pop();
    return systemLogPairs;
  };

  return (
    <form {...cy} className="telemetry-logs-form">
      {fields.length > 0 && (
        <div>
          <Text className="title">System Logs</Text>
        </div>
      )}

      <div className="system-log-labels">
        <Text>Log Source</Text>
        <Text>Log Level</Text>
        <Button />
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className="system-logs">
          <div className="log-source">
            <Controller
              name={`systemLogPairs.${index}.logSource`}
              control={control}
              rules={{
                required: { value: true, message: "Metric type is required" },
                validate: {
                  noDuplicate: (value: string) => checkValidation(index, value),
                },
              }}
              render={({ field, fieldState: { error } }) => {
                const path: any = `systemLogPairs.${index}.logSource`;
                return (
                  <Dropdown
                    {...field}
                    size="l"
                    data-cy="sourceDropdown"
                    isRequired={true}
                    placeholder="Select a Source"
                    name="source-dropdown"
                    key={path}
                    label=""
                    defaultSelectedKey={pairs[index]?.logSource ?? ""}
                    validationState={valid ? "valid" : "invalid"}
                    errorMessage={error?.message}
                    onSelectionChange={(key) => {
                      setValue(path, key.toString());
                      setTimeout(() => {
                        trigger(path);
                        if (getSystemLogPairs()[index].logLevel !== "")
                          onUpdate(getSystemLogPairs());
                      }, 100);
                    }}
                  >
                    {logsResponse?.telemetryLogsGroups.map((loggroup) => (
                      <Item key={loggroup.telemetryLogsGroupId}>
                        {loggroup.name}
                      </Item>
                    ))}
                  </Dropdown>
                );
              }}
            />
          </div>
          <div className="log-level">
            <Controller
              name={`systemLogPairs.${index}.logLevel`}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  size="l"
                  data-cy="levelDropdown"
                  placeholder="Select a Level"
                  isRequired={true}
                  name="level-dropdown"
                  key={`systemLogPairs.${index}.logLevel`}
                  defaultSelectedKey={pairs[index]?.logLevel ?? ""}
                  label=""
                  //isDisabled={!sourceExists || !valid}
                  //disabledMessage="Please select log Source"
                  onSelectionChange={(key) => {
                    setValue(
                      `systemLogPairs.${index}.logLevel`,
                      key.toString(),
                    );
                    setSelectedLogLevel(key.toString() as TelemetryLogLevel);
                    onUpdate(getSystemLogPairs());
                    setLogLevelExists(true);
                    setSourceExists(false);
                  }}
                >
                  {
                    <Item key="TELEMETRY_SEVERITY_LEVEL_CRITICAL">
                      CRITICAL
                    </Item>
                  }
                  {<Item key="TELEMETRY_SEVERITY_LEVEL_ERROR">ERROR</Item>}
                  {<Item key="TELEMETRY_SEVERITY_LEVEL_WARN">WARN</Item>}
                  {<Item key="TELEMETRY_SEVERITY_LEVEL_INFO">INFO</Item>}
                  {<Item key="TELEMETRY_SEVERITY_LEVEL_DEBUG">DEBUG</Item>}
                </Dropdown>
              )}
            />
          </div>
          <Button
            data-cy="delete"
            variant="primary"
            iconOnly
            isDisabled={fields.length === 1}
            size={ButtonSize.Large}
            onPress={() => {
              remove(index);
              onUpdate(getSystemLogPairs());
            }}
          >
            <Icon icon="trash" />
          </Button>
        </div>
      ))}
      <div className="add-button-padding">
        <Button
          data-cy="add"
          type="button"
          variant={ButtonVariant.Primary}
          size={ButtonSize.Large}
          isDisabled={
            !logLevelExists || !valid || fields.length >= logTypesCount
          }
          disabledTooltip={
            fields.length >= logTypesCount
              ? "Maximum possible log fields in use"
              : undefined
          }
          onPress={() => {
            append(newEntryPair);
            setLogLevelExists(false);
            onUpdate(getSystemLogPairs());
          }}
        >
          <Icon icon="plus" />
        </Button>
      </div>
    </form>
  );
};

export default TelemetryLogsForm;
