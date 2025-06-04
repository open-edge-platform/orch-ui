/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { ApiError, Empty, SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Dropdown, Item } from "@spark-design/react";
import { useEffect, useState } from "react";

export interface ClusterTemplateVersionsDropdownProps {
  pageSize?: number;
  onSelectionChange?: (value: string) => void;
  isDisabled?: boolean;
  templateName: string;
  clusterTemplateVersion?: string;
}
const ClusterTemplateVersionsDropdown = ({
  onSelectionChange,
  isDisabled,
  templateName,
  clusterTemplateVersion,
}: ClusterTemplateVersionsDropdownProps) => {
  const projectName = SharedStorage.project?.name ?? "";
  const {
    data: clusterTemplates,
    isSuccess: isTemplateSuccess,
    isLoading: isTemplateLoading,
    isError: isTemplateError,
    error,
  } = cm.useGetV2ProjectsByProjectNameTemplatesQuery(
    { projectName },
    {
      skip: !projectName,
    },
  );

  const [versions, setVersions] = useState<string[]>();

  const isEmptyError = () =>
    isTemplateSuccess &&
    (!clusterTemplates.templateInfoList ||
      clusterTemplates.templateInfoList.length === 0);

  useEffect(() => {
    const filteredData: string[] = [];
    if (!clusterTemplates?.templateInfoList) return;
    clusterTemplates.templateInfoList.map((el) => {
      if (el.name === templateName) {
        filteredData.push(el.version!);
      }
    });
    setVersions(filteredData);
  }, [onSelectionChange, isDisabled, clusterTemplates]);

  return (
    <div data-cy="versionsDropdown" className="versions-dropdown">
      {isTemplateSuccess &&
        clusterTemplates.templateInfoList &&
        clusterTemplates.templateInfoList.length != 0 && (
          <Dropdown
            size="l"
            data-cy="clusterTemplateVersionDropdown"
            placeholder={
              clusterTemplateVersion
                ? clusterTemplateVersion
                : "Select Template Version"
            }
            name="clusterTemplateVersionDropdown"
            isDisabled={isDisabled}
            isRequired={true}
            label="Version"
            onSelectionChange={(selected) => {
              if (!selected || !onSelectionChange) return;
              onSelectionChange(String(selected));
            }}
          >
            {versions?.map((item) => <Item key={item}>{item}</Item>)}
          </Dropdown>
        )}
      {isTemplateLoading && <SquareSpinner />}
      {isTemplateError && <ApiError error={error} />}
      {isEmptyError() && <Empty title="No Versions found" />}
    </div>
  );
};

export default ClusterTemplateVersionsDropdown;
