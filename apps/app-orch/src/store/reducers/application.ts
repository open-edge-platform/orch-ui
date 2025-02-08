/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateName } from "../../utils/global";
import { RootState } from "../index";

const initialState: catalog.Application = {
  name: "",
  displayName: "",
  description: "",
  version: "",
  chartName: "",
  chartVersion: "",
  helmRegistryName: "",
  profiles: [],
  defaultProfileName: "",
};

export const application = createSlice({
  name: "application",
  initialState,
  reducers: {
    // TODO: better assign value to state, directly state = action.payload not working
    setApplication(
      state: catalog.Application,
      action: PayloadAction<catalog.Application>,
    ) {
      state.name = action.payload.name;
      state.displayName = action.payload.displayName;
      state.description = action.payload.description;
      state.version = action.payload.version;
      state.chartName = action.payload.chartName;
      state.chartVersion = action.payload.chartVersion;
      state.helmRegistryName = action.payload.helmRegistryName;
      state.imageRegistryName = action.payload.imageRegistryName;
      state.profiles = action.payload.profiles;
      state.defaultProfileName = action.payload.defaultProfileName;
    },
    clearApplication(state: catalog.Application) {
      // TODO: better assign value to state, directly state = initialState not working
      state.name = initialState.name;
      state.displayName = initialState.displayName;
      state.description = initialState.description;
      state.version = initialState.version;
      state.chartName = initialState.chartName;
      state.chartVersion = initialState.chartVersion;
      state.helmRegistryName = initialState.helmRegistryName;
      state.imageRegistryName = initialState.imageRegistryName;
      state.profiles = initialState.profiles;
      state.defaultProfileName = initialState.defaultProfileName;
    },
    setDisplayName(state: catalog.Application, action: PayloadAction<string>) {
      state.displayName = action.payload;
      state.name = generateName(action.payload);
    },
    setVersion(state: catalog.Application, action: PayloadAction<string>) {
      state.version = action.payload;
    },
    setDescription(state: catalog.Application, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setChartName(state: catalog.Application, action: PayloadAction<string>) {
      state.chartName = action.payload;
    },
    setChartVersion(state: catalog.Application, action: PayloadAction<string>) {
      state.chartVersion = action.payload;
    },
    setHelmRegistryName(
      state: catalog.Application,
      action: PayloadAction<string>,
    ) {
      state.helmRegistryName = action.payload;
    },
    setImageRegistryName(
      state: catalog.Application,
      action: PayloadAction<string>,
    ) {
      state.imageRegistryName = action.payload;
    },
    setProfiles(
      state: catalog.Application,
      action: PayloadAction<catalog.Profile[]>,
    ) {
      state.profiles = action.payload;
    },
    addProfile(
      state: catalog.Application,
      action: PayloadAction<catalog.Profile>,
    ) {
      if (!state.profiles) {
        throw Error("Error: profiles in state are not defined!");
      }

      if (
        state.profiles?.some((profile) => profile.name === action.payload.name)
      ) {
        state.profiles = state.profiles?.filter(
          (profile) => profile.name !== action.payload.name,
        );
        state.profiles?.push(action.payload);
      } else {
        state.profiles?.push(action.payload);
      }
    },
    deleteProfile(state: catalog.Application, action: PayloadAction<string>) {
      if (state.profiles)
        state.profiles = state.profiles.filter(
          (profile) => profile.name !== action.payload,
        );
    },
    setDefaultProfileName(
      state: catalog.Application,
      action: PayloadAction<string>,
    ) {
      state.defaultProfileName = action.payload;
    },
  },
});

export const selectApplication = (state: RootState) => state.application;

export const {
  setApplication,
  clearApplication,
  setChartName,
  setChartVersion,
  setDescription,
  setDisplayName,
  setHelmRegistryName,
  setImageRegistryName,
  setVersion,
  setProfiles,
  addProfile,
  deleteProfile,
  setDefaultProfileName,
} = application.actions;

export default application.reducer;
