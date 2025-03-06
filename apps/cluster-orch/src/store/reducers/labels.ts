/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cm } from "@orch-ui/apis";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState: cm.ClusterLabels = {};
export const labels = createSlice({
  name: "labels",
  initialState,
  reducers: {
    setLabels(
      state: cm.ClusterLabels,
      action: PayloadAction<cm.ClusterLabels>,
    ) {
      state = { ...action.payload };
      return state;
    },

    setInitialLabels(
      state: cm.ClusterLabels,
      action: PayloadAction<cm.ClusterLabels>,
    ) {
      state = { ...action.payload };
      return state;
    },

    clearLabels(state: cm.ClusterLabels) {
      state = { ...initialState };
      return state;
    },

    updateLabels(
      state: cm.ClusterLabels,
      action: PayloadAction<{ [key: string]: string }>,
    ) {
      state.labels = action.payload;
    },
  },
});

export const getLabels = (state: RootState) => state.labels;

export const getInitialLabels = () => initialState;

export const { clearLabels, setLabels, setInitialLabels, updateLabels } =
  labels.actions;

export default labels.reducer;
