/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import {
  ApiError,
  Popup,
  Table,
  TableColumn,
  TableLoader,
} from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Heading, Icon, Text } from "@spark-design/react";
import { useState } from "react";
import { OSProfileSecurityFeatures } from "../../organism/OSProfileDetails/OSProfileDetails";
import OSProfileDetailsDrawer from "./OSProfilesDrawer";

import "./OSProfiles.scss";

export const dataCy = "oSProfiles";

const OSProfiles = () => {
  const cy = { "data-cy": dataCy };
  const className = "o-s-profiles";

  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [selectedOsProfile, setSelectedOsProfile] = useState<
    eim.OperatingSystemResourceRead | undefined
  >();

  const {
    data: osProfiles,
    isLoading,
    isError,
    error,
  } = eim.useGetV1ProjectsByProjectNameComputeOsQuery({
    projectName: SharedStorage.project?.name ?? "",
    pageSize: 100,
  });

  const getContent = () => {
    if (isLoading) {
      return (
        <div className={`${className}__table-loader`}>
          <TableLoader />
        </div>
      );
    }

    return (
      <Table
        columns={columns}
        data={osProfiles?.OperatingSystemResources}
        canSearch
        isLoading={isLoading}
      />
    );
  };

  if (isError) {
    return (
      <div {...cy}>
        <ApiError error={error} />
      </div>
    );
  }

  const columns: TableColumn<eim.OperatingSystemResourceRead>[] = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Architecture",
      accessor: "architecture",
    },
    {
      Header: "Security",
      accessor: "securityFeature",
      Cell: (table: { row: { original: eim.OperatingSystemResourceRead } }) => {
        const securityFeature = table.row.original.securityFeature;
        return securityFeature
          ? OSProfileSecurityFeatures[securityFeature]
          : "-";
      },
    },
    {
      Header: "Action",
      textAlign: "center",
      padding: "0",
      accessor: (item) => {
        return (
          <Popup
            dataCy="osProfilesPopup"
            jsx={<Icon artworkStyle="light" icon="ellipsis-v" />}
            options={[
              {
                displayText: "View Details",
                onSelect: () => {
                  setShowDrawer(true);
                  setSelectedOsProfile(item);
                },
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <div {...cy} className={className}>
      <Heading semanticLevel={1} size="l" data-cy="title">
        OS Profiles
      </Heading>
      <Text>Use this page to manage OS profiles</Text>

      {getContent()}
      {selectedOsProfile && showDrawer && (
        <OSProfileDetailsDrawer
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
          selectedOsProfile={selectedOsProfile}
        />
      )}
    </div>
  );
};

export default OSProfiles;
