/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import {
  adm,
  cm,
  enhancedEimSlice,
  mbApi,
  omSlice,
  tmSlice,
} from "@orch-ui/apis";
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const deploymentManager = adm.deploymentManager;

// TODO: remove this after UI Extension is updated into GW openapi.schema
const admUpdated = deploymentManager.injectEndpoints({
  endpoints: (build) => ({
    deploymentServiceListUiExtensions: build.query<
      adm.DeploymentServiceListUiExtensionsApiResponse,
      adm.DeploymentServiceListUiExtensionsApiArg
    >({
      query: (queryArg) => ({
        url: "/deployment.orchestrator.apis/v1/ui_extensions",
        params: { serviceName: queryArg.serviceName },
      }),
      providesTags: ["DeploymentService"],
    }),
  }),
  overrideExisting: true,
});
const rootReducer = combineReducers({
  [enhancedEimSlice.miEnhancedApi.reducerPath]:
    enhancedEimSlice.miEnhancedApi.reducer,
  [cm.clusterManagerApis.reducerPath]: cm.clusterManagerApis.reducer,
  [mbApi.metadataBroker.reducerPath]: mbApi.metadataBroker.reducer,
  [omSlice.reducerPath]: omSlice.reducer,
  // TODO: Remove this after updating openapi.schema
  [admUpdated.reducerPath]: admUpdated.reducer,
  [tmSlice.reducerPath]: tmSlice.reducer,
});

export const setupStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      })
        .concat(enhancedEimSlice.miEnhancedApi.middleware)
        .concat(cm.clusterManagerApis.middleware)
        .concat(admUpdated.middleware)
        .concat(mbApi.metadataBroker.middleware)
        .concat(omSlice.middleware)
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
      .concat(cm.clusterManagerApis.middleware)
      .concat(admUpdated.middleware)
      .concat(mbApi.metadataBroker.middleware)
      .concat(omSlice.middleware)
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
