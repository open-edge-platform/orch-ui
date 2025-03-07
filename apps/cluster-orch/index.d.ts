/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { RuntimeConfig } from "@orch-ui/components";
import { MountReturn } from "cypress/react";
import { MountOptions } from "./cypress/support/component";

declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";

declare global {
  interface Window {
    __RUNTIME_CONFIG__?: RuntimeConfig;
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
