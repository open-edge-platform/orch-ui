/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { cyGet } from "@orch-ui/tests";
import {
  IRuntimeConfig,
  onboardedHostOne,
  osUbuntu,
  regionUsWest,
  sitePortland,
  StoreUtils,
} from "@orch-ui/utils";

import {
  HostConfigFormStatus,
  HostConfigSteps,
  initialState,
} from "../../../store/configureHost";
import { setupStore } from "../../../store/store";
import { SearchPom } from "../../molecules/locations/Search/Search.pom";
import { RegionSiteTreePom } from "../../organism/locations/RegionSiteTree/RegionSiteTree.pom";
import OsProfileDropdownPom from "../../organism/OsProfileDropdown/OsProfileDropdown.pom";
import { HostConfig } from "./HostConfig";
import { HostConfigPom } from "./HostConfig.pom";

const pom = new HostConfigPom();
const osProfileDropdownPom = new OsProfileDropdownPom();
const selectSitePom = new RegionSiteTreePom();
const searchPom = new SearchPom();

describe("<HostConfig/>", () => {
  describe("when the host is not in redux", () => {
    beforeEach(() => {
      cy.mount(<HostConfig />, {
        reduxStore: setupStore({
          configureHost: initialState,
        }),
      });
    });
    it("should be show a message banner", () => {
      pom.missingHostMessage.should("be.visible");
      pom.missingHostMessageConfirmButton.click();

      cy.get("#pathname").contains("/hosts");
    });
  });
  describe("buttons", () => {
    describe("when the next button is disabled in redux", () => {
      beforeEach(() => {
        cy.mount(<HostConfig />, {
          reduxStore: setupStore({
            configureHost: {
              formStatus: { ...initialState.formStatus, enableNextBtn: false },
              hosts: {
                [onboardedHostOne.resourceId!]: onboardedHostOne,
              },
              autoOnboard: false,
              autoProvision: false,
            },
          }),
        });
      });
      it("should be disabled", () => {
        pom.el.next.should("have.attr", "aria-disabled", "true");
      });
    });
    describe("when the next button is enabled in redux", () => {
      const store = setupStore({
        configureHost: {
          formStatus: { ...initialState.formStatus, enableNextBtn: true },
          hosts: {
            [onboardedHostOne.resourceId!]: onboardedHostOne,
          },
          autoOnboard: false,
          autoProvision: false,
        },
      });
      beforeEach(() => {
        // @ts-ignore
        window.store = store;
        cy.mount(<HostConfig />, {
          reduxStore: store,
        });
      });
      it("should be enabled", () => {
        pom.el.next.should("not.have.attr", "aria-disabled", "true");
      });
      it("should go to the next page", () => {
        osProfileDropdownPom.interceptApis([
          osProfileDropdownPom.api.getOSResources,
        ]);
        pom.el.next.click();
        osProfileDropdownPom.waitForApis();
        cy.window()
          .its("store")
          .invoke("getState")
          .then(() => {
            expect(
              store.getState().configureHost.formStatus.currentStep,
            ).to.equal(1);
            expect(
              store.getState().configureHost.formStatus.enableNextBtn,
            ).to.equal(false);
          });
      });
    });
    describe("when the prev button is disabled in redux", () => {
      beforeEach(() => {
        cy.mount(<HostConfig />, {
          reduxStore: setupStore({
            configureHost: {
              formStatus: {
                ...initialState.formStatus,
                enablePrevBtn: false,
                currentStep: 1,
              },
              hosts: {
                [onboardedHostOne.resourceId!]: onboardedHostOne,
              },
              autoOnboard: false,
              autoProvision: false,
            },
          }),
        });
      });
      it("should be disabled", () => {
        pom.el.prev.should("have.attr", "aria-disabled", "true");
      });
    });
    describe("when the prev button is enabled in redux", () => {
      const store = setupStore({
        configureHost: {
          formStatus: {
            ...initialState.formStatus,
            enablePrevBtn: true,
            currentStep: 1,
          },
          hosts: {
            [onboardedHostOne.resourceId!]: onboardedHostOne,
          },
          autoOnboard: false,
          autoProvision: false,
        },
      });
      beforeEach(() => {
        // @ts-ignore
        window.store = store;
        cy.mount(<HostConfig />, {
          reduxStore: store,
        });
      });
      it("should be enabled", () => {
        pom.el.prev.should("not.have.attr", "aria-disabled", "true");
      });
      it("should go to previous next page", () => {
        pom.el.prev.click();
        cy.window()
          .its("store")
          .invoke("getState")
          .then(() => {
            expect(
              store.getState().configureHost.formStatus.currentStep,
            ).to.equal(0);
          });
        // when we are on the first page we don't render the Back button
        pom.el.prev.should("not.exist");
      });
    });
    describe("when the metadata", () => {
      const store = setupStore({
        configureHost: {
          formStatus: {
            ...initialState.formStatus,
            enablePrevBtn: true,
            enableNextBtn: true,
            currentStep: HostConfigSteps["Add Host Labels"],
          },
          hosts: {
            [onboardedHostOne.resourceId!]: onboardedHostOne,
          },
          autoOnboard: false,
          autoProvision: false,
        },
      });
      beforeEach(() => {
        // @ts-ignore
        window.store = store;
        cy.mount(<HostConfig />, {
          reduxStore: store,
        });
      });
      it("has lowercase key/values", () => {
        pom.metadataPom.rhfComboboxKeyPom.getInput().type("new-key");
        pom.metadataPom.rhfComboboxValuePom.getInput().type("new-value");
        // @ts-ignore: No overload matches this call
        pom.el.next.should("have.attr", "aria-disabled", "false", {
          timeout: 5000,
        });
      });
      it("has uppercase in key/values", () => {
        pom.metadataPom.rhfComboboxKeyPom.getInput().type("New-key");
        pom.el.next.should("have.attr", "aria-disabled", "true");

        pom.metadataPom.rhfComboboxKeyPom.getInput().clear().type("new-key");
        // @ts-ignore: No overload matches this call
        pom.el.next.should("have.attr", "aria-disabled", "false", {
          timeout: 5000,
        });
      });
    });
  });

  describe("When site is selected in Select Site step", () => {
    //@ts-ignore: Variable 'store' implicitly has type 'any'
    let store;
    beforeEach(() => {
      store = setupStore({
        configureHost: {
          formStatus: {
            ...initialState.formStatus,
            currentStep: HostConfigSteps["Select Site"],
            enablePrevBtn: false,
            enableNextBtn: false,
          },
          hosts: {
            [onboardedHostOne.resourceId!]: onboardedHostOne,
          },
          autoOnboard: false,
          autoProvision: false,
        },
      });
      // @ts-ignore
      window.store = store;
      selectSitePom.interceptApis([selectSitePom.api.getRootRegionsMocked]);

      cy.mount(<HostConfig />, {
        reduxStore: store,
      });
      selectSitePom.waitForApis();
    });

    it("host must be updated with selected site details", () => {
      selectSitePom.expandFirstRootMocked();
      selectSitePom.site.el.selectSiteRadio.click();
      cy.window()
        .its("store")
        .invoke("getState")
        .then(() => {
          expect(
            // @ts-ignore : Object is possibly 'undefined'.
            store.getState().configureHost.formStatus.currentStep,
          ).to.equal(0);
        });
      cy.window()
        .its("store")
        .invoke("getState")
        .then(() => {
          expect(
            // @ts-ignore : Object is possibly 'undefined'. Disabled as its step-2 in config, Host is expected to be present
            store.getState().configureHost.hosts[onboardedHostOne.resourceId!]
              .site.name,
          ).to.equal("Site 1");
        });
    });

    it("form buttons should validate selections", () => {
      pom.el.next.should("have.attr", "aria-disabled", "true");
      selectSitePom.expandFirstRootMocked();
      selectSitePom.site.el.selectSiteRadio.click();
      pom.el.next.should("have.attr", "aria-disabled", "false");
    });
  });
  describe("when saving the Host", () => {
    const formStatus: HostConfigFormStatus = {
      currentStep: HostConfigSteps["Complete Configuration"],
      enablePrevBtn: false,
      enableNextBtn: true,
      globalOsValue: "",
      globalSecurityValue: "",
      hasValidationError: false,
    };
    // convert to a WriteHost and set the values that the form would set
    const mockHost: eim.HostWrite = StoreUtils.convertToWriteHost(
      structuredClone(onboardedHostOne),
    );
    mockHost.siteId = sitePortland.resourceId;
    mockHost.site = sitePortland;
    const testMetadata = [{ key: "color", value: "red" }];
    mockHost.metadata = testMetadata;

    describe("should always", () => {
      beforeEach(() => {
        const store = setupStore({
          configureHost: {
            formStatus,
            hosts: {
              [onboardedHostOne.resourceId!]: {
                ...onboardedHostOne,
                region: regionUsWest,
              },
            },
            autoOnboard: false,
            autoProvision: false,
          },
        });
        // @ts-ignore
        window.store = store;

        cy.mount(<HostConfig />, {
          reduxStore: store,
        });
      });

      it("set correct text in Next button", () => {
        pom.el.next.should("have.text", "Configure");
      });
    });
    describe("and Host already has OS Installed", () => {
      const store = setupStore({
        configureHost: {
          formStatus,
          hosts: {
            hostId: {
              ...mockHost,
              // region is only part of the redux state, not eim.HostWrite
              region: regionUsWest,
              // NOTE this next line emulates a Host that already has a OS installed
              originalOs: osUbuntu,
            },
          },
          autoOnboard: false,
          autoProvision: false,
        },
      });
      beforeEach(() => {
        // @ts-ignore
        window.store = store;

        cy.mount(<HostConfig />, {
          reduxStore: store,
        });
      });
      it("should save the host", () => {
        pom.interceptApis([
          pom.api.patchComputeHostsAndHostId,
          pom.api.postInstances,
        ]);
        pom.el.next.click();
        pom.waitForApi([pom.api.patchComputeHostsAndHostId]);

        const expectedResult: eim.HostWrite = {
          name: onboardedHostOne.name,
          siteId: sitePortland.resourceId,
          metadata: testMetadata,
        };

        cy.get(`@${pom.api.patchComputeHostsAndHostId}`)
          .its("request.body")
          .should("deep.equal", expectedResult);

        cy.get(`@${pom.api.postInstances}.all`).then((interceptions) =>
          expect(interceptions).to.have.length(
            0,
            "postInstances was called for a Host that already has one",
          ),
        );
      });

      // TODO: skipped until we know how to handle errors/partial success
      xit("should display the API error", () => {
        pom.interceptApis([pom.api.patchComputeHostsAndHostId400]);
        pom.el.next.click();
        pom.waitForApis();
        pom.apiError.root.should("contain.text", "A Host error message");
      });
    });
    describe("and Host does not have OS Installed", () => {
      // simulate that some set the OSProfile/Security in Redux via the <Details /> component
      const testInstance: eim.InstanceWrite = {
        securityFeature:
          "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION",
        os: osUbuntu,
        osID: osUbuntu.resourceId,
      };
      mockHost.instance = testInstance;

      const store = setupStore({
        configureHost: {
          formStatus,
          hosts: {
            hostId: {
              ...mockHost,
              // region is only part of the redux state, not eim.HostWrite
              region: regionUsWest,
              // hostId is only part of the redux state, not eim.HostWrite
              resourceId: onboardedHostOne.resourceId,
            },
          },
          autoOnboard: false,
          autoProvision: false,
        },
      });

      beforeEach(() => {
        // @ts-ignore
        window.store = store;

        cy.mount(<HostConfig />, {
          reduxStore: store,
        });
      });

      it("should save the instance", () => {
        pom.interceptApis([
          pom.api.patchComputeHostsAndHostId,
          pom.api.postInstances,
        ]);
        pom.el.next.click();
        pom.waitForApis();

        const expectedResult: eim.InstanceWrite = {
          name: `${onboardedHostOne.name}-instance`,
          hostID: onboardedHostOne.resourceId,
          kind: "INSTANCE_KIND_METAL",
          securityFeature: testInstance.securityFeature,
          osID: testInstance.osID,
        };

        cy.get(`@${pom.api.postInstances}`)
          .its("request.body")
          .should("deep.equal", expectedResult);
      });

      it("should post instance only once", () => {
        pom.interceptApis([
          pom.api.patchComputeHostsAndHostId400,
          pom.api.postInstances,
        ]);
        pom.el.next.click();
        pom.waitForApis();

        cy.get(`@${pom.api.postInstances}`)
          .its("response.statusCode")
          .should("eq", 200);

        // second call will not post instance
        pom.interceptApis([pom.api.patchComputeHostsAndHostId400]);
        pom.el.next.click();
        pom.waitForApis();
      });

      // TODO: skipped until we know how to handle errors/partial success
      xit("should display the API error", () => {
        pom.interceptApis([
          pom.api.patchComputeHostsAndHostId,
          pom.api.postInstances400,
        ]);
        pom.el.next.click();
        pom.waitForApis();
        pom.apiError.root.should("contain.text", "An Instance error message");
      });
    });
  });

  describe("When the user can manage clusters, should navigate to create cluster page with correct query params", () => {
    let store;
    const runtimeConfig: IRuntimeConfig = {
      AUTH: "",
      KC_CLIENT_ID: "",
      KC_REALM: "",
      KC_URL: "",
      SESSION_TIMEOUT: 0,
      OBSERVABILITY_URL: "testUrl",
      TITLE: "",
      MFE: {
        CLUSTER_ORCH: "true",
      },
      API: {},
      VERSIONS: {},
      DOCUMENTATION: [],
    };

    beforeEach(() => {
      store = setupStore({
        configureHost: {
          formStatus: {
            ...initialState.formStatus,
            currentStep: HostConfigSteps["Select Site"],
            enablePrevBtn: false,
            enableNextBtn: true,
          },
          hosts: {
            [onboardedHostOne.resourceId!]: {
              ...onboardedHostOne,
              originalOs: osUbuntu,
            },
          },
          autoOnboard: false,
          autoProvision: false,
        },
      });

      // @ts-ignore
      window.store = store;

      pom.interceptApis([
        pom.api.patchComputeHostsAndHostId,
        pom.api.postInstances,
      ]);
      selectSitePom.interceptApis([selectSitePom.api.getRootRegionsMocked]);
      searchPom.interceptApis([searchPom.api.getLocationsOnSearch200]);
      osProfileDropdownPom.interceptApis([
        osProfileDropdownPom.api.getOSResources,
      ]);
      cy.mount(
        <HostConfig
          hasRole={cy
            .stub()
            .as("hasRoleStub")
            .callsFake(() => true)}
        />,
        {
          runtimeConfig: runtimeConfig,
          reduxStore: store,
        },
      );
    });

    it("when the site is selected by expanding the tree manually", () => {
      selectSitePom.waitForApis();
      selectSitePom.expandFirstRootMocked();
      selectSitePom.site.el.selectSiteRadio.click();
      pom.el.next.click();
      osProfileDropdownPom.waitForApis();
      pom.el.next.click();
      pom.el.next.click();
      pom.el.next.click();
      pom.waitForApi([pom.api.patchComputeHostsAndHostId]);
      cyGet("confirmBtn").click();
      cy.get("#pathname").contains("/infrastructure/clusters/create");
      cy.get("#search").contains(
        `?regionId=1&regionName=Root 1&siteId=site-1&siteName=Site 1&hostId=${onboardedHostOne.resourceId}`,
      );
    });

    it("when the site is selected in tree by searching", () => {
      selectSitePom.waitForApis();
      selectSitePom.expandFirstRootMocked();

      searchPom.root.should("exist");
      searchPom.el.textField.type("Site 1");
      searchPom.el.button.click();
      searchPom.waitForApi([searchPom.api.getLocationsOnSearch200]);

      selectSitePom.site.el.selectSiteRadio.click();
      pom.el.next.click();
      osProfileDropdownPom.waitForApis();
      pom.el.next.click();
      pom.el.next.click();
      pom.el.next.click();
      pom.waitForApi([pom.api.patchComputeHostsAndHostId]);
      cyGet("confirmBtn").click();
      pom.getPath().should("equal", "/infrastructure/clusters/create");
      cy.get("#search").contains(
        `?regionId=region-1&regionName=Root 1&siteId=site-1&siteName=Site 1&hostId=${onboardedHostOne.resourceId}`,
      );
    });
  });

  describe("When the user can't manage clusters", () => {
    let store;
    const runtimeConfig: IRuntimeConfig = {
      AUTH: "",
      KC_CLIENT_ID: "",
      KC_REALM: "",
      KC_URL: "",
      SESSION_TIMEOUT: 0,
      OBSERVABILITY_URL: "testUrl",
      TITLE: "",
      MFE: {
        CLUSTER_ORCH: "true",
      },
      API: {},
      VERSIONS: {},
      DOCUMENTATION: [],
    };

    beforeEach(() => {
      store = setupStore({
        configureHost: {
          formStatus: {
            ...initialState.formStatus,
            currentStep: HostConfigSteps["Select Site"],
            enablePrevBtn: false,
            enableNextBtn: true,
          },
          hosts: {
            [onboardedHostOne.resourceId!]: {
              ...onboardedHostOne,
              originalOs: osUbuntu,
            },
          },
          autoOnboard: false,
          autoProvision: false,
        },
      });

      // @ts-ignore
      window.store = store;

      pom.interceptApis([
        pom.api.patchComputeHostsAndHostId,
        pom.api.postInstances,
      ]);
      selectSitePom.interceptApis([selectSitePom.api.getRootRegionsMocked]);
      searchPom.interceptApis([searchPom.api.getLocationsOnSearch200]);
      osProfileDropdownPom.interceptApis([
        osProfileDropdownPom.api.getOSResources,
      ]);
      cy.mount(
        <HostConfig
          hasRole={cy
            .stub()
            .as("hasRoleStub")
            .callsFake(() => false)}
        />,
        {
          runtimeConfig: runtimeConfig,
          reduxStore: store,
        },
      );
    });

    it("should not show the create cluster modal", () => {
      selectSitePom.waitForApis();
      selectSitePom.expandFirstRootMocked();

      searchPom.root.should("exist");
      searchPom.el.textField.type("Site 1");
      searchPom.el.button.click();
      searchPom.waitForApi([searchPom.api.getLocationsOnSearch200]);

      selectSitePom.site.el.selectSiteRadio.click();
      pom.el.next.click();
      osProfileDropdownPom.waitForApis();
      pom.el.next.click();
      pom.el.next.click();
      pom.el.next.click();
      pom.waitForApi([pom.api.patchComputeHostsAndHostId]);
      cyGet("dialog").should("not.exist");
      pom.getPath().should("contain", "/unassigned-hosts");
    });
  });

  it("should see preselected site", () => {
    const store = setupStore({
      configureHost: {
        formStatus: {
          ...initialState.formStatus,
          currentStep: HostConfigSteps["Select Site"],
          enablePrevBtn: false,
          enableNextBtn: false,
        },
        hosts: {
          [onboardedHostOne.resourceId!]: {
            ...onboardedHostOne,
            site: sitePortland,
          },
        },
        autoOnboard: false,
        autoProvision: false,
      },
    });
    // @ts-ignore
    window.store = store;
    selectSitePom.interceptApis([selectSitePom.api.getRootRegionsMocked]);

    cy.mount(<HostConfig />, {
      reduxStore: store,
    });
    selectSitePom.waitForApis();

    pom.el.next.should("not.have.class", "spark-button-disabled");
  });
});
