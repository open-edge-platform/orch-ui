/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm } from "@orch-ui/apis";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState: ecm.NodeSpec[] = [];
export const nodesSpec = createSlice({
  name: "nodesSpec",
  initialState,
  reducers: {
    setNodesSpec(state: ecm.NodeSpec[], action: PayloadAction<ecm.NodeSpec[]>) {
      state = action.payload;
      return state;
    },

    setInitialNodesSpec(
      state: ecm.NodeSpec[],
      action: PayloadAction<ecm.NodeSpec[]>,
    ) {
      state = action.payload;
      return state;
    },

    clearNodesSpec(state: ecm.NodeSpec[]) {
      state = initialState;
      return state;
    },
  },
});

export const getNodesSpec = (state: RootState) => state.nodesSpec;
export const getInitialNodes = () => initialState;

export const { clearNodesSpec, setNodesSpec, setInitialNodesSpec } =
  nodesSpec.actions;

export default nodesSpec.reducer;
