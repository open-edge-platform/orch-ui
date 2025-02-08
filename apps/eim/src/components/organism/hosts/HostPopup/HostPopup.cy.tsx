/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cyGet, MountOptions } from "@orch-ui/tests";
import { hostOne, IRuntimeConfig, unassignedHostOne } from "@orch-ui/utils";
import HostPopup from "./HostPopup";
import HostPopupPom from "./HostPopup.pom";

const pom = new HostPopupPom();
describe("Host Popup component testing should", () => {
  const runtimeConfig: IRuntimeConfig = {
    AUTH: "",
    KC_CLIENT_ID: "",
    KC_REALM: "",
    KC_URL: "",
    SESSION_TIMEOUT: 0,
    OBSERVABILITY_URL: "testUrl",
    DOCUMENTATION: [],
    TITLE: "",
    MFE: {},
    API: {},
    VERSIONS: {},
  };

  /**
   * This function will set the test component mounted on
   * routerMount setting and perform delete a host tests
   **/
  const deleteHostByRouterMountSetting = (
    routerMount: MountOptions,
    expectedFinalPath: string,
  ) => {
    cy.mount(<HostPopup host={unassignedHostOne} />, {
      ...routerMount,
      runtimeConfig,
    });
    pom.root.click();
    pom.root.contains("Delete").click();

    cyGet("dialog");

    pom.interceptApis([pom.api.deleteInstance, pom.api.deleteHost]);
    cyGet("confirmBtn").click();
    pom.waitForApis();

    cy.get(`@${pom.api.deleteInstance}`)
      .its("request.url")
      .then((url: string) => {
        const match = url.match("instance-dhaaabbb");
        expect(match).to.exist.to.have.length(1);
      });

    cy.get(`@${pom.api.deleteHost}`)
      .its("request.url")
      .then((url: string) => {
        const match = url.match(`/hosts/${unassignedHostOne.resourceId}`);
        expect(match).to.have.length(1);
      });

    pom.getPath().should("eq", expectedFinalPath);
  };

  it("render no view details option", () => {
    cy.mount(<HostPopup host={hostOne} showViewDetailsOption={false} />, {
      runtimeConfig,
    });
    pom.root.click();
    pom.root.should("not.contain.text", "View Details");
  });

  it("render unassigned view details option", () => {
    cy.mount(<HostPopup host={hostOne} />, { runtimeConfig });
    pom.root.click();
    pom.root.contains("View Details").click();
    cy.contains(`/unassigned-host/${hostOne.resourceId}`);
  });

  it("deauthorize a hosts", () => {
    cy.mount(<HostPopup host={hostOne} />, { runtimeConfig });
    pom.root.click();

    pom.root.contains("Deauthorize").click();

    pom.interceptApis([pom.api.postDeauthorizeHost]);

    // cy.get("[data-cy='confirmationDialog']")
    //   .find(".spark-button")
    //   .contains("Deauthorize")
    //   .click();
    cyGet("confirmBtn").click();
    pom.waitForApis();

    cy.get("#pathname").contains("/deauthorized-hosts");
  });

  it("Should show schedule maintenance host", () => {
    cy.mount(<HostPopup host={hostOne} />, { runtimeConfig });
    pom.root.click();

    pom.root.contains("Schedule Maintenance").click();

    pom.maintenanceDrawerPom.root.should("exist");
  });

  it("Should show delete on configured host", () => {
    deleteHostByRouterMountSetting(
      {
        routerProps: { initialEntries: ["/unassigned-hosts"] },
        routerRule: [
          {
            path: "/unassigned-hosts",
            element: <HostPopup host={unassignedHostOne} />,
          },
        ],
      },
      "/unassigned-hosts",
    );
  });

  it("should delete configured host from host details page", () => {
    deleteHostByRouterMountSetting(
      {
        routerProps: {
          initialEntries: [`/unassigned-host/${unassignedHostOne.resourceId}`],
        },
        routerRule: [
          {
            path: "/unassigned-host/:hostId",
            element: <HostPopup host={unassignedHostOne} basePath="../" />,
          },
          {
            path: "/unassigned-hosts",
            element: <>Table page</>,
          },
        ],
      },
      "/unassigned-hosts",
    );
  });

  it("Should not show delete on assigned host", () => {
    pom.interceptApis([pom.api.getInstanceWithWorkload]);
    cy.mount(<HostPopup host={hostOne} />, { runtimeConfig });
    pom.root.click();
    pom.waitForApis();

    pom.root.should("not.contain", "Delete");
  });
});
