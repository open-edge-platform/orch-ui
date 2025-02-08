/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateName } from "../../utils/global";
import { RootState } from "../index";

const initialState: catalog.Profile = {
  name: "",
  displayName: "",
  description: "",
  chartValues: "",
  parameterTemplates: [],
};

export const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state: catalog.Profile, action: PayloadAction<catalog.Profile>) {
      state.name = action.payload.name;
      state.displayName = action.payload.displayName;
      state.description = action.payload.description;
      state.chartValues = action.payload.chartValues;
      state.parameterTemplates = action.payload.parameterTemplates;
    },
    clearProfile(state: catalog.Profile) {
      state.name = initialState.name;
      state.displayName = initialState.displayName;
      state.description = initialState.description;
      state.chartValues = initialState.chartValues;
      state.parameterTemplates = initialState.parameterTemplates;
    },
    setDisplayName(state: catalog.Profile, action: PayloadAction<string>) {
      state.displayName = action.payload;
      state.name = generateName(action.payload);
    },
    setDescription(state: catalog.Profile, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setChartValues(state: catalog.Profile, action: PayloadAction<string>) {
      state.chartValues = action.payload;
    },
    setParameterOverrides(
      state: catalog.Profile,
      action: PayloadAction<catalog.Profile["parameterTemplates"]>,
    ) {
      state.parameterTemplates = action.payload;
    },
    clearParameterOverrides(state: catalog.Profile) {
      state.parameterTemplates = [];
    },
  },
});

export const selectProfile = (state: RootState) => state.profile;

export const {
  setProfile,
  clearProfile,
  setChartValues,
  setDescription,
  setDisplayName,
  setParameterOverrides,
  clearParameterOverrides,
} = profile.actions;

export default profile.reducer;
