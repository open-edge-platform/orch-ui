/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { siteRestaurantTwo } from "@orch-ui/utils";
import { SiteActionsPopupPom } from "../../../../components/atom/locations/SiteActionsPopup/SiteActionsPopup.pom";
import { TelemetryProfileLogsPom } from "../../../../components/molecules/locations/TelemetryProfileLogs/TelemetryProfileLogs.pom";
import { TelemetryProfileMetricsPom } from "../../../../components/molecules/locations/TelemetryProfileMetrics/TelemetryProfileMetrics.pom";

const dataCySelectors = ["siteName", "siteRegion"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "getSite";

const route = `**/v1/projects/${defaultActiveProject.name}/regions/${siteRestaurantTwo.region?.resourceId}/sites/${siteRestaurantTwo.resourceId}`;

const endpoints: CyApiDetails<ApiAliases, infra.SiteServiceGetSiteApiResponse> =
  {
    getSite: {
      route: route,
      statusCode: 200,
      response: siteRestaurantTwo,
    },
  };

export class SiteViewPom extends CyPom<Selectors, ApiAliases> {
  public metrics = new TelemetryProfileMetricsPom();
  public logs = new TelemetryProfileLogsPom();
  public siteActionsPopup = new SiteActionsPopupPom();

  constructor(public rootCy: string = "siteView") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
