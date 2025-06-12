/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
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
} from "../DeploymentPackageCreateEdit/DeploymentPackageCreateEdit";

const dataCy = "deploymentPackageGeneralInfoForm";

export type PackageInputs = {
  helmChartURL: string;
  username: string;
  password: string;
};

interface DeploymentPackageGeneralInfoFormProps {
  control: Control<PackageInputs, string>;
  errors: FieldErrors<PackageInputs>;
  mode: DeploymentPackageCreateMode;
}

const DeploymentPackageHelmChartInfoForm = ({
  control,
  errors,
  mode,
}: DeploymentPackageGeneralInfoFormProps) => {
  const cy = { "data-cy": dataCy };

  const dispatch = useAppDispatch();
  const { description } = useAppSelector(selectDeploymentPackage);

  return (
    <form {...cy} className="deployment-package-general-info-form">
      <Heading semanticLevel={5}>Import from Helm Chart</Heading>
      <Flex cols={[12, 6, 3, 3]}>
        <Controller
          name="helmChartURL"
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
              label="Helm Chart URL"
              data-cy="helm-chart-url"
              onInput={(e) => {
                const value = e.currentTarget.value;
                if (value.length) {
                  dispatch(setDisplayName(e.currentTarget.value));
                }
              }}
              errorMessage={getDisplayNameValidationErrorMessage(
                errors.helmChartURL?.type,
              )}
              validationState={
                errors.helmChartURL && Object.keys(errors.helmChartURL).length > 0
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
            name="username"
            control={control}
            rules={{
              required: true,
              pattern: versionPattern,
            }}
            render={({ field }) => (
              <TextField
                {...field}
                data-cy="username"
                label="Username"
                onInput={(e) => {
                  const value = e.currentTarget.value;
                  if (value.length && versionPattern.test(value)) {
                    dispatch(setVersion(e.currentTarget.value));
                  }
                }}
                errorMessage={
                  errors.username?.type === "required"
                    ? "Username is required"
                    : "Invalid version (ex. 1.0.0 or v0.1.2)" // TODO
                }
                validationState={
                  errors.username && Object.keys(errors.username).length > 0
                    ? "invalid"
                    : "valid"
                }
                isDisabled={["update"].includes(mode)}
                size={InputSize.Large}
              />
            )}
          />
        </div>
        <div className="deployment-package-general-info-form__password">
          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                data-cy="password"
                label="Password"
                errorMessage={
                  errors.password?.type === "required"
                    ? "Password is required"
                    : undefined
                }
                validationState={
                  errors.password && Object.keys(errors.password).length > 0
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
        dataCy="default-values"
        label="Default Values"
        onChange={(e) => dispatch(setDescription(e.currentTarget.value))}
        value={description}
      />
    </form>
  );
};

export default DeploymentPackageHelmChartInfoForm;