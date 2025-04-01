/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store";

const initialState = "Select Site";

export const selectSite = createSlice({
  name: "selectSite",
  initialState,
  reducers: {
    updateSelectSite(state: string, action: PayloadAction<string>) {
      state = action.payload;
      return state;
    },

    setInitialSelectSite(state: string, action: PayloadAction<string>) {
      state = action.payload;
      return state;
    },

    clearSelectSite(state: string) {
      state = initialState;
      return state;
    },
  },
});

export const getSelectSite = (state: RootState) => state.selectSite;
export const getInitialSelectSite = () => initialState;

export const { clearSelectSite, setInitialSelectSite, updateSelectSite } =
  selectSite.actions;

export default selectSite.reducer;
