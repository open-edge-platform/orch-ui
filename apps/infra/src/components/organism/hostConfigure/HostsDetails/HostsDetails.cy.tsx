/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { osRedHatId, osUbuntuId } from "@orch-ui/utils";
import { initialState } from "../../../../store/configureHost";
import { setupStore } from "../../../../store/store";
import { GlobalOsDropdownPom } from "../GlobalOsDropdown/GlobalOsDropdown.pom";
import { HostDetailsPom } from "../HostDetails/HostDetails.pom";
import { HostsDetails } from "./HostsDetails";
import { HostsDetailsPom } from "./HostsDetails.pom";

const pom = new HostsDetailsPom();
const detailsPom = new HostDetailsPom();
const globalOsDropdownPom = new GlobalOsDropdownPom();

describe("<HostsDetails/>", () => {
  const store = setupStore({
    configureHost: {
      formStatus: initialState.formStatus,
      hosts: {
        hostOneId: {
          name: "host-one",
          serialNumber: "SN1234AB",
        },
        hostTwoId: {
          name: "host-two",
          serialNumber: "SN1234AC",
        },
      },
      autoOnboard: false,
      autoProvision: false,
    },
  });
  beforeEach(() => {
    // @ts-ignore
    window.store = store;
    detailsPom.interceptApis([detailsPom.api.getOsResources]);
    cy.mount(<HostsDetails />, { reduxStore: store });
    detailsPom.waitForApis();
  });
  it("should render list of hosts", () => {
    pom.root.should("exist");
    pom.getHostDetailsRow(0).should("contain.text", "SN1234AB");
  });

  it("should render MessageBanner with correct message", () => {
    cy.get(".spark-message-banner").should("exist");
    cy.get(".spark-message-banner").should(
      "contain.text",
      "Secure Boot and Full Disk Encryption must be enabled in the BIOS of selected hosts. Trusted Compute compatibility requires Secure Boot.",
    );
  });

  describe("Preselect global values", () => {
    beforeEach(() => {
      pom.root.first().within(() => {
        cy.get("button").eq(0).click();
      });
      globalOsDropdownPom.dropdown.selectDropdownValue(
        pom.root,
        "globalOs",
        osUbuntuId,
        osUbuntuId,
      );
      pom.root.click(0, 0);
    });

    it("should save selected global values", () => {
      cy.window()
        .its("store")
        .invoke("getState")
        .then(() => {
          Object.values(store.getState().configureHost.hosts).forEach(
            (host) => {
              expect(host.instance?.osID).to.equal(osUbuntuId);
              expect(host.instance?.securityFeature).to.equal(
                "SECURITY_FEATURE_NONE",
              );
            },
          );
        });
    });

    it("should save selected local security value", () => {
      cy.get(".spark-toggle-switch-selector").eq(1).click();

      cy.window()
        .its("store")
        .invoke("getState")
        .then(() => {
          Object.values(store.getState().configureHost.hosts)
            .map((host) => host.instance?.securityFeature)
            .every((s) =>
              [
                "SECURITY_FEATURE_NONE",
                "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION",
              ].includes(s!),
            );
        });
    });

    it("should save selected local os value", () => {
      pom.root.first().within(() => {
        cy.get("button").eq(2).click();
      });

      cy.get("select").eq(2).select("Red Hat", {
        force: true,
      });

      cy.window()
        .its("store")
        .invoke("getState")
        .then(() => {
          Object.values(store.getState().configureHost.hosts)
            .map((host) => host.instance?.osID)
            .every((s) => [osUbuntuId, osRedHatId].includes(s!));
        });
    });
  });
});
