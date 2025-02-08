/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm } from "@orch-ui/apis";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState: ecm.NodeInfo[] = [];
export const nodes = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    setNodes(state: ecm.NodeInfo[], action: PayloadAction<ecm.NodeInfo[]>) {
      state = action.payload;
      return state;
    },

    setInitialNodes(
      state: ecm.NodeInfo[],
      action: PayloadAction<ecm.NodeInfo[]>,
    ) {
      state = action.payload;
      return state;
    },

    clearNodes(state: ecm.NodeInfo[]) {
      state = initialState;
      return state;
    },
  },
});

export const getNodes = (state: RootState) => state.nodes;
export const getInitialNodes = () => initialState;

export const { clearNodes, setNodes, setInitialNodes } = nodes.actions;

export default nodes.reducer;
