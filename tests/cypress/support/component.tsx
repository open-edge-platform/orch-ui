/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

///<reference path="../../index.d.ts"/>
// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

import "@spark-design/fonts/fonts.css";
//import "@spark-design/css/style/style.css";

import { mbSlice, tmSlice } from "@orch-ui/apis";
import { uiSlice, uiSliceName, _UIRootState } from "@orch-ui/components";
import { getMockAuthProps, ProjectItem, SharedStorage } from "@orch-ui/utils";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { mount } from "cypress/react18";
import React from "react";
import { AuthContext, AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import { MemoryRouter, useRoutes } from "react-router-dom";
import { MountOptions } from "./mountOptions";
import { RenderLocation } from "./renderLocation";

export const setupStore = (preloadedState?: _UIRootState) => {
  const rootReducer = combineReducers({
    [mbSlice.reducerPath]: mbSlice.reducer,
    [uiSliceName]: uiSlice.reducer,
    [tmSlice.reducerPath]: tmSlice.reducer,
  });
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      })
        .concat(mbSlice.middleware)
        .concat(tmSlice.middleware),
    preloadedState,
  });
};

export const defaultActiveProject: ProjectItem = {
  name: "itep-ui",
  uID: "21f98e07-d551-4d64-92fc-fa2909bed3a2",
};

Cypress.Commands.add(
  "mount",
  (component: React.ReactNode, options: MountOptions = {}) => {
    const {
      mockAuth,
      reduxStore = setupStore(),
      routerProps = { initialEntries: ["/"] },
      routerRule = [
        {
          path: "/",
          element: component,
        },
      ],
      mountOptions,
      activeProject,
    } = options;

    SharedStorage.project = activeProject ?? defaultActiveProject;

    const Routes = () => useRoutes(routerRule);
    const wrapped = (
      <MemoryRouter {...routerProps}>
        <Provider store={reduxStore}>
          {mockAuth ? (
            <AuthContext.Provider
              value={{ ...getMockAuthProps({ authenticated: true }) }}
            >
              <RenderLocation />
              <Routes />
            </AuthContext.Provider>
          ) : (
            <AuthProvider>
              <RenderLocation />
              <Routes />
            </AuthProvider>
          )}
        </Provider>
      </MemoryRouter>
    );

    //TODO: eventuall will want to bring back in more of these
    // const wrapped = (
    //   <MemoryRouter {...routerProps}>
    //     <Provider store={reduxStore}>
    //       {mockAuth ? (
    //         <AuthContext.Provider
    //           value={{ ...getMockAuthProps({ authenticated: true }) }}
    //         >
    //           <RenderLocation />
    //           <hr />
    //           <Routes />
    //         </AuthContext.Provider>
    //       ) : (
    //         <AuthProvider>
    //           <RenderLocation />
    //           <hr />
    //           <Routes />
    //         </AuthProvider>
    //       )}
    //     </Provider>
    //   </MemoryRouter>
    // );

    return mount(wrapped, mountOptions);
  },
);

// Example use:
// cy.mount(<MyComponent />)
