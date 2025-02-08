/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm, eim } from "@orch-ui/apis";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type ModifiedClusterDetailInfo = ecm.ClusterDetailInfo & {
  selectedSite?: eim.SiteRead;
};

const initialState: ModifiedClusterDetailInfo = {
  clusterID: "",
  clusterLabels: {},
  clusterTemplateName: "",
  kubernetesVersion: "",
  name: "Add Name",
  nodes: {},
  resources: {},
  status: undefined,
  userDefinedLabelKeys: [],
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
      state.clusterTemplateName = action.payload;
    },
    setClusterLabels(
      state: ModifiedClusterDetailInfo,
      action: PayloadAction<object>,
    ) {
      state.clusterLabels = action.payload;
    },

    setClusterNodes(
      state: ModifiedClusterDetailInfo,
      action: PayloadAction<ecm.NodeInfoList>,
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
      state.clusterTemplateName = action.payload;
    },

    updateClusterLabels(
      state: ModifiedClusterDetailInfo,
      action: PayloadAction<{ [key: string]: string }>,
    ) {
      state.clusterLabels = action.payload;
    },

    updateUserDefinedLabels(
      state: ModifiedClusterDetailInfo,
      action: PayloadAction<string[]>,
    ) {
      state.userDefinedLabelKeys = action.payload;
    },

    updateClusterNodes(
      state: ModifiedClusterDetailInfo,
      action: PayloadAction<ecm.NodeInfoList>,
    ) {
      if (action.payload.nodeInfoList) {
        state.nodes = { nodeInfoList: action.payload.nodeInfoList };
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
export const getNodes = (state: RootState) => state.cluster.nodes?.nodeInfoList;
export const selectTemplate = (state: RootState) =>
  state.cluster.clusterTemplateName;

export const getTemplateName = (state: RootState) => {
  const name = state.cluster.clusterTemplateName?.split("-")[0];
  return name;
};
export const getTemplateVersion = (state: RootState) => {
  const version = state.cluster.clusterTemplateName?.split("-")[1];
  return version;
};

export const getSelectedSite = (state: RootState) => state.cluster.selectedSite;

export const {
  setCluster,
  setInitialCluster,
  clearCluster,
  updateClusterTemplate,
  updateClusterNodes,
  updateClusterLabels,
  updateUserDefinedLabels,
  updateClusterName,
  setClusterSelectedSite,
} = cluster.actions;

export default cluster.reducer;
