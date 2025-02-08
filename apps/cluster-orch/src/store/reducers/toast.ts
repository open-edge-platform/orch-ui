/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastProps } from "@spark-design/react";
import {
  ToastPosition,
  ToastState,
  ToastVisibility,
} from "@spark-design/tokens";
import { RootState } from "../index";

const initialState: ToastProps = {
  visibility: ToastVisibility.Hide,
  state: ToastState.Default,
  position: ToastPosition.TopRight,
  duration: 10000,
};

// TODO move in shared
export const toast = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setProps(state: ToastProps, action: PayloadAction<ToastProps>) {
      //state = { ...action.payload };
      state.visibility = action.payload.visibility;
      state.state = action.payload.state;
      state.duration = action.payload.duration;
      state.message = action.payload.message;
    },
  },
});

export const getToastProps = (state: RootState) => state.toast;

export const { setProps } = toast.actions;

export default toast.reducer;
