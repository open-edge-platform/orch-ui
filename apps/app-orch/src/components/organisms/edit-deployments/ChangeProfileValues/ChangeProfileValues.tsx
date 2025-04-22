/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  clearMandatoryParams,
  editDeploymentPrevProfileName,
  getCurrentDeploymentPackage,
  getCurrentPackageProfile,
  profileParameterOverridesSelector,
  setEditPrevProfileName,
  setProfileParameterOverrides,
} from "../../../../store/reducers/setupDeployment";

import DeploymentProfileForm from "../../profiles/DeploymentProfileForm/DeploymentProfileForm";
import { OverrideValuesList } from "../../setup-deployments/OverrideProfileValues/OverrideProfileTable";

const dataCy = "changeProfileValues";

interface ChangeProfileValuesProps {
  deployment?: adm.DeploymentRead;
  // deploymentPackage?: catalog.DeploymentPackage;
  // deploymentProfile?: catalog.DeploymentProfile;
  // overrideValues: OverrideValuesList;
  // onOverrideValuesUpdate: (
  //   updatedOverrideValues: OverrideValuesList,
  //   clear: boolean,
  // ) => void;
}

const ChangeProfileValues = ({
  deployment,
  // deploymentPackage,
  // deploymentProfile,
  // overrideValues,
  // onOverrideValuesUpdate,
}: ChangeProfileValuesProps) => {
  const cy = { "data-cy": dataCy };

  const dispatch = useAppDispatch();
  const prevProfileName = useAppSelector(editDeploymentPrevProfileName);
  const overrideValues = useAppSelector(profileParameterOverridesSelector);
  const deploymentProfile = useAppSelector(getCurrentPackageProfile);
  const deploymentPackage = useAppSelector(getCurrentDeploymentPackage);
  useEffect(() => {
    if (!deployment || deployment.profileName !== deploymentProfile?.name) {
      if (
        Object.keys(overrideValues).length === 0 ||
        prevProfileName !== deploymentProfile?.name
      ) {
        dispatch(clearMandatoryParams());
        // onOverrideValuesUpdate({}, true);
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
        // onOverrideValuesUpdate(valuesList, true);
      } else {
        dispatch(
          setProfileParameterOverrides({
            profileParameterOverrides: overrideValues,
            clear: true,
          }),
        );
        // onOverrideValuesUpdate(overrideValues, true);
      }
    }
    console.log("DISPATCHED FROM CHANGE PROFILE VALUES..");
    dispatch(setEditPrevProfileName(deploymentProfile?.name ?? ""));
  }, [deploymentProfile]);

  return (
    <div {...cy} className="change-profile-values">
      <DeploymentProfileForm
        selectedPackage={deploymentPackage ?? undefined}
        selectedProfile={deploymentProfile ?? undefined}
        // onOverrideValuesUpdate={(updatedOverrideValues) =>
        //   onOverrideValuesUpdate(updatedOverrideValues, false)
        // }
        // overrideValues={overrideValues}
      />
    </div>
  );
};

export default ChangeProfileValues;
