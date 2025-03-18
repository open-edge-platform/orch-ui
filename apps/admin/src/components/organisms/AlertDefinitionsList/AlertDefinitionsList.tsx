/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import { OrchTable } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Button } from "@spark-design/react";
import { ToastState } from "@spark-design/tokens";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { showToast } from "../../../store/notifications";
import AlertDefinitionDuration, {
  UnitType,
} from "../../atoms/AlertDefinitionDuration/AlertDefinitionDuration";
import AlertDefinitionEnable from "../../atoms/AlertDefinitionEnable/AlertDefinitionEnable";
import AlertDefinitionThreshold from "../../atoms/AlertDefinitionThreshold/AlertDefinitionThreshold";
import "./AlertDefinitionsList.scss";

const dataCy = "alertDefinitionsList";

const AlertDefinitionsList = () => {
  const cy = { "data-cy": dataCy };
  const [alertDefinitionsTableData, setAlertDefinitionsTableData] = useState<
    omApi.AlertDefinition[]
  >([]);
  const [actions, setActions] = useState<
    omApi.PatchProjectAlertDefinitionApiArg[]
  >([]);
  const [patchAlertDefinition] = omApi.usePatchProjectAlertDefinitionMutation();
  const {
    data: alertDefinitions,
    isSuccess,
    isLoading,
    isError,
    error,
  } = omApi.useGetProjectAlertDefinitionsQuery({
    projectName: SharedStorage.project?.name ?? "",
  });
  useEffect(() => {
    setAlertDefinitionsTableData(alertDefinitions?.alertDefinitions ?? []);
  }, [alertDefinitions, isSuccess]);
  const dispatch = useAppDispatch();
  const updateAlertDefinitions = async () => {
    const requests: Promise<unknown>[] = [];
    if (actions && actions.length > 0) {
      for (let i = 0; i < actions.length; i++) {
        requests.push(patchAlertDefinition(actions[i]).unwrap());
      }
      try {
        Promise.all(requests)
          .then(() => {
            dispatch(
              showToast({
                state: ToastState.Success,
                message: "Alert definitions Successfully updated",
              }),
            );
            setActions([]);
          })
          .catch(() => {
            dispatch(
              showToast({
                state: ToastState.Danger,
                message: "Failed to update alert definitions",
              }),
            );
          });
      } catch (error) {
        dispatch(
          showToast({
            state: ToastState.Danger,
            message: "Failed to update receivers",
          }),
        );
      }
    }
  };
  const updateAction = (
    field: "duration" | "threshold" | "enabled",
    value: string,
    ad: omApi.AlertDefinition,
  ) => {
    const newActions = [...actions];
    const index = newActions.findIndex((a) => a.alertDefinitionId === ad.id);
    let targetItem: omApi.PatchProjectAlertDefinitionApiArg;
    if (index >= 0) {
      targetItem = {
        alertDefinitionId: newActions[index].alertDefinitionId,
        projectName: SharedStorage.project?.name ?? "",
        body: {
          values: {
            duration:
              field === "duration"
                ? value
                : (newActions[index].body.values?.duration ?? undefined),
            threshold:
              field === "threshold"
                ? value
                : (newActions[index].body.values?.threshold ?? undefined),
            enabled:
              field === "enabled"
                ? value
                : (newActions[index].body.values?.enabled ?? undefined),
          },
        },
      };
      newActions.splice(index, 1, targetItem);
    } else {
      targetItem = {
        alertDefinitionId: ad.id!,
        projectName: SharedStorage.project?.name ?? "",
        body: {
          values: {
            duration:
              field === "duration" ? value : (ad.values?.duration ?? undefined),
            threshold:
              field === "threshold"
                ? value
                : (ad.values?.threshold ?? undefined),
            enabled:
              field === "enabled" ? value : (ad.values?.enabled ?? undefined),
          },
        },
      };
      newActions.push(targetItem);
    }
    setActions(newActions);
  };
  const updateTableData = (
    field: "duration" | "threshold" | "enabled",
    value: string,
    ad: omApi.AlertDefinition,
  ) => {
    const newTableData = [...alertDefinitionsTableData];
    const index = alertDefinitionsTableData.findIndex(
      (item) => item.id === ad.id,
    );
    const targetRow: omApi.AlertDefinition = {
      ...alertDefinitionsTableData[index],
      values: {
        duration:
          field === "duration"
            ? value
            : (alertDefinitionsTableData[index].values?.duration ?? "0s"),
        threshold:
          field === "threshold"
            ? value
            : (alertDefinitionsTableData[index].values?.threshold ?? "1"),
        enabled:
          field === "enabled"
            ? value
            : (alertDefinitionsTableData[index].values?.enabled ?? ""),
      },
    };
    newTableData.splice(index, 1, targetRow);
    setAlertDefinitionsTableData(newTableData);
  };
  const columns = [
    {
      Header: "Enabled",
      Cell: (table: { row: { original: omApi.AlertDefinition } }) => (
        <AlertDefinitionEnable
          alertDefinition={table.row.original}
          onChange={(value: string) => {
            updateAction("enabled", value, table.row.original);
            updateTableData("enabled", value, table.row.original);
          }}
        />
      ),
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Threshold",
      accessor: "values.threshold",
      Cell: (table: { row: { original: omApi.AlertDefinition } }) => (
        <AlertDefinitionThreshold
          alertDefinition={table.row.original}
          onChange={(value: number) => {
            updateAction("threshold", value.toString(), table.row.original);
            updateTableData("threshold", value.toString(), table.row.original);
          }}
        />
      ),
    },
    {
      Header: "Duration",
      accessor: "values.duration",
      Cell: (table: { row: { original: omApi.AlertDefinition } }) => (
        <>
          <AlertDefinitionDuration
            alertDefinition={table.row.original}
            onChange={(value: string, unit: UnitType) => {
              updateAction("duration", `${value}${unit}`, table.row.original);
              updateTableData(
                "duration",
                `${value}${unit}`,
                table.row.original,
              );
            }}
          />
        </>
      ),
    },
  ];
  return (
    <div {...cy} className="alert-definitions-list">
      <OrchTable
        tableProps={{
          columns: columns,
          data: alertDefinitionsTableData,
          sort: [1, 2, 3],
          pageSize: 100,
        }}
        key="alert-definitions-table"
        isSuccess={
          isSuccess &&
          alertDefinitionsTableData &&
          alertDefinitionsTableData.length > 0
        }
        isLoading={isLoading}
        isError={isError}
        error={error}
        isEmpty={isSuccess && alertDefinitions.alertDefinitions?.length === 0}
        emptyProps={{
          dataCy: "empty",
          title: "Currently, there are no alert definitions to be shown",
          icon: "alert-triangle",
        }}
      />
      {isSuccess && (
        <div className="alert-definitions__footer">
          <Button
            variant="secondary"
            onPress={() => {
              setActions([]);
              setAlertDefinitionsTableData(
                alertDefinitions?.alertDefinitions ?? [],
              );
            }}
          >
            Reset
          </Button>
          <Button
            onPress={() => updateAlertDefinitions()}
            isDisabled={actions.length === 0}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default AlertDefinitionsList;
