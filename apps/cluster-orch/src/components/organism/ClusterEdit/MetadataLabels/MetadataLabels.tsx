/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Flex,
  MetadataDisplay,
  MetadataForm,
  MetadataPair,
  TypedMetadata,
} from "@orch-ui/components";
import { metadataPairToObject } from "@orch-ui/utils";
import { Heading, MessageBanner } from "@spark-design/react";
import { useAppDispatch } from "../../../../store/hooks";
import { updateClusterLabels } from "../../../../store/reducers/cluster";

const dataCy = "metadataLabels";
interface MetadataLabelsProps {
  inheritedMetadata: TypedMetadata[];
  clusterLabels: MetadataPair[];
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
            pairs={clusterLabels}
            leftLabelText="Key"
            rightLabelText="Value"
            buttonText="+"
            onUpdate={(metadata) => {
              // Update the cluster labels in the redux store
              dispatch(updateClusterLabels(metadataPairToObject(metadata)));
            }}
          />
        </Flex>
      </div>
    </>
  );
};

export default MetadataLabels;
