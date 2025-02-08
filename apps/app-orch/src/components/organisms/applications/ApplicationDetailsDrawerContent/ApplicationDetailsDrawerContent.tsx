/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import { Empty, Table, TableColumn } from "@orch-ui/components";
import { Badge, Heading } from "@spark-design/react";
import "./ApplicationDetailsDrawerContent.scss";

const ApplicationDetailsDrawerContent = ({
  application,
}: {
  application: catalog.Application;
}) => {
  const columns: TableColumn<catalog.Profile>[] = [
    {
      Header: "Name",
      apiName: "name",
      accessor: (row) => row.name,
    },
    {
      Header: "Description",
      apiName: "description",
      accessor: (row) => row.description,
    },
    {
      Header: " ",
      accessor: (profile) =>
        application.defaultProfileName === profile.name ? (
          <Badge
            className="default-badge"
            size="m"
            text="Default"
            variant="info"
            shape="square"
          />
        ) : (
          <></>
        ),
    },
  ];

  const getProfilesTable = () => {
    if (!application.profiles || application.profiles.length === 0) {
      return (
        <Empty title="No Applications Profiles found" icon="cube-detached" />
      );
    }

    return (
      <Table
        columns={columns}
        data={application.profiles}
        totalOverallRowsCount={application.profiles.length}
        sortColumns={[0]}
      />
    );
  };

  return (
    <div
      className="application-drawer-content"
      data-cy="appDetailsDrawerContent"
    >
      <table className="application-drawer-content__app-details">
        <tr>
          <td>Display Name</td>
          <td data-cy="appName">
            {application.displayName ||
              application.name ||
              "No application name provided!"}
          </td>
        </tr>
        <tr>
          <td>Version</td>
          <td data-cy="appVersion">
            {application.version || "No application version provided!"}
          </td>
        </tr>
        <tr>
          <td>Helm Registry</td>
          <td data-cy="helmRegistryName">
            {application.helmRegistryName || "No Registry Name provided!"}
          </td>
        </tr>
        <tr>
          <td>Chart Name</td>
          <td data-cy="chartName">
            {application.chartName || "No Chart name provided!"}
          </td>
        </tr>
        <tr>
          <td>Chart Version</td>
          <td data-cy="chartVersion">
            {application.chartVersion || "No Chart version provided!"}
          </td>
        </tr>
        <tr>
          <td>Description</td>
          <td data-cy="description">
            {application.description || "No Description provided!"}
          </td>
        </tr>
      </table>

      <div
        className="application-drawer-content__profile-table pa-3"
        data-cy="profilesTable"
      >
        <Heading semanticLevel={6}>Profiles</Heading>
        {getProfilesTable()}
      </div>
    </div>
  );
};

export default ApplicationDetailsDrawerContent;
