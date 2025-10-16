/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Text } from "@spark-design/react";
import OsProfileDetailField from "../OSProfileDetails/OsProfileDetailField";

import "./OsUpdatePolicyDetails.scss";

const dataCy = "osUpdatePolicyDetails";

interface OsUpdatePolicyDetailsProps {
  osUpdatePolicy: infra.OsUpdatePolicyRead;
}

/**
 * Renders the details of update packages.
 *
 * @param {string} installPackages - The packages string containing names to be rendered.
 * @returns {JSX.Element} The JSX element containing the package names.
 */
const renderInstallPackages = (installPackages: string) => {
  const packages = installPackages.split("\n").filter((pkg) => pkg.trim());

  return (
    <div className="install-packages-content">
      {packages.length ? (
        <div className="install-packages__grid-wrapper">
          <div>
            <Text style={{ fontWeight: "500" }}>Package Name</Text>
          </div>
          {packages.map((pkg: string, index: number) => (
            <div key={index}>
              <span className="line"></span>
              <div>
                <Text>{pkg.trim()}</Text>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Text>No packages to update</Text>
      )}
    </div>
  );
};

const OsUpdatePolicyDetails = ({
  osUpdatePolicy,
}: OsUpdatePolicyDetailsProps) => {
  const cy = { "data-cy": dataCy };

  return (
    <div className="os-update-policy-detail-content" {...cy}>
      <div className="os-details-header">Details</div>
      <OsProfileDetailField label={"Name"} value={osUpdatePolicy.name} />
      <OsProfileDetailField
        label="Description"
        value={osUpdatePolicy.description || "N/A"}
      />

      <div className="os-details-advanced-settings">OS Configuration</div>
      <OsProfileDetailField
        label="Update Policy"
        value={
          osUpdatePolicy.updatePolicy === "UPDATE_POLICY_LATEST"
            ? "Update To Latest"
            : osUpdatePolicy.updatePolicy === "UPDATE_POLICY_TARGET"
              ? "Update To Target"
              : osUpdatePolicy.updatePolicy || "N/A"
        }
      />

      {/* Target OS */}
      <div className="os-details-advanced-settings">
        Target Operating System
      </div>
      <OsProfileDetailField
        label="Target OS Name"
        value={osUpdatePolicy.targetOs?.name || "N/A"}
      />

      {/* Advanced Settings */}
      <div className="os-details-advanced-settings">Advanced Settings</div>

      <OsProfileDetailField
        label="Kernel Command Update"
        value={osUpdatePolicy.kernelCommand || "N/A"}
      />

      <OsProfileDetailField
        label="Update Sources"
        value={
          osUpdatePolicy.updateSources?.length
            ? osUpdatePolicy.updateSources.join(", ")
            : "N/A"
        }
      />

      <div className="os-details-advanced-settings">Update Packages</div>
      {osUpdatePolicy.installPackages ? (
        renderInstallPackages(osUpdatePolicy.installPackages)
      ) : (
        <OsProfileDetailField label="Packages" value="N/A" />
      )}
    </div>
  );
};

export default OsUpdatePolicyDetails;
