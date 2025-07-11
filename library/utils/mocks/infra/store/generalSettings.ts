/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { mps } from "@orch-ui/apis";
import { BaseStore } from "./baseStore";

const completeGeneralSettings: mps.GeneralSettingsResponse = {
  Body: {
    AMTNetworkEnabled: 1,
    DDNSPeriodicUpdateInterval: 3600,
    DDNSTTL: 900,
    DDNSUpdateByDHCPServerEnabled: true,
    DDNSUpdateEnabled: true,
    DHCPv6ConfigurationTimeout: 30,
    DigestRealm: "Digest:AB1234CD5678EF90",
    DomainName: "example.com",
    ElementName: "Intel(r) AMT: General Settings",
    HostName: "ENG-WS-01",
    HostOSFQDN: "ENG-WS-01.example.com",
    IdleWakeTimeout: 300,
    InstanceID: "Intel(r) AMT:General Settings 0",
    NetworkInterfaceEnabled: true,
    PingResponseEnabled: true,
    PowerSource: 1,
    PreferredAddressFamily: 2,
    PresenceNotificationInterval: 120,
    PrivacyLevel: 0,
    RmcpPingResponseEnabled: true,
    SharedFQDN: false,
    WsmanOnlyMode: false,
  },
  Header: {
    Action: "http://schemas.xmlsoap.org/ws/2004/09/transfer/GetResponse",
    MessageID: "uuid:00000000-8086-8086-8086-000000000001",
    Method: "GET",
    RelatesTo: "uuid:00000000-8086-8086-8086-000000000002",
    ResourceURI:
      "http://intel.com/wbem/wscim/1/amt-schema/1/AMT_GeneralSettings",
    To: "http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous",
  },
};

const networkGeneralSettings: mps.GeneralSettingsResponse = {
  Body: {
    AMTNetworkEnabled: 1,
    DDNSPeriodicUpdateInterval: 7200,
    DDNSTTL: 1800,
    DDNSUpdateByDHCPServerEnabled: false,
    DDNSUpdateEnabled: true,
    DHCPv6ConfigurationTimeout: 45,
    DomainName: "corp.example.org",
    HostName: "NETWORK-HOST-01",
    HostOSFQDN: "NETWORK-HOST-01.corp.example.org",
    NetworkInterfaceEnabled: true,
    PingResponseEnabled: true,
    PreferredAddressFamily: 2,
    RmcpPingResponseEnabled: true,
    SharedFQDN: true,
  },
  Header: {
    Action: "http://schemas.xmlsoap.org/ws/2004/09/transfer/GetResponse",
    MessageID: "uuid:00000000-8086-8086-8086-000000000020",
    Method: "GET",
  },
};

const powerGeneralSettings: mps.GeneralSettingsResponse = {
  Body: {
    AMTNetworkEnabled: 1,
    HostName: "POWER-HOST",
    IdleWakeTimeout: 180,
    InstanceID: "Intel(r) AMT:General Settings 0",
    NetworkInterfaceEnabled: true,
    PowerSource: 2,
    PresenceNotificationInterval: 60,
    WsmanOnlyMode: true,
  },
  Header: {
    MessageID: "uuid:00000000-8086-8086-8086-000000000030",
    ResourceURI:
      "http://intel.com/wbem/wscim/1/amt-schema/1/AMT_GeneralSettings",
  },
};

export class VproGeneralSettingsStore extends BaseStore<"guid", any, any> {
  constructor() {
    super("guid", [
      completeGeneralSettings,
      networkGeneralSettings,
      powerGeneralSettings,
    ]);
  }
  convert(body: mps.Device): mps.Device {
    return body;
  }

  getGeneralSettingsByGuid(/* guid: string */):
    | mps.GeneralSettingsResponse
    | undefined {
    return completeGeneralSettings;
  }
}
