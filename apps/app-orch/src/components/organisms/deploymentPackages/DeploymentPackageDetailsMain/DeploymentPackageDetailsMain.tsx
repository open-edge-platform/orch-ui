/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { rfc3339ToDate } from "@orch-ui/utils";
import { Heading } from "@spark-design/react";
import "./DeploymentPackageDetailsMain.scss";

export const dataCy = "deploymentPackageDetailsMain";

interface DeploymentPackageDetailsMainProps {
  deploymentPackage: catalog.DeploymentPackageRead;
}

const DeploymentPackageDetailsMain = ({
  deploymentPackage,
}: DeploymentPackageDetailsMainProps) => {
  const cy = { "data-cy": dataCy };
  const defaultProfile = deploymentPackage.profiles?.filter(
    (profile) => profile.name === deploymentPackage.defaultProfileName,
  )[0];

  return (
    <div {...cy} className="deployment-package-details-main">
      <div className="deployment-package-details-main__dp-details">
        <Heading semanticLevel={6}>General Information</Heading>
        <table>
          <tbody>
            <tr>
              <td>Version</td>
              <td data-cy="dpVersion">
                {deploymentPackage.version || "No version found"}
              </td>
            </tr>
            <tr>
              <td>Deployment Package Profile</td>
              <td data-cy="dpDefaultProfile">
                {defaultProfile?.displayName ||
                  deploymentPackage.defaultProfileName ||
                  "No default profile found"}
              </td>
            </tr>
            <tr>
              <td>Created on:</td>
              <td data-cy="dpCreatedOn">
                {deploymentPackage.createTime
                  ? rfc3339ToDate(deploymentPackage.createTime)
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td>Last updated:</td>
              <td data-cy="dpLastUpdate">
                {deploymentPackage.updateTime
                  ? rfc3339ToDate(deploymentPackage.updateTime)
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td>Deployed:</td>
              <td data-cy="dpIsDeployed">
                {deploymentPackage.isDeployed ? "Yes" : "No"}
              </td>
            </tr>
            <tr>
              <td>Visible:</td>
              <td data-cy="dpIsVisible">
                {deploymentPackage.isVisible ? "Yes" : "No"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeploymentPackageDetailsMain;
