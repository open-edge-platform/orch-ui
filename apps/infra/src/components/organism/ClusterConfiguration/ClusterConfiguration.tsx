/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Flex,
  MetadataDisplay,
  MetadataForm,
  MetadataPair,
} from "@orch-ui/components";
import { MessageBanner, RadioButton, RadioGroup } from "@spark-design/react";
import { RadioButtonSize } from "@spark-design/tokens";
import { useEffect, useMemo, useState } from "react";
import "./ClusterConfiguration.scss";

export type ClusterType = "single" | "multi";

interface ClusterConfigurationProps {
  value?: ClusterType;
  metadata?: MetadataPair[];
  accumulatedMetadata: MetadataPair[];
  onChange?: (value: ClusterType, metadata: MetadataPair[]) => void;
}

/**
 * TODO remove as part of LPUUH-1739
 * @deprecated
 */
const ClusterConfiguration = ({
  value,
  metadata,
  accumulatedMetadata,
  onChange,
}: ClusterConfigurationProps) => {
  const [details1, setDetails1] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<ClusterType>();
  const [selectedMetadata, setSelectedMetadata] = useState<MetadataPair[]>([]);

  const deploymentMetadataContent = useMemo(
    () => (
      <MetadataForm
        pairs={metadata}
        onUpdate={(kv) => {
          setSelectedMetadata(kv);
        }}
      />
    ),
    [metadata],
  );

  useEffect(() => {
    if (!value) return;
    setSelectedValue(value);
    if (value === "single") {
      setDetails1(true);
    }
  }, []);

  useEffect(() => {
    if (onChange !== undefined && selectedValue) {
      onChange(selectedValue, selectedMetadata);
    }
  }, [selectedValue, selectedMetadata]);

  return (
    <div data-cy="clusterConfiguration" className="cluster-configuration">
      <RadioGroup
        size={RadioButtonSize.Large}
        defaultValue={value}
        value={value}
        onChange={(v: ClusterType) => {
          setSelectedValue(v);
          setDetails1(false);
          if (v === "single") {
            setDetails1(true);
          }
        }}
      >
        <Flex cols={[6, 6]}>
          <div className={selectedValue === "single" ? "focus" : ""}>
            <RadioButton
              data-cy="clusterConfigurationOptionSingle"
              value="single"
            >
              Create Single-host Cluster
              <br />
              <small>Create a cluster with this host as its only member.</small>
            </RadioButton>
          </div>
          <div className={selectedValue === "multi" ? "focus" : ""}>
            <RadioButton
              data-cy="clusterConfigurationOptionMulti"
              value="multi"
            >
              Complete Multi-host Cluster Later
              <br />
              <small>
                Continue without creating a cluster. Create a multi-host cluster
                later, after configuring all desired hosts.
              </small>
            </RadioButton>
          </div>
        </Flex>
        {details1 && (
          <div data-cy="clusterConfigurationOptionSingleDetails">
            <b>Add Deployment Metadata</b>
            <Flex cols={[6, 6]}>
              {deploymentMetadataContent}
              <span></span>
              <span>
                <b>Location Information</b>
                <MessageBanner
                  messageBody="Inherited metadata for the cluster is based on the Region and Site selection done."
                  variant="info"
                  messageTitle=""
                  size="s"
                  showIcon
                  outlined
                />
                <MetadataDisplay metadata={accumulatedMetadata} />
              </span>
              <span></span>
            </Flex>
          </div>
        )}
      </RadioGroup>
    </div>
  );
};

export default ClusterConfiguration;
