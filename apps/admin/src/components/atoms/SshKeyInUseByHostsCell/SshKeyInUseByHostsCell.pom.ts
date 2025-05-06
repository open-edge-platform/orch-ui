/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { instanceOne, provisionedHostOne } from "@orch-ui/utils";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];
type ApiAliases =
  | "getSshInstances"
  | "getSshInstancesEmpty"
  | "getSshInstancesError";

export const fakeSshKey =
  "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBNVFtW7BtSKrG9peh0pOdcwsDo8LtFdpFPSJUmCFQlg your_email@example.com";

const localAccountId = "localaccount-1";
const sshKeyName = "test-key-name";
const currentTime = new Date().toISOString();
const mockInstance: infra.InstanceRead = {
  ...instanceOne,
  host: provisionedHostOne,
  localAccount: {
    localAccountID: localAccountId,
    resourceId: localAccountId,
    username: sshKeyName,
    sshKey: fakeSshKey,
    timestamps: {
      createdAt: currentTime,
      updatedAt: currentTime,
    },
  },
};

const generateInstanceMocks = (
  size = 10,
  mock = mockInstance,
  offset = 0,
): infra.InstanceRead[] =>
  [...Array(size).keys()].map((index) => ({
    ...mock,
    resourceId: `instance-${index + offset}`,
    name: `Instance ${index + offset}`,
  }));

const instanceUrlOnLocalAccount =
  "**/compute/instances?filter=has%28localaccount%29*";
const sshInstanceEndpoint: CyApiDetails<
  ApiAliases,
  infra.GetV1ProjectsByProjectNameComputeInstancesApiResponse
> = {
  getSshInstances: {
    route: instanceUrlOnLocalAccount,
    statusCode: 200,
    response: {
      hasNext: false,
      instances: generateInstanceMocks(8),
      totalElements: 8,
    },
  },
  getSshInstancesEmpty: {
    route: instanceUrlOnLocalAccount,
    statusCode: 200,
    response: {
      hasNext: false,
      instances: [],
      totalElements: 0,
    },
  },
  getSshInstancesError: {
    route: instanceUrlOnLocalAccount,
    statusCode: 500,
  },
};

class SshKeyInUseByHostsCellPom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = "sshKeyInUseByHostsCell") {
    super(rootCy, [...dataCySelectors], sshInstanceEndpoint);
  }
}
export default SshKeyInUseByHostsCellPom;
