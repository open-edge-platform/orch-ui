/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flex } from "@orch-ui/components";
import { Text } from "@spark-design/react";

interface OsProfileDrawerFieldProps {
  label: string;
  value?: string;
}

const OsUpdatePolicyDetailField = ({
  label,
  value = "",
}: OsProfileDrawerFieldProps) => {
  return (
    <Flex align="start" className="os-update-policy-container" cols={[4, 8]}>
      <Text className="os-update-policy-label">{label}</Text>
      <Text className="os-update-policy-value">{value}</Text>
    </Flex>
  );
};

export default OsUpdatePolicyDetailField;
