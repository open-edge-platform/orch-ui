/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { SharedStorage } from "@orch-ui/utils";
import {
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  Heading,
  ToggleSwitch,
} from "@spark-design/react";
import {
  ButtonGroupAlignment,
  ButtonSize,
  ButtonVariant,
  DrawerSize,
  ToggleSwitchSize,
} from "@spark-design/tokens";
import { useEffect, useState } from "react";
import { PublicSshKeyDropdown } from "../../atom/PublicSshKeyDropdown/PublicSshKeyDropdown";
import OsProfileDropdown from "../../organism/OsProfileDropdown/OsProfileDropdown";
import "./EditHostDrawer.scss";

export interface EditHostDrawerProps {
  host: infra.HostRead;
  isOpen: boolean;
  onHide: () => void;
  onSave?: (host: infra.HostRead) => void;
}

const dataCy = "editHostDrawer";

const EditHostDrawer = ({
  host,
  isOpen,
  onHide,
  onSave,
}: EditHostDrawerProps) => {
  const [selectedOsProfile, setSelectedOsProfile] =
    useState<infra.OperatingSystemResourceRead>();
  const [vproEnabled, setVproEnabled] = useState(false);
  const [secureBootEnabled, setSecureBootEnabled] = useState(false);
  const [selectedSshKey, setSelectedSshKey] =
    useState<infra.LocalAccountRead>();
  const [sshKeys, setSshKeys] = useState<infra.LocalAccountRead[]>([]);

  // Fetch SSH keys when the drawer opens
  const { data: localAccountsData } =
    infra.useGetV1ProjectsByProjectNameLocalAccountsQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
      },
      {
        skip: !isOpen || !SharedStorage.project?.name,
      },
    );

  useEffect(() => {
    if (localAccountsData?.localAccounts) {
      setSshKeys(localAccountsData.localAccounts);
    }
  }, [localAccountsData]);

  const handleSshKeySelection = (
    hostId: string,
    sshKey: infra.LocalAccount,
  ) => {
    setSelectedSshKey(sshKey as infra.LocalAccountRead);
  };

  const handleSave = () => {
    console.log({
      osProfile: selectedOsProfile?.name,
      securitySettings: {
        vPro: vproEnabled,
        secureBoot: secureBootEnabled,
      },
      sshKey: selectedSshKey?.username,
    });

    if (onSave) {
      onSave(host);
    }

    onHide();
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
          <OsProfileDropdown
            onSelectionChange={(os) => {
              setSelectedOsProfile(os);
            }}
          />
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
          <Divider />
          <Heading semanticLevel={6}>SSH Key</Heading>
          <p className="spark-font-75">
            Select an SSH key to enable local user access to this host.
          </p>
          <div className="ssh-key-dropdown-container">
            {host && (
              <PublicSshKeyDropdown
                hostId={host.resourceId || ""}
                host={host}
                localAccounts={sshKeys}
                onPublicKeySelect={handleSshKeySelection}
              />
            )}
          </div>
          <Divider />
          <Heading semanticLevel={6}>Network </Heading>
        </div>
      }
      footerContent={
        <ButtonGroup align={ButtonGroupAlignment.End}>
          <Button
            data-cy="cancelFooterBtn"
            size={ButtonSize.Medium}
            onPress={onHide}
            variant={ButtonVariant.Secondary}
          >
            Cancel
          </Button>
          <Button
            data-cy="saveFooterBtn"
            size={ButtonSize.Medium}
            onPress={handleSave}
            variant={ButtonVariant.Action}
          >
            Save
          </Button>
        </ButtonGroup>
      }
    />
  );
};

export default EditHostDrawer;
