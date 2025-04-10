/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm, eim } from "@orch-ui/apis";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type ModifiedClusterDetailInfo = cm.ClusterDetailInfo & {
  selectedSite?: eim.SiteRead;
};

const initialState: ModifiedClusterDetailInfo = {
  labels: {},
  template: "",
  kubernetesVersion: "",
  name: "",
  nodes: [],
  providerStatus: undefined,
  selectedSite: {},
};
export const cluster = createSlice({
  name: "cluster",
  initialState,
  reducers: {
    setCluster(
      state: ModifiedClusterDetailInfo,
      action: PayloadAction<ModifiedClusterDetailInfo>,
    ) {
      state = { ...action.payload };
      return state;
    },

    setInitialCluster(
      state: ModifiedClusterDetailInfo,
      action: PayloadAction<ModifiedClusterDetailInfo>,
    ) {
      state = { ...action.payload };
      return state;
    },

    clearCluster(state: ModifiedClusterDetailInfo) {
      state = { ...initialState };
      return state;
    },

    setClusterVersion(
      state: ModifiedClusterDetailInfo,
      action: PayloadAction<string>,
    ) {
      state.template = action.payload;
    },
    setClusterLabels(
      state: ModifiedClusterDetailInfo,
      action: PayloadAction<object>,
    ) {
      state.labels = action.payload;
    },

    setClusterNodes(
      state: ModifiedClusterDetailInfo,
      action: PayloadAction<cm.NodeInfo[]>,
    ) {
      state.nodes = action.payload;
    },

    updateClusterName(
      state: ModifiedClusterDetailInfo,
      action: PayloadAction<string>,
    ) {
      state.name = action.payload;
    },

    updateClusterTemplate(
      state: ModifiedClusterDetailInfo,
      action: PayloadAction<string>,
    ) {
      state.template = action.payload;
    },

    updateClusterLabels(
      state: ModifiedClusterDetailInfo,
      action: PayloadAction<{ [key: string]: string }>,
    ) {
      state.labels = action.payload;
    },

    updateClusterNodes(
      state: ModifiedClusterDetailInfo,
      action: PayloadAction<cm.NodeInfo[]>,
    ) {
      if (action.payload) {
        state.nodes = action.payload;
      }
    },

    setClusterSelectedSite(
      state: ModifiedClusterDetailInfo,
      action: PayloadAction<ModifiedClusterDetailInfo>,
    ) {
      state.selectedSite = action.payload;
    },
  },
});

export const getCluster = (state: RootState) => state.cluster;
export const getInitial = () => initialState;
export const getNodes = (state: RootState) => state.cluster.nodes;
export const selectTemplate = (state: RootState) => state.cluster.template;

export const getTemplateName = (state: RootState) =>
  state.cluster.template?.split("-")[0];
export const getTemplateVersion = (state: RootState) =>
  state.cluster.template?.split("-")[1];

export const getSelectedSite = (state: RootState) => state.cluster.selectedSite;

export const {
  setCluster,
  setInitialCluster,
  clearCluster,
  updateClusterTemplate,
  updateClusterNodes,
  updateClusterLabels,
  updateClusterName,
  setClusterSelectedSite,
} = cluster.actions;

export default cluster.reducer;
