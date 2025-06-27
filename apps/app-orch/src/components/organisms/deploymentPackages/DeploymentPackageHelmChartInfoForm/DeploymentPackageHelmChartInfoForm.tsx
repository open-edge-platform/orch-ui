/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { AdvancedSettingsToggle, Flex } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Button, FieldLabel, Heading, TextField } from "@spark-design/react";
import { ButtonSize, ButtonVariant, InputSize } from "@spark-design/tokens";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  clearDeploymentPackage,
  selectDeploymentPackage,
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
};

const DeploymentPackageHelmChartInfoForm = () => {
  const cy = { "data-cy": dataCy };
  const className = "dp-helmchart-form";
  const [advancedSettings, setAdvancedSettings] = useState<boolean>(false);
  // Add local state for validation errors
  const [validationErrors, setValidationErrors] = useState({
    username: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [importDeploymentPackage] = catalog.useCatalogServiceImportMutation();
  const deploymentPackage = useAppSelector(selectDeploymentPackage);
  const {
    control,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm<PackageInputs>({
    mode: "all",
    defaultValues: {
      helmChartURL: deploymentPackage.helmChartURL,
      username: deploymentPackage.username,
      password: deploymentPackage.password,
    },
  });

  // Watch the field values for validation
  const username = deploymentPackage.username;
  const password = deploymentPackage.password;

  useEffect(() => {
    // Clear previous errors
    setValidationErrors({ username: "", password: "" });

    const hasUsername = !!username?.trim();
    const hasPassword = !!password?.trim();

    // Set errors based on field values
    if (hasUsername && !hasPassword) {
      setValidationErrors((prev) => ({
        ...prev,
        password: "Password is required when username is provided",
      }));
    } else if (!hasUsername && hasPassword) {
      setValidationErrors((prev) => ({
        ...prev,
        username: "Username is required when password is provided",
      }));
    }
  }, [username, password]);

  // Clear validation errors when advanced settings are toggled off
  useEffect(() => {
    if (!advancedSettings) {
      clearErrors(["username", "password"]);
      // Reset form values if settings are disabled
      setValue("username", "");
      setValue("password", "");
      // Also update the Redux state
      dispatch(setUsername(""));
      dispatch(setPassword(""));
    }
  }, [advancedSettings]);

  const handleImport = () => {
    const dpPayload: catalog.CatalogServiceImportApiArg = {
      url: deploymentPackage.helmChartURL,
      projectName: SharedStorage.project?.name ?? "",
    };
    if (deploymentPackage.username && deploymentPackage.password) {
      dpPayload.username = deploymentPackage.username;
      dpPayload.authToken = deploymentPackage.password;
    }

    importDeploymentPackage(dpPayload);
    navigate("../packages");
  };

  return (
    <form {...cy} className={className}>
      <Flex cols={[12, 12]} colsMd={[6, 6]} colsLg={[6, 6]}>
        <div>
          <FieldLabel>Helm Chart URL *</FieldLabel>
          <Controller
            name="helmChartURL"
            control={control}
            rules={{
              required: true,
              maxLength: 70,
            }}
            render={({ field, formState }) => (
              <TextField
                {...field}
                data-cy="helm-chart-url"
                maxLength={70}
                onInput={(e) => {
                  const value = e.currentTarget.value;
                  dispatch(setHelmChartURL(value));
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
            )}
          />
        </div>
      </Flex>

      <Heading semanticLevel={6}>Advanced Settings</Heading>
      <AdvancedSettingsToggle
        message="Allow users to override selected profile values at deployment time?"
        value={advancedSettings}
        onChange={(value) => {
          setAdvancedSettings(value);
        }}
      />

      {advancedSettings ? (
        <Flex
          cols={[12, 12]}
          colsMd={[6, 6]}
          colsLg={[6, 6]}
          className="dp-auth-fields-container"
        >
          <div className="dp-auth-field">
            <FieldLabel>Username</FieldLabel>
            <Controller
              name="username"
              control={control}
              rules={{
                required: false,
                maxLength: 30,
              }}
              render={({ field }) => (
                <>
                  <TextField
                    {...field}
                    data-cy="username"
                    maxLength={30}
                    onInput={(e) => {
                      const value = e.currentTarget.value ?? "";
                      dispatch(setUsername(value));
                    }}
                    errorMessage={
                      errors.username?.type === "maxLength"
                        ? "Username can't be more than 30 characters"
                        : validationErrors.username // Use local validation error state
                          ? validationErrors.username
                          : null
                    }
                    validationState={
                      (errors.username &&
                        Object.keys(errors.username).length > 0) ||
                      validationErrors.username
                        ? "invalid"
                        : "valid"
                    }
                    size={InputSize.Large}
                  />
                </>
              )}
            />
          </div>

          <div className="dp-auth-field">
            <FieldLabel>Password</FieldLabel>
            <Controller
              name="password"
              control={control}
              rules={{
                required: false,
                maxLength: 30,
              }}
              render={({ field }) => (
                <>
                  <TextField
                    {...field}
                    type="password"
                    data-cy="password"
                    maxLength={30}
                    onInput={(e) => {
                      const value = e.currentTarget.value ?? "";
                      dispatch(setPassword(value));
                    }}
                    errorMessage={
                      errors.password?.type === "maxLength"
                        ? "Password can't be more than 30 characters"
                        : validationErrors.password // Use local validation error state
                          ? validationErrors.password
                          : null
                    }
                    validationState={
                      (errors.password &&
                        Object.keys(errors.password).length > 0) ||
                      validationErrors.password
                        ? "invalid"
                        : "valid"
                    }
                    size={InputSize.Large}
                  />
                </>
              )}
            />
          </div>
        </Flex>
      ) : null}

      <div className="dp-helmchart-form__footer">
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
          onPress={() => handleImport()}
          isDisabled={
            Object.keys(errors).length > 0 ||
            Boolean(validationErrors.username) ||
            Boolean(validationErrors.password)
          }
        >
          Import
        </Button>
      </div>
    </form>
  );
};

export default DeploymentPackageHelmChartInfoForm;
