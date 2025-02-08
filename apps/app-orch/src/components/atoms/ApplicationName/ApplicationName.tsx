/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import { SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Text } from "@spark-design/react";

export const dataCy = "applicationName";

interface ApplicationNameProps {
  applicationReference: catalog.ApplicationReference;
  item?: boolean;
}

const ApplicationName = ({ applicationReference }: ApplicationNameProps) => {
  const cy = { "data-cy": dataCy };
  const projectName = SharedStorage.project?.name ?? "";
  const {
    data: applicationResponse,
    isError,
    isLoading,
  } = catalog.useCatalogServiceGetApplicationQuery(
    {
      projectName,
      applicationName: applicationReference.name,
      version: applicationReference.version,
    },
    {
      skip: !projectName,
    },
  );

  if (isError || !applicationResponse || !applicationResponse.application) {
    return (
      <div {...cy} className="profile-err-msg">
        <Text>
          Could Not load Application for {applicationReference.name}!!
        </Text>
      </div>
    );
  } else if (isLoading) {
    return <SquareSpinner />;
  }

  const application = applicationResponse.application;

  return (
    <div {...cy} className="application-name">
      {application.displayName ?? application.name}
    </div>
  );
};

export default ApplicationName;
