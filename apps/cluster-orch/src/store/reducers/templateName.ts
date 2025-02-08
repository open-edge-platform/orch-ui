/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store";

const initialState = "Select a Template Name";

export const templateName = createSlice({
  name: "templateName",
  initialState,
  reducers: {
    updateTemplateName(state: string, action: PayloadAction<string>) {
      state = action.payload;
      return state;
    },

    setInitialTemplateName(state: string, action: PayloadAction<string>) {
      state = action.payload;
      return state;
    },

    clearTemplateName(state: string) {
      state = initialState;
      return state;
    },
  },
});

export const getTemplateName = (state: RootState) => state.templateName;
export const getInitialTemplateName = () => initialState;

export const { clearTemplateName, setInitialTemplateName, updateTemplateName } =
  templateName.actions;

export default templateName.reducer;
