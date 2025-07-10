/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateName } from "../../utils/global";
import { RootState } from "../index";

export interface ExtendedDeploymentPackage extends catalog.DeploymentPackage {
  username?: string;
  helmChartURL?: string;
  password?: string;
}

export const initialState: ExtendedDeploymentPackage = {
  name: "",
  displayName: "",
  description: "",
  version: "",
  username: "",
  helmChartURL: "",
  password: "",
  applicationReferences: [],
  isDeployed: false,
  isVisible: false,
  profiles: [],
  defaultProfileName: "",
  extensions: [],
  artifacts: [],
};

export type DeploymentProfileData = {
  edit: boolean;
  prevName: string | null;
  deploymentProfile: catalog.DeploymentProfile;
  isDefault: boolean;
};

export const deploymentPackage = createSlice({
  name: "deploymentPackage",
  initialState,
  reducers: {
    setDeploymentPackage(
      state: ExtendedDeploymentPackage,
      action: PayloadAction<catalog.DeploymentPackage>,
    ) {
      state = { ...action.payload };
      return state;
    },
    clearDeploymentPackage(state: catalog.DeploymentPackage) {
      state = { ...initialState };
      return state;
    },
    setDisplayName(
      state: catalog.DeploymentPackage,
      action: PayloadAction<string>,
    ) {
      state.displayName = action.payload;
      state.name = generateName(action.payload);
    },
    setVersion(
      state: catalog.DeploymentPackage,
      action: PayloadAction<string>,
    ) {
      state.version = action.payload;
    },
    setDescription(
      state: catalog.DeploymentPackage,
      action: PayloadAction<string>,
    ) {
      state.description = action.payload;
    },
    setHelmChartURL(
      state: ExtendedDeploymentPackage,
      action: PayloadAction<string>,
    ) {
      state.helmChartURL = action.payload;
    },
    setUsername(
      state: ExtendedDeploymentPackage,
      action: PayloadAction<string>,
    ) {
      state.username = action.payload;
    },
    setPassword(
      state: ExtendedDeploymentPackage,
      action: PayloadAction<string>,
    ) {
      state.password = action.payload;
    },
    setApplicationReferences(
      state: catalog.DeploymentPackage,
      action: PayloadAction<catalog.ApplicationReference[]>,
    ) {
      state.applicationReferences = action.payload;
    },
    addApplicationReferences(
      state: catalog.DeploymentPackage,
      action: PayloadAction<catalog.Application>,
    ) {
      state.applicationReferences.push({
        name: action.payload.name,
        version: action.payload.version,
      });
    },
    removeApplicationReferences(
      state: catalog.DeploymentPackage,
      action: PayloadAction<catalog.Application>,
    ) {
      state.applicationReferences = state.applicationReferences.filter(
        (appRef) => appRef.name !== action.payload.name,
      );
    },
    addEditDeploymentPackageProfile(
      state: catalog.DeploymentPackage,
      action: PayloadAction<DeploymentProfileData>,
    ) {
      if (!state.profiles) return;

      if (action.payload.edit) {
        const editedProfile = action.payload.deploymentProfile;
        const deploymentProfile = state.profiles.find(
          (profile) => profile.name === action.payload.prevName,
        );
        if (deploymentProfile) {
          deploymentProfile.name = generateName(editedProfile.displayName!);
          deploymentProfile.displayName = editedProfile.displayName;
          deploymentProfile.description = editedProfile.description;
          deploymentProfile.applicationProfiles =
            editedProfile.applicationProfiles;
        }
      } else {
        state.profiles.push(action.payload.deploymentProfile);
      }

      if (action.payload.isDefault) {
        state.defaultProfileName = action.payload.deploymentProfile.name;
      }
    },
    deleteDeploymentPackageProfile(
      state: catalog.DeploymentPackage,
      action: PayloadAction<string>,
    ) {
      const profileName = action.payload;
      if (state.profiles && state.defaultProfileName !== profileName) {
        state.profiles = state.profiles.filter((p) => p.name !== profileName);
      }
    },
    setDefaultProfileName(
      state: catalog.DeploymentPackage,
      action: PayloadAction<string>,
    ) {
      state.defaultProfileName = action.payload;
    },
    clearProfileData(state: catalog.DeploymentPackage) {
      state.profiles = [];
      state.defaultProfileName = "";
    },
  },
});

export const selectDeploymentPackage = (state: RootState) =>
  state.deploymentPackage;

export const selectDeploymentPackageReferences = (state: RootState) =>
  state.deploymentPackage.applicationReferences;

export const selectDeploymentPackageProfiles = (state: RootState) =>
  state.deploymentPackage.profiles;

export const selectDeploymentPackageDefaultProfile = (state: RootState) =>
  state.deploymentPackage.profiles?.filter(
    (profile) => profile.name === state.deploymentPackage.defaultProfileName,
  )[0]?.applicationProfiles ?? {};

export const selectDeploymentPackageDefaultProfileName = (state: RootState) =>
  state.deploymentPackage.defaultProfileName;

export const {
  setDeploymentPackage,
  clearDeploymentPackage,
  setDisplayName,
  setVersion,
  setDescription,
  setApplicationReferences,
  addEditDeploymentPackageProfile,
  deleteDeploymentPackageProfile,
  setDefaultProfileName,
  clearProfileData,
  setHelmChartURL,
  setUsername,
  setPassword,
} = deploymentPackage.actions;

export default deploymentPackage.reducer;
