/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { Popup, PopupOption, Table, TableColumn } from "@orch-ui/components";
import { Badge, Icon } from "@spark-design/react";
import { BadgeSize } from "@spark-design/tokens";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  deleteDeploymentPackageProfile,
  selectDeploymentPackageReferences,
  setDefaultProfileName,
} from "../../../../store/reducers/deploymentPackage";
import ApplicationName from "../../../atoms/ApplicationName/ApplicationName";
import ProfileName from "../../../atoms/ProfileName/ProfileName";
import AddEditProfileDrawer from "../DeploymentPackageProfileAddEditDrawer/DeploymentPackageProfileAddEditDrawer";
import "./DeploymentPackageProfileListItem.scss";

export const dataCy = "deploymentPackageProfileListItem";

type ApplicationProfiles = catalog.DeploymentProfile["applicationProfiles"];

interface DeploymentPackageProfileListItemProps {
  profile: catalog.DeploymentProfile;
  defaultProfileName?: string;
}

const DeploymentPackageProfileListItem = ({
  profile,
  defaultProfileName,
}: DeploymentPackageProfileListItemProps) => {
  const cy = { "data-cy": dataCy };
  const dispatch = useAppDispatch();

  const [showProfileDrawer, setShowProfileDrawer] = useState<boolean>(false);
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const applicationReferences = useAppSelector(
    selectDeploymentPackageReferences,
  );

  useEffect(() => {
    setIsDefault(defaultProfileName === profile.name);
  }, [defaultProfileName, profile]);

  const getPopupOptions = (): PopupOption[] => [
    {
      displayText: "Set as Default",
      onSelect: () => {
        dispatch(setDefaultProfileName(profile.name));
      },
      disable: isDefault,
    },
    {
      displayText: "Edit",
      onSelect: () => {
        setShowProfileDrawer(true);
      },
    },
    {
      displayText: "Delete",
      onSelect: () => {
        dispatch(deleteDeploymentPackageProfile(profile.name));
      },
      disable: isDefault,
    },
  ];

  /** Columns for deployment package profile */
  const deploymentPackageProfileColumn: TableColumn<catalog.DeploymentProfile>[] =
    [
      {
        Header: "Name",
        accessor: (profile) => profile.displayName ?? profile.name,
      },
      {
        Header: "Description",
        accessor: (profile) => profile.description,
        Cell: (table) => (
          <>
            {table.row.original.description || <em>No Description provided</em>}
          </>
        ),
      },
      {
        // column with no header name
        Header: " ",
        Cell: () => (
          <>
            {isDefault && (
              <Badge
                className="default-badge"
                size={BadgeSize.Medium}
                text="Default"
                variant="info"
                shape="square"
              />
            )}
          </>
        ),
      },
      {
        // extra space to differentiate this column with no header name with above column
        Header: "  ",
        Cell: () => (
          <div className="options">
            <Popup
              dataCy="popupButtons"
              options={getPopupOptions()}
              jsx={
                <Icon
                  icon="ellipsis-v"
                  data-cy="ellipsisButton"
                  className="popup-icon"
                />
              }
            />
          </div>
        ),
      },
    ];

  /** Column for list of application profiles within deployment package profile */
  const applicationProfileColumns: TableColumn<ApplicationProfiles>[] = [
    {
      Header: "Application Name",
      accessor: "application",
      Cell: (table) => {
        const appReference = applicationReferences?.find(
          (appRef) => appRef.name === table.row.original.application,
        );
        if (!appReference || !appReference.version) {
          return <></>;
        }
        const appVersion = appReference.version;
        return (
          <ApplicationName
            applicationReference={{
              name: table.row.original.application,
              version: appVersion,
            }}
          />
        );
      },
    },
    {
      Header: "Application Profile",
      accessor: "profile",
      Cell: (table) => {
        const appReference = applicationReferences?.find(
          (appRef) => appRef.name === table.row.original.application,
        );

        if (!appReference || !appReference.version) {
          return <></>;
        }
        const appVersion = appReference.version;
        return (
          <ProfileName
            applicationReference={{
              name: table.row.original.application,
              version: appVersion,
            }}
            profileName={table.row.original["profile"]}
          />
        );
      },
    },
  ];

  const applicationProfileData: ApplicationProfiles[] = Object.keys(
    profile.applicationProfiles,
  ).map((app) => ({
    application: app,
    profile: profile.applicationProfiles[app],
  }));

  return (
    <div {...cy} className="deployment-package-profile-list-item">
      <AddEditProfileDrawer
        show={showProfileDrawer}
        profile={profile}
        isDefaultProfile={isDefault}
        onClose={() => setShowProfileDrawer(false)}
      />
      <div
        className="deployment-package-profile-list-item__table"
        data-cy="packageProfileList"
      >
        <Table
          columns={deploymentPackageProfileColumn}
          data={[profile]}
          canExpandRows
          subRow={() => (
            <div
              className="deployment-package-profile-list-item__table__app-profile-list"
              data-cy="applicationProfileList"
            >
              <Table
                columns={applicationProfileColumns}
                data={applicationProfileData}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default DeploymentPackageProfileListItem;
