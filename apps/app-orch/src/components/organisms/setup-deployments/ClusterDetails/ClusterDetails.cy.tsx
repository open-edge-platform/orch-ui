/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { clusterOne, IRuntimeConfig } from "@orch-ui/utils";
import ClusterDetails from "./ClusterDetails";
import ClusterDetailsPom from "./ClusterDetails.pom";

const pom = new ClusterDetailsPom();
describe("<ClusterDetails/>", () => {
  it("should render component", () => {
    const runtimeConfig: IRuntimeConfig = {
      AUTH: "",
      KC_CLIENT_ID: "",
      KC_REALM: "",
      KC_URL: "",
      SESSION_TIMEOUT: 0,
      OBSERVABILITY_URL: "",
      MFE: { APP_ORCH: "false" },
      TITLE: "",
      API: {},
      DOCUMENTATION: [],
      VERSIONS: {},
    };
    pom.interceptApis([pom.api.getClusterDetailSuccess]);
    cy.mount(
      <ClusterDetails
        isOpen={true}
        onCloseDrawer={() => {}}
        cluster={clusterOne}
      />,
      { runtimeConfig },
    );
    pom.waitForApis();
    pom.root.should("exist");
    pom.el.status.contains("Status");
    pom.el.statusValue.contains(clusterOne.status!);
    pom.el.id.contains("Cluster ID");
    pom.el.idValue.contains(clusterOne.clusterID!);
    pom.el.site.contains("Site");
    pom.el.siteValue.contains(`${clusterOne.locationList![0].locationInfo};`);
    pom.el.labels.contains("Cluster Labels");
    pom.labelsDisplay.root.should("be.exist");
    pom.el.hosts.contains("Hosts");
  });
});
