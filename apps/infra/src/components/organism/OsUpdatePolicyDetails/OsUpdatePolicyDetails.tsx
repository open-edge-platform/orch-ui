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
 * Renders the details of install packages.
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
        <Text>No packages to install</Text>
      )}
    </div>
  );
};

const OsUpdatePolicyDetails = ({
  osUpdatePolicy,
}: OsUpdatePolicyDetailsProps) => {
  const cy = { "data-cy": dataCy };

  // Determine if this is a mutable OS (we can infer this from the presence of mutable-specific fields)
  const isMutableOS = !!(
    osUpdatePolicy.kernelCommand ||
    osUpdatePolicy.installPackages ||
    osUpdatePolicy.updateSources?.length
  );

  // Check if this is UPDATE_POLICY_LATEST (for mutable OS, only name/description should show additional fields)
  const isUpdateToLatest =
    osUpdatePolicy.updatePolicy === "UPDATE_POLICY_LATEST";

  return (
    <div className="os-update-policy-detail-content" {...cy}>
      <div className="os-details-header">Details</div>
      <OsProfileDetailField label={"Name"} value={osUpdatePolicy.name} />
      <OsProfileDetailField
        label="Description"
        value={osUpdatePolicy.description}
      />

      <div className="os-details-advanced-settings">OS Configuration</div>
      <OsProfileDetailField
        label="OS Type"
        value={isMutableOS ? "Mutable OS" : "Immutable OS"}
      />

      <OsProfileDetailField
        label="Update Policy"
        value={
          osUpdatePolicy.updatePolicy === "UPDATE_POLICY_LATEST"
            ? "Update To Latest"
            : osUpdatePolicy.updatePolicy === "UPDATE_POLICY_TARGET"
              ? "Update To Target"
              : osUpdatePolicy.updatePolicy
        }
      />

      {/* Target OS - Only for IMMUTABLE OS with UPDATE_POLICY_TARGET */}
      {osUpdatePolicy.targetOs && (
        <>
          <div className="os-details-advanced-settings">
            Target Operating System
          </div>
          <OsProfileDetailField
            label="Target OS Name"
            value={osUpdatePolicy.targetOs.name}
          />
        </>
      )}

      {/* Advanced Settings - Only for MUTABLE OS and NOT UPDATE_POLICY_LATEST */}
      {isMutableOS && !isUpdateToLatest && (
        <>
          <div className="os-details-advanced-settings">Advanced Settings</div>

          {/* Kernel Command - Only for MUTABLE OS and NOT UPDATE_POLICY_LATEST */}
          <OsProfileDetailField
            label="Kernel Command"
            value={osUpdatePolicy.kernelCommand || "Not specified"}
          />

          {/* Update Sources - Only for MUTABLE OS and NOT UPDATE_POLICY_LATEST */}
          <OsProfileDetailField
            label="Update Sources"
            value={
              osUpdatePolicy.updateSources?.length
                ? osUpdatePolicy.updateSources.join(", ")
                : "Not specified"
            }
          />

          {/* Install Packages - Only for MUTABLE OS and NOT UPDATE_POLICY_LATEST */}
          {osUpdatePolicy.installPackages && (
            <>
              <div className="os-details-advanced-settings">
                Install Packages
              </div>
              {renderInstallPackages(osUpdatePolicy.installPackages)}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default OsUpdatePolicyDetails;
