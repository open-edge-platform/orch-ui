/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm, catalog } from "@orch-ui/apis";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  clearMandatoryParams,
  editDeploymentPrevProfileName,
  profileParameterOverridesSelector,
  setEditPrevProfileName,
  setProfileParameterOverrides,
} from "../../../../store/reducers/setupDeployment";

import DeploymentProfileForm from "../../profiles/DeploymentProfileForm/DeploymentProfileForm";
import { OverrideValuesList } from "../../setup-deployments/OverrideProfileValues/OverrideProfileTable";

const dataCy = "changeProfileValues";

interface ChangeProfileValuesProps {
  deployment?: adm.DeploymentRead;
  deploymentPackage?: catalog.DeploymentPackage;
  deploymentProfile?: catalog.DeploymentProfile;
}

const ChangeProfileValues = ({
  deployment,
  deploymentPackage,
  deploymentProfile,
}: ChangeProfileValuesProps) => {
  const cy = { "data-cy": dataCy };

  const dispatch = useAppDispatch();
  const prevProfileName = useAppSelector(editDeploymentPrevProfileName);
  const overrideValues = useAppSelector(profileParameterOverridesSelector);

  useEffect(() => {
    if (!deployment || deployment.profileName !== deploymentProfile?.name) {
      if (
        Object.keys(overrideValues).length === 0 ||
        prevProfileName !== deploymentProfile?.name
      ) {
        dispatch(clearMandatoryParams());
        dispatch(
          setProfileParameterOverrides({
            profileParameterOverrides: {},
            clear: true,
          }),
        );
      }
    } else {
      const valuesList: OverrideValuesList = {};
      if (
        Object.keys(overrideValues).length === 0 ||
        prevProfileName !== deploymentProfile?.name
      ) {
        deployment.overrideValues?.forEach((ov) => {
          valuesList[ov.appName] = structuredClone(ov);
        });
        dispatch(clearMandatoryParams());
        dispatch(
          setProfileParameterOverrides({
            profileParameterOverrides: valuesList,
            clear: true,
          }),
        );
      } else {
        dispatch(
          setProfileParameterOverrides({
            profileParameterOverrides: overrideValues,
            clear: true,
          }),
        );
      }
    }

    dispatch(setEditPrevProfileName(deploymentProfile?.name ?? ""));
  }, [deploymentProfile]);

  return (
    <div {...cy} className="change-profile-values">
      <DeploymentProfileForm
        selectedPackage={deploymentPackage ?? undefined}
        selectedProfile={deploymentProfile ?? undefined}
      />
    </div>
  );
};

export default ChangeProfileValues;
