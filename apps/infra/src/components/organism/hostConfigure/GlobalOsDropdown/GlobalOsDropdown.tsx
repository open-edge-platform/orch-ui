/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { ApiError, SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Dropdown, Item, MessageBanner } from "@spark-design/react";
import { DropdownSize } from "@spark-design/tokens";
import "./GlobalOsDropdown.scss";

const dataCy = "globalOsDropdown";

export type OsOptions = [string, string][];
export interface GlobalOsDropdownProps {
  isDisabled?: boolean;
  value?: string;
  onSelectionChange?: (osOption: string) => void;
}
export const GlobalOsDropdown = ({
  isDisabled = false,
  value,
  onSelectionChange,
}: GlobalOsDropdownProps) => {
  const cy = { "data-cy": dataCy };

  const {
    data: { OperatingSystemResources: _osResources } = {},
    isLoading,
    isError,
    isSuccess,
    error,
  } = infra.useOperatingSystemServiceListOperatingSystemsQuery({
    projectName: SharedStorage.project?.name ?? "",
    pageSize: 100,
  });

  const osResources = _osResources ? _osResources : [];

  const noOsResources = () =>
    isSuccess && (!osResources || osResources.length === 0);

  const getJSX = () => {
    if (isLoading) return <SquareSpinner />;
    if (isError) return <ApiError error={error} />;
    return noOsResources() ? (
      <span data-cy="emptyMessage">
        <MessageBanner
          variant={"error"}
          showIcon
          messageTitle="No Operating System Profile Available"
          messageBody="Please contact your administrator"
        />
      </span>
    ) : (
      <Dropdown
        label=""
        name="globalOs"
        isDisabled={isDisabled}
        placeholder="Select OS Profile"
        size={DropdownSize.Medium}
        selectedKey={value}
        onSelectionChange={(key) => {
          const selectedKey = key?.toString() ?? "";
        }}
        isRequired
      >
        {osResources.map((os) => {
          return <Item key={os.resourceId}>{os.name}</Item>;
        })}
      </Dropdown>
    );
  };

  return (
    <div {...cy} className="global-os-dropdown">
      {getJSX()}
    </div>
  );
};
