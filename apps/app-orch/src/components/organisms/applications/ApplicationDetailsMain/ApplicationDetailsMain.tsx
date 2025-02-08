/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import {
  ApiError,
  Empty,
  Flex,
  HeaderSize,
  Table,
  TableColumn,
} from "@orch-ui/components";
import { Heading, Tag } from "@spark-design/react";
import ApplicationDetailsProfilesInfoSubRow from "../../../atoms/ApplicationDetailsProfilesInfoSubRow/ApplicationDetailsProfilesInfoSubRow";
import "./ApplicationDetailsMain.scss";

export const dataCy = "applicationDetailsMain";

interface ApplicatinDetailsMainProps {
  app: catalog.Application;
  registry?: catalog.Registry;
  dockerRegistry?: catalog.Registry;
}

const ApplicationDetailsMain = ({
  app,
  registry,
  dockerRegistry,
}: ApplicatinDetailsMainProps) => {
  const cy = { "data-cy": dataCy };

  const columns: TableColumn<catalog.Profile>[] = [
    {
      Header: "Profile Name",
      accessor: "name",
    },
    {
      Header: "Description",
      accessor: (row) => row.description || "-",
    },
    {
      Header: "Value Overrides",
      accessor: (row) =>
        row?.parameterTemplates && row.parameterTemplates.length > 0
          ? "Yes"
          : "No",
      Cell: (table: { row: { original: catalog.Profile } }) => {
        const profile = table.row.original;
        return (
          <>
            {profile?.parameterTemplates &&
            profile.parameterTemplates.length > 0
              ? "Yes"
              : "No"}
          </>
        );
      },
    },
    {
      Header: " ",
      Cell: (table: { row: { original: catalog.Profile } }) =>
        table.row.original.name === app.defaultProfileName && (
          <Tag
            className="profieTag"
            label="Default"
            rounding="semi-round"
            size="small"
          />
        ),
    },
  ];

  return (
    <div className="application-details-main" {...cy}>
      <Heading semanticLevel={1} size={HeaderSize.Large} data-cy="title">
        {app.displayName ? `${app.displayName}(${app.name})` : app.name}
      </Heading>

      <div
        className="application-details-main__container"
        data-cy="applicationBasicInfo"
      >
        <Flex className="mb-1 p-1">
          {/* .label (key) & .cell-value (value) splits */}
          <div className="label">Version</div>
          <div data-cy="version" className="cell-value">
            {app.version || "No version found"}
          </div>
        </Flex>
        <Flex className="mb-1 p-1">
          {/* .label (key) & .cell-value (value) splits */}
          <div className="label">Description</div>
          <div data-cy="description" className="cell-value">
            {app.description || "No description found"}
          </div>
        </Flex>

        <div className="mb-1 p-1">
          <label className="label">Helm Chart</label>

          <Flex cols={[3]} className="p-1">
            {/* 2 columns, with each having .label (key) & .cell-value/.location-value (value) splits */}
            <div className="label">Registry Name</div>
            <div data-cy="registryName" className="cell-value">
              {app.helmRegistryName || "No registry name found"}
            </div>
            <div className="label">Registry Location</div>
            <div data-cy="registryLocation" className="location-cell">
              {registry?.rootUrl || "No registry location found"}
            </div>
          </Flex>

          <Flex cols={[3]} className="p-1">
            {/* 2 columns, with each having .label (key) & .cell-value (value) splits */}
            <div className="label">Chart Name</div>
            <div data-cy="chartName" className="cell-value">
              {app.chartName || "No chart name found"}
            </div>
            <div className="label">Chart Version</div>
            <div data-cy="chartVersion" className="cell-value">
              {app.chartVersion || "No chart version found"}
            </div>
          </Flex>
        </div>

        <div className="mb-1 p-1">
          <label className="label">Docker Images</label>
          <Flex cols={[3]} className="p-1">
            {/* 2 columns, with each having .label (key) & .cell-value (value) splits */}
            <div className="label">Registry Name</div>
            <div data-cy="dockerImageName" className="cell-value">
              {app?.imageRegistryName || "No registry name found"}
            </div>
            <div className="label">Registry Location</div>
            <div data-cy="dockerRegistryLocation" className="location-cell">
              {dockerRegistry?.rootUrl || "No registry location found"}
            </div>
          </Flex>
        </div>
      </div>

      <Heading semanticLevel={2} size={HeaderSize.Medium}>
        Application Profiles
      </Heading>
      {!app.profiles && (
        <ApiError error="Profiles are not specified in application." />
      )}
      {app.profiles && app.profiles.length === 0 && (
        <Empty
          dataCy="emptyProfiles"
          icon="document-gear"
          title="No Profiles present"
        />
      )}
      {app.profiles && app.profiles.length > 0 && (
        <div
          data-cy="applicationProfilesTable"
          className="application-profiles-table"
        >
          <Table
            key="profiles-table"
            columns={columns}
            data={app.profiles}
            sortColumns={[1, 2, 3]}
            subRow={(row: { original: catalog.ProfileRead }) => (
              <ApplicationDetailsProfilesInfoSubRow profile={row.original} />
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ApplicationDetailsMain;
