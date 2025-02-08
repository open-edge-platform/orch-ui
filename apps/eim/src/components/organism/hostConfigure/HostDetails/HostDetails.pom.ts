/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { CyApiDetail, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { osUbuntu } from "@orch-ui/utils";
import OsProfileDropdownPom, {
  getOsResources,
} from "../../OsProfileDropdown/OsProfileDropdown.pom";
import { SecurityDropdownPom } from "../SecurityDropdown/SecurityDropdownPom";
import { dataCy } from "./HostDetails";

const dataCySelectors = ["name", "osProfileSetting"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "getProvidersWithDefaultOs"
  | "getProvidersWithNoDefaultOs"
  | "getOsResources";

const getProvidersWithDefaultOs: CyApiDetail<eim.GetV1ProjectsByProjectNameProvidersApiResponse> =
  {
    route: `**/v1/projects/${defaultActiveProject.name}/providers?filter=name%3D%22fm_onboarding%22`,
    response: {
      hasNext: false,
      totalElements: 1,
      providers: [
        {
          apiEndpoint: "",
          name: "fm_onboarding",
          providerKind: "PROVIDER_KIND_BAREMETAL",
          config: `{"defaultOs":"${osUbuntu.resourceId}"}`,
        },
      ],
    },
  };

const getProvidersWithNoDefaultOs: CyApiDetail<eim.GetV1ProjectsByProjectNameProvidersApiResponse> =
  {
    route: `**/v1/projects/${defaultActiveProject.name}/providers?filter=name%3D%22fm_onboarding%22`,
    response: {
      hasNext: false,
      totalElements: 1,
      providers: [
        {
          apiEndpoint: "",
          name: "fm_onboarding",
          providerKind: "PROVIDER_KIND_BAREMETAL",
          config: "",
        },
      ],
    },
  };

export class HostDetailsPom extends CyPom<Selectors, ApiAliases> {
  public osDropdown = new OsProfileDropdownPom();
  public securityDropdown = new SecurityDropdownPom();

  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], {
      getProvidersWithDefaultOs,
      getProvidersWithNoDefaultOs,
      getOsResources,
    });
  }

  get sbFdeToggle() {
    return this.el.osProfileSetting.find("[data-cy='sbFdeToggle']");
  }
}
