/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { tm } from "@orch-ui/apis";

export const orgs: tm.OrgOrgList = [
  {
    name: "intel",
    spec: {
      description: "Test Organization",
    },
    status: {
      orgStatus: {
        message: "Org creation is complete",
        statusIndicator: "STATUS_INDICATION_IDLE",
        timeStamp: 1730719256,
        uID: "3445fdb2-ca3d-40eb-8933-05e21bce8b6c",
      },
    },
  },
];

export default class OrganizationStore {
  orgs: tm.OrgOrgList;
  constructor() {
    this.orgs = orgs;
  }

  list(): tm.OrgOrgList {
    return this.orgs;
  }
}
