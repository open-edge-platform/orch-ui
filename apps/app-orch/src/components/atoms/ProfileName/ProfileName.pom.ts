/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { profileOne } from "@orch-ui/utils";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];
type ProfileApiAliases = "getApplication" | "getApplicationError";

// in this test we only care about the profiles of an application,
// so omit everything else from the response
type MockProfiles = Pick<catalog.Application, "profiles">;
type ApplicationResponseForProfiles = {
  application: MockProfiles;
};

const project = defaultActiveProject.name;
const applicationApiUrl = `/v3/projects/${project}/catalog/applications/*/versions/**`;

const apis: CyApiDetails<ProfileApiAliases, ApplicationResponseForProfiles> = {
  getApplication: {
    route: applicationApiUrl,
    response: {
      application: {
        profiles: [profileOne],
      },
    },
  },
  getApplicationError: {
    route: applicationApiUrl,
    statusCode: 404,
  },
};

class ProfileNamePom extends CyPom<Selectors, ProfileApiAliases> {
  constructor(public rootCy: string = "profileName") {
    super(rootCy, [...dataCySelectors], {
      ...apis,
    });
  }
}
export default ProfileNamePom;
