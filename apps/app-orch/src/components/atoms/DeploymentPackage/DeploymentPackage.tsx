/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Heading, Icon, Text } from "@spark-design/react";
import "./DeploymentPackage.scss";

const dataCy = "deploymentPackage";

interface DeploymentPackageProps {
  name: string;
  version: string;
  description?: string;
}

const detailsClassName = "details";

const DeploymentPackage = ({
  name,
  version,
  description,
}: DeploymentPackageProps) => {
  const cy = { "data-cy": dataCy };

  return (
    <div {...cy} className={"deployment-package"}>
      <Icon icon="cube" />
      <div className={detailsClassName}>
        <Heading
          semanticLevel={6}
          className={`${detailsClassName}__name`}
          data-cy="name"
        >
          {name}
        </Heading>
        <Text className={`${detailsClassName}__version`} data-cy="version">
          Version: {version}
        </Text>
        <Text
          className={`${detailsClassName}__description`}
          data-cy="description"
        >
          {description || "No Description provided!"}
        </Text>
      </div>
    </div>
  );
};

export default DeploymentPackage;
