/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flex, Textarea } from "@orch-ui/components";
import { Button, TextField } from "@spark-design/react";
import { ButtonSize, ButtonVariant, InputSize } from "@spark-design/tokens";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  clearDeploymentPackage,
  selectDeploymentPackage,
  setDescription,
  setHelmChartURL,
  setPassword,
  setUsername,
} from "../../../../store/reducers/deploymentPackage";
import "./DeploymentPackageHelmChartInfoForm.scss";

const dataCy = "deploymentPackageGeneralInfoForm";

export type PackageInputs = {
  helmChartURL: string;
  username: string;
  password: string;
  description: string;
};

interface DeploymentPackageGeneralInfoFormProps {
  control: Control<PackageInputs, string>;
  errors: FieldErrors<PackageInputs>;
}

const DeploymentPackageHelmChartInfoForm = ({
  control,
  errors,
}: DeploymentPackageGeneralInfoFormProps) => {
  const cy = { "data-cy": dataCy };

  const dispatch = useAppDispatch();
  const { description } = useAppSelector(selectDeploymentPackage);
  const navigate = useNavigate();

  return (
    <form {...cy} className="deployment-package-import-helm-chart-info-form">
      <Flex cols={[12]}>
        <div style={{ paddingBottom: "0.4rem" }}>
          <Controller
            name="helmChartURL"
            control={control}
            rules={{
              required: true,
              maxLength: 70,
            }}
            render={({ field, formState }) => (
              <>
                <TextField
                  {...field}
                  label="Helm Chart URL *"
                  data-cy="helm-chart-url"
                  maxLength={70}
                  onInput={(e) => {
                    const value = e.currentTarget.value;
                    if (value.length) {
                      dispatch(setHelmChartURL(value));
                    }
                  }}
                  errorMessage={
                    formState.errors.helmChartURL?.type === "required"
                      ? "Helm Chart URL is required"
                      : formState.errors.helmChartURL?.type === "maxLength"
                        ? "Helm Chart URL can't be more than 70 characters"
                        : null
                  }
                  validationState={
                    errors.helmChartURL &&
                    Object.keys(errors.helmChartURL).length > 0
                      ? "invalid"
                      : "valid"
                  }
                  size={InputSize.Large}
                />
                {!errors.helmChartURL && (
                  <div style={{ minHeight: "1.55rem" }} />
                )}
              </>
            )}
          />
        </div>
      </Flex>
      <Flex cols={[6, 6]}>
        <div className="deployment-package-import-helm-chart-info-form__field-group--left">
          <Controller
            name="username"
            control={control}
            rules={{
              required: false,
              maxLength: 30,
            }}
            render={({ field, formState }) => (
              <>
                <TextField
                  {...field}
                  data-cy="username"
                  label="Username"
                  maxLength={30}
                  onInput={(e) => {
                    const value = e.currentTarget.value ?? "";
                    if (value.length) {
                      dispatch(setUsername(value));
                    }
                  }}
                  errorMessage={
                    formState.errors.username?.type === "maxLength"
                      ? "Username can't be more than 30 characters"
                      : null
                  }
                  validationState={
                    errors.username && Object.keys(errors.username).length > 0
                      ? "invalid"
                      : "valid"
                  }
                  size={InputSize.Large}
                />
                {!errors.username && <div style={{ minHeight: "1.3rem" }} />}
              </>
            )}
          />
        </div>

        <div className="deployment-package-import-helm-chart-info-form__field-group--right">
          <Controller
            name="password"
            control={control}
            rules={{
              required: false,
              maxLength: 30,
            }}
            render={({ field, formState }) => (
              <>
                <TextField
                  {...field}
                  type="password"
                  data-cy="password"
                  maxLength={30}
                  label="Password"
                  onInput={(e) => {
                    const value = e.currentTarget.value ?? "";
                    if (value.length) {
                      dispatch(setPassword(value));
                    }
                  }}
                  errorMessage={
                    formState.errors.password?.type === "maxLength"
                      ? "Password can't be more than 30 characters"
                      : null
                  }
                  validationState={
                    errors.password && Object.keys(errors.password).length > 0
                      ? "invalid"
                      : "valid"
                  }
                  size={InputSize.Large}
                />
                {!errors.password && <div style={{ minHeight: "1.3rem" }} />}
              </>
            )}
          />
        </div>
      </Flex>
      <Textarea
        dataCy="description"
        label="Description"
        value={description ?? ""}
        onChange={(e) => dispatch(setDescription(e.currentTarget.value))}
      />
      <div className="deployment-package-import-helm-chart-info-form__footer">
        <Button
          onPress={() => {
            navigate("../packages");
            dispatch(clearDeploymentPackage());
          }}
          size={ButtonSize.Large}
          variant={ButtonVariant.Secondary}
        >
          Cancel
        </Button>
        <Button
          data-cy="importButton"
          size={ButtonSize.Large}
          onPress={() => navigate("../packages")}
        >
          Import
        </Button>
      </div>
    </form>
  );
};

export default DeploymentPackageHelmChartInfoForm;
