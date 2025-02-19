/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import { SharedStorage } from "@orch-ui/utils";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  addEditDeploymentPackageProfile,
  clearProfileData,
  selectDeploymentPackageDefaultProfileName,
  selectDeploymentPackageProfiles,
  selectDeploymentPackageReferences,
} from "../../../../store/reducers/deploymentPackage";
import { generateName } from "../../../../utils/global";
import DeploymentPackageProfileListItem from "../DeploymentPackageProfileListItem/DeploymentPackageProflieListItem";

export const dataCy = "deploymentPackageProfileList";

const DeploymentPackageProfileList = () => {
  const cy = { "data-cy": dataCy };
  const projectName = SharedStorage.project?.name ?? "";
  const systemGeneratedProfileName = "Deployment Profile 1";

  const dispatch = useAppDispatch();

  const deploymentPackageProfiles = useAppSelector(
    selectDeploymentPackageProfiles,
  );
  const defaultProfileName = useAppSelector(
    selectDeploymentPackageDefaultProfileName,
  );
  const deploymentPackageReferences = useAppSelector(
    selectDeploymentPackageReferences,
  );

  const generateSystemApplicationProfiles = async () => {
    const appProfiles: { [key: string]: string } = {};
    for (const appRef of deploymentPackageReferences) {
      appProfiles[appRef.name] = await getFirstAppProfile(appRef);
    }
    return appProfiles;
  };

  const [getApplication] = catalog.useLazyCatalogServiceGetApplicationQuery();
  const getFirstAppProfile = async (appRef: catalog.ApplicationReference) => {
    const response = await getApplication({
      applicationName: appRef.name,
      version: appRef.version,
      projectName,
    }).unwrap();
    // FIXME we should return the default app profile, not the first one.
    // FIXME if the app as no profiles, we end up creating a DeploymentPackageProfile
    //  that points to "This application does not have profiles defined." (there was a Jira already open for this)
    if (
      response.application.profiles &&
      response.application.profiles[0]?.name
    ) {
      return response.application.profiles[0]?.name;
    }
    return "This application does not have profiles defined.";
  };

  const noProfiles =
    !deploymentPackageProfiles || deploymentPackageProfiles.length === 0;

  const onlySystemProfile =
    deploymentPackageProfiles &&
    deploymentPackageProfiles.length === 1 &&
    defaultProfileName === generateName(systemGeneratedProfileName);

  useEffect(() => {
    if (noProfiles || onlySystemProfile) {
      generateSystemApplicationProfiles().then((generatedProfiles) => {
        dispatch(clearProfileData());
        dispatch(
          addEditDeploymentPackageProfile({
            edit: false,
            prevName: null,
            isDefault: true,
            deploymentProfile: {
              name: generateName(systemGeneratedProfileName),
              displayName: systemGeneratedProfileName,
              description: "System generated profile",
              applicationProfiles: generatedProfiles,
            },
          }),
        );
      });
    }
  }, [deploymentPackageReferences]);

  return (
    <div {...cy} className="deployment-package-profile-list">
      {deploymentPackageProfiles?.map((profile) => (
        <div key={profile.name} data-cy={`dpProfileListItem_${profile.name}`}>
          <DeploymentPackageProfileListItem
            profile={profile}
            defaultProfileName={defaultProfileName}
          />
        </div>
      ))}
    </div>
  );
};

export default DeploymentPackageProfileList;
