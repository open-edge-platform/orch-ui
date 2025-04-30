/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Flex } from "@orch-ui/components";
import { Text } from "@spark-design/react";
import "./DeploymentMetadata.scss";

const dataCy = "deploymentMetadata";

interface DeploymentMetadataProps {
  site?: infra.SiteRead;
}

export const DeploymentMetadata = ({ site }: DeploymentMetadataProps) => {
  const cy = { "data-cy": dataCy };
  const classname = "deployment-metadata";

  if (!site?.metadata || site.metadata.length === 0) {
    return (
      <div {...cy}>
        <Text data-cy="noMetadataText">No metadata available.</Text>
      </div>
    );
  }

  return (
    <div {...cy}>
      <Flex cols={[2, 10]}>
        {site.metadata.map((site) => [
          <b key={`${site.key}-b`}>{site.key}</b>,
          <p key={`${site.key}-p`} className={`${classname}__value`}>
            {site.value}
          </p>,
        ])}
      </Flex>
    </div>
  );
};
