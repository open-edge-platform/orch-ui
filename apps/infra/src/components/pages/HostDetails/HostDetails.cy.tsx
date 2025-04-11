/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { getActiveNavItem } from "@orch-ui/components";
import { cyGet } from "@orch-ui/tests";
import { IRuntimeConfig, siteRestaurantTwo } from "@orch-ui/utils";
import { useAppSelector } from "../../../store/hooks";
import HostDetails from "./HostDetails";
import { HostDetailsPom, hostNoName, mockHost } from "./HostDetails.pom";

const pom = new HostDetailsPom(mockHost.resourceId!);
describe("HostDetails", () => {
  const runtimeConfig: IRuntimeConfig = {
    AUTH: "",
    KC_CLIENT_ID: "",
    KC_REALM: "",
    KC_URL: "",
    SESSION_TIMEOUT: 0,
    OBSERVABILITY_URL: "testUrl",
    DOCUMENTATION: [],
    TITLE: "",
    MFE: { INFRA: "false" },
    API: {},
    VERSIONS: {},
  };

  describe("when the Host is correctly loaded", () => {
    const JSX = () => {
      const activeItem = useAppSelector(getActiveNavItem);
      return (
        <>
          <HostDetails />
          <h1 data-cy="active">{activeItem?.value}</h1>
        </>
      );
    };

    beforeEach(() => {
      pom.interceptApis([pom.api.hostSuccess, pom.api.siteSuccess]);
      cy.mount(<JSX />, {
        runtimeConfig,
        routerProps: { initialEntries: [`/host/${mockHost.resourceId}`] },
        routerRule: [{ path: "/host/:id", element: <JSX /> }],
      });
      pom.waitForApis();
    });

    it("will generate the correct active nav value", () => {
      cyGet("active").should("contain.text", "Active");
    });

    it("should display the Host information", () => {
      pom.el.infraHostDetailsHeader.contains(mockHost.name);
      pom.el.guid.should("have.text", mockHost.uuid);
      pom.el.serial.should("have.text", mockHost.serialNumber);
      pom.el.osProfiles.should("have.text", mockHost.instance?.currentOs?.name);
      pom.el.site.should("have.text", "Restaurant 02");
      pom.el.trustedCompute.should("contain.text", "Not compatible");
      pom.el.provider.should("have.text", mockHost.provider?.name);
    });

    it("should render inherited", () => {
      const inheritedMetadataLength =
        (siteRestaurantTwo.metadata?.length ?? 0) +
        (siteRestaurantTwo.inheritedMetadata?.location?.length ?? 0);

      if (inheritedMetadataLength) {
        pom.medataBadge.getAll().should("have.length", inheritedMetadataLength);
      } else {
        pom.medataBadge.root.should("contain.text", "Metadata are not defined");
      }
    });

    it("should render HostDetailsActions component", () => {
      cy.get(".spark-button").should("exist");
      cy.get(".spark-button").should("contain.text", "Host Actions");
    });

    it("should able to Edit a host from host details screen", () => {
      pom.hostAction.onboardedHostPopupPom.hostPopupPom.root.click();
      pom.hostAction.onboardedHostPopupPom.hostPopupPom
        .getActionPopupBySearchText("Edit")
        .click();
      cy.get("#pathname").contains(`host/${mockHost.resourceId}/edit`);
    });
  });

  describe("when the Host is correctly loaded with no host name", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.hostNoNameSuccess, pom.api.siteSuccess]);
      cy.mount(<HostDetails />, {
        routerProps: { initialEntries: [`/host/${hostNoName.resourceId}`] },
        routerRule: [{ path: "/host/:id", element: <HostDetails /> }],
      });
      pom.waitForApis();
    });

    it("should display the Host ID as header", () => {
      pom.el.infraHostDetailsHeader.contains(hostNoName.resourceId!);
    });
  });

  describe("when the Host is loaded via UuiD", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.hostUuidSuccess, pom.api.siteSuccess]);
      cy.mount(<HostDetails />, {
        runtimeConfig,
        routerProps: {
          initialEntries: [`/host/uuid/${mockHost.uuid}`],
        },
        routerRule: [{ path: "/host/uuid/:uuid", element: <HostDetails /> }],
      });
    });
    it("should display the Host information", () => {
      pom.el.infraHostDetailsHeader.contains(mockHost.name);
      cy.wait(`@${pom.api.hostUuidSuccess}`).then(({ request }) => {
        expect(request.query.detail).eq("true");
        expect(request.query.uuid).eq(mockHost.uuid);
      });
    });
  });

  describe("when the Host is correctly loaded with no provider", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.hostNoNameSuccess, pom.api.siteSuccess]);
      cy.mount(<HostDetails />, {
        routerProps: { initialEntries: [`/host/${hostNoName.resourceId}`] },
        routerRule: [{ path: "/host/:id", element: <HostDetails /> }],
      });
      pom.waitForApis();
    });

    it("should not display the provider info", () => {
      pom.el.provider.should("not.exist");
    });
  });

  describe("Host Label tab", () => {
    it("show metadata no host labels", () => {
      pom.interceptApis([
        pom.api.hostSuccessNoHostLabels,
        pom.api.siteSuccess,
        pom.api.getHostSchedules,
      ]);
      cy.mount(<HostDetails />, {
        runtimeConfig,
        routerProps: { initialEntries: [`/host/${mockHost.resourceId}`] },
        routerRule: [{ path: "/host/:id", element: <HostDetails /> }],
      });
      pom.waitForApis();
      pom.hostDetailsTab.clickTab("Host Labels");
      pom.hostDetailsTab.root.should(
        "contain.text",
        "No Host labels are available!",
      );
    });
  });

  describe("Os field and OS Update field", () => {
    beforeEach(() => {
      pom.interceptApis([
        pom.api.hostSuccessWithOsData,
        pom.api.siteSuccess,
        pom.api.getHostSchedules,
      ]);
      cy.mount(<HostDetails />, {
        runtimeConfig,
        routerProps: { initialEntries: [`/host/${mockHost.resourceId}`] },
        routerRule: [{ path: "/host/:id", element: <HostDetails /> }],
      });
      pom.waitForApis();
    });

    it("show OS field", () => {
      pom
        .getHostDescriptionValueByKey("OS")
        .should("contain.text", "CurrentOS");
    });
    it("show Updates field", () => {
      pom
        .getHostDescriptionValueByKey("Updates")
        .should("contain.text", "DesiredOS");
    });

    it("show `OS update available` under the Hostname", () => {
      pom.el.osUpdateAvailable.should("exist");
    });
  });

  describe("Deactivate Maintenance Mode button should", () => {
    it("appear in message banner for single maintenance schedules", () => {
      pom.interceptApis([
        pom.api.hostSuccessNoHostLabels,
        pom.api.siteSuccess,
        pom.api.getHostSchedules,
      ]);
      cy.mount(<HostDetails />, {
        runtimeConfig,
        routerProps: { initialEntries: [`/host/${mockHost.resourceId}`] },
        routerRule: [{ path: "/host/:id", element: <HostDetails /> }],
      });
      pom.waitForApis();
      cyGet("infraHostDetails").should(
        "contain.text",
        "Deactivate Maintenance Mode",
      );
    });

    it("not appear in message banner for repeated maintenance schedules", () => {
      pom.interceptApis([
        pom.api.hostSuccessNoHostLabels,
        pom.api.siteSuccess,
        pom.api.getHostRepeatedSchedules,
      ]);
      cy.mount(<HostDetails />, {
        runtimeConfig,
        routerProps: { initialEntries: [`/host/${mockHost.resourceId}`] },
        routerRule: [{ path: "/host/:id", element: <HostDetails /> }],
      });
      pom.waitForApis();
      cyGet("infraHostDetails").should(
        "not.contain.text",
        "Deactivate Maintenance Mode",
      );
    });
  });
});
