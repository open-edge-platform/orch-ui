/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { Empty, Table, TableColumn } from "@orch-ui/components";
import { Link } from "react-router-dom";
import "./DeploymentPackageDetailsAppProfileList.scss";

const dataCy = "deploymentPackageDetailsAppProfileList";

interface DeploymentPackageDetailsAppProfileListProps {
  deploymentPackageProfile: catalog.DeploymentProfile;
  deploymentPackage: catalog.DeploymentPackage;
}

const DeploymentPackageDetailsAppProfileList = ({
  deploymentPackageProfile,
  deploymentPackage,
}: DeploymentPackageDetailsAppProfileListProps) => {
  const cy = { "data-cy": dataCy };
  const appColumns: TableColumn<catalog.ApplicationReference>[] = [
    {
      Header: "Application Name",
      accessor: (row) => (
        <Link
          to={`/applications/application/${row.name}/version/${row.version}`}
        >
          {row.name}
        </Link>
      ),
    },
    {
      Header: "Version",
      accessor: (row) => row.version,
    },
    {
      Header: "Application Profiles",
      accessor: (row) =>
        deploymentPackageProfile.applicationProfiles[row.name] ??
        "Application is not provided with a profile.",
    },
  ];

  return (
    <div {...cy} className="deployment-package-details-app-profile-list">
      {(deploymentPackage.applicationReferences.length === 0 ||
        Object.keys(deploymentPackageProfile.applicationProfiles).length ===
          0) && (
        <Empty icon="cube-detached" title="No application profiles found" />
      )}

      {deploymentPackage.applicationReferences.length > 0 &&
        Object.keys(deploymentPackageProfile.applicationProfiles).length >
          0 && (
          <div data-cy="dpAppProfileTable">
            <Table
              columns={appColumns}
              data={deploymentPackage.applicationReferences}
            />
          </div>
        )}
    </div>
  );
};

export default DeploymentPackageDetailsAppProfileList;
