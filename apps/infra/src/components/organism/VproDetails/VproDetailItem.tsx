/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { Flex } from "@orch-ui/components";
import { Text } from "@spark-design/react";

interface VproDetailItemProps {
  label: string;
  value: string | boolean | undefined;
}

const VproDetailItem = ({ label, value }: VproDetailItemProps) => {
  // Convert boolean values to readable strings
  const displayValue =
    typeof value === "boolean" ? (value ? "Connected" : "Disconnected") : value;

  return (
    <Flex className="vpro-detail-container" cols={[4, 8]}>
      <Text className="vpro-details-label">{label}</Text>
      <Text className="vpro-details-value">{displayValue ?? "N/A"}</Text>
    </Flex>
  );
};

export default VproDetailItem;
