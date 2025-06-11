/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import {
  ExpansionPanel,
  Flex,
  MetadataForm,
  MetadataPair,
  Section,
} from "@orch-ui/components";
import { RuntimeConfig } from "@orch-ui/utils";
import {
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  Heading,
  MessageBanner,
  ToggleSwitch,
} from "@spark-design/react";
import { ButtonVariant, ToggleSwitchSize } from "@spark-design/tokens";
import React, {
  ComponentType,
  LazyExoticComponent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  HostData,
  selectHostProvisionState,
  setHostData,
} from "../../../store/provisionHost";
import { PublicSshKeyDropdown } from "../../atom/PublicSshKeyDropdown/PublicSshKeyDropdown";
import OsProfileDropdown from "../OsProfileDropdown/OsProfileDropdown";

const dataCy = "hostProvisionEditDrawer";

type RemoteComponent = LazyExoticComponent<ComponentType<any>> | null;

let ClusterTemplatesDropdownRemote: RemoteComponent = null;
let ClusterTemplateVersionsDropdownRemote: RemoteComponent = null;

if (RuntimeConfig.isEnabled("CLUSTER_ORCH")) {
  ClusterTemplatesDropdownRemote = React.lazy(
    async () => await import("ClusterOrchUI/ClusterTemplatesDropdown"),
  );
  ClusterTemplateVersionsDropdownRemote = React.lazy(
    async () => await import("ClusterOrchUI/ClusterTemplateVersionsDropdown"),
  );
}

interface HostProvisionEditDrawerProps {
  hostDataName?: string;
  onClose?: () => void;
}

const HostProvisionEditDrawer = ({
  hostDataName,
  onClose,
}: HostProvisionEditDrawerProps) => {
  const cy = { "data-cy": dataCy };

  const { createCluster, hosts } = useAppSelector(selectHostProvisionState);
  const dispatch = useAppDispatch();

  const host = hostDataName ? hosts[hostDataName] : undefined;

  const [loading, setLoading] = useState<boolean>(true);
  const [showAdvancedOptions, setShowAdvancedOptions] =
    useState<boolean>(false);

  const [osProfile, setOsProfile] = useState<
    infra.OperatingSystemResourceRead | undefined
  >(host?.instance?.os as infra.OperatingSystemResourceRead);
  const [templateName, setTemplateName] = useState<string | undefined>(
    host?.templateName,
  );
  const [templateVersion, setTemplateVersion] = useState<string | undefined>(
    host?.templateVersion,
  );
  const [securityFeature, setSecurityFeature] = useState<
    NonNullable<HostData["instance"]>["securityFeature"] | undefined
  >(host?.instance?.securityFeature);
  const [publicSshKey, setPublicSshKey] = useState<string | undefined>(
    host?.instance?.localAccountID,
  );
  const [metadata, setMetadata] = useState<MetadataPair[] | undefined>(
    host?.metadata,
  );
  const [metadataValidationError, setMetadataValidationError] =
    useState<boolean>(false);

  useEffect(() => {
    if (host) {
      setTimeout(() => setLoading(false), 0);
    }
  }, [host]);

  const metadataContent = useMemo(
    () => (
      <MetadataForm
        buttonText="+"
        pairs={metadata}
        onUpdate={(kv: MetadataPair[]) => setMetadata(kv)}
        hasError={(error) => {
          setMetadataValidationError(error);
        }}
      />
    ),
    [metadata],
  );

  return (
    <div {...cy} className="host-provision-edit-drawer">
      <Drawer
        show={hostDataName !== undefined}
        backdropClosable={false}
        onHide={() => {
          onClose?.();
        }}
        headerProps={{
          title: host?.name,
        }}
        bodyContent={
          loading ? (
            <MessageBanner
              variant="info"
              outlined
              messageTitle="Loading..."
              messageBody="Please wait while the data is being loaded."
            />
          ) : host ? (
            <>
              <Section title="Operating System">
                <Flex cols={[8]}>
                  <OsProfileDropdown
                    label="OS Profile"
                    value={osProfile?.resourceId}
                    onSelectionChange={(os) => {
                      if (!os) return;
                      setOsProfile(os);
                    }}
                    isRequired
                  />
                </Flex>
                {createCluster && (
                  <Flex cols={[6]} gap="2">
                    {ClusterTemplatesDropdownRemote && (
                      <ClusterTemplatesDropdownRemote
                        clusterTemplateName={templateName}
                        onSelectionChange={(value: string) => {
                          setTemplateName(value);
                        }}
                      />
                    )}
                    {ClusterTemplateVersionsDropdownRemote && (
                      <ClusterTemplateVersionsDropdownRemote
                        clusterTemplateVersion={templateVersion}
                        templateName={templateName}
                        isDisabled={!(templateName && templateName.length > 0)}
                        onSelectionChange={(value: string) => {
                          setTemplateVersion(value);
                        }}
                      />
                    )}
                  </Flex>
                )}
              </Section>
              <ExpansionPanel
                title="Advanced options"
                isOpen={showAdvancedOptions}
                onToggle={(isOpen) => setShowAdvancedOptions(isOpen)}
              >
                <Section title="Security options">
                  <Flex cols={[6]} gap="2" align="start">
                    <div>
                      <Heading semanticLevel={6}>vPro</Heading>
                      <p>
                        Enable vPro for lorem ipsum dolorem, remote management
                        with enhanced security. Lorem minimum HW requirements.
                      </p>
                      <ToggleSwitch
                        name="vpro"
                        isSelected={false}
                        onChange={() => {
                          // TODO: how to handle vPro
                        }}
                        size={ToggleSwitchSize.Large}
                      >
                        Disabled
                      </ToggleSwitch>
                    </div>
                    <div>
                      <Heading semanticLevel={6}>
                        Secure Boot and Full Disk Encryption
                      </Heading>
                      <p>
                        Secure Boot and Full Disk Encryption must be enabled in
                        the BIOS. Trusted Compute compatibility requires Secure
                        Boot.
                      </p>
                      <ToggleSwitch
                        name="sbfde"
                        data-cy="sbfdeToggle"
                        isSelected={
                          securityFeature ===
                          "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION"
                        }
                        onChange={(isSelected) =>
                          setSecurityFeature(
                            isSelected
                              ? "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION"
                              : "SECURITY_FEATURE_NONE",
                          )
                        }
                        size={ToggleSwitchSize.Large}
                      >
                        {securityFeature ===
                        "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION"
                          ? "Enabled"
                          : "Disabled"}
                      </ToggleSwitch>
                    </div>
                    <div>
                      <Heading semanticLevel={6}>SSH Key Name</Heading>
                      <p>
                        Select an SSH key name to enable local user access to
                        hosts.
                      </p>
                      <PublicSshKeyDropdown
                        selectedPublicKey={publicSshKey}
                        onPublicKeySelect={(account) => {
                          setPublicSshKey(account.resourceId);
                        }}
                        onPublicKeyRemove={() => {
                          setPublicSshKey(undefined);
                        }}
                      />
                    </div>
                  </Flex>
                </Section>
                <Divider />
                <Section title="Labels">
                  <Flex cols={[10]}>{metadataContent}</Flex>
                </Section>
              </ExpansionPanel>
            </>
          ) : (
            <MessageBanner
              variant="error"
              outlined
              messageTitle="Error while loading host details"
              messageBody="Data was not transferred correctly."
            />
          )
        }
        footerContent={
          <>
            <ButtonGroup className="footer-btn-group" align="end">
              <Button variant={ButtonVariant.Primary} onPress={onClose}>
                Cancel
              </Button>
              <Button
                data-cy="saveHostData"
                variant={ButtonVariant.Action}
                isDisabled={metadataValidationError}
                onPress={() => {
                  dispatch(
                    setHostData({
                      host: {
                        name: host?.name ?? "",
                        // site
                        instance: {
                          os: osProfile,
                          osID: osProfile?.resourceId,
                          securityFeature,
                          localAccountID: publicSshKey,
                        },
                        templateName,
                        templateVersion,
                        metadata,
                      },
                    }),
                  );
                  onClose?.();
                }}
              >
                Save
              </Button>
            </ButtonGroup>
          </>
        }
      />
    </div>
  );
};

export default HostProvisionEditDrawer;
