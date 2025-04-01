/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm, catalog } from "@orch-ui/apis";
import { Empty, SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Heading } from "@spark-design/react";
import DeploymentApplicationsTable from "../DeploymentApplicationsTable/DeploymentApplicationsTable";
import "./DeploymentDetailsDrawerContent.scss";

export type ApplicationTableColumns =
  | "Display Name"
  | "Version"
  | "Publisher Name"
  | "Helm Registry"
  | "Application Profiles"
  | "Value Overrides";

/**
  Join result of `DeploymentPackage.appReference` with `applications`
  for si-table preview.

  Due to `appReferences` in `DeploymentPackage`, All `appRef`
  need indvidual Application API calls via rtk hook.
  Meanwhile, the spark table requires all Application
  row `data` at once.

  This component will lazy load Application rows,
  combining each one after another within a
  spark table component.
*/

/** View Details drawer content */
const DeploymentDetailsDrawerContent = ({
  deployment,
}: {
  deployment: adm.Deployment;
}) => {
  const projectName = SharedStorage.project?.name ?? "";
  const {
    data: deploymentPackageData,
    isLoading: isCALoading,
    isError: isCAError,
  } = catalog.useCatalogServiceGetDeploymentPackageQuery(
    {
      projectName,
      deploymentPackageName: deployment.appName,
      version: deployment.appVersion,
    },
    {
      skip: !projectName,
    },
  );

  const deploymentPackage = deploymentPackageData?.deploymentPackage;

  if (isCALoading) {
    return (
      <div data-cy="viewDetailsContent">
        <SquareSpinner message="Loading Deployment Package..." />
      </div>
    );
  } else if (isCAError || !deploymentPackage) {
    return (
      <div data-cy="viewDetailsContent">
        <Empty
          icon="cube"
          title="Error in fetching Deployment Package data!"
          dataCy="drawerCaEmpty"
        />
      </div>
    );
  }

  return (
    <div
      className="deployment-details__view-details"
      data-cy="viewDetailsContent"
    >
      <table className="deployment-details__view-details__ca-details">
        <tr>
          <td className="label">Version</td>
          <td data-cy="drawerCaVersion">
            {deploymentPackage.version || "No version provided!"}
          </td>
        </tr>
        <tr>
          <td className="label">Description</td>
          <td data-cy="drawerCaDescription">
            {deploymentPackage.description || "No Description provided!"}
          </td>
        </tr>
      </table>

      <div
        className="deployment-details__view-details__applications-table"
        data-cy="drawerApplicationsTable"
      >
        <Heading semanticLevel={6}>Applications</Heading>
        {
          /* This will map applicationReference to applications and set into appList */
          deploymentPackage.applicationReferences.length > 0 && (
            <DeploymentApplicationsTable
              deployment={deployment}
              deploymentPackage={deploymentPackage}
            />
          )
        }

        {deploymentPackage.applicationReferences.length === 0 && (
          <Empty icon="cube" title="No Applications found!" />
        )}
      </div>
    </div>
  );
};

export default DeploymentDetailsDrawerContent;
