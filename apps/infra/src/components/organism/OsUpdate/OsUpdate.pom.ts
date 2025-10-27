/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { SiDropdown } from "@orch-ui/poms";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { OsUpdatePolicyStore } from "@orch-ui/utils";

const dataCySelectors = [
  "osProfiles",
  "desiredOsProfiles",
  "osUpdatePolicy",
  "applyPolicyBtn",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "getOsUpdatePolicies"
  | "getOsUpdatePoliciesEmpty"
  | "getOsUpdatePoliciesError500"
  | "patchInstanceSuccess"
  | "patchInstanceError";

const osUpdatePolicyStore = new OsUpdatePolicyStore();

const osUpdatePoliciesRoute = `**/v1/projects/${defaultActiveProject.name}/os-update-policies*`;
const patchInstanceRoute = (resourceId: string) =>
  `**/v1/projects/${defaultActiveProject.name}/compute/instances/${resourceId}`;

const endpoints: CyApiDetails<
  ApiAliases,
  infra.OsUpdatePolicyListOsUpdatePolicyApiResponse | infra.InstanceResourceRead
> = {
  getOsUpdatePolicies: {
    route: osUpdatePoliciesRoute,
    response: {
      osUpdatePolicies: osUpdatePolicyStore.list(),
      totalElements: osUpdatePolicyStore.resources.length,
      hasNext: false,
    },
  },
  getOsUpdatePoliciesEmpty: {
    route: osUpdatePoliciesRoute,
    response: {
      osUpdatePolicies: [],
      totalElements: 0,
      hasNext: false,
    },
  },
  getOsUpdatePoliciesError500: {
    route: osUpdatePoliciesRoute,
    statusCode: 500,
    response: {},
  },
  patchInstanceSuccess: {
    method: "PATCH",
    route: patchInstanceRoute("*"),
    response: {} as infra.InstanceResourceRead,
  },
  patchInstanceError: {
    method: "PATCH",
    route: patchInstanceRoute("*"),
    statusCode: 500,
    response: {},
  },
};

class OsUpdatePom extends CyPom<Selectors, ApiAliases> {
  public dropdown = new SiDropdown("osUpdatePolicy");

  constructor(public rootCy: string = "osUpdate") {
    super(rootCy, [...dataCySelectors], endpoints);
  }

  get osName() {
    return this.el.osProfiles;
  }

  get updatesAvailable() {
    return this.el.desiredOsProfiles.first();
  }

  get assignedPolicy() {
    return this.el.desiredOsProfiles.last();
  }

  get policyDropdown() {
    return this.el.osUpdatePolicy;
  }

  get applyButton() {
    return this.el.applyPolicyBtn;
  }

  selectPolicy(policyName: string) {
    this.dropdown.selectDropdownValueByLabel(
      this.root,
      "osUpdatePolicy",
      policyName,
    );
  }

  clickApply() {
    this.applyButton.click();
  }
}

export default OsUpdatePom;
