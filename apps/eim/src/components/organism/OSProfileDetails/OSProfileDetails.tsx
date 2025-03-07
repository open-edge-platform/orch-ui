/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import OsProfileDetailField from "./OsProfileDetailField";

import "./OSProfileDetails.scss";

export const dataCy = "osProfileDetails";

export const OSProfileSecurityFeatures: {
  [key in eim.SecurityFeature]: string;
} = {
  SECURITY_FEATURE_UNSPECIFIED: "Unspecified",
  SECURITY_FEATURE_NONE: "None",
  SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION: "Secure Boot / FDE",
};

interface OSProfileDetailsProps {
  os: eim.OperatingSystemResourceRead;
}

const OSProfileDetails = ({ os }: OSProfileDetailsProps) => {
  const cy = { "data-cy": dataCy };
  const osProfileSecurity =
    os.securityFeature && OSProfileSecurityFeatures[os.securityFeature];

  return (
    <div className="os-profile-detail-content" {...cy}>
      <div className="os-details-header">Details</div>
      <OsProfileDetailField label={"Name"} value={os.name} />
      <OsProfileDetailField label="Profile Name" value={os.profileName} />
      <OsProfileDetailField
        label="Security Features"
        value={osProfileSecurity}
      />
      <OsProfileDetailField label="Architecture" value={os.architecture} />
      <div className="os-details-advanced-settings">Advanced Settings</div>
      <OsProfileDetailField
        label="Update Sources"
        value={os.updateSources?.join()}
      />
      <OsProfileDetailField label="Repository URL" value={os.repoUrl} />
      <OsProfileDetailField label="sha256" value={os.sha256} />
      <OsProfileDetailField label="Kernel Command" value={os.kernelCommand} />
      <OsProfileDetailField
        label="Installed Packages"
        value={os.installedPackages}
      />
    </div>
  );
};

export default OSProfileDetails;
