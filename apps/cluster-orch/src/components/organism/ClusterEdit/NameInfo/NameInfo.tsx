/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Heading, TextField } from "@spark-design/react";
import { useAppDispatch } from "../../../../store/hooks";
import { updateClusterTemplate } from "../../../../store/reducers/cluster";
import ClusterTemplatesDropdown from "../../../atom/ClusterTemplatesDropdown/ClusterTemplatesDropdown";
import ClusterTemplateVersionsDropdown from "../../../atom/ClusterTemplateVersionsDropdown/ClusterTemplateVersionsDropdown";

export const dataCy = "nameInfo";

interface NameInfoProps {
  clusterName: string;
  templateName: string;
  templateVersion: string;
}

const NameInfo = ({
  clusterName,
  templateName,
  templateVersion,
}: NameInfoProps) => {
  const dispatch = useAppDispatch();
  const cy = { "data-cy": dataCy };

  return (
    <>
      <div {...cy} className="cluster-creation">
        <TextField
          data-cy="name"
          size="l"
          label="Name"
          isDisabled={true}
          isRequired
          placeholder={clusterName}
        />
        <Heading semanticLevel={6}>Cluster Template</Heading>
        <p>
          Select a template version to update the software and extensions used
          by this cluster.
        </p>
        <div className="cluster-template-form">
          <ClusterTemplatesDropdown
            clusterTemplateName={templateName}
            isDisabled={true}
          />

          <ClusterTemplateVersionsDropdown
            clusterTemplateVersion={templateVersion}
            templateName={templateName}
            onSelectionChange={(value) => {
              dispatch(updateClusterTemplate(`${templateName}-${value}`));
            }}
          />
        </div>
      </div>
    </>
  );
};

export default NameInfo;
