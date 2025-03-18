/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { SquareSpinner } from "@orch-ui/components";
import { Text, TextField } from "@spark-design/react";
import { InputSize, TextSize } from "@spark-design/tokens";
import React, { Suspense, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getDisplayNameValidationErrorMessage } from "../../../../utils/global";
import ClusterDetails from "../ClusterDetails/ClusterDetails";
import "./SelectCluster.scss";

const ClusterListRemote = React.lazy(() => {
  //TODO: how to stub React.lazy method so we don't
  //need Cypress logic in the component
  const isComponentTesting = window?.Cypress?.testingType === "component";
  return isComponentTesting
    ? import("../../../atoms/MockComponent")
    : import("ClusterOrchUI/ClusterList");
});

const dataCy = "selectCluster";

export enum SelectClusterMode {
  CREATE = "CREATE",
  EDIT = "EDIT",
}

interface SelectClusterProps {
  mode: SelectClusterMode;
  selectedIds: string[];
  onSelect: (selectedRowData: cm.ClusterInfo, isSelected: boolean) => void;
  currentDeploymentName?: string;
  onDeploymentNameChange?: (name: string) => void;
  isForm?: boolean;
}

const SelectCluster = ({
  mode = SelectClusterMode.CREATE,
  selectedIds,
  onSelect,
  currentDeploymentName,
  onDeploymentNameChange,
  isForm = true,
}: SelectClusterProps) => {
  const cy = { "data-cy": dataCy };

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [currentCluster, setCurrentCluster] = useState<any>(null);

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
      {isForm && (
        <>
          <Text size="l" data-cy="title">
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
      <Suspense fallback={<SquareSpinner />}>
        <ClusterListRemote
          selectedClusterIds={selectedIds}
          onSelect={onSelect}
          isForm={isForm}
          onShowDetails={(clusterInfo: any) => {
            setIsDrawerOpen(true);
            setCurrentCluster(clusterInfo);
          }}
        />
      </Suspense>
      <ClusterDetails
        cluster={currentCluster ?? {}}
        isOpen={isDrawerOpen}
        onCloseDrawer={() => {
          setIsDrawerOpen(false);
          setCurrentCluster(undefined);
        }}
      />
    </div>
  );
};

export default SelectCluster;
