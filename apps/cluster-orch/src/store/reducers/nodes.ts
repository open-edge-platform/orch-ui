/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cm } from "@orch-ui/apis";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState: cm.NodeInfo[] = [];
export const nodes = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    setNodes(state: cm.NodeInfo[], action: PayloadAction<cm.NodeInfo[]>) {
      state = action.payload;
      return state;
    },

    setInitialNodes(
      state: cm.NodeInfo[],
      action: PayloadAction<cm.NodeInfo[]>,
    ) {
      state = action.payload;
      return state;
    },

    clearNodes(state: cm.NodeInfo[]) {
      state = initialState;
      return state;
    },
  },
});

export const getNodes = (state: RootState) => state.nodes;
export const getInitialNodes = () => initialState;

export const { clearNodes, setNodes, setInitialNodes } = nodes.actions;

export default nodes.reducer;
