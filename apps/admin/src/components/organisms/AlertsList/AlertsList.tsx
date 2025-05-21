/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

// TODO: require table change
import { OrchTable } from "@orch-ui/components";

import { omApi } from "@orch-ui/apis";
import { API_INTERVAL, SharedStorage } from "@orch-ui/utils";
import { Button } from "@spark-design/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AlertDisplayName from "../../atoms/AlertDisplayName/AlertDisplayName";
import AlertSource from "../../atoms/AlertSource/AlertSource";
import AlertDrawer from "../AlertDrawer/AlertDrawer";
import "./AlertsList.scss";

const dataCy = "alertsList";

const AlertsList = () => {
  const cy = { "data-cy": dataCy };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const [alertSelected, setAlertSelected] = useState<omApi.Alert>();
  const {
    data: alerts,
    isSuccess,
    isLoading,
    isError,
    error,
  } = omApi.useGetProjectAlertsQuery(
    { projectName: SharedStorage.project?.name ?? "" },
    { pollingInterval: API_INTERVAL },
  );
  const {
    data: alertDefinitions,
    isSuccess: adSuccess,
    isError: adError,
  } = omApi.useGetProjectAlertDefinitionsQuery({
    projectName: SharedStorage.project?.name ?? "",
  });

  const columns = [
    {
      Header: "Alert",
      accessor: "alertDefinitionId",
      Cell: (table: { row: { original: omApi.Alert } }) => {
        const alertDefinition = alertDefinitions?.alertDefinitions?.find(
          (ad) => ad.id === table.row.original.alertDefinitionId,
        );
        return (
          <Button
            size="l"
            variant="unstyled"
            onPress={() => {
              setAlertSelected(table.row.original);
              setIsOpen(true);
            }}
          >
            {alertDefinition ? (
              <AlertDisplayName alertDefinition={alertDefinition} />
            ) : (
              table.row.original.alertDefinitionId
            )}
          </Button>
        );
      },
    },
    {
      Header: "Status",
      accessor: "status.state",
    },
    {
      Header: "Category",
      accessor: "labels.alert_category",
    },
    {
      Header: "Source",
      accessor: "labels.alert_context",
      Cell: (table: { row: { original: omApi.Alert } }) => (
        <AlertSource alert={table.row.original} />
      ),
    },
    {
      Header: "Date/Time Started",
      accessor: "startsAt",
    },
  ];
  return (
    <div {...cy} className="alert-definitions-list">
      <OrchTable
        tableProps={{
          columns: columns,
          data: alerts?.alerts ?? [],
          sort: [0, 1, 2, 3, 4],
          search: searchParams.get("searchTerm") ?? "",
        }}
        key="alerts-table"
        isSuccess={isSuccess && adSuccess && alerts.alerts?.length !== 0}
        isLoading={isLoading}
        isError={isError || adError}
        error={error}
        isEmpty={isSuccess && adSuccess && alerts.alerts?.length === 0}
        emptyProps={{
          dataCy: "empty",
          title: "Currently, there are no alerts to be shown",
          icon: "alert-triangle",
        }}
      />
      <AlertDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        alert={alertSelected}
        alertDefinition={
          alertDefinitions?.alertDefinitions?.filter(
            (ad: omApi.AlertDefinition) =>
              ad.id === alertSelected?.alertDefinitionId,
          )[0]
        }
      />
    </div>
  );
};

export default AlertsList;
