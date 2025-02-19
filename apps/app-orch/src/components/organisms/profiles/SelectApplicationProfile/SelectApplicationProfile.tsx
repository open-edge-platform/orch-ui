/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import { Flex, SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Combobox, Item, Text } from "@spark-design/react";
import { ComboboxSize, ComboboxVariant } from "@spark-design/tokens";
import React from "react";
import "./SelectApplicationProfile.scss";

interface SelectApplicationProfileProps {
  applicationReference: catalog.ApplicationReference;
  selectedApplicationProfile?: string;
  onProfileChange?: (application: string, profile: string) => void;
  isProfilesEditDisabled?: boolean;
}

const SelectApplicationProfile = ({
  applicationReference,
  selectedApplicationProfile,
  onProfileChange,
  isProfilesEditDisabled = false,
}: SelectApplicationProfileProps) => {
  const projectName = SharedStorage.project?.name ?? "";
  const {
    data: response,
    isLoading,
    isError,
  } = catalog.useCatalogServiceGetApplicationQuery(
    {
      projectName,
      applicationName: applicationReference.name,
      version: applicationReference.version,
    },
    {
      skip: !projectName,
    },
  );

  if (
    isError ||
    !response ||
    !response.application.profiles ||
    !response.application.profiles.length
  ) {
    return (
      <div className="profile-err-msg">
        <Text>Could Not load Profile for {applicationReference.name}!!</Text>
      </div>
    );
  } else if (isLoading) {
    return <SquareSpinner />;
  }

  const profiles = response.application.profiles;

  const selectedProfile = selectedApplicationProfile
    ? (profiles.find((p) => p.name === selectedApplicationProfile)
        ?.displayName ??
      profiles.find((p) => p.name === selectedApplicationProfile)?.name)
    : (profiles[0]?.displayName ?? profiles[0]?.name ?? "");

  if (!selectedApplicationProfile && profiles?.[0]?.name) {
    if (onProfileChange)
      onProfileChange(applicationReference.name, profiles?.[0]?.name);
  }

  return (
    <Flex cols={[6, 6]} data-cy="advSettings">
      <Combobox
        className="adv-settings-app-name"
        style={{ paddingRight: "1rem" }}
        size={ComboboxSize.Large}
        defaultInputValue={applicationReference.name}
        isDisabled
      >
        <Item>{applicationReference.name}</Item>
      </Combobox>
      <Combobox
        name="profile"
        className="adv-settings-app-profile"
        placeholder="Select a profile"
        size={ComboboxSize.Large}
        variant={ComboboxVariant.Primary}
        defaultInputValue={selectedProfile}
        onSelectionChange={(value: React.Key | null) => {
          if (onProfileChange) {
            onProfileChange(applicationReference.name, value as string);
          }
        }}
        data-cy="advSettingsAppProfile"
        isDisabled={isProfilesEditDisabled}
      >
        {profiles?.map((p) => (
          <Item key={p.name}>{p.displayName ?? p.name}</Item>
        )) ?? []}
      </Combobox>
    </Flex>
  );
};

export default SelectApplicationProfile;
