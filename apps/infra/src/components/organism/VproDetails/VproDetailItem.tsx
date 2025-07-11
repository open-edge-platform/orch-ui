/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { Flex } from "@orch-ui/components";
import { Text } from "@spark-design/react";
import React from "react";

interface VproDetailItemProps {
  label: string;
  value: string | boolean | undefined | React.ReactNode;
}

const VproDetailItem = ({ label, value }: VproDetailItemProps) => {
  // Convert boolean values to readable strings
  const displayValue =
    typeof value === "boolean" ? (value ? "Connected" : "Disconnected") : value;

  return (
    <Flex className="item-container" cols={[4, 8]}>
      <Text className="label">{label}</Text>
      {React.isValidElement(displayValue) ? (
        <>{displayValue}</>
      ) : (
        <Text className="value">{displayValue ?? "N/A"}</Text>
      )}
    </Flex>
  );
};

export default VproDetailItem;
