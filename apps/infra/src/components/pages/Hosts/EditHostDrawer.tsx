/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import {
  Button,
  Divider,
  Drawer,
  Heading,
  ToggleSwitch,
} from "@spark-design/react";
import {
  ButtonVariant,
  DrawerSize,
  ToggleSwitchSize,
} from "@spark-design/tokens";
import { useState } from "react";
import OsProfileDropdown from "../../organism/OsProfileDropdown/OsProfileDropdown";
import "./EditHostDrawer.scss";

export interface EditHostDrawerProps {
  isOpen: boolean;
  onHide: () => void;
  selectedHosts: infra.HostRead[];
  onApply?: (
    osProfile: infra.OperatingSystemResourceRead,
    hosts: infra.HostRead[],
  ) => void;
}

const dataCy = "editHostDrawer";

const EditHostDrawer = ({
  isOpen,
  onHide,
  selectedHosts,
  onApply,
}: EditHostDrawerProps) => {
  const [selectedOsProfile, setSelectedOsProfile] =
    useState<infra.OperatingSystemResourceRead>();
  const [vproEnabled, setVproEnabled] = useState(false);
  const [secureBootEnabled, setSecureBootEnabled] = useState(false);

  const handleApply = () => {
    if (selectedOsProfile && selectedHosts.length > 0) {
      // Here you would make API calls to apply the OS profile and security settings
      console.log(
        "Applying OS profile:",
        selectedOsProfile.name,
        "to hosts:",
        selectedHosts.map((h) => h.name),
        "with security settings - vPro:",
        vproEnabled,
        "Secure Boot:",
        secureBootEnabled,
      );

      if (onApply) {
        onApply(selectedOsProfile, selectedHosts);
      }

      onHide();
    }
  };

  return (
    <Drawer
      show={isOpen}
      onHide={onHide}
      backdropClosable
      size={DrawerSize.Medium}
      headerProps={{
        title: "Edit Host",
        onHide: onHide,
        closable: true,
      }}
      bodyContent={
        <div data-cy={`${dataCy}Content`}>
          <Heading semanticLevel={6}>Operating System</Heading>
          {/* <div className="edit-host-os-dropdown"> */}
          <OsProfileDropdown
            onSelectionChange={(os) => {
              setSelectedOsProfile(os);
            }}
          />
          {/* </div> */}
          <Divider />
          <Heading semanticLevel={6}>Security Options</Heading>
          <div className="security-options-container">
            <div className="security-option">
              <p>vPro</p>
              <p className="security-description">Intel vPro description</p>
              <ToggleSwitch
                isSelected={vproEnabled}
                onChange={(value) => setVproEnabled(value)}
                size={ToggleSwitchSize.Medium}
              >
                {vproEnabled ? "Enabled" : "Disabled"}
              </ToggleSwitch>
            </div>
            <div className="security-option">
              <p>Secure Boot</p>
              <p className="security-description">Secure boot description</p>
              <ToggleSwitch
                isSelected={secureBootEnabled}
                onChange={(value) => setSecureBootEnabled(value)}
                size={ToggleSwitchSize.Medium}
              >
                {secureBootEnabled ? "Enabled" : "Disabled"}
              </ToggleSwitch>
            </div>
          </div>
        </div>
      }
      footerContent={
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}
        >
          <Button onPress={onHide} variant={ButtonVariant.Secondary}>
            Cancel
          </Button>
          <Button
            onPress={handleApply}
            isDisabled={!selectedOsProfile || selectedHosts.length === 0}
          >
            Apply
          </Button>
        </div>
      }
    />
  );
};

export default EditHostDrawer;
