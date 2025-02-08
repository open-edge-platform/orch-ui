/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Flex, Textarea } from "@orch-ui/components";
import { Heading, TextField } from "@spark-design/react";
import { InputSize } from "@spark-design/tokens";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  selectDeploymentPackage,
  setDescription,
  setDisplayName,
  setVersion,
} from "../../../../store/reducers/deploymentPackage";
import { getDisplayNameValidationErrorMessage } from "../../../../utils/global";
import { versionPattern } from "../../../../utils/regexPatterns";
import {
  DeploymentPackageCreateMode,
  PackageInputs,
} from "../DeploymentPackageCreateEdit/DeploymentPackageCreateEdit";
import "./DeploymentPackageGeneralInfoForm.scss";

export const dataCy = "deploymentPackageGeneralInfoForm";

interface DeploymentPackageGeneralInfoFormProps {
  control: Control<PackageInputs, string>;
  errors: FieldErrors<PackageInputs>;
  mode: DeploymentPackageCreateMode;
}

const DeploymentPackageGeneralInfoForm = ({
  control,
  errors,
  mode,
}: DeploymentPackageGeneralInfoFormProps) => {
  const cy = { "data-cy": dataCy };

  const dispatch = useAppDispatch();
  const { description } = useAppSelector(selectDeploymentPackage);

  return (
    <form {...cy} className="deployment-package-general-info-form">
      <Heading semanticLevel={5}>General Information</Heading>
      <Flex cols={[12, 6, 6]}>
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
              label="Name"
              data-cy="name"
              onInput={(e) => {
                const value = e.currentTarget.value;
                if (value.length) {
                  dispatch(setDisplayName(e.currentTarget.value));
                }
              }}
              errorMessage={getDisplayNameValidationErrorMessage(
                errors.name?.type,
              )}
              validationState={
                errors.name && Object.keys(errors.name).length > 0
                  ? "invalid"
                  : "valid"
              }
              isDisabled={["update"].includes(mode)}
              size={InputSize.Large}
            />
          )}
        />
        <div className="deployment-package-general-info-form__version">
          <Controller
            name="version"
            control={control}
            rules={{
              required: true,
              pattern: versionPattern,
            }}
            render={({ field }) => (
              <TextField
                {...field}
                data-cy="version"
                label="Version"
                onInput={(e) => {
                  const value = e.currentTarget.value;
                  if (value.length && versionPattern.test(value)) {
                    dispatch(setVersion(e.currentTarget.value));
                  }
                }}
                errorMessage={
                  errors.version?.type === "required"
                    ? "Version is required"
                    : "Invalid version (ex. 1.0.0 or v0.1.2)"
                }
                validationState={
                  errors.version && Object.keys(errors.version).length > 0
                    ? "invalid"
                    : "valid"
                }
                isDisabled={["update"].includes(mode)}
                size={InputSize.Large}
              />
            )}
          />
        </div>
      </Flex>
      <br />
      <Textarea
        dataCy="desc"
        label="Description"
        onChange={(e) => dispatch(setDescription(e.currentTarget.value))}
        value={description}
      />
    </form>
  );
};

export default DeploymentPackageGeneralInfoForm;
