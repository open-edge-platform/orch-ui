/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ExpansionPanel,
  Flex,
  MetadataForm,
  MetadataPair,
  Section,
} from "@orch-ui/components";
import { RuntimeConfig } from "@orch-ui/utils";
import { Divider, Heading, ToggleSwitch } from "@spark-design/react";
import { ToggleSwitchSize } from "@spark-design/tokens";
import React, { ComponentType, LazyExoticComponent, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectHostProvisionState,
  setCommonClusterTemplateName,
  setCommonClusterTemplateVersion,
  setCommonMetadata,
  setCommonOsProfile,
  setCommonPublicSshKey,
  setCommonSecurityFeature,
  setCommonSite,
  setShowAdvancedOptions,
  setValidationError,
} from "../../../store/provisionHost";
import { SiteSearch } from "../../atom/locations/SiteSearch/SiteSearch";
import { PublicSshKeyDropdown } from "../../atom/PublicSshKeyDropdown/PublicSshKeyDropdown";
import { AutocompleteNode } from "../../molecules/LocationAutocomplete/location-autocomplete";
import OsProfileDropdown from "../OsProfileDropdown/OsProfileDropdown";
import "./ConfigureAllHosts.scss";

const dataCy = "configureAllHosts";

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

const ConfigureAllHosts = () => {
  const cy = { "data-cy": dataCy };

  const dispatch = useAppDispatch();

  const {
    commonHostData,
    createCluster,
    formStatus: { showAdvancedOptions },
  } = useAppSelector(selectHostProvisionState);

  const metadataContent = useMemo(
    () => (
      <MetadataForm
        buttonText="+"
        pairs={commonHostData.metadata}
        onUpdate={(kv: MetadataPair[]) => dispatch(setCommonMetadata(kv))}
        hasError={(error) => {
          dispatch(setValidationError(error));
        }}
      />
    ),
    [commonHostData.metadata],
  );

  const handleSiteChange = (node: AutocompleteNode | null) => {
    if (node) {
      dispatch(
        setCommonSite({
          name: node.name,
          siteID: node.resourceId,
          path: node.path,
        }),
      );
    }
  };

  const sitePath =
    commonHostData.site?.path?.join(" | ") ?? commonHostData.site?.name;

  return (
    <div {...cy} className="configure-all-hosts">
      <Section title="Site">
        <Flex cols={[6]}>
          <SiteSearch
            onSiteSelect={handleSiteChange}
            isRequired
            defaultInputValue={sitePath}
          />
        </Flex>
      </Section>
      <Divider />
      <Section title="Operating System">
        <Flex cols={[6]}>
          <OsProfileDropdown
            label="OS Profile"
            value={commonHostData.os?.resourceId}
            onSelectionChange={(os) => {
              if (!os) return;
              dispatch(setCommonOsProfile(os));
            }}
            isRequired
          />
        </Flex>
        {createCluster && (
          <Flex cols={[4]} gap="2">
            {ClusterTemplatesDropdownRemote && (
              <ClusterTemplatesDropdownRemote
                clusterTemplateName={commonHostData.clusterTemplateName}
                onSelectionChange={(value: string) => {
                  dispatch(setCommonClusterTemplateName(value));
                }}
              />
            )}
            {ClusterTemplateVersionsDropdownRemote && (
              <ClusterTemplateVersionsDropdownRemote
                clusterTemplateVersion={commonHostData.clusterTemplateVersion}
                templateName={commonHostData.clusterTemplateName}
                isDisabled={
                  !(
                    commonHostData.clusterTemplateName &&
                    commonHostData.clusterTemplateName.length > 0
                  )
                }
                onSelectionChange={(value: string) => {
                  dispatch(setCommonClusterTemplateVersion(value));
                }}
              />
            )}
          </Flex>
        )}
      </Section>
      <ExpansionPanel
        title="Advanced options"
        isOpen={showAdvancedOptions}
        onToggle={(isOpen) => dispatch(setShowAdvancedOptions(isOpen))}
      >
        <Section title="Security options">
          <Flex cols={[6]} gap="2" align="start">
            {/* <div>
              <Heading semanticLevel={6}>vPro</Heading>
              <p>Enable vPro</p>
              <ToggleSwitch
                name="vpro"
                isSelected={commonHostData.vPro}
                onChange={(isSelected) => dispatch(setCommonVPro(isSelected))}
                size={ToggleSwitchSize.Large}
              >
                {commonHostData.vPro ? "Enabled" : "Disabled"}
              </ToggleSwitch>
            </div> */}
            <div>
              <Heading semanticLevel={6}>
                Secure Boot and Full Disk Encryption
              </Heading>
              <p>
                Secure Boot and Full Disk Encryption must be enabled in the
                BIOS. Trusted Compute compatibility requires Secure Boot.
              </p>
              <ToggleSwitch
                name="sbfde"
                isSelected={commonHostData.securityFeature}
                onChange={(isSelected) =>
                  dispatch(setCommonSecurityFeature(isSelected))
                }
                size={ToggleSwitchSize.Large}
              >
                {commonHostData.securityFeature ? "Enabled" : "Disabled"}
              </ToggleSwitch>
            </div>
            <div>
              <Heading semanticLevel={6}>SSH Key Name</Heading>
              <p>
                Select an SSH key name to enable local user access to hosts.
              </p>
              <PublicSshKeyDropdown
                selectedPublicKey={commonHostData.publicSshKey?.resourceId}
                onPublicKeySelect={(account) => {
                  dispatch(setCommonPublicSshKey(account));
                }}
                onPublicKeyRemove={() => {
                  dispatch(setCommonPublicSshKey(undefined));
                }}
              />
            </div>
          </Flex>
        </Section>
        <Divider />
        <Section title="Labels">
          <Flex cols={[6]}>{metadataContent}</Flex>
        </Section>
      </ExpansionPanel>
    </div>
  );
};

export default ConfigureAllHosts;
