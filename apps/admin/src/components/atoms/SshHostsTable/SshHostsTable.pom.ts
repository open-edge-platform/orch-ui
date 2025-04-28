/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApiErrorPom, EmptyPom, TablePom } from "@orch-ui/components";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { assignedWorkloadHostOne, instanceTwo } from "@orch-ui/utils";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "getInstanceEmpty" | "getInstance" | "getInstanceError";

const instanceUrl = "**/instances*";
const instanceEndpoint: CyApiDetails<
  ApiAliases,
  infra.GetV1ProjectsByProjectNameComputeInstancesApiResponse
> = {
  getInstance: {
    route: instanceUrl,
    statusCode: 200,
    response: {
      instances: [
        {
          ...instanceTwo,
          host: { ...assignedWorkloadHostOne, instance: undefined },
        },
      ],
      hasNext: false,
      totalElements: 1,
    },
  },
  getInstanceEmpty: {
    route: instanceUrl,
    statusCode: 200,
    response: {
      instances: [],
      hasNext: false,
      totalElements: 0,
    },
  },
  getInstanceError: {
    route: instanceUrl,
    statusCode: 500,
  },
};

class SshHostsTablePom extends CyPom<Selectors, ApiAliases> {
  tablePom: TablePom;
  emptyPom: EmptyPom;
  apiErrorPom: ApiErrorPom;
  constructor(public rootCy: string = "sshHostsTable") {
    super(rootCy, [...dataCySelectors], instanceEndpoint);
    this.tablePom = new TablePom();
    this.emptyPom = new EmptyPom("sshHostsEmpty");
    this.apiErrorPom = new ApiErrorPom();
  }
}
export default SshHostsTablePom;
