/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
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
  hostOs?: infra.OperatingSystemResourceRead;
  value?: string;
  isRequired?: boolean;
  label?: string;
  pageSize?: number;
  onSelectionChange?: (
    os: infra.OperatingSystemResourceRead | undefined,
    effect: boolean,
  ) => void;
}

const OsProfileDropdown = ({
  hostOs,
  value,
  isRequired = true,
  label,
  pageSize = 100,
  onSelectionChange,
}: OsProfileDropdownProps) => {
  const projectName = SharedStorage.project?.name ?? "";
  const {
    data: { OperatingSystemResources: osResources } = {},
    isLoading,
    isError,
    isSuccess,
    error,
  } = infra.useGetV1ProjectsByProjectNameComputeOsQuery(
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
          label={label ?? ""}
          name="osProfile"
          data-cy="osProfile"
          placeholder={singleHostConfig ? "Select OS Profile" : ""}
          size={DropdownSize.Large}
          selectedKey={value}
          isDisabled={value === "" && !singleHostConfig}
          onSelectionChange={(e) =>
            onSelectionChange?.(
              osResources.find((os) => e.toString() === os.resourceId),
              false,
            )
          }
          isRequired={isRequired}
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
          label={label ?? ""}
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
