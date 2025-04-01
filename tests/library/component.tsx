/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

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

// Alternatively you can use CommonJS syntax:
import "@cypress/code-coverage/support";
import { mbSlice, tmSlice } from "@orch-ui/apis";
import { defaultActiveProject, MountOptions } from "@orch-ui/tests";

import { uiSlice, uiSliceName, _UIRootState } from "@orch-ui/components";
import { getMockAuthProps, SharedStorage } from "@orch-ui/utils";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { mount } from "cypress/react18";
import React from "react";
import { AuthContext, AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import { MemoryRouter, useLocation, useRoutes } from "react-router-dom";

export function RenderLocation() {
  const location = useLocation() as unknown as { [key: string]: string };
  return (
    <>
      <div id="react-router-location">
        {Object.keys(location).map((key, i) => (
          <div key={i} id={`${key}`}>
            {key}: <span id="value">{location[key]}</span>
          </div>
        ))}
      </div>
      <hr />
    </>
  );
}

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
      runtimeConfig,
      activeProject,
    } = options;

    SharedStorage.project = activeProject ?? defaultActiveProject;

    if (runtimeConfig !== undefined) {
      window.__RUNTIME_CONFIG__ = runtimeConfig;
    }

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

    return mount(wrapped, mountOptions);
  },
);

// Example use:
// cy.mount(<MyComponent />)
