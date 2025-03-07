/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { osRedHatId, osUbuntu, osUbuntuId } from "@orch-ui/utils";
import { initialState } from "../../../../store/configureHost";
import { setupStore } from "../../../../store/store";
import { HostDetails, isValidHostName } from "./HostDetails";
import { HostDetailsPom } from "./HostDetails.pom";

const pom = new HostDetailsPom();

describe("<Details/>", () => {
  describe("the isValidHostName function", () => {
    it("should validate the host name", () => {
      /* eslint-disable no-unused-expressions */
      expect(isValidHostName()).to.be.true;
      expect(isValidHostName("foo-bar")).to.be.true;
      expect(isValidHostName("Foo-Bar")).to.be.true;
      expect(isValidHostName("Foo-123")).to.be.true;
      expect(isValidHostName("Foo.123")).to.be.true;
      expect(isValidHostName("Foo.123!")).to.be.false;
      expect(isValidHostName("Foo.123$")).to.be.false;
      /* eslint-enable no-unused-expressions */
    });
  });

  describe("when updating the name", () => {
    const store = setupStore({
      configureHost: {
        formStatus: initialState.formStatus,
        hosts: {
          hostId: {
            resourceId: "preloaded-name",
            name: "",
            serialNumber: "SN1234AB",
          },
        },
        autoOnboard: false,
        autoProvision: false,
      },
    });
    beforeEach(() => {
      // @ts-ignore
      window.store = store;
      pom.interceptApis([pom.api.getOsResources]);
      cy.mount(<HostDetails hostId={"hostId"} />, { reduxStore: store });
      pom.waitForApis();
    });
    it("should load the name the redux state", () => {
      pom.el.name.should("have.value", "preloaded-name");
    });
    it("should update the redux state", () => {
      pom.el.name.clear();
      pom.el.name.type("test-name");
      cy.window()
        .its("store")
        .invoke("getState")
        .then(() => {
          Object.values(store.getState().configureHost.hosts).forEach(
            (host) => {
              expect(host.name).to.equal("test-name");
            },
          );
        });
    });
    describe("when the name is invalid", () => {
      it("should display an error", () => {
        pom.el.name.clear();
        pom.el.name.type("$$");
        cy.contains("Name should not contain special characters");
      });
    });
  });

  describe("when the Host already has a OS", () => {
    const store = setupStore({
      configureHost: {
        formStatus: initialState.formStatus,
        hosts: {
          hostId: {
            name: "preloaded-name",
            serialNumber: "SN1234AB",
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
      cy.mount(<HostDetails hostId={"hostId"} />, { reduxStore: store });
    });
    it("the OS dropdown and SB/FDE dropdown should be disabled", () => {
      pom.el.name.should("have.value", "preloaded-name");
      pom.osDropdown.el.preselectedOsProfile.should(
        "have.value",
        osUbuntu.name,
      );
      pom.osDropdown.el.preselectedOsProfile.should("be.disabled");
      pom.securityDropdown.el.security.should(
        "have.class",
        "spark-dropdown-is-disabled",
      );
    });
  });

  describe("when the Host dont have an OS", () => {
    const store = setupStore({
      configureHost: {
        formStatus: { ...initialState.formStatus, globalOsValue: "os-ubuntu" },
        hosts: {
          hostId: {
            name: "preloaded-name",
            serialNumber: "SN1234AB",
            instance: {
              osID: osUbuntuId,
            },
          },
        },
        autoOnboard: false,
        autoProvision: false,
      },
    });
    beforeEach(() => {
      // @ts-ignore
      window.store = store;
      pom.interceptApis([pom.api.getOsResources]);
      cy.mount(<HostDetails hostId={"hostId"} />, { reduxStore: store });
      pom.waitForApis();
    });
    it("the OS dropdown and SB/FDE dropdown should be enabled", () => {
      pom.osDropdown.el.osProfile.should(
        "not.have.class",
        "spark-dropdown-is-disabled",
      );

      pom.root.first().within(() => {
        cy.get("button").eq(0).click();
      });
      pom.osDropdown.dropdown.selectDropdownValue(
        pom.root,
        "osProfile",
        osRedHatId,
        osRedHatId,
      );

      pom.securityDropdown.el.security.should(
        "have.class",
        "spark-dropdown-is-disabled",
      );

      cy.window()
        .its("store")
        .invoke("getState")
        .then(() => {
          Object.values(store.getState().configureHost.hosts).forEach(
            (host) => {
              expect(host.instance?.securityFeature).to.equal(
                "SECURITY_FEATURE_NONE",
              );
            },
          );
        });
    });
  });
});
