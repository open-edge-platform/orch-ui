/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { DashboardStatusPom } from "@orch-ui/components";
import {
  CyApiDetails,
  CyPom,
  defaultActiveProject,
  encodeURLQuery,
} from "@orch-ui/tests";
import {
  customersKey,
  customersOne,
  hostSixMetadata,
  HostStore,
  Operator,
} from "@orch-ui/utils";
import {
  LifeCycleState,
  lifeCycleStateQuery,
} from "../../../store/hostFilterBuilder";
const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "getHostSummary"
  | "getHostSummaryWithSingleMetadataFilter"
  | "getHostSummaryWithMultipleMetadataFilter"
  | "getHostSummaryError"
  | "getHostSummaryEmpty";

const route = `**/v1/projects/${defaultActiveProject.name}/compute/hosts/summary?filter=${encodeURLQuery(lifeCycleStateQuery.get(LifeCycleState.Provisioned)!)}*`;

const hostStore = new HostStore();

const endpoints: CyApiDetails<
  ApiAliases,
  eim.GetV1ProjectsByProjectNameComputeHostsSummaryApiResponse
> = {
  getHostSummary: {
    route,
    statusCode: 200,
    response: hostStore.getSummary(),
  },
  getHostSummaryWithSingleMetadataFilter: {
    route,
    statusCode: 200,
    response: hostStore.getSummary(
      `metadata="'key':'${customersKey}','value':'${customersOne}'"`,
    ),
  },
  getHostSummaryWithMultipleMetadataFilter: {
    route,
    statusCode: 200,
    response: hostStore.getSummary(
      hostSixMetadata
        .map(({ key, value }) => `metadata="'key':'${key}','value':'${value}'"`)
        .join(` ${Operator.AND} `),
    ),
  },
  getHostSummaryError: {
    route,
    statusCode: 500,
  },
  getHostSummaryEmpty: {
    route,
    statusCode: 200,
    response: {
      error: 0,
      running: 0,
      total: 0,
      unallocated: 0,
    },
  },
};

class DashboardHostStatusPom extends CyPom<Selectors, ApiAliases> {
  hostStat: DashboardStatusPom;
  constructor(public rootCy: string = "dashboardHostStatus") {
    super(rootCy, [...dataCySelectors], endpoints);
    this.hostStat = new DashboardStatusPom();
  }
}

export default DashboardHostStatusPom;
