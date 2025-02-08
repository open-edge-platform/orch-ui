/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import { SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Text } from "@spark-design/react";
import { useEffect, useState } from "react";

export const dataCy = "profileName";
interface ProfileNameProps {
  applicationReference: catalog.ApplicationReference;
  profileName: string;
}
const ProfileName = ({
  applicationReference,
  profileName,
}: ProfileNameProps) => {
  const cy = { "data-cy": dataCy };
  const projectName = SharedStorage.project?.name ?? "";
  const {
    data: response,
    isError,
    isLoading,
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
  const [profile, setProfile] = useState<catalog.ProfileRead>();
  // we are reading an entire application, but we need to find a single profile
  useEffect(() => {
    setProfile(
      response?.application.profiles?.find((p) => p.name === profileName),
    );
  }, [response]);

  if (isError || !profile) {
    return (
      <div {...cy} className="profile-err-msg">
        <Text>Could Not load Profile for {applicationReference.name}!!</Text>
      </div>
    );
  } else if (isLoading) {
    return <SquareSpinner />;
  }

  return (
    <div {...cy} className="profile-name">
      {profile.displayName ?? profile.name}
    </div>
  );
};

export default ProfileName;
