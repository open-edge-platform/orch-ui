/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { ApiError, SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Dropdown, Item, MessageBanner, TextField } from "@spark-design/react";
import { DropdownSize, InputSize } from "@spark-design/tokens";
import { useEffect } from "react";
import { selectHosts } from "../../../store/configureHost";
import { useAppSelector } from "../../../store/hooks";
import "./OsProfileDropdown.scss";

interface OsProfileDropdownProps {
  // the OS assigned to the Host, if any
  hostOs?: eim.OperatingSystemResourceRead;
  value?: string;
  pageSize?: number;
  onSelectionChange?: (
    os: eim.OperatingSystemResourceRead | undefined,
    effect: boolean,
  ) => void;
  hideLabel?: boolean;
}

const OsProfileDropdown = ({
  hostOs,
  value,
  pageSize = 100,
  onSelectionChange,
  hideLabel = false,
}: OsProfileDropdownProps) => {
  const projectName = SharedStorage.project?.name ?? "";
  const {
    data: { OperatingSystemResources: osResources } = {},
    isLoading,
    isError,
    isSuccess,
    error,
  } = eim.useGetV1ProjectsByProjectNameComputeOsQuery(
    {
      projectName,
      pageSize,
    },
    {
      skip: hostOs !== undefined || !projectName,
    },
  );

  const hosts = useAppSelector(selectHosts);
  const singleHostConfig = Object.keys(hosts).length === 1;
  const osExists = isSuccess && osResources && osResources?.length != 0;

  useEffect(() => {
    if (onSelectionChange && hostOs) {
      onSelectionChange(hostOs, true);
    }
  }, [hostOs]);

  useEffect(() => {
    if (onSelectionChange && osExists && !!value) {
      onSelectionChange(
        osResources.find((os) => value === os.resourceId),
        true,
      );
    }
  }, [value]);

  const isEmptyError = () =>
    isSuccess && (!osResources || osResources.length === 0);

  return (
    <div data-cy="osProfileDropdown" className="os-profile-dropdown">
      {osExists && (
        <Dropdown
          label={hideLabel ? "" : "Operating System Profile"}
          name="osProfile"
          data-cy="osProfile"
          placeholder={singleHostConfig ? "Select OS Profile" : ""}
          size={DropdownSize.Medium}
          selectedKey={value}
          isDisabled={value === "" && !singleHostConfig}
          onSelectionChange={(e) => {
            const selectedKey = e?.toString() ?? "";
            const selectedOs = osResources.find((os) => selectedKey === os.resourceId);
            onSelectionChange?.(selectedOs, false);
          }}
          isRequired
        >
          {osResources.map((os) => (
            <Item key={os.resourceId} aria-label={os.name}>
              {os.name}
            </Item>
          ))}
        </Dropdown>
      )}
      {hostOs && (
        <TextField
          data-cy="preselectedOsProfile"
          size={InputSize.Medium}
          label={hideLabel ? "" : "Operating System Profile"}
          isDisabled
          value={hostOs.name}
        />
      )}
      {isLoading && <SquareSpinner />}
      {isError && <ApiError error={error} />}
      {isEmptyError() && (
        <span data-cy="emptyMessage">
          <MessageBanner
            variant={"error"}
            showIcon
            messageTitle="No Operating System Profile Available"
            messageBody="Please contact your administrator"
          />
        </span>
      )}
    </div>
  );
};

export default OsProfileDropdown;
