/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { CyHttpMessages } from "cypress/types/net-stubbing";

const dataCySelectors = [
  "drawerContent",
  "registryNameInput",
  "locationInput",
  "inventoryInput",
  "typeRadio",
  "helmRadio",
  "dockerRadio",
  "usernameInput",
  "passwordInput",
  "cancelBtn",
  "okBtn",
  "resetPasswordBtn",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type SuccessRegistryApiAliases = "postRegistry" | "editRegistry";
type ErrorRegistryApiAliases = "postRegistryError";
type ApiAliases = SuccessRegistryApiAliases | ErrorRegistryApiAliases;

const project = defaultActiveProject.name;
const successRegistryEndpoint: CyApiDetails<
  SuccessRegistryApiAliases,
  catalog.CatalogServiceCreateRegistryApiResponse
> = {
  postRegistry: {
    method: "POST",
    route: `**/v3/projects/${project}/catalog/registries*`,
    statusCode: 200,
    response: (req: CyHttpMessages.IncomingHttpRequest) => {
      return { registry: req.body };
    },
  },
  editRegistry: {
    method: "PUT",
    route: `**/v3/projects/${project}/catalog/registries/*`,
    statusCode: 200,
  },
};

const errorRegistryEndpoint: CyApiDetails<ErrorRegistryApiAliases> = {
  postRegistryError: {
    method: "POST",
    route: `**/v3/projects/${project}/catalog/registries*`,
    statusCode: 500,
  },
};

class ApplicationAddRegistryDrawerPom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = "applicationAddRegistryDrawer") {
    super(rootCy, [...dataCySelectors], {
      ...successRegistryEndpoint,
      ...errorRegistryEndpoint,
    });
  }

  getDrawerBase() {
    return this.root.find(".spark-drawer-base");
  }

  /**
   * For ApplicationRegistry. Fill Add/Edit Registry form in the AddRegistryDrawer.
   * Note: Make sure you have the Add/Edit Registry form open in registry tab
   *       page before performing below operation.
   **/
  fillAddRegistryForm(registry: Partial<catalog.Registry>) {
    // Basic Registry Info
    this.el.registryNameInput.clear().type(registry.displayName!);
    this.el.locationInput.clear().type(registry.rootUrl!);
    this.el.inventoryInput.clear().type(registry.inventoryUrl ?? "");
    this.el.typeRadio
      .find(".spark-fieldlabel")
      .contains(registry.type === "IMAGE" ? "Docker" : "Helm")
      .click({ force: true }); // To force click radio button with cypress

    // Registry: Username & Password
    this.el.usernameInput.clear().type(registry.username ?? "");
    this.el.passwordInput.clear().type(registry.authToken ?? "");
  }
}
export default ApplicationAddRegistryDrawerPom;
