/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Flex } from "@orch-ui/components";
import { humanFileSize } from "@orch-ui/utils";
import { ResourceDetailsDisplayProps } from "../ResourceDetails";

const Memory = ({ data }: ResourceDetailsDisplayProps<string>) => {
  const size = humanFileSize(parseInt(data));
  const displaySize = size ? `${size?.value} ${size?.units}` : "N/A";
  return (
    <div data-cy="memory">
      <Flex cols={[4, 8]}>
        <strong>Size</strong>
        <div>{displaySize}</div>
      </Flex>
    </div>
  );
};

export default Memory;
