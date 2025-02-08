/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { hostOne, IRuntimeConfig } from "@orch-ui/utils";
import HostDetailsTab from "./HostDetailsTab";
import HostDetailsTabPom from "./HostDetailsTab.pom";

const pom = new HostDetailsTabPom();

describe("The HostDetailsTab component", () => {
  describe("when no resources are set", () => {
    it("should render a message banner", () => {
      const runtimeConfig: IRuntimeConfig = {
        AUTH: "",
        KC_URL: "",
        KC_REALM: "",
        KC_CLIENT_ID: "",
        SESSION_TIMEOUT: 0,
        OBSERVABILITY_URL: "",
        DOCUMENTATION: [],
        MFE: {
          FM: "false",
        },
        TITLE: "",
        API: {},
        VERSIONS: {},
      };

      const hostResourceUndefined: eim.HostRead = {
        ...hostOne,
      };

      cy.mount(
        <HostDetailsTab
          host={hostResourceUndefined}
          onShowCategoryDetails={() => null}
        />,
        { runtimeConfig },
      );

      pom.clickTab("Resources");
      cy.contains("Host resources not reported");
    });
  });
  describe("when Host resources are set", () => {
    const storageCapacity = "1073741824"; // 1 GB
    const hostWithResource: eim.HostRead = {
      ...hostOne,
      cpuCores: 4,
      cpuModel: "cpu-model",
      memoryBytes: storageCapacity,
      hostStorages: [
        { capacityBytes: storageCapacity },
        { capacityBytes: storageCapacity },
      ],
      hostNics: [],
      productName: "Test Product Name",
      biosVendor: "Test Bios",
    };

    beforeEach(() => {
      cy.mount(
        <HostDetailsTab
          host={hostWithResource}
          onShowCategoryDetails={() => null}
        />,
      );

      pom.clickTab("Resources");
    });

    it("should display CPU, memory and storage information", () => {
      const totalCores = hostWithResource.cpuCores ?? "0";
      cy.contains(totalCores);
      cy.contains("1.00 GB");
      cy.contains("2.00 GB");
    });

    it("should not display interfaces information", () => {
      cy.contains("I/O Devices").click();
      cy.contains("No I/O devices connected");
    });

    it("should display bios vendor and product name", () => {
      cy.contains("Specifications").click();
      cy.contains(hostWithResource.productName!);
      cy.contains(hostWithResource.biosVendor!);
    });
  });
});
