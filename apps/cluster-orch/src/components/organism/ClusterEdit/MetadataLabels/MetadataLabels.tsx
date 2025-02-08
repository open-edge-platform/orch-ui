/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import {
  Flex,
  MetadataDisplay,
  MetadataForm,
  MetadataPair,
  TypedMetadata,
} from "@orch-ui/components";
import { Heading, MessageBanner } from "@spark-design/react";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import {
  updateClusterLabels,
  updateUserDefinedLabels,
} from "../../../../store/reducers/cluster";

export const dataCy = "metadataLabels";

interface MetadataLabelsProps {
  userDefinedLabelKeys: string[];
  regionMeta: TypedMetadata[];
  siteMeta: TypedMetadata[];
  clusterLabels: object;
  getInheritedMeta: (label: MetadataPair[]) => void;
  getUserDefinedMeta: (metadata: MetadataPair[]) => void;
}

const MetadataLabels = ({
  regionMeta,
  siteMeta,
  clusterLabels,
  userDefinedLabelKeys,
  getInheritedMeta,
  getUserDefinedMeta,
}: MetadataLabelsProps) => {
  const dispatch = useAppDispatch();

  const cy = { "data-cy": dataCy };

  const [userLabels, setUserLabels] = useState<MetadataPair[]>();
  const [hiddenLabels, setHiddenLabels] = useState<MetadataPair[]>();
  const [inheritedMetadata, setInheritedMetadata] = useState<TypedMetadata[]>(
    [],
  );

  // Inherited metadata array for metadata display
  useEffect(() => {
    let combinedMetadata: TypedMetadata[] = [];

    combinedMetadata = [
      ...combinedMetadata,
      ...regionMeta.map(({ key, value }) => ({
        key,
        value,
        type: "region",
      })),
    ];

    combinedMetadata = [
      ...combinedMetadata,
      ...siteMeta.map(({ key, value }) => ({
        key,
        value,
        type: "site",
      })),
    ];
    setInheritedMetadata(combinedMetadata);
    getInheritedMeta(typedToMeta(combinedMetadata));
  }, [regionMeta, clusterLabels]);

  // Filter to only show user defined labels
  useEffect(() => {
    const userDefinedLabels: { [key: string]: string } = {};
    const hidLabels: { [key: string]: string } = {};
    Object.entries(clusterLabels).forEach((label) => {
      hidLabels[label[0]] = label[1];
      userDefinedLabelKeys.forEach((item) => {
        if (label[0].toString() == item) {
          userDefinedLabels[item] = label[1];
        } else {
          hidLabels[label[0]] = label[1];
        }
      });
      userDefinedLabelKeys.forEach((item) => {
        delete hidLabels[item];
      });
    });
    setUserLabels(labelsToPair(userDefinedLabels));
    setHiddenLabels(labelsToPair(hidLabels));
    getUserDefinedMeta(labelsToPair(userDefinedLabels));
  }, [clusterLabels]);

  // Typed to meta
  const typedToMeta = (pairs: TypedMetadata[]) => {
    const newArray: MetadataPair[] = [];
    pairs.forEach((label) => {
      newArray.push({
        key: label.key,
        value: label.value,
      });
    });
    return newArray;
  };

  // Label conversion
  const labelsToPair = (data: any) => {
    const labelPair: MetadataPair[] = [];
    Object.keys(data).map(function (index) {
      if (data) {
        const label = {
          key: index,
          value: data[index],
        };
        labelPair.push(label);
        return data[index];
      }
    });
    return labelPair;
  };

  const labelsToObject = (pairs: MetadataPair[]) => {
    const labelObject: any = {};
    pairs.forEach((tags) => {
      labelObject[tags.key] = tags.value;
    });
    return labelObject;
  };

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
            pairs={userLabels ?? []}
            leftLabelText="Key"
            rightLabelText="Value"
            buttonText="+"
            onUpdate={(kv) => {
              setUserLabels(kv);

              dispatch(
                updateClusterLabels(
                  labelsToObject(kv.concat(hiddenLabels ?? [])),
                ),
              );

              const userDefined: string[] = [];
              kv.forEach((label) => {
                userDefined.push(label.key);
              });
              dispatch(updateUserDefinedLabels(userDefined));
            }}
          />
        </Flex>
      </div>
    </>
  );
};

export default MetadataLabels;
