/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import { MetadataForm, MetadataPair } from "@orch-ui/components";
import { Heading, Icon, Text, TextField } from "@spark-design/react";
import { InputSize, TextSize } from "@spark-design/tokens";
import { Controller, useForm } from "react-hook-form";
import { getDisplayNameValidationErrorMessage } from "../../../../utils/global";
import MetadataMessage from "../../../atoms/MetadataMessage/MetadataMessage";
import "./SetupMetadata.scss";

export enum SetupMetadataMode {
  CREATE = "CREATE",
  EDIT = "EDIT",
}

export interface SetupMetadataProps {
  mode: SetupMetadataMode;
  metadataPairs: MetadataPair[];
  applicationPackage?: catalog.DeploymentPackage;
  currentDeploymentName?: string;
  onDeploymentNameChange?: (name: string) => void;
  onMetadataUpdate: (metadataPairs: MetadataPair[]) => void;
}

const sm = "setup-metadata";
const ap = "application-package";
const SetupMetadata = ({
  mode = SetupMetadataMode.CREATE,
  metadataPairs,
  applicationPackage,
  currentDeploymentName,
  onDeploymentNameChange,
  onMetadataUpdate,
}: SetupMetadataProps) => {
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
    <div className={sm} data-cy="setupMetadata">
      <Text size={TextSize.Large}>
        {mode === SetupMetadataMode.EDIT ? "Change" : "Enter"} Deployment
        Details
      </Text>
      {mode === SetupMetadataMode.CREATE && (
        <div className="description">
          <Text className={`${sm}__package`}>Package</Text>
        </div>
      )}
      {mode === SetupMetadataMode.CREATE && (
        <div className={`${sm}__${ap}`}>
          <Icon icon="cube" />
          <div className={ap}>
            <Heading semanticLevel={6} className={`${ap}__name`} data-cy="name">
              {applicationPackage?.name}
            </Heading>
            <Text className={`${ap}__version`} data-cy="version">
              Version: {applicationPackage?.version}
            </Text>
            <Text className={`${ap}__description`} data-cy="description">
              {applicationPackage?.description}
            </Text>
          </div>
        </div>
      )}
      <div className={`${sm}__metadata`}>
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
              className={`${sm}__metadata-name`}
              size={InputSize.Large}
              label="Deployment Name"
              autoFocus={true}
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
      </div>
      {mode === SetupMetadataMode.EDIT && (
        <>
          <Text size={TextSize.Large}>Deployment Type</Text>
          <p>
            <Text size={TextSize.Medium}>Automatic</Text>
          </p>
        </>
      )}
      <div className={`${sm}__metadata-docs`}>
        <MetadataMessage />
      </div>
      <MetadataForm
        pairs={metadataPairs}
        onUpdate={(m) => {
          onMetadataUpdate(m);
        }}
        leftLabelText="Key"
        buttonText="+"
      />
    </div>
  );
};

export default SetupMetadata;
