/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { ApiError, Empty, SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Dropdown, Item } from "@spark-design/react";
import { DropdownSize } from "@spark-design/tokens";

interface SitesDropdownProps {
  regionId: string;
  value?: string;
  pageSize?: number;
  onSelectionChange?: (value: infra.SiteResourceRead) => void;
  disable?: boolean;
}
const SitesDropdown = ({
  regionId,
  value,
  pageSize = 100,
  onSelectionChange,
  disable,
}: SitesDropdownProps) => {
  const projectName = SharedStorage.project?.name ?? "";
  const {
    data: { sites } = {},
    isLoading,
    isError,
    isSuccess,
    error,
  } = infra.useSiteServiceListSitesQuery(
    {
      projectName,
      pageSize,
      resourceId: regionId,
    },
    { skip: disable || !projectName }, // Skip call if component is disabled
  );

  const isEmptyError = () => isSuccess && (!sites || sites.length === 0);

  return (
    <div data-cy="sitesDropdown" className="sites-dropdown">
      {!isLoading || !isError || !isEmptyError() || disable ? (
        <Dropdown
          label="Site"
          name="site"
          data-cy="site"
          placeholder="Select site"
          isDisabled={disable}
          size={DropdownSize.Large}
          selectedKey={value}
          onSelectionChange={(e) => {
            const site =
              sites && sites.find((s) => e.toString() === s.resourceId);
            return site && onSelectionChange?.(site);
          }}
          isRequired
        >
          {sites && sites.map((s) => <Item key={s.resourceId}>{s.name}</Item>)}
        </Dropdown>
      ) : (
        <></>
      )}
      {isLoading && <SquareSpinner />}
      {isError && <ApiError error={error} />}
      {isEmptyError() && <Empty title="No Sites found" />}
    </div>
  );
};

export default SitesDropdown;
