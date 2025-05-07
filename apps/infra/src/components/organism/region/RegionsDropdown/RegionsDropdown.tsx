/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { ApiError, Empty, SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Dropdown, Item } from "@spark-design/react";
import { DropdownSize } from "@spark-design/tokens";

interface RegionsDropdownProps {
  value?: string;
  parentRegionId?: string;
  pageSize?: number;
  onSelectionChange?: (value: infra.RegionRead) => void;
}
const RegionsDropdown = ({
  value,
  parentRegionId,
  pageSize = 100,
  onSelectionChange,
}: RegionsDropdownProps) => {
  const projectName = SharedStorage.project?.name ?? "";
  const {
    data: { regions } = {},
    isLoading,
    isSuccess,
    isError,
    error,
  } = infra.useGetV1ProjectsByProjectNameRegionsQuery(
    {
      projectName,
      parent: parentRegionId,
      pageSize: pageSize,
    },
    {
      skip: !projectName,
    },
  );

  const isEmptyError = () => isSuccess && (!regions || regions.length === 0);

  return (
    <div data-cy="regionsDropdown" className="regions-dropdown">
      {isSuccess && regions && regions?.length != 0 && (
        <Dropdown
          label="Region"
          name="region"
          data-cy="region"
          placeholder="Select region"
          size={DropdownSize.Large}
          selectedKey={value}
          onSelectionChange={(e) => {
            const region = regions.find((r) => e.toString() === r.resourceId);
            return region && onSelectionChange?.(region);
          }}
          isRequired
        >
          {regions.map((r) => (
            <Item key={r.resourceId}>{r.name}</Item>
          ))}
        </Dropdown>
      )}
      {isLoading && <SquareSpinner />}
      {isError && <ApiError error={error} />}
      {isEmptyError() && <Empty title="No Regions found" />}
    </div>
  );
};

export default RegionsDropdown;
