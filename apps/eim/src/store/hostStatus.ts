/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type HostStatus = eim.HostRead["hostStatus"];
type OverallHostStatus =
  | HostStatus
  | eim.ScheduleStatus
  | eim.StatusIndicatorRead;

export const hostStatusSliceName = "hostStatusList";

export interface _HostStatusRootState {
  [hostStatusSliceName]: HostStatusList;
}

export interface HostStatusState {
  hostId: string;
  status: OverallHostStatus;
}
type HostStatusList = Record<string, OverallHostStatus>;
const initialState: HostStatusList = {};

export const hostStatusList = createSlice({
  name: hostStatusSliceName,
  initialState,
  reducers: {
    setHostStatus(
      state: HostStatusList,
      action: PayloadAction<HostStatusState>,
    ) {
      state[action.payload.hostId] = action.payload.status;
    },
  },
});

export const selectHostStatus = (
  state: _HostStatusRootState,
  hostId: string,
) => {
  if (hostId in state.hostStatusList) return state.hostStatusList[hostId];
};

export const { setHostStatus } = hostStatusList.actions;

export default hostStatusList.reducer;
