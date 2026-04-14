/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { BaseStore } from "../../baseStore";

// UiExtension was removed from the generated ADM API; defined locally for mock use
export interface UiExtension {
  serviceName?: string;
  label?: string;
  description?: string;
  fileName?: string;
  appName?: string;
  moduleName?: string;
}

const extension1: UiExtension = {
  serviceName: "serviceName",
  label: "5G Dashboard",
  description:
    "This is the 5G dashboard that got added as an extension following a 5G deployment done.",
  fileName: "remoteEntry.js",
  appName: "FiveG",
  moduleName: "./App",
};

export class UiExtensionsStore extends BaseStore<"label", UiExtension> {
  constructor() {
    super("label", [extension1]);
  }

  convert(body: UiExtension): UiExtension {
    // NOTE we don't create/update uiExtensions so this method is not actually used
    return body;
  }
}
