/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { IRuntimeConfig } from "./runtime-config/runtime-config";

declare global {
  interface Window {
    __RUNTIME_CONFIG__: IRuntimeConfig;
    process: {
      env: Process & {
        REACT_MOCK_API: string;
      };
    };
  }
  interface process {
    env: {
      REACT_MOCK_API: string;
    };
  }
}
