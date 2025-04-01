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
    it("should fail on invalid names", () => {
      [
        "!!",
        " ",
        undefined,
        null,
        "Foo.123!",
        "Foo.123$",
        "123456789012345678901" //max of 20 chars exceeded
      ].forEach((name)=>{
        expect(isValidHostName(name)).to.be.false;
      });
    });

    it("should pass on valid names", () => {
      [
        "foo-bar",
        "Foo-Bar",
        "Foo-123",
        "Foo.123",
      ].forEach((name)=>{
        expect(isValidHostName(name)).to.be.true
      })

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
    it("the OS dropdown should be disabled", () => {
      pom.el.name.should("have.value", "preloaded-name");
      pom.osDropdown.el.preselectedOsProfile.should(
        "have.value",
        osUbuntu.name,
      );
      pom.osDropdown.el.preselectedOsProfile.should("be.disabled");
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
    it("the OS dropdown should be enabled", () => {
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
