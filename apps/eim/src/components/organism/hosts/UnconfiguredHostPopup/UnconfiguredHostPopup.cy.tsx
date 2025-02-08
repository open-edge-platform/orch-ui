/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cyGet, MountOptions } from "@orch-ui/tests";
import {
  unconfiguredHostOne,
  unconfiguredHostWithInstanceOne,
} from "@orch-ui/utils";
import { HostConfigSteps, initialState } from "../../../../store/configureHost";
import { setupStore } from "../../../../store/store";
import UnconfiguredHostPopup from "./UnconfiguredHostPopup";
import UnconfiguredHostPopupPom from "./UnconfiguredHostPopup.pom";

const pom = new UnconfiguredHostPopupPom();
describe("Unconfigured Host Popup component testing", () => {
  /**
   * This function will set the test component mounted on
   * a specific path and perform delete a host tests
   **/
  const deleteHostTestWithCustomRoutes = (
    routerMount: MountOptions,
    expectedFinalPath: string,
  ) => {
    cy.mount(<UnconfiguredHostPopup host={unconfiguredHostOne} />, routerMount);
    pom.root.click();
    pom.root.contains("Delete").click();

    cyGet("dialog");

    pom.interceptApis([pom.api.deleteHostSuccessMocked]);
    cyGet("confirmBtn").click();
    pom.waitForApis();

    cy.get(`@${pom.api.deleteHostSuccessMocked}`)
      .its("request.url")
      .then((url: string) => {
        const match = url.match(`/hosts/${unconfiguredHostOne.resourceId}`);
        expect(match).to.have.length(1);
      });

    pom.getPath().should("eq", expectedFinalPath);
  };

  it("should delete host", () => {
    deleteHostTestWithCustomRoutes(
      {
        routerProps: { initialEntries: ["/unconfigured-hosts"] },
        routerRule: [
          {
            path: "/unconfigured-hosts",
            element: <UnconfiguredHostPopup host={unconfiguredHostOne} />,
          },
        ],
      },
      "/unconfigured-hosts",
    );
  });

  it("should delete host from host details page", () => {
    deleteHostTestWithCustomRoutes(
      {
        routerProps: {
          initialEntries: [
            `/unconfigured-host/${unconfiguredHostOne.resourceId}`,
          ],
        },
        routerRule: [
          {
            path: "/unconfigured-host/:hostId",
            element: (
              <UnconfiguredHostPopup
                host={unconfiguredHostOne}
                basePath="../"
              />
            ),
          },
          {
            path: "/unconfigured-hosts",
            element: <>Table page</>,
          },
        ],
      },
      "/unconfigured-hosts",
    );
  });

  it("should delete host with an instance", () => {
    cy.mount(<UnconfiguredHostPopup host={unconfiguredHostWithInstanceOne} />);
    pom.root.click();
    pom.root.contains("Delete").click();

    cyGet("dialog");

    pom.interceptApis([
      pom.api.deleteInstanceSuccessMocked,
      pom.api.deleteHostSuccessMocked,
    ]);
    cyGet("confirmBtn").click();
    pom.waitForApis();

    cy.get(`@${pom.api.deleteInstanceSuccessMocked}`)
      .its("request.url")
      .then((url: string) => {
        const match = url.match(
          `/instances/${unconfiguredHostWithInstanceOne.instance?.instanceID}`,
        );
        expect(match).to.have.length(1);
      });
    cy.get(`@${pom.api.deleteHostSuccessMocked}`)
      .its("request.url")
      .then((url: string) => {
        const match = url.match(
          `/hosts/${unconfiguredHostWithInstanceOne.resourceId}`,
        );
        expect(match).to.have.length(1);
      });
  });

  it("should correctly route when configuring host (from table view)", () => {
    cy.mount(<UnconfiguredHostPopup host={unconfiguredHostOne} />, {
      routerProps: { initialEntries: ["/unconfigured-hosts"] },
      routerRule: [
        {
          path: "/unconfigured-hosts",
          element: <UnconfiguredHostPopup host={unconfiguredHostOne} />,
        },
      ],
    });
    pom.root.click();

    pom.root.contains("Configure").click();

    cy.contains("/unconfigured-host/configure");
  });

  it("should correctly route when configuring host (from details view)", () => {
    cy.mount(<UnconfiguredHostPopup host={unconfiguredHostOne} />, {
      routerProps: { initialEntries: ["/unconfigured-host/xyz"] },
      routerRule: [
        {
          path: "/unconfigured-host/xyz",
          element: <UnconfiguredHostPopup host={unconfiguredHostOne} />,
        },
      ],
    });
    pom.root.click();

    pom.root.contains("Configure").click();

    cy.contains("/unconfigured-host/configure");
  });

  it("should not render view details option", () => {
    cy.mount(
      <UnconfiguredHostPopup
        host={unconfiguredHostOne}
        showViewDetailsOption={false}
      />,
    );
    pom.root.click();
    pom.root.should("not.contain.text", "View Details");
  });

  it("should render view details option", () => {
    cy.mount(<UnconfiguredHostPopup host={unconfiguredHostOne} />);
    pom.root.click();
    pom.root.contains("View Details").click();
    cy.contains(`/unconfigured-host/${unconfiguredHostOne.resourceId}`);
  });

  describe("when redirecting to the new HostConfig component", () => {
    const store = setupStore({
      configureHost: {
        formStatus: {
          ...initialState.formStatus,
          currentStep: HostConfigSteps["Complete Configuration"],
        },
        hosts: initialState.hosts,
      },
    });
    beforeEach(() => {
      // @ts-ignore
      window.store = store;
      cy.mount(<UnconfiguredHostPopup host={unconfiguredHostOne} />, {
        routerProps: { initialEntries: ["/unconfigured-host/xyz"] },
        routerRule: [
          {
            path: "/unconfigured-host/xyz",
            element: <UnconfiguredHostPopup host={unconfiguredHostOne} />,
          },
        ],
        reduxStore: store,
      });
    });
    it("should store the Host in redux", () => {
      pom.root.click();
      pom.root.contains("Configure").click();
      cy.window()
        .its("store")
        .invoke("getState")
        .then(() => {
          Object.values(store.getState().configureHost.hosts).forEach(
            (host) => {
              expect(host.name).to.equal(unconfiguredHostOne.name);
            },
          );
          Object.values(store.getState().configureHost.hosts).forEach(
            (host) => {
              expect(host.site).to.deep.equal(unconfiguredHostOne.site);
            },
          );
          Object.values(store.getState().configureHost.hosts).forEach(
            (host) => {
              expect(host.site).to.deep.equal(unconfiguredHostOne.site);
            },
          );
          // make sure we reset the form step to the first on
          expect(
            store.getState().configureHost.formStatus.currentStep,
          ).to.equal(0);
        });
    });
  });
});
