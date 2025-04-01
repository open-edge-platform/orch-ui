/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import DeploymentInstancesTable from "./DeploymentInstancesTable";
import DeploymentInstancesTablePom from "./DeploymentInstancesTable.pom";

const pom = new DeploymentInstancesTablePom();
describe("<DeploymentInstancesTable/>", () => {
  describe("basic tests", () => {
    it("should render component", () => {
      pom.interceptApis([pom.api.getDeploymentInstances200]);
      cy.mount(<DeploymentInstancesTable clusterId="x" />);
      pom.waitForApis();
      pom.root.should("be.visible");
    });

    it("should render empty results", () => {
      pom.interceptApis([pom.api.getDeploymentInstancesEmpty]);
      cy.mount(<DeploymentInstancesTable clusterId="x" />);
      pom.waitForApis();
      pom.root.contains("No information to display");
    });

    it("should handle 500 error", () => {
      pom.interceptApis([pom.api.getDeploymentInstances500]);
      cy.mount(<DeploymentInstancesTable clusterId="x" />);
      pom.waitForApis();
      cyGet("apiError").should("be.visible");
    });
  });

  describe("test working table routing", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getDeploymentInstances200]);
      cy.mount(null, {
        routerProps: {
          initialEntries: ["/infrastructure/cluster/clusterName"],
        },
        routerRule: [
          {
            path: "/infrastructure/cluster/clusterName",
            element: <DeploymentInstancesTable clusterId="x" />,
          },
        ],
      });
      pom.waitForApis();
    });

    it("should navigate to deployment details", () => {
      pom.table.getCell(1, 1).get('[data-cy="link"]').click();
      cy.get("#pathname").contains(
        /^\/applications\/deployment\/deploymentUid\/cluster\/x$/,
      );
    });
  });

  describe("test working table routing, but missing uid", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getDeploymentMissingUid]);
      cy.mount(null, {
        routerProps: {
          initialEntries: ["/infrastructure/cluster/clusterName"],
        },
        routerRule: [
          {
            path: "/infrastructure/cluster/clusterName",
            element: <DeploymentInstancesTable clusterId="x" />,
          },
        ],
      });
      pom.waitForApis();
    });

    it("should show error message banner", () => {
      pom.table.getCell(1, 1).get('[data-cy="link"]').click();
      cy.get("#pathname").contains(/^\/infrastructure\/cluster\/clusterName$/);
      pom.el.messageBanner.should("be.visible");
    });
  });
});
