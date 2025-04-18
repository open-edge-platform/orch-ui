/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Flex,
  MetadataDisplay,
  MetadataForm,
  TypedMetadata,
} from "@orch-ui/components";
import {
  metadataPairToObject,
  ObjectKeyValue,
  objectToMetadataPair,
} from "@orch-ui/utils";
import { Heading, MessageBanner } from "@spark-design/react";
import { updateClusterLabels } from "src/store/reducers/cluster";
import { useAppDispatch } from "../../../../store/hooks";

const dataCy = "metadataLabels";
interface MetadataLabelsProps {
  inheritedMetadata: TypedMetadata[];
  clusterLabels: ObjectKeyValue;
}

const MetadataLabels = ({
  inheritedMetadata,
  clusterLabels,
}: MetadataLabelsProps) => {
  const cy = { "data-cy": dataCy };
  const dispatch = useAppDispatch();

  return (
    <>
      <div {...cy} className="metadata-labels">
        <Heading semanticLevel={6}>Deployment Configuration</Heading>

        <p className="subtitle">Location Information</p>
        <MessageBanner
          messageTitle=""
          variant="info"
          size="s"
          showIcon
          outlined
          messageBody="Region and site information reflects the location of the cluster's hosts and cannot be modified."
        />
        <MetadataDisplay metadata={inheritedMetadata} />

        <p className="subtitle">Deployment Metadata</p>

        <Flex cols={[6, 6]}>
          <MetadataForm
            pairs={objectToMetadataPair(clusterLabels)}
            leftLabelText="Key"
            rightLabelText="Value"
            buttonText="+"
            onUpdate={(metadata) => {
              dispatch(updateClusterLabels(metadataPairToObject(metadata)));
            }}
          />
        </Flex>
      </div>
    </>
  );
};

export default MetadataLabels;
