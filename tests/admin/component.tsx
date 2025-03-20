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
import { ProjectItem, RuntimeConfig, SharedStorage } from "@orch-ui/utils";
import { mount } from "cypress/react18";
import React from "react";
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import { MemoryRouter, useLocation, useRoutes } from "react-router-dom";
import { setupStore } from "../../apps/admin/src/store";
//import "./commands";

//TODO: Move to @orch-ui/cypress
export function RenderLocation() {
  const location = useLocation() as unknown as { [key: string]: string };
  return (
    <div id="react-router-location">
      {Object.keys(location).map((key, i) => (
        <div key={i} id={`${key}`}>
          {key}: <span id="value">{location[key]}</span>
        </div>
      ))}
    </div>
  );
}

export interface MountOptions {
  runtimeConfig?: RuntimeConfig;
  mountOptions?: object;
  routerProps?: { initialEntries: string[] };
  reduxStore?: any;
  routerRule?: { path: string; element: React.ReactNode }[];
  activeProject?: ProjectItem;
}

export const defaultActiveProject: ProjectItem = {
  name: "default-ui",
  uID: "21f98e07-d551-4d64-92fc-fa2909bed3a2",
};

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

    if (runtimeConfig !== undefined) {
      //window.__RUNTIME_CONFIG__ = runtimeConfig;
    }

    SharedStorage.project = activeProject ?? defaultActiveProject;

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
