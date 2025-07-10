/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { mps } from "@orch-ui/apis";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";

const dataCySelectors = ["vproDetails"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "getDeviceData" | "getAmtSettings";

const mockHostUuid = "4c4c4544-0044-4210-8031-c2c04f3052aa";

const mockDeviceData: mps.Device = {
  connectionStatus: true,
  friendlyName: "Test Device",
  dnsSuffix: "test.domain.com",
  deviceInfo: {
    ipAddress: "192.168.1.100",
    currentMode: "Admin Control Mode",
    fwVersion: "16.1.25.1917",
    fwSku: "Corporate",
    fwBuild: "1917",
  },
};

const mockAmtSettingsData: mps.GeneralSettingsResponse = {
  Body: {
    HostName: "TestHostName",
    DomainName: "test.domain.com",
    DigestRealm: "Digest:ABCDEF123456",
  },
};

const deviceRoute = `**/projects/${defaultActiveProject.name}/dm/devices/${mockHostUuid}`;
const amtSettingsRoute = `**/projects/${defaultActiveProject.name}/dm/amt/generalSettings/${mockHostUuid}`;

const endpoints: CyApiDetails<
  ApiAliases,
  mps.Device | mps.GeneralSettingsResponse
> = {
  getDeviceData: {
    route: deviceRoute,
    statusCode: 200,
    response: mockDeviceData,
  },
  getAmtSettings: {
    route: amtSettingsRoute,
    statusCode: 200,
    response: mockAmtSettingsData,
  },
};

class VproDetailsPom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = "vproDetails") {
    super(rootCy, [...dataCySelectors], endpoints);
  }

  /**
   * Gets the value of a specific detail by label
   * @param label The label text of the detail to find
   * @returns The Cypress chain for the detail value
   */
  getDetailValueByLabel(label: string) {
    return this.root
      .contains(".label", label)
      .parents(".item-container") // Go up to the container
      .find(".value"); // Find the value span
  }

  /**
   * Verifies that all expected device details are displayed correctly
   */
  verifyDeviceDetails() {
    const device = mockDeviceData;
    this.getDetailValueByLabel("Connection Status").should(
      "contain",
      "Connected",
    );
    this.getDetailValueByLabel("Display Name").should(
      "contain",
      device.friendlyName,
    );
    this.getDetailValueByLabel("DNS Suffix").should(
      "contain",
      device.dnsSuffix,
    );
    this.getDetailValueByLabel("IP Address").should(
      "contain",
      device.deviceInfo?.ipAddress,
    );
    this.getDetailValueByLabel("Current Mode").should(
      "contain",
      device.deviceInfo?.currentMode,
    );
    this.getDetailValueByLabel("Firmware Version").should(
      "contain",
      device.deviceInfo?.fwVersion,
    );
  }

  /**
   * Verifies that all expected AMT settings details are displayed correctly
   */
  verifyAmtSettings() {
    const settings = mockAmtSettingsData.Body;
    this.getDetailValueByLabel("AMT Host Name").should(
      "contain",
      settings?.HostName,
    );
    this.getDetailValueByLabel("Domain Name").should(
      "contain",
      settings?.DomainName,
    );
    this.getDetailValueByLabel("Digest Realm").should(
      "contain",
      settings?.DigestRealm,
    );
  }
}

export default VproDetailsPom;
export { mockHostUuid, mockDeviceData, mockAmtSettingsData };
