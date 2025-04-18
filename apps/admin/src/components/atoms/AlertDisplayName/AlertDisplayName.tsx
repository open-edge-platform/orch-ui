/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import { SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Text } from "@spark-design/react";

const dataCy = "alertDisplayName";
interface AlertDisplayNameProps {
  alertDefinition: omApi.AlertDefinition;
}
const AlertDisplayName = ({ alertDefinition }: AlertDisplayNameProps) => {
  const cy = { "data-cy": dataCy };
  const {
    data: alertDefinitionTemplate,
    isSuccess,
    isLoading,
  } = omApi.useGetProjectAlertDefinitionRuleQuery(
    {
      alertDefinitionId: alertDefinition.id!,
      projectName: SharedStorage.project?.name ?? "",
    },
    {
      skip: !alertDefinition.id || !SharedStorage.project?.name,
    },
  );

  return (
    <div {...cy} className="alert-display-name">
      <Text size="m">
        {isSuccess &&
        alertDefinitionTemplate.annotations &&
        alertDefinitionTemplate.annotations["display_name"]
          ? alertDefinitionTemplate.annotations["display_name"]
          : alertDefinition.name}
      </Text>
      {isLoading && <SquareSpinner />}
    </div>
  );
};

export default AlertDisplayName;
