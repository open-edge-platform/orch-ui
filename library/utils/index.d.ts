/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { IRuntimeConfig } from "./runtime-config/runtime-config";

declare global {
  interface Window {
    __RUNTIME_CONFIG__: IRuntimeConfig;
    process: {
      env: Process & {
        REACT_LP_MOCK_API: string;
      };
    };
  }
  interface process {
    env: {
      REACT_LP_MOCK_API: string;
    };
  }
}
