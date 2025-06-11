/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { ExpansionPanelPom, MetadataFormPom } from "@orch-ui/components";
import { cyGet } from "@orch-ui/tests";
import { initialState } from "../../../store/provisionHost";
import { setupStore } from "../../../store/store";
import { PublicSshKeyDropdownPom } from "../../atom/PublicSshKeyDropdown/PublicSshKeyDropdown.pom";
import OsProfileDropdownPom from "../OsProfileDropdown/OsProfileDropdown.pom";
import HostProvisionEditDrawer from "./HostProvisionEditDrawer";
import HostProvisionEditDrawerPom from "./HostProvisionEditDrawer.pom";

const pom = new HostProvisionEditDrawerPom();
const osPom = new OsProfileDropdownPom();
const sshPom = new PublicSshKeyDropdownPom();
const expansionPanelPom = new ExpansionPanelPom();
const metadataFormPom = new MetadataFormPom();

describe("<HostProvisionEditDrawer/>", () => {
  it("should load data into the drawer and save changes back to host", () => {
    // Setup store
    const store = setupStore({
      provisionHost: {
        ...initialState,
        createCluster: false,
        hosts: {
          "Test Host": {
            name: "Test Host",
            instance: {
              os: {
                resourceId: "os-ubuntu",
                name: "Ubuntu",
                sha256: "sha",
                updateSources: [],
              } as infra.OperatingSystemResourceRead,
              osID: "os-ubuntu",
              securityFeature:
                "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION",
              localAccountID: "2",
            },
            metadata: [{ key: "env", value: "production" }],
          },
        },
      },
    });

    // Store the store in the window object
    // @ts-ignore
    window.store = store;

    osPom.interceptApis([osPom.api.getOSResources]);
    sshPom.interceptApis([sshPom.api.getLocalAccounts]);

    // Mount the component with the store
    cy.mount(<HostProvisionEditDrawer hostDataName="Test Host" />, {
      reduxStore: store,
    });

    osPom.waitForApis();
    sshPom.waitForApis();

    // Assertions
    pom.root.should("exist");
    osPom.dropdown.selectDropdownValue(
      osPom.root,
      "osProfile",
      "Red Hat",
      "os-redhat",
    );
    expansionPanelPom.toggle();
    cyGet("sbfdeToggle").click({ force: true });
    metadataFormPom.rhfComboboxKeyPom.getInput().type("testkey");
    metadataFormPom.rhfComboboxValuePom.getInput().type("testvalue");
    sshPom.sshKeyDropdown.selectDropdownValue(sshPom.root, "sshKey", "1", "1");
    pom.root.contains("Test Host").should("exist");
    pom.root.contains("Ubuntu").should("exist");
    cyGet("saveHostData").click();

    cy.window()
      .its("store")
      .invoke("getState")
      .then((state) => {
        const hostToTest = state.provisionHost.hosts["Test Host"];
        expect(hostToTest.name).to.equal("Test Host");
        expect(hostToTest.instance.os.name).to.equal("Red Hat");
        expect(hostToTest.instance.securityFeature).to.equal(
          "SECURITY_FEATURE_NONE",
        );
        expect(hostToTest.instance.localAccountID).to.equal("1");
        expect(hostToTest.metadata).to.deep.equal([
          { key: "env", value: "production" },
          { key: "testkey", value: "testvalue" },
        ]);
      });
  });
});
