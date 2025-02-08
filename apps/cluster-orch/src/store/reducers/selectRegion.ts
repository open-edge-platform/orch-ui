/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store";

const initialState = "Select Region";

export const selectRegion = createSlice({
  name: "selectRegion",
  initialState,
  reducers: {
    updateSelectRegion(state: string, action: PayloadAction<string>) {
      state = action.payload;
      return state;
    },

    setInitialSelectRegion(state: string, action: PayloadAction<string>) {
      state = action.payload;
      return state;
    },

    clearSelectRegion(state: string) {
      state = initialState;
      return state;
    },
  },
});

export const getSelectRegion = (state: RootState) => state.selectRegion;
export const getInitialSelectRegion = () => initialState;

export const { clearSelectRegion, setInitialSelectRegion, updateSelectRegion } =
  selectRegion.actions;

export default selectRegion.reducer;
