/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { MetadataForm, MetadataPair } from "@orch-ui/components";
import { Heading } from "@spark-design/react";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { getLabels, updateLabels } from "../../../../../store/reducers/labels";

export const dataCy = "addDeploymentMeta";

interface AddDeploymentMetaProps {
  hasError?: (error: boolean) => void;
}

const AddDeploymentMeta = ({ hasError }: AddDeploymentMetaProps) => {
  const currentLabels = useAppSelector(getLabels);
  const dispatch = useAppDispatch();

  const labelsToObject = (pairs: MetadataPair[]) => {
    const labelObject: any = {};
    pairs.forEach((tags) => {
      labelObject[tags.key] = tags.value;
    });
    return labelObject;
  };

  const handleFieldValidationError = (isErrored: boolean) => {
    if (hasError) {
      hasError(isErrored);
    }
  };

  const objectToLabels = (data: any) => {
    const labelPair: MetadataPair[] = [];
    if (data && data.labels) {
      Object.keys(data.labels).map((labelKey) => {
        const label = {
          key: labelKey,
          value: data.labels[labelKey],
        };
        labelPair.push(label);
      });
    }

    return labelPair;
  };

  const metadataContent = useMemo(
    () => (
      <MetadataForm
        leftLabelText="Key"
        rightLabelText="Value"
        pairs={objectToLabels(currentLabels)}
        onUpdate={(kv) => {
          dispatch(updateLabels(labelsToObject(kv)));
        }}
        buttonText="+"
        hasError={handleFieldValidationError}
      />
    ),
    [currentLabels],
  );

  return (
    <div data-cy="addDeploymentMeta" className="add-deployment-meta">
      <Heading semanticLevel={6} className="add-labels">
        Add Deployment Metadata
      </Heading>
      <p>
        Deployment metadata is used to automatically deploy packages to a
        cluster.
      </p>

      {metadataContent}
    </div>
  );
};

export default AddDeploymentMeta;
