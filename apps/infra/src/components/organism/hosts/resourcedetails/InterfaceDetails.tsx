/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Flex } from "@orch-ui/components";
import { Heading } from "@spark-design/react";
import IpAddressStatus from "./IpAddressStatus";
import LinkStatus from "./LinkStatus";

interface InterfaceDetailsProps {
  intf: infra.HostnicResourceRead;
}

function InterfaceDetails({ intf }: InterfaceDetailsProps) {
  const isEnabledValue = (value: boolean) => (value ? "Enabled" : "Disabled");
  const isTrueValue = (value: boolean) => (value ? "Yes" : "No");
  const staticIps = intf.ipAddresses?.filter(
    (ip) => ip.configMethod === "IP_ADDRESS_CONFIG_METHOD_STATIC",
  );
  const hasStaticIp = staticIps && staticIps.length > 0;
  const dynamicIps = intf.ipAddresses?.filter(
    (ip) => ip.configMethod === "IP_ADDRESS_CONFIG_METHOD_DYNAMIC",
  );
  const hasDynamicIp = dynamicIps && dynamicIps.length > 0;

  return (
    <Flex cols={[4, 8]} className="interface-details">
      <Heading semanticLevel={6}>Link Status</Heading>
      <LinkStatus status={intf.linkState?.type ?? "LINK_STATE_UNSPECIFIED"} />
      <Heading semanticLevel={6}>MTU</Heading>
      <span>{intf.mtu}</span>
      <Heading semanticLevel={6}>Mac Address</Heading>
      <span>{intf.macAddr}</span>
      {hasStaticIp && <Heading semanticLevel={6}>Static IPs</Heading>}
      {hasStaticIp && (
        <div>
          {staticIps.map((ip) => (
            <div>
              {ip.address}
              &nbsp;&nbsp;
              <IpAddressStatus
                status={ip.status ?? "IP_ADDRESS_STATUS_UNSPECIFIED"}
              />
            </div>
          ))}
        </div>
      )}
      {hasDynamicIp && <Heading semanticLevel={6}>Dynamic IPs</Heading>}
      {hasDynamicIp && (
        <div>
          {dynamicIps.map((ip) => (
            <div>
              {ip.address}
              &nbsp;&nbsp;
              <IpAddressStatus
                status={ip.status ?? "IP_ADDRESS_STATUS_UNSPECIFIED"}
              />
            </div>
          ))}
        </div>
      )}
      <Heading semanticLevel={6}>PCI Identifier</Heading>
      <span>{intf.pciIdentifier}</span>
      <Heading semanticLevel={6}>SRIOV</Heading>
      <span>{isEnabledValue(intf.sriovEnabled ?? false)}</span>
      {intf.sriovEnabled && <Heading semanticLevel={6}>SRIOV VFS NUM</Heading>}
      {intf.sriovEnabled && <span>{intf.sriovVfsNum}</span>}
      {intf.sriovEnabled && (
        <Heading semanticLevel={6}>SRIOV VFS TOTAL</Heading>
      )}
      {intf.sriovEnabled && <span>{intf.sriovVfsTotal}</span>}
      <Heading semanticLevel={6}>BMC Interface</Heading>
      <span>{isTrueValue(intf.bmcInterface ?? false)}</span>
    </Flex>
  );
}

export default InterfaceDetails;
