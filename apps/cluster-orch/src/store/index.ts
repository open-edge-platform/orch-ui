/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  adm,
  cm,
  enhancedInfraSlice as miApi,
  mbApi,
  tmSlice,
} from "@orch-ui/apis";
import {
  hostStatusReducer,
  hostStatusSliceName,
  UiSlice,
  uiSliceName,
} from "@orch-ui/components";
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import clusterReducer from "./reducers/cluster";
import labelsReducer from "./reducers/labels";
import locationsReducer from "./reducers/locations";
import nodesReducer from "./reducers/nodes";
import nodesSpecReducer from "./reducers/nodeSpec";
import selectRegionReducer from "./reducers/selectRegion";
import selectSiteReducer from "./reducers/selectSite";
import templateNameReducer from "./reducers/templateName";
import templateVersionReducer from "./reducers/templateVersion";
import toastReducer from "./reducers/toast";

const rootReducer = combineReducers({
  locations: locationsReducer,
  cluster: clusterReducer,
  toast: toastReducer,
  labels: labelsReducer,
  nodes: nodesReducer,
  nodesSpec: nodesSpecReducer,
  templateName: templateNameReducer,
  templateVersion: templateVersionReducer,
  selectSite: selectSiteReducer,
  selectRegion: selectRegionReducer,
  [cm.clusterManagerApis.reducerPath]: cm.clusterManagerApis.reducer,
  [adm.deploymentManager.reducerPath]: adm.deploymentManager.reducer,
  [miApi.miEnhancedApi.reducerPath]: miApi.miEnhancedApi.reducer,
  [mbApi.metadataBroker.reducerPath]: mbApi.metadataBroker.reducer,
  [uiSliceName]: UiSlice,
  [hostStatusSliceName]: hostStatusReducer,
  [tmSlice.reducerPath]: tmSlice.reducer,
});

// for test use
export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      })
        .concat(cm.clusterManagerApis.middleware)
        .concat(miApi.miEnhancedApi.middleware)
        .concat(mbApi.metadataBroker.middleware)
        .concat(adm.deploymentManager.middleware)
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
      .concat(cm.clusterManagerApis.middleware)
      .concat(miApi.miEnhancedApi.middleware)
      .concat(mbApi.metadataBroker.middleware)
      .concat(adm.deploymentManager.middleware)
      .concat(tmSlice.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
