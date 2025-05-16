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

import { SharedStorage } from "@orch-ui/utils";
import "./TelemetryMetricsForm.scss";
const dataCy = "telemetryMetricsForm";

export type TelemetryMetricsProfile = {
  targetInstance?: string;
  targetSite?: string;
  targetRegion?: string;
  metricsInterval: number;
  metricsGroupId: string;
  metricsGroup?: infra.TelemetryMetricsGroup;
};

export type SystemMetricPair = {
  profileId: string;
  metricType: string;
  interval: string;
};

export type SystemMetricPairs = {
  systemMetricPairs: SystemMetricPair[];
};

export enum ErrorMessages {
  MetricRequired = "Metric is Required",
  KeyExists = "Metric Type already exists",
}

interface TelemetryMetricsFormProps {
  onUpdate: (systemMetricPairs: SystemMetricPair[]) => void;
  pairs?: SystemMetricPair[];
  //getMetricObjects: (metricObj: TelemetryMetricsProfile | undefined) => void;
}

const TelemetryMetricsForm = ({
  onUpdate,
  pairs = [],
}: TelemetryMetricsFormProps) => {
  const cy = { "data-cy": dataCy };
  const { data: metricsResponse } =
    infra.useTelemetryMetricsGroupServiceListTelemetryMetricsGroupsQuery({
      projectName: SharedStorage.project?.name ?? "",
    }); //how to use isLoading and isSuccess in both calls
  //const [, setMetricExists] = useState<boolean>(false);
  const [intervalExists, setIntervalExists] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(true);
  //const [, setSelectedMetricType] = useState<string>("");
  const [, setSelectedMetricInterval] = useState<string>("");
  const newEntryPair: SystemMetricPair = {
    profileId: "",
    metricType: "",
    interval: "",
  };
  const { control, getValues, setValue, trigger } = useForm<SystemMetricPairs>({
    mode: "all",
    defaultValues: {
      systemMetricPairs:
        pairs.length > 0 ? [...pairs, newEntryPair] : [newEntryPair],
    },
  });

  const metricTypesCount = metricsResponse
    ? metricsResponse.telemetryMetricsGroups.length
    : 0;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "systemMetricPairs",
  });

  /*const checkMetricExists = (index: number) => {
    const noMetric = getValues().systemMetricPairs[index].metricType === ""
    if (noMetric) setMetricExists(false)
    else setMetricExists(true)
    return !noMetric || ErrorMessages.MetricRequired;

  }*/

  const checkValidation = (index: number, value: string) => {
    // check blank value
    const pairs = [...getValues().systemMetricPairs];
    pairs.splice(index, 1);
    const hasDuplicate = pairs
      .map((pair: SystemMetricPair) => pair.metricType)
      .some((metricType: string) => metricType === value);
    if (hasDuplicate) setValid(false);
    else setValid(true);
    return !hasDuplicate || ErrorMessages.KeyExists;
  };
  const getSystemMetricPairs = (): SystemMetricPair[] => {
    const MetricPairs: SystemMetricPairs = structuredClone(getValues());
    const { systemMetricPairs } = MetricPairs;
    if (systemMetricPairs.length === 0) return [];

    const isLastPairEmpty =
      systemMetricPairs[systemMetricPairs.length - 1].metricType === "" &&
      systemMetricPairs[systemMetricPairs.length - 1].interval === "";

    if (isLastPairEmpty) systemMetricPairs.pop();

    return systemMetricPairs;
  };

  return (
    <form {...cy} className="telemetry-metrics-form">
      {fields.length > 0 && (
        <div>
          <Text className="title">System Metrics</Text>
        </div>
      )}

      <div className="system-metric-labels">
        <Text>Metric Type</Text>
        <Text>Metric Interval</Text>
        <Button />
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className="system-metrics">
          <div className="metric-type">
            <Controller
              name={`systemMetricPairs.${index}.metricType`}
              control={control}
              rules={{
                required: { value: true, message: "Metric type is required" },
                validate: {
                  noDuplicate: (value: string) => checkValidation(index, value),
                },
              }}
              render={({ field, fieldState: { error } }) => {
                //Note: need any here to make compiler happy
                const path: any = `systemMetricPairs.${index}.metricType`;
                return (
                  <Dropdown
                    {...field}
                    size="l"
                    data-cy="typeDropdown"
                    isRequired={true}
                    placeholder="Select a Metric"
                    name="metric-dropdown"
                    defaultSelectedKey={pairs[index]?.metricType ?? ""}
                    key={path}
                    label=""
                    validationState={valid ? "valid" : "invalid"}
                    errorMessage={error?.message}
                    onSelectionChange={(key) => {
                      setValue(path, key.toString());
                      setTimeout(() => {
                        trigger(path);
                        if (getSystemMetricPairs()[index].interval !== "")
                          onUpdate(getSystemMetricPairs());
                      }, 100);
                    }}
                  >
                    {metricsResponse?.telemetryMetricsGroups.map(
                      (metricgroup) => (
                        <Item key={metricgroup.telemetryMetricsGroupId}>
                          {metricgroup.name}
                        </Item>
                      ),
                    )}
                  </Dropdown>
                );
              }}
            />
          </div>
          <div className="metric-interval">
            <Controller
              name={`systemMetricPairs.${index}.interval`}
              control={control}
              rules={{
                required: true,
                //validate: { noMetric: (value: string) => checkMetricExists(index) }
              }}
              render={({ field }) => {
                return (
                  <Dropdown
                    {...field}
                    size="l"
                    data-cy="intervalDropdown"
                    placeholder="Select an Interval"
                    isRequired={true}
                    defaultSelectedKey={pairs[index]?.interval ?? ""}
                    //isDisabled={!metricExists || !valid}
                    //disabledMessage="Please select metric type"
                    //validationState={metricExists ? "valid" : "invalid"}
                    //errorMessage={error?.message}
                    name="interval-dropdown"
                    key={`systemMetricPairs.${index}.interval`}
                    label=""
                    onSelectionChange={(key) => {
                      //trigger(`systemMetricPairs.${index}.interval`)

                      setValue(
                        `systemMetricPairs.${index}.interval`,
                        key.toString(),
                      );
                      setSelectedMetricInterval(key.toString());
                      onUpdate(getSystemMetricPairs());
                      setIntervalExists(true);
                    }}
                  >
                    {<Item key="1">1 min</Item>}
                    {<Item key="5">5 min</Item>}
                    {<Item key="10">10 min</Item>}
                    {<Item key="30">30min</Item>}
                    {<Item key="60">60min</Item>}
                  </Dropdown>
                );
              }}
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
              onUpdate(getSystemMetricPairs());
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
            !intervalExists || !valid || fields.length >= metricTypesCount
          }
          disabledTooltip={
            fields.length >= metricTypesCount
              ? "Maximum possible metric fields in use"
              : undefined
          }
          onPress={() => {
            append(newEntryPair);
            //setMetricExists(false);
            setIntervalExists(false);
            onUpdate(getSystemMetricPairs());
          }}
        >
          <Icon icon="plus" />
        </Button>
      </div>
    </form>
  );
};

export default TelemetryMetricsForm;
