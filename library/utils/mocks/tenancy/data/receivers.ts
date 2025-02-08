/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { omApi } from "@orch-ui/apis";

export const receiver: omApi.Receiver = {
  id: "000",
  version: 1,
  state: "new",
  emailConfig: {
    mailServer: "intel.com",
    from: "test",
    to: {
      enabled: [
        "LastNameA, FirstNameA <firstnamea.lastnamea@intel.com>",
        "LastNameB, FirstNameB <firstnameb.lastnameb@intel.com>",
      ],
      allowed: [
        "LastNameA, FirstNameA <firstnamea.lastnamea@intel.com>",
        "LastNameB, FirstNameB <firstnameb.lastnameb@intel.com>",
        "LastNameC, FirstNameC <firstnamec.lastnamec@intel.com>",
        "LastNameD, FirstNameD <firstnamed.lastnamed@intel.com>",
      ],
    },
  },
};

export default class ReceiversStore {
  receivers: omApi.Receiver[];
  constructor() {
    this.receivers = [receiver];
  }

  list(): omApi.Receiver[] {
    return this.receivers;
  }

  get(id: string): omApi.Receiver | undefined {
    return this.receivers.find((a) => a.id === id);
  }
}
