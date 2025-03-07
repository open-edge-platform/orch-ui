/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { Empty, SquareSpinner, Table, TableColumn } from "@orch-ui/components";
import { parseError, SharedStorage } from "@orch-ui/utils";
import { MessageBanner, Tag, Text } from "@spark-design/react";
import { TextSize } from "@spark-design/tokens";
import { useState } from "react";
import ProfilePackageDetails from "../ProfilePackageDetails/ProfilePackageDetails";

export const dataCy = "selectProfileTable";

export type ProfileColumns = "Select" | "Profile Name" | "Description" | " ";

export interface SelectProfileTableProps {
  selectedPackage: catalog.DeploymentPackage;
  selectedProfile?: catalog.DeploymentProfile;
  onProfileSelect?: (row: catalog.DeploymentProfile) => void;
  showLabel?: boolean;
}

const SelectProfileTable = ({
  selectedPackage,
  selectedProfile,
  onProfileSelect,
  showLabel = true,
}: SelectProfileTableProps) => {
  const cy = { "data-cy": dataCy };
  const defaultProfile = selectedPackage?.defaultProfileName;
  const projectName = SharedStorage.project?.name ?? "";

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [profileToDisplay, setProfileToDisplay] = useState<
    catalog.DeploymentProfile | undefined
  >(undefined);

  const { data, isLoading, isError, error } =
    catalog.useCatalogServiceGetDeploymentPackageQuery(
      {
        projectName,
        deploymentPackageName: selectedPackage?.name ?? "",
        version: selectedPackage?.version ?? "",
      },
      {
        skip: !projectName,
      },
    );

  const deploymentProfiles = data?.deploymentPackage.profiles;

  const columns: TableColumn<catalog.DeploymentProfile, ProfileColumns>[] = [
    {
      Header: "Select",
      Cell: (table: { row: { original: catalog.DeploymentProfile } }) => (
        <input
          data-cy="radioButtonCy"
          type="radio"
          name="check"
          defaultChecked={
            selectedProfile && selectedProfile.name === table.row.original.name
          }
          onClick={() => {
            if (onProfileSelect) onProfileSelect(table.row.original);
          }}
        />
      ),
    },
    {
      Header: "Profile Name",
      accessor: (item) => item.name,
      apiName: "name",
      Cell: (table) => {
        const row = table.row.original;
        return (
          <a
            onClick={() => {
              setProfileToDisplay(row);
              setIsDrawerOpen(true);
            }}
          >
            {row.displayName ?? row.name}
          </a>
        );
      },
    },
    {
      Header: "Description",
      accessor: (row) => row.description || "-",
    },
    {
      Header: " ",
      Cell: (table: { row: { original: catalog.DeploymentProfile } }) =>
        table.row.original.name === defaultProfile && (
          <Tag
            className="profieTag"
            label="Default"
            rounding="semi-round"
            size="small"
          />
        ),
    },
  ];

  if (isLoading) {
    return <SquareSpinner />;
  } else if (isError) {
    return (
      <div data-cy="errorMessage">
        <MessageBanner
          messageTitle="Error Fetching deployment Profiles"
          messageBody={parseError(error).data}
          variant="error"
        />
      </div>
    );
  } else if (!deploymentProfiles || deploymentProfiles.length === 0) {
    return (
      <Empty
        dataCy="emptyProfileTable"
        icon="database"
        subTitle="No Deployment Profiles found."
      />
    );
  }

  return (
    <div className="select-profile-table" {...cy}>
      {showLabel && <Text size={TextSize.Large}>Select a Profile</Text>}
      <Table columns={columns} data={deploymentProfiles} sortColumns={[1, 2]} />
      <ProfilePackageDetails
        profile={profileToDisplay}
        defaultProfileName={defaultProfile}
        isOpen={isDrawerOpen}
        onCloseDrawer={() => {
          setIsDrawerOpen(false);
        }}
      />
    </div>
  );
};
export default SelectProfileTable;
