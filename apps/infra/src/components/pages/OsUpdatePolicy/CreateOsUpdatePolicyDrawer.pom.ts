/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { OsResourceStore, OsUpdatePolicyStore } from "@orch-ui/utils";

const dataCySelectors = [
  "name",
  "description",
  "osType",
  "kernelCommand",
  "installPackages",
  "updateSources",
  "updatePolicy",
  "targetOs",
  "cancelFooterBtn",
  "addBtn",
] as const;

type Selectors = (typeof dataCySelectors)[number];

const osUpdatePolicyStore = new OsUpdatePolicyStore();
const osResourceStore = new OsResourceStore();

type ApiAliases =
  | "getOperatingSystems"
  | "createOsUpdatePolicy"
  | "createOsUpdatePolicyError";

const endpoints: CyApiDetails<ApiAliases> = {
  getOperatingSystems: {
    route: `**/v1/projects/${defaultActiveProject.name}/compute/os*`,
    response: {
      OperatingSystemResources: osResourceStore.list(),
      totalElements: osResourceStore.resources.length,
      hasNext: false,
    },
  },
  createOsUpdatePolicy: {
    method: "POST",
    route: `**/v1/projects/${defaultActiveProject.name}/os-update-policies`,
    statusCode: 200,
    response: (req: any) => {
      const newPolicy = osUpdatePolicyStore.convert(req.body);
      return newPolicy;
    },
  },
  createOsUpdatePolicyError: {
    method: "POST",
    route: `**/v1/projects/${defaultActiveProject.name}/os-update-policies`,
    statusCode: 400,
  },
};

export class CreateOsUpdatePolicyDrawerPom extends CyPom<
  Selectors,
  ApiAliases
> {
  constructor(public rootCy: string = "createOsUpdatePolicy") {
    super(rootCy, [...dataCySelectors], endpoints);
  }

  selectOsType(osType: string) {
    this.el.osType.find("button").click({ force: true });
    const optionText =
      osType === "OS_TYPE_MUTABLE" ? "Mutable OS" : "Immutable OS";
    cy.get("[role='listbox']")
      .should("be.visible")
      .contains(optionText)
      .click({ force: true });
  }

  selectUpdatePolicy(policy: string) {
    this.el.updatePolicy.find("button").click({ force: true });
    const optionText =
      policy === "UPDATE_POLICY_LATEST"
        ? "Update To Latest"
        : "Update To Target";
    cy.get("[role='listbox']")
      .should("be.visible")
      .contains(optionText)
      .click({ force: true });
  }

  fillBasicForm() {
    this.el.name.type("Test Policy");
    this.el.description.type("Test Description");
  }

  fillCompleteForm() {
    this.fillBasicForm();
    this.selectOsType("OS_TYPE_MUTABLE");
    this.selectUpdatePolicy("UPDATE_POLICY_TARGET");
    this.el.kernelCommand.type("console=ttyS0,115200");
    this.el.installPackages.type("curl, wget, vim");
    this.el.updateSources.type(
      "deb http://archive.ubuntu.com/ubuntu focal main",
    );
  }
}
