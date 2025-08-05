/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { ApiError, Empty, SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Dropdown, Item } from "@spark-design/react";
import { useEffect, useState } from "react";

export interface ClusterTemplatesDropdownProps {
  pageSize?: number;
  onSelectionChange?: (value: string) => void;
  clusterTemplateName?: string;
  isDisabled?: boolean;
  kubernetesVersion?: string;
}
const ClusterTemplatesDropdown = ({
  onSelectionChange,
  clusterTemplateName,
  isDisabled,
  kubernetesVersion,
}: ClusterTemplatesDropdownProps) => {
  const projectName = SharedStorage.project?.name ?? "";
  const templatesParam: cm.GetV2ProjectsByProjectNameTemplatesApiArg = {
    projectName,
  };
  if (kubernetesVersion) {
    // Apply the filter to the query
    templatesParam.filter = `kubernetesVersion=${kubernetesVersion}`;
  }

  const {
    data: clusterTemplates,
    isSuccess: isTemplateSuccess,
    isLoading: isTemplateLoading,
    isError: isTemplateError,
    error,
    refetch,
  } = cm.useGetV2ProjectsByProjectNameTemplatesQuery(templatesParam);

  const [templateNames, setTemplateNames] = useState<string[]>();

  // Add useEffect to trigger refetch when kubernetesVersion changes
  useEffect(() => {
    refetch();
  }, [kubernetesVersion, refetch]);

  useEffect(() => {
    if (!clusterTemplates) return;
    const filteredList: string[] = [];
    clusterTemplates.templateInfoList?.forEach((value) => {
      filteredList.push(value.name);
    });
    const uniqueTemplate = [...new Set(filteredList)];

    setTemplateNames(uniqueTemplate);
  }, [clusterTemplates, onSelectionChange]);

  const isEmptyError = () =>
    isTemplateSuccess &&
    (!clusterTemplates.templateInfoList ||
      clusterTemplates.templateInfoList.length === 0);

  return (
    <div
      data-cy="clusterTemplateDropdown"
      className="cluster-template-dropdown"
    >
      {isTemplateSuccess &&
        clusterTemplates.templateInfoList &&
        clusterTemplates.templateInfoList.length != 0 && (
          <Dropdown
            size="l"
            data-cy="clusterTemplateDropdown"
            placeholder={
              clusterTemplateName
                ? clusterTemplateName
                : "Select a Cluster Template"
            }
            name="clusterTemplateDropdown"
            isDisabled={isDisabled}
            isRequired={true}
            label="Template"
            onSelectionChange={(selected) => {
              if (!selected || !onSelectionChange) return;
              onSelectionChange(String(selected));
            }}
          >
            {templateNames?.map((item) => <Item key={item}>{item}</Item>)}
          </Dropdown>
        )}
      {isTemplateLoading && <SquareSpinner />}
      {isTemplateError && <ApiError error={error} />}
      {isEmptyError() && <Empty title="No Templates found" />}
    </div>
  );
};

export default ClusterTemplatesDropdown;
