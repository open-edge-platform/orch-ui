/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import { SiteActionsPopupPom } from "../../../../components/atom/locations/SiteActionsPopup/SiteActionsPopup.pom";
import { TelemetryProfileLogsPom } from "../../../../components/molecules/locations/TelemetryProfileLogs/TelemetryProfileLogs.pom";
import { TelemetryProfileMetricsPom } from "../../../../components/molecules/locations/TelemetryProfileMetrics/TelemetryProfileMetrics.pom";
import { dataCy } from "./SiteView";

const dataCySelectors = ["siteName", "siteRegion"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class SiteViewPom extends CyPom<Selectors> {
  public metrics = new TelemetryProfileMetricsPom();
  public logs = new TelemetryProfileLogsPom();
  public siteActionsPopup = new SiteActionsPopupPom();

  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
