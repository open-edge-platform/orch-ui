/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store";

const initialState = "Select a Template Version";

export const templateVersion = createSlice({
  name: "templateVersion",
  initialState,
  reducers: {
    updateTemplateVersion(state: string, action: PayloadAction<string>) {
      state = action.payload;
      return state;
    },

    setInitialTemplateVersion(state: string, action: PayloadAction<string>) {
      state = action.payload;
      return state;
    },

    clearTemplateVersion(state: string) {
      state = initialState;
      return state;
    },
  },
});

export const getTemplateVersion = (state: RootState) => state.templateVersion;
export const getInitialTemplateVersion = () => initialState;

export const {
  clearTemplateVersion,
  setInitialTemplateVersion,
  updateTemplateVersion,
} = templateVersion.actions;

export default templateVersion.reducer;
