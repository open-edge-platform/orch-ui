/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import OsUpdatePolicyDetailsField from "./OsUpdatePolicyDetailsField";

import "./OsUpdatePolicyDetails.scss";

const dataCy = "osUpdatePolicyDetails";

interface OsUpdatePolicyDetailsProps {
  osUpdatePolicy: infra.OsUpdatePolicyRead;
}

const OsUpdatePolicyDetails = ({
  osUpdatePolicy,
}: OsUpdatePolicyDetailsProps) => {
  const cy = { "data-cy": dataCy };

  return (
    <div className="os-update-policy-detail-content" {...cy}>
      <div className="os-details-header">Details</div>
      <div className="os-update-policy-field">
        <OsUpdatePolicyDetailsField label="Name" value={osUpdatePolicy.name} />
      </div>
      <div className="os-update-policy-field">
        <OsUpdatePolicyDetailsField
          label="Description"
          value={osUpdatePolicy.description || "N/A"}
        />
      </div>

      <div className="os-details-advanced-settings">OS Configuration</div>
      <div className="os-update-policy-field">
        <OsUpdatePolicyDetailsField
          label="Update Policy"
          value={
            osUpdatePolicy.updatePolicy === "UPDATE_POLICY_LATEST"
              ? "Update To Latest"
              : osUpdatePolicy.updatePolicy === "UPDATE_POLICY_TARGET"
                ? "Update To Target"
                : osUpdatePolicy.updatePolicy || "N/A"
          }
        />
      </div>

      <div className="os-update-policy-field">
        <OsUpdatePolicyDetailsField
          label="Target OS Name"
          value={osUpdatePolicy.targetOs?.name || "N/A"}
        />
      </div>

      <div className="os-update-policy-field">
        <OsUpdatePolicyDetailsField
          label="Kernel Command Update"
          value={osUpdatePolicy.updateKernelCommand || "N/A"}
        />
      </div>

      <div className="os-update-policy-field">
        <OsUpdatePolicyDetailsField
          label="Update Sources"
          value={
            osUpdatePolicy.updateSources?.length
              ? osUpdatePolicy.updateSources.join(", ")
              : "N/A"
          }
        />
      </div>

      <div className="os-update-policy-field">
        <OsUpdatePolicyDetailsField
          label="Update Packages"
          value={
            osUpdatePolicy.updatePackages
              ? osUpdatePolicy.updatePackages
                  .split("\n")
                  .filter((pkg) => pkg.trim())
                  .map((pkg) => pkg.trim())
                  .join(", ")
              : "N/A"
          }
        />
      </div>
    </div>
  );
};

export default OsUpdatePolicyDetails;
