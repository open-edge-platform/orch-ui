/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
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
        "LastNameA, FirstNameA <firstnamea.lastnamea@domain.com>",
        "LastNameB, FirstNameB <firstnameb.lastnameb@domain.com>",
        "LastNameE, FirstNameE <firstnamee.lastnamee@domain.com>>",
      ],
      allowed: [
        "LastNameA, FirstNameA <firstnamea.lastnamea@domain.com>",
        "LastNameB, FirstNameB <firstnameb.lastnameb@domain.com>",
        "LastNameC, FirstNameC <firstnamec.lastnamec@domain.com>",
        "LastNameD, FirstNameD <firstnamed.lastnamed@domain.com>",
        "LastNameE, FirstNameE <firstnamee.lastnamee@domain.com>>",
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
