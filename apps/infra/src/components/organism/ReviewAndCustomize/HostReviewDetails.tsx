/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flex } from "@orch-ui/components";
import { Text } from "@spark-design/react";
import { HostData } from "../../../store/provisionHost";
import "./HostReviewDetails.scss";

interface HostReviewDetailsProps {
  host: HostData;
}

const isSbfde = (host: HostData) =>
  host.instance?.securityFeature ===
  "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION";

const HostReviewDetails = ({ host }: HostReviewDetailsProps) => {
  return (
    <div className="host-review-details">
      <Flex cols={[2, 4]} align="start">
        <b>Serial number</b>
        <Text>{host.serialNumber || "-"}</Text>
        <b>Security</b>
        <Text>
          Secure Boot and Full Disk Encryption:{" "}
          {isSbfde(host) ? "Enabled" : "Disabled"}
        </Text>
        <b>UUID</b>
        <Text>{host.uuid || "-"}</Text>
        <div></div>
        <Text>vPro: {host.enableVpro ? "Enabled" : "Disabled"}</Text>
        <div></div>
        <div></div>
        <div></div>
        <Text>SSH Key: {host.instance?.localAccountID || "-"}</Text>
        <div></div>
        <div></div>
        <b>Trusted Compute</b>
        <Text>{isSbfde(host) ? "Compatible" : "Not Compatible"}</Text>
      </Flex>
    </div>
  );
};

export default HostReviewDetails;
