/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { osRedHatId, osUbuntuId } from "@orch-ui/utils";
import { initialState } from "../../../../store/configureHost";
import { setupStore } from "../../../../store/store";
import { GlobalOsDropdownPom } from "../GlobalOsDropdown/GlobalOsDropdown.pom";
import { GlobalSecurityDropdownPom } from "../GlobalSecurityDropdown/GlobalSecurityDropdown.pom";
import { HostDetailsPom } from "../HostDetails/HostDetails.pom";
import { HostsDetails } from "./HostsDetails";
import { HostsDetailsPom } from "./HostsDetails.pom";

const pom = new HostsDetailsPom();
const detailsPom = new HostDetailsPom();
const globalOsDropdownPom = new GlobalOsDropdownPom();
const globalSecurityDropdownPom = new GlobalSecurityDropdownPom();

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
      globalSecurityDropdownPom.dropdown.selectDropdownValue(
        pom.root,
        "globalSecurity",
        "Disable All",
        "SECURITY_FEATURE_NONE",
      );
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
      pom.root.first().within(() => {
        cy.get("button").eq(3).click();
      });

      cy.get("select").eq(3).select("Full Disk Encryption", {
        force: true,
      });

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
        cy.get("button").eq(4).click();
      });

      cy.get("select").eq(4).select("Red Hat", {
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
