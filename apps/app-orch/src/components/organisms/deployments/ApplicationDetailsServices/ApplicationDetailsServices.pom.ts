/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { arm } from "@orch-ui/apis";
import { TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { appEndpoints, deploymentClusterOneAppConsoleId } from "@orch-ui/utils";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type SuccessApiAliases = "getEndpointList" | "getEndpointListMulti";
type ErrorApiAliases = "getEndpointListFail";

type ApiAliases = SuccessApiAliases | ErrorApiAliases;

const route = "**/v1/projects/**/resource/endpoints/applications/**";

export const mockEndpointData = appEndpoints[deploymentClusterOneAppConsoleId];

export const mockMultiEndpointsData = {
  appEndpoints: [
    ...appEndpoints[deploymentClusterOneAppConsoleId].appEndpoints!,
    ...appEndpoints[deploymentClusterOneAppConsoleId].appEndpoints!,
    ...appEndpoints[deploymentClusterOneAppConsoleId].appEndpoints!,
    ...appEndpoints[deploymentClusterOneAppConsoleId].appEndpoints!,
    ...appEndpoints[deploymentClusterOneAppConsoleId].appEndpoints!,
    ...appEndpoints[deploymentClusterOneAppConsoleId].appEndpoints!,
    ...appEndpoints[deploymentClusterOneAppConsoleId].appEndpoints!,
  ],
};

const successEndpoints: CyApiDetails<
  SuccessApiAliases,
  arm.ListAppEndpointsResponse
> = {
  getEndpointList: {
    route,
    statusCode: 200,
    response: mockEndpointData,
  },
  // simulate we have more than 10 elements
  getEndpointListMulti: {
    route,
    statusCode: 200,
    response: mockMultiEndpointsData,
  },
};

const errorEndpoints: CyApiDetails<ErrorApiAliases> = {
  getEndpointListFail: {
    route: route,
    statusCode: 400,
    response: {
      code: 0,
      message: "string",
      details: [
        {
          "@type": "string",
          additionalProp1: {},
        },
      ],
    },
  },
};

class ApplicationDetailsServicePom extends CyPom<Selectors, ApiAliases> {
  public table: TablePom;
  public tableUtils: SiTablePom;
  constructor(public rootCy: string = "applicationDetailsServices") {
    super(rootCy, [...dataCySelectors], {
      ...successEndpoints,
      ...errorEndpoints,
    });
    this.table = new TablePom();
    this.tableUtils = new SiTablePom();
  }
}
export default ApplicationDetailsServicePom;
