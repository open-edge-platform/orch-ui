/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flex } from "@orch-ui/components";
import { Text } from "@spark-design/react";
import { Link } from "react-router-dom";

interface OsProfileDrawerFieldProps {
  label: string;
  value?: string;
  isClickable?: boolean;
}

const OsProfileDetailField = ({
  label,
  value = "",
  isClickable = false,
}: OsProfileDrawerFieldProps) => {
  return (
    <Flex className="os-detail-container" cols={[4, 8]}>
      <Text className="os-details-label">{label}</Text>
      {isClickable ? (
        <Link to={value} target="_blank" rel="noopener noreferrer">
          <Text className="os-details-value">{value}</Text>
        </Link>
      ) : (
        <Text className="os-details-value">{value}</Text>
      )}
    </Flex>
  );
};

export default OsProfileDetailField;
