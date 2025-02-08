/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";

import { Drawer } from "@spark-design/react";
import OsProfileDetailField from "./OsProfileDetailField";
import { OSProfileSecurityFeatures } from "./OSProfiles";

import "./OSProfiles.scss";

export const dataCy = "os-profile-drawer";

interface OsProfileDrawerProps {
  showDrawer: boolean;
  selectedOsProfile: eim.OperatingSystemResourceRead;
  setShowDrawer: (show: boolean) => void;
}

const OSProfileDetailsDrawer = ({
  showDrawer,
  selectedOsProfile,
  setShowDrawer,
}: OsProfileDrawerProps) => {
  const cy = { "data-cy": dataCy };

  const getDrawerContent = () => {
    const osProfileSecurity =
      selectedOsProfile.securityFeature &&
      OSProfileSecurityFeatures[selectedOsProfile.securityFeature];
    return (
      <div className="os-profile-drawer-content" {...cy}>
        <div className="os-details-header">Details</div>
        <OsProfileDetailField label={"Name"} value={selectedOsProfile.name} />
        <OsProfileDetailField
          label="Profile Name"
          value={selectedOsProfile.profileName}
        />
        <OsProfileDetailField
          label="Security Features"
          value={osProfileSecurity}
        />
        <OsProfileDetailField
          label="Architecture"
          value={selectedOsProfile.architecture}
        />
        <div className="os-details-advanced-settings">Advanced Settings</div>
        <OsProfileDetailField
          label="Update Sources"
          value={selectedOsProfile.updateSources?.join()}
        />
        <OsProfileDetailField
          label="Repository URL"
          value={selectedOsProfile.repoUrl}
        />
        <OsProfileDetailField label="sha256" value={selectedOsProfile.sha256} />
        <OsProfileDetailField
          label="Kernel Command"
          value={selectedOsProfile.kernelCommand}
        />
        <OsProfileDetailField
          label="Installed Packages"
          value={selectedOsProfile.installedPackages}
        />
      </div>
    );
  };

  return (
    <Drawer
      show={showDrawer}
      backdropClosable
      onHide={() => {
        setShowDrawer(false);
      }}
      headerProps={{
        title: selectedOsProfile.name,
        className: "os-profile-drawer-header",
      }}
      bodyContent={getDrawerContent()}
      data-cy="osProfileDrawerContent"
    />
  );
};

export default OSProfileDetailsDrawer;
