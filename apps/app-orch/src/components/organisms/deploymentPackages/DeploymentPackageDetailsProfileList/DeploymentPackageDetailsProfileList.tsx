/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { Empty, Table, TableColumn } from "@orch-ui/components";
import { Badge, Heading } from "@spark-design/react";
import DeploymentPackageDetailsAppProfileList from "../DeploymentPackageDetailsAppProfileList/DeploymentPackageDetailsAppProfileList";
import "./DeploymentPackageDetailsProfileList.scss";

const dataCy = "deploymentPackageDetailsProfileList";

interface DeploymentPackageDetailsProfileListProps {
  deploymentPackage: catalog.DeploymentPackage;
}

const DeploymentPackageDetailsProfileList = ({
  deploymentPackage,
}: DeploymentPackageDetailsProfileListProps) => {
  const cy = { "data-cy": dataCy };
  const column: TableColumn<catalog.DeploymentProfile>[] = [
    {
      Header: "Deployment Package Profiles",
      accessor: (row) => row.displayName ?? row.name,
    },
    {
      Header: "Description",
      accessor: (row) => row.description,
    },
    {
      Header: " ",
      accessor: (row) =>
        row.name === deploymentPackage.defaultProfileName ? (
          <Badge
            data-cy="default-badge"
            variant="info"
            shape="square"
            text="Default"
          />
        ) : (
          ""
        ),
    },
  ];

  return (
    <div {...cy} className="deployment-package-details-profile-list">
      <Heading semanticLevel={6}>Deployment Package Profiles</Heading>
      {(!deploymentPackage.profiles ||
        deploymentPackage.profiles?.length === 0) && (
        <Empty
          icon="cube-detached"
          title="No deployment package profiles found"
        />
      )}
      {deploymentPackage.profiles && deploymentPackage.profiles.length > 0 && (
        <div
          data-cy="dpProfileListTable"
          className="deployment-package-details-profile-list__table"
        >
          <Table
            columns={column}
            data={deploymentPackage.profiles}
            canExpandRows
            subRow={(row: { original: catalog.DeploymentProfile }) => {
              const caProfile = row.original;
              return (
                <div className="deployment-package-details-profile-list__app-profile-list-wrapper">
                  <DeploymentPackageDetailsAppProfileList
                    deploymentPackageProfile={caProfile}
                    deploymentPackage={deploymentPackage}
                  />
                </div>
              );
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DeploymentPackageDetailsProfileList;
