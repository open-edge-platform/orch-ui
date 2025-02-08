/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import {
  adm,
  arm,
  catalog,
  ecm,
  enhancedEimSlice as miApi,
  mbApi,
  tmSlice,
} from "@orch-ui/apis";
import {
  hostStatusList,
  hostStatusSliceName,
  uiSlice,
  uiSliceName,
} from "@orch-ui/components";
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import applicationReducer from "./reducers/application";
import deploymentPackageReducer from "./reducers/deploymentPackage";
import profileReducer from "./reducers/profile";
import setupDeploymentReducer from "./reducers/setupDeployment";
import toastReducer from "./reducers/toast";

const appResourceManager = arm.resourceManager;
const appDeploymentManager = adm.deploymentManager;

const rootReducer = combineReducers({
  application: applicationReducer,
  deploymentPackage: deploymentPackageReducer,
  profile: profileReducer,
  toast: toastReducer,
  setupDeployment: setupDeploymentReducer,
  [catalog.catalogServiceApis.reducerPath]: catalog.catalogServiceApis.reducer,
  [appDeploymentManager.reducerPath]: appDeploymentManager.reducer,
  [appResourceManager.reducerPath]: appResourceManager.reducer,
  [mbApi.metadataBroker.reducerPath]: mbApi.metadataBroker.reducer,
  [uiSliceName]: uiSlice.reducer,
  [hostStatusSliceName]: hostStatusList.reducer,
  [ecm.clusterManagerApis.reducerPath]: ecm.clusterManagerApis.reducer,
  [miApi.miEnhancedApi.reducerPath]: miApi.miEnhancedApi.reducer,
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
        .concat(ecm.clusterManagerApis.middleware)
        .concat(miApi.miEnhancedApi.middleware)
        .concat(catalog.catalogServiceApis.middleware)
        .concat(appDeploymentManager.middleware)
        .concat(appResourceManager.middleware)
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
      .concat(ecm.clusterManagerApis.middleware)
      .concat(miApi.miEnhancedApi.middleware)
      .concat(catalog.catalogServiceApis.middleware)
      .concat(appDeploymentManager.middleware)
      .concat(appResourceManager.middleware)
      .concat(mbApi.metadataBroker.middleware)
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
