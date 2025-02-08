/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Icon as IconType } from "@spark-design/iconfont";

export interface CollapsableListItem<T> {
  route: T | null;
  icon: IconType;
  value: string | null;
  children?: CollapsableListItem<T>[];
  parent?: string;
  divider?: boolean;
  isClickable?: boolean;
  isBold?: boolean;
  isIndented?: boolean;
}

export interface BreadcrumbPiece {
  text: string;
  link: string;
  isRelative?: boolean;
}
export interface UiSlice {
  breadcrumb: BreadcrumbPiece[];
  activeNavItem: CollapsableListItem<string> | null;
}
export const uiSliceName = "ui";

export interface _UIRootState {
  [uiSliceName]: UiSlice;
}

const initialState: UiSlice = {
  breadcrumb: [],
  activeNavItem: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setBreadcrumb: (
      state: UiSlice,
      action: PayloadAction<BreadcrumbPiece[]>,
    ) => {
      state.breadcrumb = action.payload;
    },
    setActiveNavItem: (
      state: UiSlice,
      action: PayloadAction<CollapsableListItem<string>>,
    ) => {
      state.activeNavItem = action.payload;
    },
  },
});

export const { setBreadcrumb, setActiveNavItem } = uiSlice.actions;
export const getBreadcrumbData = (state: _UIRootState) => state.ui?.breadcrumb;
export const getActiveNavItem = (state: _UIRootState) => state.ui?.activeNavItem;

export default uiSlice.reducer;
