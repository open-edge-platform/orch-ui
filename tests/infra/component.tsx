/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

// ***********************************************************
// This example support/component.ts is processed and
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

import "@cypress/code-coverage/support";
import { defaultActiveProject, MountOptions } from "@orch-ui/tests";
import { SharedStorage } from "@orch-ui/utils";
import { mount } from "cypress/react18";
import React from "react";
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import { MemoryRouter, useLocation, useRoutes } from "react-router-dom";
import { setupStore } from "../../apps/infra/src/store/store";
// import "./commands";

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

Cypress.Commands.add(
  "mount",
  (component: React.ReactNode, options: MountOptions = {}) => {
    const {
      routerProps = { initialEntries: ["/"] },
      reduxStore = setupStore(),
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
          <AuthProvider>
            <RenderLocation />
            <hr />
            <Routes />
          </AuthProvider>
        </Provider>
      </MemoryRouter>
    );

    return mount(wrapped, mountOptions);
  },
);

// Example use:
// cy.mount(<MyComponent />)
