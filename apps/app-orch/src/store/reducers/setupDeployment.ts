/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OverrideValuesList } from "../../components/organisms/setup-deployments/OverrideProfileValues/OverrideProfileTable";
import { RootState } from "../index";

const hasMandatoryParams = (params: MandatoryParams) =>
  Object.keys(params).length > 0;

const hasEmptyMandatoryParams = (params: MandatoryParams) =>
  hasMandatoryParams(params) && Object.values(params).some((v) => v === "");

// the key here is combined with <application name>.<parameter name>
type MandatoryParams = { [key: string]: string };

type SetupDeploymentState = {
  applications: catalog.Application[];
  mandatoryParams: MandatoryParams;
  editPrevProfileName: string;
  profileParameterOverrides: OverrideValuesList;
  currentDeploymentPackage: catalog.DeploymentPackage | null;
  currentPackageProfile: catalog.DeploymentProfile | null;
};

const initialState: SetupDeploymentState = {
  applications: [],
  mandatoryParams: {},
  editPrevProfileName: "",
  profileParameterOverrides: {},
  currentDeploymentPackage: null,
  currentPackageProfile: null,
};

export const setupDeployment = createSlice({
  name: "setupDeploymentApps",
  initialState,
  reducers: {
    setDeploymentApplications(
      state: SetupDeploymentState,
      action: PayloadAction<{
        apps: catalog.Application[];
        profile: catalog.DeploymentProfile;
        values: OverrideValuesList;
      }>,
    ) {
      state.applications = action.payload.apps;

      action.payload.apps.forEach((app) => {
        const appName = app.name;

        const profile = app.profiles?.find(
          (profile) =>
            profile.name ===
            action.payload.profile.applicationProfiles[appName],
        );

        if (profile?.parameterTemplates) {
          profile.parameterTemplates.forEach((param) => {
            if (param.mandatory) {
              let value = action.payload.values[appName]?.values ?? {};
              param.name.split(".").forEach((part) => {
                if (Object.keys(value).includes(part)) {
                  // @ts-ignore
                  value = value[part];
                }
              });
              state.mandatoryParams[`${appName}.${param.name}`] =
                typeof value === "string" ? value : "";
            }
          });
        }
      });
    },
    updateMandatoryParam(
      state: SetupDeploymentState,
      action: PayloadAction<{ param: string; value: string }>,
    ) {
      state.mandatoryParams[action.payload.param] = action.payload.value;
    },
    setEditPrevProfileName(
      state: SetupDeploymentState,
      action: PayloadAction<string>,
    ) {
      state.editPrevProfileName = action.payload;
    },
    clearMandatoryParams(state: SetupDeploymentState) {
      state.mandatoryParams = {};
    },
    setProfileParameterOverrides(
      state: SetupDeploymentState,
      action: PayloadAction<{
        profileParameterOverrides: OverrideValuesList;
        clear: boolean;
      }>,
    ) {
      console.log("setProfileParameterOverrides:", action.payload);
      const isClear = action.payload.clear;
      if (isClear) {
        state.profileParameterOverrides =
          action.payload.profileParameterOverrides;
      } else {
        state.profileParameterOverrides = {
          ...state.profileParameterOverrides,
          ...action.payload.profileParameterOverrides,
        };
      }
    },
    setCurrentDeploymentPackage(
      state: SetupDeploymentState,
      action: PayloadAction<catalog.DeploymentPackage | null>,
    ) {
      state.currentDeploymentPackage = action.payload;
    },
    setCurrentPackageProfile(
      state: SetupDeploymentState,
      action: PayloadAction<catalog.DeploymentProfile | null>,
    ) {
      state.currentPackageProfile = action.payload;
    },
  },
});

export const setupDeploymentApplications = (state: RootState) =>
  state.setupDeployment.applications;

export const setupDeploymentMandatoryParams = (state: RootState) =>
  state.setupDeployment.mandatoryParams;

export const setupDeploymentHasMandatoryParams = (state: RootState) =>
  hasMandatoryParams(state.setupDeployment.mandatoryParams);

export const setupDeploymentHasEmptyMandatoryParams = (state: RootState) =>
  hasEmptyMandatoryParams(state.setupDeployment.mandatoryParams);

export const setupDeploymentEmptyMandatoryParams = (state: RootState) =>
  Object.entries(state.setupDeployment.mandatoryParams)
    .filter((k) => k[1] === "")
    .map((v) => v[0]);

export const editDeploymentPrevProfileName = (state: RootState) =>
  state.setupDeployment.editPrevProfileName;

export const profileParameterOverridesSelector = (state: RootState) =>
  state.setupDeployment.profileParameterOverrides;

export const getCurrentDeploymentPackage = (state: RootState) =>
  state.setupDeployment.currentDeploymentPackage;

export const getCurrentPackageProfile = (state: RootState) =>
  state.setupDeployment.currentPackageProfile;

export const {
  setDeploymentApplications,
  updateMandatoryParam,
  clearMandatoryParams,
  setEditPrevProfileName,
  setProfileParameterOverrides,
  setCurrentDeploymentPackage,
  setCurrentPackageProfile,
} = setupDeployment.actions;

export default setupDeployment.reducer;
