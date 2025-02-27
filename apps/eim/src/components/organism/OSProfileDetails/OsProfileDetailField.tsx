/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Flex } from "@orch-ui/components";
import { Text } from "@spark-design/react";

interface OsProfileDrawerFieldProps {
  label: string;
  value?: string;
}

const OsProfileDetailField = ({
  label,
  value = "",
}: OsProfileDrawerFieldProps) => {
  return (
    <Flex className="os-detail-container" cols={[4, 8]}>
      <Text className="os-details-label">{label}</Text>
      <Text className="os-details-value">{value}</Text>
    </Flex>
  );
};

export default OsProfileDetailField;
