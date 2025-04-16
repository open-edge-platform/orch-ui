/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { SquareSpinner } from "@orch-ui/components";
import { RuntimeConfig } from "@orch-ui/utils";
import { Text, TextField } from "@spark-design/react";
import { InputSize, TextSize } from "@spark-design/tokens";
import React, { Suspense, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { getDisplayNameValidationErrorMessage } from "../../../../utils/global";
import "./SelectCluster.scss";

const ClusterListRemote = RuntimeConfig.isEnabled("CLUSTER_ORCH")
  ? React.lazy(() => import("ClusterOrchUI/ClusterList"))
  : null;

const ClusterDetailsDrawerRemote = RuntimeConfig.isEnabled("CLUSTER_ORCH")
  ? React.lazy(() => import("ClusterOrchUI/ClusterDetailsDrawer"))
  : null;

const dataCy = "selectCluster";

export enum SelectClusterMode {
  CREATE = "CREATE",
  EDIT = "EDIT",
}

interface SelectClusterProps {
  mode: SelectClusterMode;
  canSelectRows?: boolean;
  selectedIds: string[];
  currentDeploymentName?: string;
  onSelect: (selectedRowData: cm.ClusterInfo, isSelected: boolean) => void;
  // TODO: rename this to onFormComplete(boolean: isCompleted)
  onDeploymentNameChange?: (name: string) => void;
  __ClusterListRemote?: React.LazyExoticComponent<
    React.ComponentType<any>
  > | null;
  __ClusterDetailsDrawerRemote?: React.LazyExoticComponent<
    React.ComponentType<any>
  > | null;
}

const SelectCluster = ({
  mode = SelectClusterMode.CREATE,
  canSelectRows = true,
  selectedIds,
  currentDeploymentName,
  onSelect,
  onDeploymentNameChange,
  __ClusterListRemote = ClusterListRemote,
  __ClusterDetailsDrawerRemote = ClusterDetailsDrawerRemote,
}: SelectClusterProps) => {
  const cy = { "data-cy": dataCy };
  const location = useLocation();
  const navigate = useNavigate();

  const [isClusterDetailsDrawerOpen, setIsClusterDetailsDrawerOpen] =
    useState<boolean>(false);
  const [currentCluster, setCurrentCluster] = useState<
    cm.ClusterInfo | undefined
  >();

  const showClusterDetails = (clusterInfo: cm.ClusterInfo) => {
    setIsClusterDetailsDrawerOpen(true);
    setCurrentCluster(clusterInfo);
    navigate({ ...location, search: "" });
  };
  const onHide = () => {
    setIsClusterDetailsDrawerOpen(false);
    setCurrentCluster(undefined);
    navigate({ ...location, search: "" });
  };

  const {
    control,
    formState: { errors },
  } = useForm<{ name: string }>({
    mode: "all",
    defaultValues: {
      name: currentDeploymentName,
    },
  });

  return (
    <div {...cy} className="select-cluster">
      {canSelectRows && (
        <>
          <Text size={TextSize.Large} data-cy="title">
            {mode === SelectClusterMode.EDIT ? "Change" : "Enter"} Deployment
            Details
          </Text>
          <Controller
            name="name"
            control={control}
            rules={{
              required: true,
              maxLength: 40,
              pattern: new RegExp(
                /^([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-\s/]*[A-Za-z0-9])$/,
              ),
            }}
            render={({ field }) => (
              <TextField
                {...field}
                data-cy="deploymentNameField"
                size={InputSize.Large}
                label="Deployment Name"
                autoFocus
                onInput={(e) => {
                  const value = e.currentTarget.value;
                  if (onDeploymentNameChange) onDeploymentNameChange(value);
                }}
                errorMessage={getDisplayNameValidationErrorMessage(
                  errors.name?.type,
                )}
                validationState={
                  errors.name && Object.keys(errors.name).length > 0
                    ? "invalid"
                    : "valid"
                }
              />
            )}
          />
          {mode === SelectClusterMode.EDIT && (
            <>
              <Text size={TextSize.Large}>Deployment Type</Text>
              <p>
                <Text size={TextSize.Medium}>Manual</Text>
              </p>
            </>
          )}
        </>
      )}

      {__ClusterListRemote && (
        <Suspense fallback={<SquareSpinner />}>
          <__ClusterListRemote
            selectedClusterIds={selectedIds}
            onSelect={onSelect}
            canSelectRows={canSelectRows}
            onShowDetails={showClusterDetails}
          />
        </Suspense>
      )}

      {__ClusterDetailsDrawerRemote && isClusterDetailsDrawerOpen && (
        <Suspense fallback={<SquareSpinner />}>
          <__ClusterDetailsDrawerRemote
            cluster={currentCluster ?? {}}
            isOpen
            onHide={onHide}
          />
        </Suspense>
      )}
    </div>
  );
};

export default SelectCluster;
