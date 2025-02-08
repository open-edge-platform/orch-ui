/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Heading } from "@spark-design/react";
import { HeaderSize } from "@spark-design/tokens";
import { useAppSelector } from "../../../../store/hooks";
import { selectDeploymentPackage } from "../../../../store/reducers/deploymentPackage";
import ApplicationReferenceTable from "../../applications/ApplicationReferenceTable/ApplicationReferenceTable";
import DeploymentPackageDetailsProfileList from "../DeploymentPackageDetailsProfileList/DeploymentPackageDetailsProfileList";

export const dataCy = "dpCreateEditReview";

const DeploymentPackageCreateEditReview = () => {
  const cy = { "data-cy": dataCy };

  const deploymentPackage = useAppSelector(selectDeploymentPackage);

  return (
    <div {...cy} className="deployment-package-create-edit-review">
      <Heading semanticLevel={5} size={HeaderSize.Medium}>
        Review
      </Heading>
      <div data-cy="reviewSection">
        <Heading semanticLevel={2} size={HeaderSize.Medium}>
          General Information:
        </Heading>
        <table>
          <tbody>
            <tr>
              <td>Name:</td>
              <td data-cy="name">{deploymentPackage.displayName}</td>
            </tr>
            <tr>
              <td>Version:</td>
              <td data-cy="version">{deploymentPackage.version}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td data-cy="description">
                {deploymentPackage.description || (
                  <em>No Description is provided</em>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div data-cy="applicationListSection">
        <Heading semanticLevel={2} size={HeaderSize.Medium}>
          Applications:
        </Heading>
        <ApplicationReferenceTable />
      </div>

      <div data-cy="advancedSettingsSection">
        <Heading semanticLevel={2} size={HeaderSize.Medium}>
          Advanced Settings:
        </Heading>
        {/* Show message if profiles are empty */}
        {(!deploymentPackage.profiles ||
          deploymentPackage.profiles.length === 0) && (
          <em style={{ color: "grey" }}>No advanced settings selected.</em>
        )}
        {/* Show list if profiles are not empty */}
        {deploymentPackage.profiles &&
          deploymentPackage.profiles.length > 0 && (
            <DeploymentPackageDetailsProfileList
              deploymentPackage={deploymentPackage}
            />
          )}
      </div>
    </div>
  );
};
export default DeploymentPackageCreateEditReview;
