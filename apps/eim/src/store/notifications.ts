/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { MessageBannerProps } from "@orch-ui/components";
import { LpInternalError } from "@orch-ui/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastProps } from "@spark-design/react";
import {
  MessageBannerAlertState,
  ToastPosition,
  ToastState,
  ToastVisibility,
} from "@spark-design/tokens";

export interface MessageBannerState {
  showMessage?: boolean;
  messageTitle: string;
  messageBody: string;
  variant: MessageBannerAlertState;
}

export interface _MessageBannerState
  extends Omit<MessageBannerProps, "onClose" | "className"> {}

interface NotificationsState {
  messageBanner?: _MessageBannerState;
  messageBannerDuration?: number;
  messageState: MessageBannerState;
  toastState: ToastProps;
  errorInfo?: LpInternalError;
}

const messageBannerDuration: number = 10000;
const initialState: NotificationsState = {
  messageBannerDuration,
  messageState: {
    showMessage: false,
    messageTitle: "",
    messageBody: "",
    variant: MessageBannerAlertState.Info,
  },
  toastState: {
    duration: 3 * 1000,
    canClose: true,
    position: ToastPosition.TopRight,
    visibility: ToastVisibility.Hide,
  },
};

export const notificationStatusList = createSlice({
  name: "notificationStatusList",
  initialState,
  reducers: {
    setMessageBanner(
      state: NotificationsState,
      action: PayloadAction<_MessageBannerState | undefined>,
    ) {
      state.messageBanner = action.payload;
    },
    setMessageBannerDuration(
      state: NotificationsState,
      action: PayloadAction<number | undefined>,
    ) {
      state.messageBannerDuration = action.payload;
    },
    /* Trigger a message Banner disable after 15 seconds of show */
    disableMessageBanner(state: NotificationsState) {
      state.messageState = {
        ...state.messageState,
        showMessage: false,
      };
    },
    /** This will show a message Banner on top left whenever an action is triggered */
    showMessageNotification(
      state: NotificationsState,
      action: PayloadAction<MessageBannerState>,
    ) {
      // Show message Banner
      state.messageState = { ...action.payload, showMessage: true };
    },
    showToast(
      state: NotificationsState,
      action: PayloadAction<{
        message: string;
        state: ToastState;
      }>,
    ) {
      state.toastState.message = action.payload.message;
      state.toastState.state = action.payload.state;
      state.toastState.visibility = ToastVisibility.Show;
    },
    /** This will hide the toast notification */
    hideToast(state: NotificationsState) {
      state.toastState.visibility = ToastVisibility.Hide;
    },
    setErrorInfo(
      state: NotificationsState,
      action: PayloadAction<LpInternalError | undefined>,
    ) {
      state.errorInfo = action.payload;
    },
  },
});

export const {
  setMessageBanner,
  setMessageBannerDuration,
  showMessageNotification,
  disableMessageBanner,
  showToast,
  hideToast,
  setErrorInfo,
} = notificationStatusList.actions;

export default notificationStatusList.reducer;
