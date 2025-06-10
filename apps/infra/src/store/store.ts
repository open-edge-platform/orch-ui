/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { enhancedEimSlice, mbApi, tmSlice } from "@orch-ui/apis";
import { UiSlice, uiSliceName } from "@orch-ui/components";
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import configureHostReducer from "./configureHost";
import hostStatusReducer from "./hostStatus";
import locationsReducer from "./locations";
import notificationStatusReducer from "./notifications";

const rootReducer = combineReducers({
  notificationStatusList: notificationStatusReducer,
  hostStatusList: hostStatusReducer,
  configureHost: configureHostReducer,
  locations: locationsReducer,
  [enhancedEimSlice.miEnhancedApi.reducerPath]:
    enhancedEimSlice.miEnhancedApi.reducer,
  [mbApi.metadataBroker.reducerPath]: mbApi.metadataBroker.reducer,
  [uiSliceName]: UiSlice,
  [tmSlice.reducerPath]: tmSlice.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      })
        .concat(enhancedEimSlice.miEnhancedApi.middleware)
        .concat(mbApi.metadataBroker.middleware)
        .concat(tmSlice.middleware),
    preloadedState,
  });
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
      immutableCheck: true,
    })
      .concat(enhancedEimSlice.miEnhancedApi.middleware)
      .concat(mbApi.metadataBroker.middleware)
      .concat(tmSlice.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the index itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
