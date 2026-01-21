/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { IRuntimeConfig } from "@orch-ui/utils";
import DeploymentDetailsTable from "./DeploymentDetailsTable";
import DeploymentDetailsTablePom from "./DeploymentDetailsTable.pom";

const runtimeConfig: IRuntimeConfig = {
  DOCUMENTATION: [],
  VERSIONS: {},
  AUTH: "",
  KC_CLIENT_ID: "",
  KC_REALM: "",
  KC_URL: "",
  SESSION_TIMEOUT: 0,
  OBSERVABILITY_URL: "",
  TITLE: "",
  MFE: { APP_ORCH: "true" },
  API: {},
};

const pom = new DeploymentDetailsTablePom();
describe("<DeploymentDetailsTable />", () => {
  describe("basic functionality will", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getDeploymentMock]);
      cy.mount(<DeploymentDetailsTable />, {
        runtimeConfig,
        routerProps: {
          initialEntries: ["/dashboard"],
        },
        routerRule: [
          { path: "/dashboard", element: <DeploymentDetailsTable /> },
          { path: "/dashboard/:id", element: <DeploymentDetailsTable /> },
        ],
      });
      pom.waitForApis();
    });
    it("render component", () => {
      pom.root.should("exist");
    });

    it("link to the details page", () => {
      pom.table.getCell(1, 6).find("a").click();
      cy.get("#pathname").contains("/dashboard/deployment-one");
    });
  });
});
