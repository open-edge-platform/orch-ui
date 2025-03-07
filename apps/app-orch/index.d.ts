/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { MountOptions } from "@orch-ui/tests";
import { RuntimeConfig } from "@orch-ui/utils";
import { MountReturn } from "cypress/react";
import React from "react";

declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";

declare global {
  interface Window {
    __RUNTIME_CONFIG__: RuntimeConfig;
    Cypress: { testingType: string };
  }
  namespace Cypress {
    interface Chainable {
      mount(
        component: React.ReactNode,
        options?: MountOptions,
      ): Cypress.Chainable<MountReturn>;
    }
  }
}
