/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { Flex } from "@orch-ui/components";
import { Drawer, Text, TextField } from "@spark-design/react";
import { InputSize } from "@spark-design/tokens";
import "./ProfilePackageDetails.scss";

const dataCy = "profilePackageDetails";

interface ProfilePackageDetailsProps {
  isOpen: boolean;
  onCloseDrawer: () => void;
  profile?: catalog.DeploymentProfile;
  defaultProfileName?: string;
}

const ProfilePackageDetails = ({
  isOpen = false,
  onCloseDrawer,
  profile,
  defaultProfileName,
}: ProfilePackageDetailsProps) => {
  const cy = { "data-cy": dataCy };

  return (
    <div {...cy} className="profile-package-details">
      <Drawer
        {...cy}
        className="cluster-details"
        show={isOpen}
        backdropClosable={true}
        onHide={onCloseDrawer}
        headerProps={{
          title: profile
            ? (profile.displayName ?? profile.name)
            : "Cluster Details",
        }}
        bodyContent={
          <div>
            <div className="profile-details-basic">
              <Text size="l">Details</Text>
              <Flex cols={[3, 9]}>
                <Text data-cy="name">Name</Text>
                <Text data-cy="nameValue">
                  {profile?.displayName ?? profile?.name}
                </Text>
                <Text data-cy="description">Description</Text>
                <Text data-cy="descriptionValue">{profile?.description}</Text>
                <Text data-cy="default">Default</Text>
                <Text data-cy="defaultValue">
                  {profile?.name === defaultProfileName ? "Yes" : "No"}
                </Text>
              </Flex>
            </div>
            <div className="profile-details-apps">
              <Text size="l">Applications</Text>
              {Object.keys(profile?.applicationProfiles ?? {}).map((app) => (
                <Flex cols={[6, 6]}>
                  <TextField
                    label="Applications"
                    value={app}
                    size={InputSize.Large}
                    isDisabled={true}
                  />
                  <TextField
                    label="Profile"
                    value={profile?.applicationProfiles[app]}
                    size={InputSize.Large}
                    isDisabled={true}
                  />
                </Flex>
              ))}
            </div>
          </div>
        }
      />
    </div>
  );
};

export default ProfilePackageDetails;
