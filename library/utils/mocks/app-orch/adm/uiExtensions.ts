/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import { BaseStore } from "../../baseStore";

const extension1: adm.UiExtension = {
  serviceName: "serviceName",
  label: "5G Dashboard",
  description:
    "This is the 5G dashboard that got added as an extension following a 5G deployment done.",
  fileName: "remoteEntry.js",
  appName: "FiveG",
  moduleName: "./App",
};

export class UiExtensionsStore extends BaseStore<"label", adm.UiExtension> {
  constructor() {
    super("label", [extension1]);
  }

  convert(body: adm.UiExtension): adm.UiExtension {
    // NOTE we don't create/update uiExtensions so this method is not actually used
    return body;
  }
}
